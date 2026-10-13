import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
const data = [
    {
        name: 'Mon',
        clicks: 680,
        uniques: 430,
    },
    {
        name: 'Tue',
        clicks: 540,
        uniques: 390,
    },
    {
        name: 'Wed',
        clicks: 720,
        uniques: 540,
    },
    {
        name: 'Thu',
        clicks: 610,
        uniques: 460,
    },
    {
        name: 'Fri',
        clicks: 830,
        uniques: 650,
    },
    {
        name: 'Sat',
        clicks: 470,
        uniques: 350,
    },
    {
        name: 'Sun',
        clicks: 590,
        uniques: 410,
    },
];
export function AnalyticsChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="currentColor"
                    className="text-primary"
                    fill="currentColor"
                    fillOpacity={0.15}
                />
                <Area
                    type="monotone"
                    dataKey="uniques"
                    stroke="currentColor"
                    className="text-muted-foreground"
                    fill="currentColor"
                    fillOpacity={0.1}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
