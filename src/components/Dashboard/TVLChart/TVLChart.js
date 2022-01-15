import React, { useContext, useEffect, useRef, useState } from 'react';
import { AreaChart, Area, LineChart, Line, Tooltip, XAxis, ResponsiveContainer, Bar } from 'recharts';
import { formattedNum } from '../../../utils/helpers';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Spin } from "antd";
import { LOADER_INDICATOR_LOCAL } from "../../../constants";
import { TVLChartWrapper } from './styles';
import { useThemeContext } from '../../Layout/layout';

export const TVLChart = ({ data }) => {
  const { theme } = useThemeContext();
  const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
  const [chartValue, setChartValue] = useState({ time: undefined, value: undefined });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartValue({
        time: data[data.length - 1].date,
        value: data[data.length - 1].uv
      })
      setLoading(false);
    }
  }, [data])

  return (
    <>
      <TVLChartWrapper light={theme === "light"} mobile={isMobileScreen} >
        {!loading ?
          <>
            <div className={'tvl-info'}>
              {!isMobileScreen ? <p>Total Value Locked</p> : null}
              <h1>${formattedNum(chartValue.value)}</h1>
              <p>{chartValue.time}</p>
            </div>
            <div className={'tvl-chart'}>
              <ResponsiveContainer className='responsive-container-chart' width={"100%"} height={"100%"}>
                {isMobileScreen ?
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#129a74" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#129a74" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      contentStyle={{ padding: '10px 0' }}
                      dy={10}
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      stroke={theme === "light" ? "black" : "white"}
                    />
                    <Area type="monotone" strokeWidth={1} dataKey="uv" stroke="#40BA93" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                  :
                  <LineChart

                    data={data}
                    onMouseLeave={() => setChartValue({
                      time: data[data.length - 1].date,
                      value: data[data.length - 1].uv
                    })}

                  >
                    <defs>
                      <filter id="shadow" height="200%">
                        <feDropShadow dx="0" dy="10" stdDeviation="10" />
                      </filter>
                    </defs>
                    <Line
                      filter="url(#shadow)"
                      type="monotone"
                      dataKey="uv"
                      stroke="#40BA93"
                      strokeWidth={"0.25vw"}
                      dot={false}
                      activeDot={true}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 20,
                      }}
                    />
                    <Tooltip
                      contentStyle={{ display: 'none' }}
                      formatter={(value, name, props) => {
                        const { payload: { date, uv } } = props;
                        if (chartValue.value !== uv) {
                          setChartValue({ time: date, value: uv })
                        }
                      }}

                    />
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: "14px",
                        fontWeight: 300,
                        lineHeight: '21px'
                      }}
                      stroke={theme === "light" ? "black" : "white"}
                      dy={5}
                      margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                      padding={20}
                    />
                  </LineChart>
                }
              </ResponsiveContainer>
            </div>
          </>
          :
          <Spin indicator={LOADER_INDICATOR_LOCAL} />
        }

      </TVLChartWrapper>
    </>
  )

}
