import { Head } from '@inertiajs/react';
import { Chats } from '@/admin/features/chats';

export default function ChatsPage() {
    return (
        <>
            <Head title="Chats" />
            <Chats />
        </>
    );
}
