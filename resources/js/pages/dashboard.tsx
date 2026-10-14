import { Head, Link } from '@inertiajs/react';
import { Dashboard as AdminDashboard } from '@/admin/features/dashboard';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex justify-end px-4 pt-4 sm:px-6">
                <Button asChild className="min-h-11">
                    <Link href={home({ query: { 'create-event': 1 } })}>
                        Buat Event Baru
                    </Link>
                </Button>
            </div>
            <AdminDashboard />
        </>
    );
}
