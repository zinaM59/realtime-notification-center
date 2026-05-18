import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { emitToUser } from "@/app/lib/socket";

const taskSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    assignedToId: z.string().min(1),
    dueDate: z
        .string()
        .min(1, "Due date is required")
        .transform((val) => new Date(val)),
});

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const assignedToId = parsed.data.assignedToId;

    const creator = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!creator) {
        return NextResponse.json({ error: "Your session is stale. Please sign in again." }, { status: 401 });
    }

    const assignee = await prisma.user.findUnique({ where: { id: assignedToId } });
    if (!assignee) {
        return NextResponse.json({ error: "Assigned user does not exist." }, { status: 400 });
    }

    const task = await prisma.task.create({
        data: {
            title: parsed.data.title,
            description: parsed.data.description,
            createdById: session.user.id,
            assignedToId: assignedToId,
            dueDate: parsed.data.dueDate
        }
    });

    const notification = await prisma.notification.create({
        data: {
            userId: assignedToId,
            title: "New Task Assigned",
            message: task.title,
            // message: `You were assigned: ${task.title}`,
            type: "TASK_ASSIGNED",
            taskId: task.id
        }
    });
    const subscriptions = await prisma.deviceSubscription.findMany({ //Update admin send action <-> Creator Task
        where: { userId: assignedToId },
        select: {
            endpoint: true,
            p256dh: true,
            auth: true,
        },
    });
    const userName = assignee.name ?? assignee.email;
    emitToUser(parsed.data.assignedToId, "notification:new", {
        ...notification,
        createdAt: notification.createdAt.toISOString()
    }, subscriptions, userName ?? "");
    emitToUser(parsed.data.assignedToId, "task:new", task, null);

    return NextResponse.json({ subscriptions, name: assignee.name });
}

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [tasks, users] = await Promise.all([

        prisma.task.findMany({
            where: { assignedToId: session.user.id },
            orderBy: { createdAt: "desc" }
        }),

        prisma.user.findMany({
            select: { id: true, name: true, email: true },
            orderBy: { createdAt: "desc" }
        })
    ]);

    return NextResponse.json({ tasks, users });
}