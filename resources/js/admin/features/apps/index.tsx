import { toast } from 'sonner';
import { type ChangeEvent, useState } from 'react';
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Main } from '@/admin/components/layout/main';
import { apps } from './data/apps';
type AppType = 'all' | 'connected' | 'notConnected';
const appText = new Map<AppType, string>([
    ['all', 'All Apps'],
    ['connected', 'Connected'],
    ['notConnected', 'Not Connected'],
]);
export function Apps() {
    const [appRows, setAppRows] = useState(apps);
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');
    const [appType, setAppType] = useState<AppType>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredApps = [...appRows]
        .sort((a, b) =>
            sort === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name),
        )
        .filter((app) =>
            appType === 'connected'
                ? app.connected
                : appType === 'notConnected'
                  ? !app.connected
                  : true,
        )
        .filter((app) =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleTypeChange = (value: AppType) => {
        setAppType(value);
    };
    const handleSortChange = (sort: 'asc' | 'desc') => {
        setSort(sort);
    };
    return (
        <>
            <Main fixed>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        App Integrations
                    </h1>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your apps for the integration!
                    </p>
                </div>
                <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
                    <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                        <Input
                            aria-label="Filter apps"
                            placeholder="Filter apps..."
                            className="h-9 w-40 lg:w-62.5"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Select
                            value={appType}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger
                                aria-label="Connection status"
                                className="w-36"
                            >
                                <SelectValue>
                                    {appText.get(appType)}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Apps</SelectItem>
                                <SelectItem value="connected">
                                    Connected
                                </SelectItem>
                                <SelectItem value="notConnected">
                                    Not Connected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Select value={sort} onValueChange={handleSortChange}>
                        <SelectTrigger aria-label="Sort apps" className="w-16">
                            <SelectValue>
                                <SlidersHorizontal size={18} />
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="asc">
                                <div className="flex items-center gap-4">
                                    <ArrowUpAZ size={16} />
                                    <span>Ascending</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="desc">
                                <div className="flex items-center gap-4">
                                    <ArrowDownAZ size={16} />
                                    <span>Descending</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator className="shadow-sm" />
                <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
                    {filteredApps.map((app) => (
                        <li
                            key={app.name}
                            className="rounded-lg border p-4 hover:shadow-md"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <div
                                    className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                                >
                                    {app.logo}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setAppRows((rows) =>
                                            rows.map((row) =>
                                                row.name === app.name
                                                    ? {
                                                          ...row,
                                                          connected:
                                                              !row.connected,
                                                      }
                                                    : row,
                                            ),
                                        );
                                        toast.info(
                                            'Demo connection changed locally. No integration request was sent.',
                                        );
                                    }}
                                    className={
                                        app.connected
                                            ? 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
                                            : ''
                                    }
                                >
                                    {app.connected ? 'Connected' : 'Connect'}
                                </Button>
                            </div>
                            <div>
                                <h2 className="mb-1 font-semibold">
                                    {app.name}
                                </h2>
                                <p className="line-clamp-2 text-muted-foreground">
                                    {app.desc}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Main>
        </>
    );
}
