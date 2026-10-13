import { Head } from '@inertiajs/react';
import { GeneralError } from '@/admin/features/errors/general-error';

export default function GeneralErrorPage() {
    return (
        <>
            <Head title="500" />
            <GeneralError />
        </>
    );
}
