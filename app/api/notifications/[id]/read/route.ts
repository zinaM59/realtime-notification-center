import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";

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
      isRead: true
    }
  });

  return NextResponse.json(result);
}
