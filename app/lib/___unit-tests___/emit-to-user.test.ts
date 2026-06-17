vi.mock('@/app/lib/prisma', () => ({
    prisma: {
        deviceSubscription: {
            deleteMany: vi.fn(),
        },
    },
}));
vi.mock('../webpush', () => ({
    sendPushToUser: vi.fn(),
}));

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { emitToUser } from '../../lib/socket';
import { sendPushToUser } from '../webpush';

describe('emitToUser', () => {
    const emitMock = vi.fn();
    const toMock = vi.fn(() => ({
        emit: emitMock,
    }));

    beforeEach(() => {
        vi.clearAllMocks();

        globalThis.io = {
            to: toMock,
        } as any;
    });

    it('emits socket event to user room', async () => {
        await emitToUser(
            '123',
            'new-message',
            {
                message: 'Hello',
            },
            []
        );

        expect(toMock).toHaveBeenCalledWith('user:123');

        expect(emitMock).toHaveBeenCalledWith(
            'new-message',
            {
                message: 'Hello',
            }
        );
    });

    it('sends push notification when subscriptions exist', async () => {
        const subscriptions = [
            {
                endpoint: 'test-endpoint',
            },
        ];

        await emitToUser(
            '123',
            'new-message',
            {
                message: 'Hello',
            },
            subscriptions,
            'John'
        );

        expect(sendPushToUser).toHaveBeenCalledWith(
            subscriptions,
            expect.objectContaining({
                message: 'You have a new message: Hello',
            })

        );
    });

    it('does not send push notification when subscriptions empty', async () => {
        await emitToUser(
            '123',
            'new-message',
            {
                message: 'Hello',
            },
            []
        );

        expect(sendPushToUser).not.toHaveBeenCalled();
    });

    it('returns early when io server missing', async () => {
        globalThis.io = undefined;

        await emitToUser(
            '123',
            'new-message',
            {
                message: 'Hello',
            },
            []
        );

        expect(toMock).not.toHaveBeenCalled();

        expect(sendPushToUser).not.toHaveBeenCalled();
    });
});