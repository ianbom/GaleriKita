import { toast } from 'sonner';

export function showSubmittedData(
    data: unknown,
    title = 'Demo values updated locally.',
) {
    const redacted = JSON.stringify(
        data,
        (key, value: unknown) =>
            /password|otp|token|secret/i.test(key) ? '[redacted]' : value,
        2,
    );
    toast.message(title, {
        description: (
            <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-background p-4 text-xs">
                <code>{redacted}</code>
            </pre>
        ),
    });
}
