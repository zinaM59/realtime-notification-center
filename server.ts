import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
console.log('dev :', dev);
const hostname = dev ? "localhost" : "0.0.0.0";
const port = Number(process.env.PORT) || 3000;
console.log('port :', port);
console.log('process.env.PORT :', process.env.PORT);

const app = next({ dev: false, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    globalThis.io = io;

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("user:join", (userId: string) => {
            socket.join(`user:${userId}`);
            console.log(`User ${userId} joined room user:${userId}`);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });


    httpServer.listen(port, hostname, () => {
        // console.log(`Network: http://192.168.1.196:${port}`);
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
