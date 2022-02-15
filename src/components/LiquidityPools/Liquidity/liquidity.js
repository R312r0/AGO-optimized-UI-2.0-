import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useContext } from "react";

import { CustomToolTip } from "../../ChartCustomTooltip/chart-custom-tooltip";
import styled from "styled-components";
import { useSystemContext } from "../../../systemProvider";
import { useThemeContext } from "../../Layout/layout";

export const Liquidity = ({ data }) => {
  const { theme } = useThemeContext();

  const LiquidityChartWrapper = styled.div`
    margin-top: 3.4vw;
    /* padding: 1vw; */
    /* background-color: rosybrown; */
    font-size: 0.521vw;
    width: 37.563vw;
    height: 10.104vw;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <LiquidityChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid
            strokeDasharray="0.156vw 0.156vw"
            strokeWidth={"0.052vw"}
            stroke={theme === "light" ? "white" : "#3A3C45"}
          />
          <XAxis
            width={"100%"}
            dataKey="time"
            axisLine={false}
            tickLine={false}
            stroke={theme === "light" ? "black" : "white"}
            fontSize={"0.521vw"}
          />
          <Tooltip content={CustomToolTip} />
          <Area
            type="monotone"
            strokeWidth={"0.104vw"}
            dataKey="value"
            stroke="#40BA93"
            fill="rgba(64, 186, 147, 0.2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </LiquidityChartWrapper>
  );
};
