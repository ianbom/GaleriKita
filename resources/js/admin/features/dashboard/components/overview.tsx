import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
const data = [
    {
        name: 'Jan',
        total: 2400,
    },
    {
        name: 'Feb',
        total: 1398,
    },
    {
        name: 'Mar',
        total: 3800,
    },
    {
        name: 'Apr',
        total: 3908,
    },
    {
        name: 'May',
        total: 4800,
    },
    {
        name: 'Jun',
        total: 3500,
    },
    {
        name: 'Jul',
        total: 4200,
    },
    {
        name: 'Aug',
        total: 3100,
    },
    {
        name: 'Sep',
        total: 5200,
    },
    {
        name: 'Oct',
        total: 4500,
    },
    {
        name: 'Nov',
        total: 5600,
    },
    {
        name: 'Dec',
        total: 4900,
    },
];
export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    direction="ltr"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
