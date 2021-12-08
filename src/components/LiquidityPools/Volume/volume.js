import React, {useState, useRef, useContext} from 'react';
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';
import {CustomToolTip} from "../../ChartCustomTooltip/chart-custom-tooltip";

export const Volume = ({data}) => {

    const {theme} = useSystemContext();
    const block = useRef(null)

    console.log(data);

    const CustomBar = ({
        x,
        y,
        width,
        height,
        fill,
      }) => {
        return (
          <g>
            <rect x={x} y={y} fill={fill} width="0.521vw" height={height} rx="0.25vw" />
          </g>
        )
    }

    return (
        <div className="vol-chart">
            <ResponsiveContainer className="vol-chart" width={"100%"} height={"100%"}>
                <BarChart
                    margin="0.260vw 1.563vw 0.052vw 1.042vw"
                    data={data}
                    >
                    <defs>
                        <linearGradient
                        id="colorUv"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="100%"
                        gradientUnits="userSpaceOnUse"
                        >
                        <stop offset="0" stopColor="#40BA93" />
                        <stop offset="1" stopColor="rgba(64, 186, 147, 0)" />
                        </linearGradient>
                        <linearGradient id="colorUvLightTheme" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#40BA93"/>
                            <stop offset="1" stopColor="rgba(64, 186, 147, 0.72)"/>
                        </linearGradient>
                        <linearGradient id="colorUvSecondLightTheme" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#40BA93"/>
                            <stop offset="1" stopColor="#114D3A"/>
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
                        <stop offset="0" stopColor="#40BA93" />
                        <stop offset="1" stopColor="rgba(64, 186, 147, 0.72)" />
                        </linearGradient>
                    </defs>
                <CartesianGrid stroke={theme === "light" ? "white" : "#3A3C45"}   strokeDasharray="7 7"/>
                <Bar
                    dataKey="value"
                    radius={[10, 10, 10, 10]}
                    // shape={<CustomBar/>} // TODO: when we will have more data then return this staff back
                >
                    {data.map((entry, _ind )=> {
                        return <Cell fill={_ind % 2 === 0 || _ind % 3 === 0 ? 'url(#colorUvLightTheme)' : 'url(#colorUvSecondLightTheme)' }/>
                    })}
                </Bar>

                <Tooltip
                    content={CustomToolTip}
                    // contentStyle={{ display: 'none' }}
                    cursor={{ fill: "rgba(255, 255, 255, 0.15)" }}
                />
                <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    stroke={theme === "light" ? "black" : "white"}
                />
                <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    stroke={theme === "light" ? "black" : "white"}
                />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}