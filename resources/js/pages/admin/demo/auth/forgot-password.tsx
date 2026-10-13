import { Head } from '@inertiajs/react';
import { ForgotPassword } from '@/admin/features/auth/forgot-password';

export default function ForgotPasswordPage() {
    return (
        <>
            <Head title="forgot password" />
            <ForgotPassword />
        </>
    );
}
