"use client";

import { useEffect } from "react";
import { getSocket } from "@/app/lib/socket";

export function useRealtimeNotifications(
  userId: string | undefined,
  onNotification: (payload: any) => void,
  onTask?: (payload: any) => void
) {
  useEffect(() => {
    if (!userId) return;
    const socket = getSocket();
    socket.emit("user:join", userId);
    socket.on("notification:new", onNotification);

    if (onTask) {
      socket.on("task:new", onTask);
      socket.on("task:updated", onTask);
    }

    return () => {
      socket.off("notification:new", onNotification);
      if (onTask) {

        socket.off("task:new", onTask);
        socket.off("task:updated", onTask);
      }
    };
  }, [userId, onNotification, onTask]);
}
