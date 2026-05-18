import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(_req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const result = await prisma.notification.updateMany({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            isRead: false
        }
    });

    return NextResponse.json(result);
}