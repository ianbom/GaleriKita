import { Head } from '@inertiajs/react';
import { SettingsAccount } from '@/admin/features/settings/account';
import { AdminSettingsLayout } from '@/admin/components/settings-layout';

export default function SettingsAccountPage() {
    return (
        <>
            <Head title="account" />
            <AdminSettingsLayout>
                <SettingsAccount />
            </AdminSettingsLayout>
        </>
    );
}
