"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { TaskStatus } from "@prisma/client";

/* 1. Types */

export type Task = {
    id: string | number;
    title: string;
    description: string;
    assignedToId: string;
    dueDate: string;
    status: TaskStatus;
};
type TaskContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>//(tasks: Task[]) => void;
};

/* 2. Context */
const TaskContext = createContext<TaskContextType | undefined>(undefined);

/* 3. Provider */
export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

/* 4. Custom hook */
export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used inside TaskProvider");
    }

    return context;
}