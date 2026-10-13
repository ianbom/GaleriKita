import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';

export function SettingsAppearance() {
    const { open, setOpen } = useSidebar();
    const [expanded, setExpanded] = useState(open);
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Appearance</h2>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance of the app. GaleriKita uses a fixed
                    dark theme.
                </p>
            </div>
            <Separator />
            <form
                className="space-y-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    setOpen(expanded);
                    toast.info(
                        'Demo sidebar preference applied. Theme and font remain fixed.',
                    );
                }}
            >
                <div className="space-y-2">
                    <Label htmlFor="admin-theme">Theme</Label>
                    <Input
                        id="admin-theme"
                        value="Dark / GaleriKita"
                        readOnly
                    />
                    <p className="text-sm text-muted-foreground">
                        Light mode and RTL are not available.
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="admin-font">Font</Label>
                    <Input id="admin-font" value="Plus Jakarta Sans" readOnly />
                </div>
                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={expanded}
                        onChange={(event) => setExpanded(event.target.checked)}
                        className="size-4 accent-primary"
                    />
                    Expand desktop sidebar
                </label>
                <Button type="submit">Update preferences</Button>
            </form>
        </div>
    );
}
