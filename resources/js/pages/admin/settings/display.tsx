import { Head } from '@inertiajs/react';
import { SettingsDisplay } from '@/admin/features/settings/display';
import { AdminSettingsLayout } from '@/admin/components/settings-layout';

export default function SettingsDisplayPage() {
    return (
        <>
            <Head title="display" />
            <AdminSettingsLayout>
                <SettingsDisplay />
            </AdminSettingsLayout>
        </>
    );
}
