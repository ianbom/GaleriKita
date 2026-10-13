import { Head } from '@inertiajs/react';
import { NotFoundError } from '@/admin/features/errors/not-found-error';

export default function NotFoundErrorPage() {
    return (
        <>
            <Head title="404" />
            <NotFoundError />
        </>
    );
}
