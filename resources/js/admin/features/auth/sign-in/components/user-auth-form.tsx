import { Link } from '@inertiajs/react';
import { cn } from '@/admin/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { IconFacebook, IconGithub } from '@/admin/assets/brand-icons';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/admin/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/admin/components/password-input';
const formSchema = z.object({
    email: z.email({
        error: (iss) =>
            iss.input === '' ? 'Please enter your email.' : undefined,
    }),
    password: z
        .string()
        .min(1, 'Please enter your password.')
        .min(7, 'Password must be at least 7 characters long.'),
});
interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string;
}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const isLoading = false;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    function onSubmit() {
        toast.info('Demo only. No authentication request was sent.');
        form.reset();
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('grid gap-3', className)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <Link
                                href="/admin/demo/auth/forgot-password"
                                className="absolute inset-e-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75"
                            >
                                Forgot password?
                            </Link>
                        </FormItem>
                    )}
                />
                <Button className="mt-2" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <LogIn />
                    )}
                    Sign in
                </Button>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        type="button"
                        disabled
                        title="Unavailable in demo"
                    >
                        <IconGithub className="h-4 w-4" /> GitHub
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        disabled
                        title="Unavailable in demo"
                    >
                        <IconFacebook className="h-4 w-4" /> Facebook
                    </Button>
                </div>
            </form>
        </Form>
    );
}
