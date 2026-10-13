import { showSubmittedData } from '@/admin/lib/show-submitted-data';
import { ConfirmDialog } from '@/admin/components/confirm-dialog';
import { TasksImportDialog } from './tasks-import-dialog';
import { TasksMutateDrawer } from './tasks-mutate-drawer';
import { useTasks } from './tasks-provider';
export function TasksDialogs() {
    const { open, setOpen, currentRow, setCurrentRow, setRows } = useTasks();
    return (
        <>
            <TasksMutateDrawer
                key="task-create"
                open={open === 'create'}
                onOpenChange={() => setOpen(null)}
            />

            <TasksImportDialog
                key="tasks-import"
                open={open === 'import'}
                onOpenChange={() => setOpen(null)}
            />

            {currentRow && (
                <>
                    <TasksMutateDrawer
                        key={`task-update-${currentRow.id}`}
                        open={open === 'update'}
                        onOpenChange={() => {
                            setOpen(null);
                            setCurrentRow(null);
                        }}
                        currentRow={currentRow}
                    />

                    <ConfirmDialog
                        key="task-delete"
                        destructive
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen(null);
                            setCurrentRow(null);
                        }}
                        handleConfirm={() => {
                            setOpen(null);
                            setCurrentRow(null);
                            setRows((rows) =>
                                rows.filter((row) => row.id !== currentRow.id),
                            );
                            showSubmittedData(
                                currentRow,
                                'Demo task deleted locally.',
                            );
                        }}
                        className="max-w-md"
                        title={`Delete this task: ${currentRow.id} ?`}
                        desc={
                            <>
                                You are about to delete a task with the ID{' '}
                                <strong>{currentRow.id}</strong>. <br />
                                This action cannot be undone.
                            </>
                        }
                        confirmText="Delete"
                    />
                </>
            )}
        </>
    );
}
