import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";


export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { endpoint } = await req.json();
    console.log('endpoint :', endpoint);

    if (!endpoint) {
        return Response.json({ error: "Missing endpoint" }, { status: 400 });
    }

    await prisma.deviceSubscription.deleteMany({
        where: {
            endpoint,
            userId: session.user.id,
        },
    });

    return Response.json({ success: true });
}