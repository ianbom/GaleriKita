import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function DemoLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-svh">
            <aside
                aria-label="Demo notice"
                className="absolute inset-x-0 top-0 z-50 flex flex-wrap items-center justify-between gap-2 border-b bg-background px-4 py-3 text-xs text-muted-foreground"
            >
                <span>
                    GaleriKita / Template preview. No real authentication or
                    data changes.
                </span>
                <Link
                    href="/dashboard"
                    className="font-medium text-primary underline underline-offset-4"
                >
                    Back to dashboard
                </Link>
            </aside>
            {children}
        </div>
    );
}
