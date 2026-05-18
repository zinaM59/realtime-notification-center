import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const session = await auth();
    const userId = session?.user?.id
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const subscription = body.sub;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return NextResponse.json({ error: "Your session is stale. Please sign in again." }, { status: 401 });
    }
    // let subs = await prisma.pushSubscription.findMany({ where: { userId: userId, include: { subscription } } })


    // if (subs.length > 0) {
    //     return NextResponse.json({ response: "You are subscribed already" });
    // }


    // let sub = subs[0].userId === userId ? await updateSubscription(subscription, subs[0].id) :
    //     await createSubscription(subscription, userId)

    return NextResponse.json(1);
}


// async function updateSubscription(subscription: PushSubscription, id: string) {

//     return await prisma.pushSubscription.update({
//         where: { id },
//         data: {

//             subscription
//         }
//     })
// }


// async function createSubscription(subscription: PushSubscription, userId: string) {
//     return await prisma.pushSubscription.create({
//         data: {
//             userId,
//             subscription
//         }
//     })
// }