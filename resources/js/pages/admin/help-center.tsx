import { Head } from '@inertiajs/react';
import { Construction } from 'lucide-react';

export default function HelpCenter() {
    return (
        <>
            <Head title="Help Center" />
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
                <Construction
                    className="size-12 text-primary"
                    aria-hidden="true"
                />
                <h1 className="text-2xl font-bold">Coming Soon!</h1>
                <p className="max-w-md text-muted-foreground">
                    This page has not been created yet. Please stay tuned!
                </p>
                <p className="text-xs text-muted-foreground">
                    Help Center placeholder from the template.
                </p>
            </div>
        </>
    );
}
