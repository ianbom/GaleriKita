import { Head } from '@inertiajs/react';
import { SignIn } from '@/admin/features/auth/sign-in';

export default function SignInPage() {
    return (
        <>
            <Head title="sign in" />
            <SignIn />
        </>
    );
}
