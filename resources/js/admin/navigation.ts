import {
    Bell,
    Bug,
    HelpCircle,
    LayoutDashboard,
    ListTodo,
    MessagesSquare,
    Monitor,
    Package,
    Palette,
    Settings,
    ShieldCheck,
    UserCog,
    Users,
    Wrench,
} from 'lucide-react';
import type { NavGroup } from './components/layout/types';

export const navGroups: NavGroup[] = [
    {
        title: 'General',
        items: [
            { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
            { title: 'Tasks', url: '/admin/tasks', icon: ListTodo },
            { title: 'Apps', url: '/admin/apps', icon: Package },
            {
                title: 'Chats',
                url: '/admin/chats',
                icon: MessagesSquare,
                badge: '3',
            },
            { title: 'Users', url: '/admin/users', icon: Users },
        ],
    },
    {
        title: 'Pages',
        items: [
            {
                title: 'Auth demos',
                icon: ShieldCheck,
                items: [
                    { title: 'Sign In', url: '/admin/demo/auth/sign-in' },
                    {
                        title: 'Sign In (2 Col)',
                        url: '/admin/demo/auth/sign-in-2',
                    },
                    { title: 'Sign Up', url: '/admin/demo/auth/sign-up' },
                    {
                        title: 'Forgot Password',
                        url: '/admin/demo/auth/forgot-password',
                    },
                    { title: 'OTP', url: '/admin/demo/auth/otp' },
                ],
            },
            {
                title: 'Error demos',
                icon: Bug,
                items: [
                    { title: 'Unauthorized', url: '/admin/demo/errors/401' },
                    { title: 'Forbidden', url: '/admin/demo/errors/403' },
                    { title: 'Not Found', url: '/admin/demo/errors/404' },
                    {
                        title: 'Internal Server Error',
                        url: '/admin/demo/errors/500',
                    },
                    { title: 'Maintenance', url: '/admin/demo/errors/503' },
                ],
            },
        ],
    },
    {
        title: 'Other',
        items: [
            {
                title: 'Settings demos',
                icon: Settings,
                items: [
                    {
                        title: 'Profile',
                        url: '/admin/settings/profile',
                        icon: UserCog,
                    },
                    {
                        title: 'Account',
                        url: '/admin/settings/account',
                        icon: Wrench,
                    },
                    {
                        title: 'Appearance',
                        url: '/admin/settings/appearance',
                        icon: Palette,
                    },
                    {
                        title: 'Notifications',
                        url: '/admin/settings/notifications',
                        icon: Bell,
                    },
                    {
                        title: 'Display',
                        url: '/admin/settings/display',
                        icon: Monitor,
                    },
                ],
            },
            {
                title: 'Help Center',
                url: '/admin/help-center',
                icon: HelpCircle,
            },
        ],
    },
];

export const adminPages = navGroups.flatMap((group) =>
    group.items.flatMap((item) => item.items ?? [item]),
);
