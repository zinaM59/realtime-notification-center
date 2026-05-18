'use client'
import TaskList from "@/app/components/tasks/TaskList";
import { useEffect } from "react";
import { useAuthSession } from "../providers/AuthContext";

export default function TasksPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold">Tasks</h1>
                {/* <p className="mt-2 text-slate-400">Task management page will go here.</p> */}
                <p className="mt-2 text-slate-400">
                    {/* Manage your tasks and trigger notifications later. */}
                </p>
                <div className="mt-6" style={{ position: "relative", minHeight: "100vh" }}>
                    <TaskList />
                </div>
            </div>
        </div>
    );
}