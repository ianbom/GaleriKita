import { router } from '@inertiajs/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { cn } from '@/admin/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/admin/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from '@/components/ui/input-otp';
const formSchema = z.object({
    otp: z
        .string()
        .min(6, 'Please enter the 6-digit code.')
        .max(6, 'Please enter the 6-digit code.'),
});
type OtpFormProps = React.HTMLAttributes<HTMLFormElement>;
export function OtpForm({ className, ...props }: OtpFormProps) {
    const isLoading = false;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { otp: '' },
    });
    const otp = form.watch('otp');
    function onSubmit() {
        form.reset();
        toast.info('Demo preview complete. No authentication was performed.');
        router.visit('/dashboard');
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('grid gap-2', className)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">
                                One-Time Password
                            </FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    {...field}
                                    containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="mt-2" disabled={otp.length < 6 || isLoading}>
                    Verify
                </Button>
            </form>
        </Form>
    );
}
