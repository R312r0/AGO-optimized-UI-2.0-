import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ProvideLiquidityPieChart = ({token1, token2}) => {

    const data = [
        {name: token1, value: 400},
        {name: token2, value: 400},
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x > cx ? x - 20 : x + 20} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='chart-block'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={100} height={100}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#40BA93"/>
                            <stop offset="1" stopColor="rgba(64, 186, 147, 0.25)"/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="colorUvSecond" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#358269"/>
                            <stop offset="1" stopColor="rgba(53, 130, 105, 0.25)"/>
                        </linearGradient>
                    </defs>
                    <Pie
                        startAngle={90}
                        endAngle={450}
                        data={data}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        stroke="none"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`}
                                  fill={index === 0 ? "url(#colorUv)" : "url(#colorUvSecond)"}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}