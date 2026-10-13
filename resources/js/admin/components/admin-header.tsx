import { usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BreadcrumbItem } from '@/types';
import { adminPages } from '../navigation';
import { AdminSearch } from './admin-search';
import { Header } from './layout/header';

export function AdminHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    const page = usePage();
    const { auth } = page.props;
    const { url } = page;
    const activePage = adminPages.find(
        (page) => page.url === url.split('?')[0],
    );
    const trail = breadcrumbs.length
        ? breadcrumbs
        : [{ title: activePage?.title ?? 'Settings', href: url }];
    return (
        <Header fixed className="shrink-0 border-b bg-background">
            <div className="hidden min-w-0 lg:block">
                <Breadcrumbs breadcrumbs={trail} />
            </div>
            <div className="ml-auto flex min-w-0 items-center gap-3">
                <AdminSearch />
                <Badge variant="secondary">Demo</Badge>
                {auth.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                aria-label="Open account menu"
                                className="size-9 overflow-hidden rounded-full p-0 [&>div]:hidden"
                            >
                                <UserInfo user={auth.user} showEmail={false} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </Header>
    );
}
