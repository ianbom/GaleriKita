import { AdminHeader } from '@/admin/components/admin-header';
import { AdminSidebar } from '@/admin/components/admin-sidebar';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppShell>
            <a
                href="#admin-content"
                className="sr-only z-50 rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only focus:absolute"
            >
                Skip to main content
            </a>
            <AdminSidebar />
            <AppContent
                id="admin-content"
                tabIndex={-1}
                className="@container/content min-w-0 overflow-x-clip has-data-[layout=fixed]:h-[calc(100svh-1rem)]"
            >
                <AdminHeader breadcrumbs={breadcrumbs} />
                <div className="shrink-0 border-b px-4 py-2 text-xs text-muted-foreground">
                    Template demo. Sample data only; changes reset after reload.
                    Account menu opens your real Laravel settings.
                </div>
                {children}
            </AppContent>
        </AppShell>
    );
}
