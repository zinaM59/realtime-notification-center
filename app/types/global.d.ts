import type { Server } from "socket.io";

declare global {
  var io: Server | undefined;
  var isBrowserSupported: boolean = false; //for push subscriptions
}

export { };
