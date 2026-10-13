import { Head } from '@inertiajs/react';
import { SettingsNotifications } from '@/admin/features/settings/notifications';
import { AdminSettingsLayout } from '@/admin/components/settings-layout';

export default function SettingsNotificationsPage() {
    return (
        <>
            <Head title="notifications" />
            <AdminSettingsLayout>
                <SettingsNotifications />
            </AdminSettingsLayout>
        </>
    );
}
