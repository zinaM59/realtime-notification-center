import { baseButtonStyle } from "../ButtonStyle";
import { Task, TaskStatus } from "./TaskList"
import { statusClass } from "../StatusBage";

type Props = {
    onDelete: (id: number | string) => void;
    tasks: Task[]
    updateStatus: (id: number | string, status: Task["status"]) => void;
};

export default function TaskTable({ tasks, onDelete, updateStatus }: Props) {

    return (<div className="overflow-x-auto">
        <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
                <tr className="border-b border-slate-800">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Due</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-800">
                        <td className="px-6 py-4 text-white">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs text-slate-400">
                                {task.description}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-white">
                            <div className="font-medium">{task.description}</div>
                            <div className="text-xs text-slate-400">
                                {task.description}
                            </div>
                        </td>

                        <td className="px-6 py-4 text-slate-400">
                            {task.dueDate}
                        </td>

                        <td className="px-6 py-4">
                            <span className={`rounded-full  py-1 text-xs ${statusClass(task.status)}`}>
                                {task.status}
                            </span>
                        </td>

                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value as Task["status"])}
                                    className={` ${baseButtonStyle}`}>
                                    {Object.values(TaskStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}

                                </select>

                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="rounded-xl border border-slate-700 text-red-400 py-3 px-3 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}


