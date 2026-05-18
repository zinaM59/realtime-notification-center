"use client";

import { useState } from "react";

type UserOption = {
    id: string;
    name: string | null;
    email: string | null;
};

export default function TaskCreator({ users }: { users: UserOption[] }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedToId, setAssignedToId] = useState(users[0]?.id ?? "");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [dueDate, setDueDate] = useState("");

    async function createTask() {

        setMessage("");

        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, assignedToId, dueDate })
        })

        if (!res.ok) {
            setMessage("Could not create task.");
            return;
        }
        //       const data = await res.json();

        //revalidatePath("/admin");
        setTitle("");
        setDescription("");
        setDueDate("");
        setMessage("Task created.");
    } function selectAssignTo(value: any) {
        setAssignedToId(value)
    }
    return (
        <div className="border-b border-slate-800 p-6">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 cursor-pointer"
                >
                    + Add Task
                </button>
            ) : (
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                    <span className="text-sm text-amber-800">{'*'}</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    />
                    <div className="mt-3 w-full">
                        <span className="text-sm text-amber-800">{'*'}</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description..."
                            rows={3}
                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                        />
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div className="w-full flex flex-col">
                            <span className="text-sm text-amber-800">{'*'}</span>
                            <select
                                value={assignedToId}
                                onChange={(e) => selectAssignTo(e.target.value)}
                                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white w-full"
                            >
                                {users.map((user) =>
                                (
                                    <option key={user.id} value={user.id}>{user.name ?? user.email ?? user.id}</option>
                                )
                                )}
                            </select></div>
                        <div className="w-full flex flex-col">
                            <span className="text-sm text-amber-800">{'*'}</span>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white w-full"
                            />
                        </div></div>

                    <div className="mt-3 flex gap-4 px-3">
                        <button
                            onClick={createTask}
                            className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 hover:cursor-pointer"
                        >
                            Save Task
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-800 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <div className="mt-3 flex gap-3">{message ? <span className="text-sm text-slate-200">{message}</span> : null}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
