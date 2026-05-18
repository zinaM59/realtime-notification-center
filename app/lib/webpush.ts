
'use server'
import { prisma } from "@/app/lib/prisma";
const webpush = require('web-push')
let vapidConfigured = false;

function ensureVapidConfigured() {
    if (vapidConfigured) return;

    if (
        !process.env.VAPID_SUBJECT ||
        !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
        !process.env.VAPID_PRIVATE_KEY
    ) {
        throw new Error("Missing VAPID environment variables");
    }

    webpush.setVapidDetails(
        process.env.VAPID_SUBJECT,
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    vapidConfigured = true;
}


function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryPushError(error: any) {
    if (!error) return true;
    if (typeof error.statusCode === 'number') {
        return error.statusCode === 429 || (error.statusCode >= 500 && error.statusCode < 600);
    }
    return !!error.code;
}

async function sendNotificationWithRetry(
    sub: { endpoint: string; p256dh: string; auth: string },
    payload: string
) {
    const maxAttempts = 3;
    let attempt = 0;

    while (true) {
        attempt += 1;
        try {
            return await webpush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                },
                payload
            );
        } catch (error) {
            if (attempt >= maxAttempts || !shouldRetryPushError(error)) {
                throw error;
            }
            const backoffMs = 200 * attempt;
            console.warn(`Retrying push notification (${attempt}/${maxAttempts}) for endpoint ${sub.endpoint} in ${backoffMs}ms`);
            await delay(backoffMs);
        }
    }
}

export async function sendPushToUser(
    subscriptions: {
        endpoint: string;
        p256dh: string;
        auth: string;
    }[], message: string

) {

    ensureVapidConfigured();
    const payload = JSON.stringify({
        title: 'Notification Center',
        body: message,
        icon: '/icons/favicon-32x32.png',
        url: '/',
    });

    const results = await Promise.allSettled(
        subscriptions.map((sub) => sendNotificationWithRetry(sub, payload))
    );

    for (const [index, result] of results.entries()) {
        if (result.status === 'rejected') {
            const endpoint = subscriptions[index]?.endpoint;
            const error = result.reason;

            if (error?.statusCode === 410 || error?.statusCode === 404) {
                if (endpoint) {
                    await prisma.deviceSubscription.deleteMany({
                        where: { endpoint },
                    });
                    console.log(`Removed expired push subscription: ${endpoint}`);
                }
            } else {
                console.error('Push notification failed after retries for endpoint', endpoint, error);
            }
        }
    }
}