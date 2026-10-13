import { UsersActionDialog } from './users-action-dialog';
import { UsersDeleteDialog } from './users-delete-dialog';
import { UsersInviteDialog } from './users-invite-dialog';
import { useUsers } from './users-provider';
export function UsersDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useUsers();
    return (
        <>
            <UsersActionDialog
                key="user-add"
                open={open === 'add'}
                onOpenChange={() => setOpen(null)}
            />

            <UsersInviteDialog
                key="user-invite"
                open={open === 'invite'}
                onOpenChange={() => setOpen(null)}
            />

            {currentRow && (
                <>
                    <UsersActionDialog
                        key={`user-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen(null);
                            setCurrentRow(null);
                        }}
                        currentRow={currentRow}
                    />

                    <UsersDeleteDialog
                        key={`user-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen(null);
                            setCurrentRow(null);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    );
}
