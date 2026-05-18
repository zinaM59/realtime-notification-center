import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";


export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sub = await req.json();

    await prisma.deviceSubscription.upsert({
        where: {
            endpoint: sub.endpoint,
        },
        update: {
            userId: session.user.id,
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth,
        },
        create: {
            userId: session.user.id,
            endpoint: sub.endpoint,
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth,
        },
    });

    return Response.json({ success: true });
}