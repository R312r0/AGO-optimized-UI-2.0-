import React, { useContext, useEffect, useRef, useState } from 'react';
import { AreaChart, Area, LineChart, Line, Tooltip, XAxis, ResponsiveContainer, Bar } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const TVLChartWrapper = styled.div`
  background: ${props => props.mobile ? "transparent" : " radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
  box-shadow: ${props => props.mobile ? "none" : "0px 4px 16px rgba(0, 0, 0, 0.25)"};
  border-radius: 2vw;
  width: 100%;
  height: 21.5vw;
  display: grid;
  align-self: center;
  box-sizing: border-box;
  justify-self: flex-start;
  grid-template-rows: 28% 70%;
  padding: ${props => props.mobile ? "0" : "3.5% 10.5%"};

  @media only screen and (max-width: 1024px) {
    padding: ${props => props.mobile ? "0" : "2.5% 5.5%"};
  }
  
  @media screen and (max-width: 480px) {
    grid-template-rows: 20% 70%;
    padding-top: 19px;
  }

  // Responsive || Height

  @media only screen and (max-width: 1880px) {
    height: ${props => props.mobile ? "100%" : "30vw"};
  }

  @media only screen and (max-width: 1680px) {
    height: ${props => props.mobile ? "100%" : "28vw"};
  }

  // Responsive || Width

  @media only screen and (max-width: 750px) {
    height: ${props => props.mobile ? "80%" : "23vh"};
    grid-template-rows: 25% 75%;
  }

  @media only screen and (max-width: 750px) {
    .tvl-chart {
      width: 100vw;
      padding: 0 5%;
      color: #BDBDBD;
    }
  }
  
  .tvl-chart {
    overflow: hidden;
  }

  .tvl-info {
    display: grid;
    padding: ${props => props.mobile ? "0 5%" : "0"};
    grid-template-rows: ${props => props.mobile ? " 1fr 1fr" : " 1fr 3fr 1fr"};

    p {
      font-weight: 500;
      font-size: ${props => props.mobile ? "3.6vw" : "1.1vw"};
      color: ${props => props.mobile ? "#BDBDBD" : "white"};
    }

    h1 {
      color: ${props => props.mobile ? "white" : "#40BA93"};
      font-weight: ${props => props.mobile ? "600" : "500"};
      font-size: ${props => props.mobile ? "6.6vw" : "2.1vw"};
      align-self: flex-end;
    }

    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
    }
  }

  .recharts-cartesian-axis{
    margin-top:10px;
  }
  
`

export const TVLChart = ({ data }) => {
  const { theme } = useSystemContext();
  const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
  const [chartValue, setChartValue] = useState({ time: undefined, value: undefined });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length > 0) {
      setChartValue({
        time: data[data.length - 1].date,
        value: data[data.length - 1].uv
      })
      setLoading(false);
    }
  }, [data])

  return (
    <>
      {loading ? <h5> Loading </h5> :
        <TVLChartWrapper mobile={isMobileScreen}>
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
                    tick={{ fontSize: "1vw" }}
                    stroke={theme === "light" ? "black" : "white"}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  />
                </LineChart>
              }
            </ResponsiveContainer>
          </div>
        </TVLChartWrapper>
      }
    </>
  )

}
