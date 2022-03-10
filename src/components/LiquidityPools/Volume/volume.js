import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useRef } from "react";

import { CustomToolTip } from "../../ChartCustomTooltip/chart-custom-tooltip";
import styled from "styled-components";
import { useThemeContext } from "../../Layout/layout";

const VolumeChartWrapper = styled.div`
margin-top: 2.292vw;
padding: 1vw;
font-size: 0.521vw;
width: 47.833vw;
height: 12.521vw;
display: flex;
align-items: center;
justify-content: center;
`;

export const Volume = ({ data, color }) => {
  const { theme } = useThemeContext();
  const block = useRef(null);

  const CustomBar = ({ x, y, width, height, fill }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          fill={fill}
          width="0.521vw"
          height={height}
          rx="0.25vw"
        />
      </g>
    );
  };

  return (
    <VolumeChartWrapper>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={data}>
          <defs>
            <linearGradient
              id="colorUv"
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor={theme === "light" ? "#E0E0E0" : "#40BA93"}
              />
              <stop offset="1" stopColor="rgba(64, 186, 147, 0)" />
            </linearGradient>
            <linearGradient id="colorUvLightTheme" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0"
                stopColor={theme === "light" ? "#E0E0E0" : "#40BA93"}
              />
              <stop
                offset="1"
                stopColor={
                  theme === "light" ? "#fff" : "rgba(64, 186, 147, 0.72)"
                }
              />
            </linearGradient>
            <linearGradient
              id="colorUvSecondLightTheme"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0"
                stopColor={theme === "light" ? "#E0E0E0" : "#40BA93"}
              />
              <stop
                offset="1"
                stopColor={theme === "light" ? "#fff" : "#114D3A"}
              />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="colorUvSecond"
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor={theme === "light" ? (color !== undefined ? "#fff" : "#828282") : "#40BA93"}
              />
              <stop offset="1" stopColor="rgba(64, 186, 147, 0.72)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={theme === "light" ? "#66D6B2" : "#3A3C45"} />
          <Bar
            dataKey="value"
            radius={20}

            // shape={<CustomBar/>} // TODO: when we will have more data then return this staff back
          >
            {data.map((entry, _ind) => {
              return (
                <Cell
                  fill={
                    _ind % 2 === 0 || _ind % 3 === 0
                      ? "url(#colorUvLightTheme)"
                      : "url(#colorUvSecondLightTheme)"
                  }
                />
              );
            })}
          </Bar>

          <Tooltip
            content={CustomToolTip}
            cursor={{ fill: "rgba(255, 255, 255, 0.15)" }}
          />
          <XAxis
            // padding={{ left: 100 }}
            dataKey="time"
            axisLine={false}
            tickLine={false}
            stroke={theme === "light" ? (color ? "#fff" : "#828282") : "#fff"}
          />
          <YAxis
            // padding={{ bottom: 100 }}
            dataKey="value"
            axisLine={false}
            tickLine={false}
            stroke={theme === "light" ? (color ? "#fff" : "#828282") : "#fff"}
          />
        </BarChart>
      </ResponsiveContainer>
    </VolumeChartWrapper>
  );
};
