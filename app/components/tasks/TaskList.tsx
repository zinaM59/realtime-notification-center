'use client'

import { useCallback, useEffect, useState } from "react";
import { User } from "next-auth";
import { useAuthSession } from "../../providers/AuthContext";
import { useRealtimeNotifications } from "../../hooks/useRealtimeNotifications";
import TaskTable from "./TaskTable";
import TaskCreator from "./TaskCreator";
import { NeonSpinnerPro } from "../NeonSpinnerPro"
import { redirect } from "next/navigation";



export const TaskStatus = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];


type UserOption = {
    id: string;
    name: string | null;
    email: string | null;
};

export type Task = {
    id: string;
    title: string;
    description: string | null;
    assignedToId: string;
    dueDate: string | null;
    status: TaskStatus;

};


export default function TaskList() {
    const session = useAuthSession();
    if (!session?.user?.id) {
        redirect("/login");
    }
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<UserOption[]>([]);
    const [loading, setLoading] = useState(true);

    const handleTask = useCallback((payload: Task) => {
        setTasks((prev) => {
            const exists = prev.some((t) => t.id === payload.id);
            if (!exists) return [payload, ...prev];
            return prev.map((t) => (t.id === payload.id ? payload : t));
        });
    }, []);

    useRealtimeNotifications(session?.user?.id, () => undefined, handleTask);

    useEffect(() => {
        async function load() {
            fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    setTasks(data['tasks']);
                    const users = data['users'].filter((u: User) => u.id !== session?.user.id)
                    setUsers(users);
                    setLoading(false)
                });
        }
        load();
    }, []);

    async function updateStatus(taskId: number | string, status: TaskStatus) {

        const res = await fetch(`/api/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        if (!res.ok) return;
        const [updated, subscriptions] = await res.json();

        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    }
    async function deleteTask(taskId: number | string) {
        const res = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: TaskStatus.DONE })
        });

        if (!res.ok) return;
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }

    return (
        <>
            {loading ? (
                <div className="flex content-center flex-wrap justify-center items-center absolute " style={{
                    height: "calc(100vh - 200px)",
                    width: "100%"
                }}>
                    <NeonSpinnerPro size={100} />
                </div>

            ) :
                <div className="rounded-2xl border border-slate-800 bg-slate-900">
                    {/* FORM */}
                    <TaskCreator users={users} />
                    {/* TASK TABLE */}
                    <TaskTable tasks={tasks} onDelete={deleteTask} updateStatus={updateStatus} />
                </div>
            }

        </>);
}

