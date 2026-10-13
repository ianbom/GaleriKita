import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const tabs = ['Profile', 'Account', 'Appearance', 'Notifications', 'Display'];

export function AdminSettingsLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();
    return (
        <div className="flex min-h-0 flex-1 flex-col p-4 py-6">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Settings
            </h1>
            <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
            </p>
            <Separator className="my-6" />
            <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:gap-12">
                <nav
                    aria-label="Demo settings"
                    className="flex flex-wrap gap-1 lg:w-48 lg:shrink-0 lg:flex-col"
                >
                    {tabs.map((tab) => {
                        const href = `/admin/settings/${tab.toLowerCase()}`;
                        return (
                            <Link
                                key={tab}
                                href={href}
                                aria-current={url === href ? 'page' : undefined}
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring',
                                    url === href && 'bg-secondary',
                                )}
                            >
                                {tab}
                            </Link>
                        );
                    })}
                </nav>
                <div className="min-w-0 flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
