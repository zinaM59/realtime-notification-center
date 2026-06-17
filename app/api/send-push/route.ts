import { prisma } from "@/app/lib/prisma";
import { sendPushToUser } from "@/app/lib/webpush";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.email !== "zinamej@gmail.com") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const subscriptions = await prisma.deviceSubscription.findMany({

        where: { userId: { not: session.user.id } },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    })
    const subscriptionsWithUserNames = subscriptions.map(sub => ({

        endpoint: sub.endpoint,
        p256dh: sub.p256dh,
        auth: sub.auth,
        userName: sub.user?.name ?? sub.user?.email ?? "Unknown User",
    }));
    await sendPushToUser(subscriptionsWithUserNames, { title: "New version available", message: "The application was updated. Reload the app to get the latest version.", type: "APP_VERSION_UPDATED" });

    return NextResponse.json({ subscriptions });
}