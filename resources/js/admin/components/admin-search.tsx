import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './ui/command';
import { adminPages } from '../navigation';

export function AdminSearch() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <>
            <Button
                variant="outline"
                aria-label="Search admin pages"
                onClick={() => setOpen(true)}
                className="gap-2 text-muted-foreground sm:w-56 sm:justify-start"
            >
                <Search className="size-4" />
                <span className="hidden sm:inline">Search pages...</span>
                <kbd className="ml-auto hidden text-xs sm:inline">Ctrl K</kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Search admin pages"
                description="Choose a page to open."
            >
                <CommandInput
                    aria-label="Search pages"
                    placeholder="Search pages..."
                />
                <CommandList>
                    <CommandEmpty>No pages found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {adminPages.map((page) => (
                            <CommandItem
                                key={page.url}
                                value={`${page.title} ${page.url}`}
                                onSelect={() => {
                                    setOpen(false);
                                    router.visit(page.url);
                                }}
                            >
                                {page.icon && <page.icon className="size-4" />}
                                <span>{page.title}</span>
                                <span className="ml-auto truncate text-xs text-muted-foreground">
                                    {page.url}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
