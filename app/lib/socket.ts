import type { Server } from "socket.io";
import { io, type Socket } from "socket.io-client";
import { sendPushToUser } from "./webpush";

export async function emitToUser(userId: string, event: string, payload: unknown, subscriptions: any, userName: string = "") {
    const io = globalThis.io as Server | undefined;
    if (!io) return;
    io.to(`user:${userId}`).emit(event, payload);
    if (!subscriptions || subscriptions.length === 0) { return; }
    await sendPushToUser(subscriptions, `${userName}. You have a new message: ${(payload as any).message}`);
}

let socket: Socket | null = null;
export function getSocket() {
    if (!socket) {
        socket = io({
            path: "/socket.io",
            transports: ["websocket", "polling"],
            autoConnect: true
        });
    }
    return socket;
}
