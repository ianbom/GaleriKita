import { Head } from '@inertiajs/react';
import { MaintenanceError } from '@/admin/features/errors/maintenance-error';

export default function MaintenanceErrorPage() {
    return (
        <>
            <Head title="503" />
            <MaintenanceError />
        </>
    );
}
