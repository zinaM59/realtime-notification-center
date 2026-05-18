import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [notifications] = await Promise.all([

        prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" }
        }),


    ]);

    return NextResponse.json(notifications);

}