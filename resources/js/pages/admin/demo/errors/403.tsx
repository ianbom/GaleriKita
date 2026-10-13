import { Head } from '@inertiajs/react';
import { ForbiddenError } from '@/admin/features/errors/forbidden';

export default function ForbiddenErrorPage() {
    return (
        <>
            <Head title="403" />
            <ForbiddenError />
        </>
    );
}
