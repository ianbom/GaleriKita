import { Head } from '@inertiajs/react';
import { SettingsAppearance } from '@/admin/features/settings/appearance';
import { AdminSettingsLayout } from '@/admin/components/settings-layout';

export default function SettingsAppearancePage() {
    return (
        <>
            <Head title="appearance" />
            <AdminSettingsLayout>
                <SettingsAppearance />
            </AdminSettingsLayout>
        </>
    );
}
