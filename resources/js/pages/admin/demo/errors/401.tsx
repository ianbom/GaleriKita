import { Head } from '@inertiajs/react';
import { UnauthorisedError } from '@/admin/features/errors/unauthorized-error';

export default function UnauthorisedErrorPage() {
    return (
        <>
            <Head title="401" />
            <UnauthorisedError />
        </>
    );
}
