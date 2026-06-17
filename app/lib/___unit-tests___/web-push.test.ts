import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('web-push', () => ({
    default: {
        sendNotification: vi.fn(),
        setVapidDetails: vi.fn(),
    },
}));

import { prisma } from '@/app/lib/prisma';
import { sendPushToUser } from '../webpush';
import webpush from 'web-push';

vi.mock('@/app/lib/prisma', () => ({
    prisma: {
        deviceSubscription: {
            deleteMany: vi.fn(),
        },
    },
}));
describe.skip('sendPushToUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('configures vapid', async () => {
        vi.mocked(webpush.sendNotification)
            .mockResolvedValue({} as any);

        process.env.VAPID_SUBJECT = 'test';
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY = 'fake';
        process.env.VAPID_PRIVATE_KEY = 'fake';

        await sendPushToUser([], { message: 'Test message' });

        expect(webpush.setVapidDetails)
            .toHaveBeenCalled();
    });
});
describe('sendPushToUser', () => {
    const subscriptions = [
        {
            endpoint: 'https://example.com/1',
            p256dh: 'p256dh-key',
            auth: 'auth-key',
            userName: 'John',
        },
    ];
    beforeEach(() => {
        vi.clearAllMocks();
        // vi.mocked(webpush.sendNotification)
        //     .mockResolvedValue({} as any);

        process.env.VAPID_SUBJECT = 'mailto:test@example.com';
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY = 'public-key';
        process.env.VAPID_PRIVATE_KEY = 'private-key';
    });


    it('configures VAPID details', async () => {


        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(webpush.setVapidDetails).toHaveBeenCalledWith(
            'mailto:test@example.com',
            'public-key',
            'private-key'
        );
    });

    it('sends push notification', async () => {

        vi.mocked(webpush.sendNotification)
            .mockResolvedValue({} as any);

        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(webpush.sendNotification)
            .toHaveBeenCalledTimes(1);

        const [subscriptionArg, payloadArg] =
            vi.mocked(webpush.sendNotification)
                .mock.calls[0];


        expect(subscriptionArg).toEqual({
            endpoint: 'https://example.com/1',
            keys: {
                p256dh: 'p256dh-key',
                auth: 'auth-key',
            },
        });
        const parsedPayload = JSON.parse(
            payloadArg as string
        );

        expect(parsedPayload).toEqual({
            title: 'Notification Center',
            body: 'John: Test message',
            icon: '/icons/favicon-32x32.png',
            url: '/',
            type: 'GENERAL_NOTIFICATION',
        });
    });



    it('removes expired subscription on 410 error', async () => {
        vi.mocked(webpush.sendNotification).mockRejectedValue({
            statusCode: 410,
        });

        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(
            prisma.deviceSubscription.deleteMany
        ).toHaveBeenCalledWith({
            where: {
                endpoint: 'https://example.com/1',
            },
        });
    });

    it('removes expired subscription on 404 error', async () => {
        vi.mocked(webpush.sendNotification).mockRejectedValue({
            statusCode: 404,
        });

        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(
            prisma.deviceSubscription.deleteMany
        ).toHaveBeenCalledWith({
            where: {
                endpoint: 'https://example.com/1',
            },
        });
    });

    it('throws error when VAPID variables missing', async () => {
        vi.resetModules();
        delete process.env.VAPID_SUBJECT;
        const { sendPushToUser } = await import('../webpush');
        await expect(
            sendPushToUser(
                subscriptions,
                { message: 'Test message' }
            )
        ).rejects.toThrow(
            'Missing VAPID environment variables'
        );
    });

    it('retries failed notifications', async () => {
        vi.mocked(webpush.sendNotification)
            .mockRejectedValueOnce({
                statusCode: 500,
            })
            .mockResolvedValueOnce({} as any);

        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(vi.mocked(webpush.sendNotification)).toHaveBeenCalledTimes(2);
    });

    it('does not retry non-retryable errors', async () => {
        vi.mocked(webpush.sendNotification).mockRejectedValue({
            statusCode: 400,
        });

        await sendPushToUser(
            subscriptions,
            { message: 'Test message' }
        );

        expect(vi.mocked(webpush.sendNotification)).toHaveBeenCalledTimes(1);
    });
});