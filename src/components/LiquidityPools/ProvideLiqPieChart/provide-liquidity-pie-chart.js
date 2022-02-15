import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import React from "react";
import styled from "styled-components";

const ProvideLiquidityPieChart = () => {
  const data = [
    { name: "", value: 400 },
    { name: "", value: 400 },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line no-unused-vars
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        className="chart-block__text"
        x={"50%"}
        y={"50%"}
        fontSize={"1.042vw"}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`‎ ‎ ‏ ‏ ${(percent * 100).toFixed(0)}% ‏ ‏ ‎ ‎`}
      </text>
    );
  };

  const ChartWrapper = styled.div`  
    transform: matrix(-1, 0, 0, 1, 0, 0);
    height: 14vw;
    width: 14vw;
  `;

  return (
    <>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#40BA93" />
                <stop offset="1" stopColor="rgba(64, 186, 147, 0.25)" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="colorUvSecond" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#358269" />
                <stop offset="1" stopColor="rgba(53, 130, 105, 0.25)" />
              </linearGradient>
            </defs>
            <Pie
              startAngle={90}
              endAngle={450}
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "url(#colorUv)" : "url(#colorUvSecond)"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </>
  );
};

export default React.memo(ProvideLiquidityPieChart);
