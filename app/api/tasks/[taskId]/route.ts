import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { emitToUser } from "@/app/lib/socket";

const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  assignedToId: z.string().min(1)
});


const updateSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"])
});

export async function PATCH(req: Request, context: { params: Promise<{ taskId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await context.params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);


  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const existing = await prisma.task.findUnique({ where: { id: taskId } });

  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: { status: parsed.data.status }
  });

  const notification = await prisma.notification.create({
    data: {
      userId: existing.createdById,
      title: "Task Updated",
      message: `${updated.title} is now ${updated.status}`,
      type: updated.status === "DONE" ? "TASK_COMPLETED" : "TASK_UPDATED",
      taskId: updated.id
    }
  });
  const subscriptions = await prisma.deviceSubscription.findMany({ //Update admin send action <-> Creator Task
    where: { userId: existing.createdById },
    select: {
      endpoint: true,
      p256dh: true,
      auth: true,
    },
  });
  const createdUser = await prisma.user.findUnique({ where: { id: existing.createdById } });
  if (!createdUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const userName = createdUser.name ?? createdUser.email;
  emitToUser(existing.createdById, "notification:new", {
    ...notification,
    createdAt: notification.createdAt.toISOString()
  }, subscriptions, userName ?? "");
  // emitToUser(existing.createdById, "task:updated", updated, null, '');

  return NextResponse.json([updated, subscriptions]);
}

export async function DELETE(req: Request, context: { params: Promise<{ taskId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await context.params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  ;

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const existing = await prisma.task.findUnique({ where: { id: taskId } });

  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const updated = await prisma.task.delete({
    where: { id: taskId }
  });

  const notification = await prisma.notification.create({
    data: {
      userId: existing.createdById,
      title: "Task Deleted",
      message: `${updated.title} has been deleted`,
      type: "TASK_UPDATED",
      taskId: updated.id
    }
  });
  const subscriptions = await prisma.deviceSubscription.findMany({ //Update admin send action <-> Creator Task
    where: { userId: existing.createdById },
    select: {
      endpoint: true,
      p256dh: true,
      auth: true,
    },
  });
  const createdUser = await prisma.user.findUnique({ where: { id: existing.createdById } });
  if (!createdUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const userName = createdUser.name ?? createdUser.email;
  if (!createdUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  emitToUser(existing.createdById, "notification:new", {
    ...notification,
    createdAt: notification.createdAt.toISOString()
  }, subscriptions, userName ?? "");
  // emitToUser(existing.createdById, "task:deleted", updated, null);

  return NextResponse.json([updated, subscriptions]);
}