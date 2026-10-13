import React, { useState } from 'react';
import useDialogState from '@/admin/hooks/use-dialog-state';
import { type User } from '../data/schema';
import { users as initialRows } from '../data/users';
type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete';
type UsersContextType = {
    rows: User[];
    setRows: React.Dispatch<React.SetStateAction<User[]>>;
    open: UsersDialogType | null;
    setOpen: (str: UsersDialogType | null) => void;
    currentRow: User | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>;
};
const UsersContext = React.createContext<UsersContextType | null>(null);
export function UsersProvider({ children }: { children: React.ReactNode }) {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useDialogState<UsersDialogType>(null);
    const [currentRow, setCurrentRow] = useState<User | null>(null);
    return (
        <UsersContext
            value={{ rows, setRows, open, setOpen, currentRow, setCurrentRow }}
        >
            {children}
        </UsersContext>
    );
}
export const useUsers = () => {
    const usersContext = React.useContext(UsersContext);
    if (!usersContext) {
        throw new Error('useUsers has to be used within <UsersContext>');
    }
    return usersContext;
};
