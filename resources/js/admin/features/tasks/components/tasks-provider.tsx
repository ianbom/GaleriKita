import React, { useState } from 'react';
import useDialogState from '@/admin/hooks/use-dialog-state';
import { type Task } from '../data/schema';
import { tasks as initialRows } from '../data/tasks';
type TasksDialogType = 'create' | 'update' | 'delete' | 'import';
type TasksContextType = {
    rows: Task[];
    setRows: React.Dispatch<React.SetStateAction<Task[]>>;
    open: TasksDialogType | null;
    setOpen: (str: TasksDialogType | null) => void;
    currentRow: Task | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
};
const TasksContext = React.createContext<TasksContextType | null>(null);
export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useDialogState<TasksDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Task | null>(null);
    return (
        <TasksContext
            value={{ rows, setRows, open, setOpen, currentRow, setCurrentRow }}
        >
            {children}
        </TasksContext>
    );
}
export const useTasks = () => {
    const tasksContext = React.useContext(TasksContext);
    if (!tasksContext) {
        throw new Error('useTasks has to be used within <TasksContext>');
    }
    return tasksContext;
};
