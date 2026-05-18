import { Task, TaskStatus } from "@prisma/client";

export function statusClass(status: Task["status"]) {
    switch (status) {
        case TaskStatus.TODO:
            return "bg-blue-500/15 text-blue-300 border-blue-500/20 px-8";
        case TaskStatus.IN_PROGRESS:
            return "bg-amber-500/15 text-amber-300 border-amber-500/20 px-3";
        case TaskStatus.DONE:
            return "bg-green-500/15 text-green-300 border-green-500/20 px-8";

    }
}

export function StatusBadge({ status }: { status: TaskStatus }) {

    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClass(status)}`}
        >
            {status}
        </span>
    );
}