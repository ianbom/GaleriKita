import { Head } from '@inertiajs/react';
import { Tasks } from '@/admin/features/tasks';

export default function TasksPage() {
    return (
        <>
            <Head title="Tasks" />
            <Tasks />
        </>
    );
}
