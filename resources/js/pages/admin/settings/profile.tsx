import { Head } from '@inertiajs/react';
import { SettingsProfile } from '@/admin/features/settings/profile';
import { AdminSettingsLayout } from '@/admin/components/settings-layout';

export default function SettingsProfilePage() {
    return (
        <>
            <Head title="profile" />
            <AdminSettingsLayout>
                <SettingsProfile />
            </AdminSettingsLayout>
        </>
    );
}
