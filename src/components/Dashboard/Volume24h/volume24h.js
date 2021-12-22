import React, { useState, useRef, useEffect } from 'react';
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const Volume24hChartWrapper = styled.div`
 background: ${props => props.mobile ? "transparent" : props.light ? "radial-gradient(113.47% 7561.36% at -5.76% -16.06%, rgba(95, 234, 190, 0.56) 0%, rgba(95, 234, 190, 0) 100%);":" radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
  box-shadow: ${props => props.mobile ? "none" : "0px 4px 16px rgba(0, 0, 0, 0.25)"};
  border-radius: 2vw;
  width: 100%;
  height: 21.5vw;
  display: grid;
  align-self: center;
  box-sizing: border-box;
  justify-self: flex-start;
  grid-template-rows: 30% 70%;
  padding: ${props => props.mobile ? "0" : "4.5% 11.5%"};
  
  // Responsive || Height
  
  @media only screen and (max-width: 1880px) {
    height: ${props => props.mobile ? "100%" : "30vw"};
}

@media only screen and (max-width: 1680px) {
    height: ${props => props.mobile ? "100%" : "28vw"};
}

// Responsive || Width

@media only screen and (max-width: 1024px){
    padding: ${props => props.mobile ? "0" : "2.5% 5.5%"};
}

@media screen and (max-width: 480px) {
    grid-template-rows: 20% 70%;
}


@media screen and (max-width: 750px) {
    height: ${props => props.mobile ? "80%" : "23vh"};
    grid-template-rows: 25% 75%;
}

@media only screen and (max-width: 750px) {
    .volume24-chart {
        width: 100vw;
        padding: 0 5%;
    }
}
    .volume24-chart {
        overflow: hidden;
    }

  .volume24-info {
    display: grid;
    padding: ${props => props.mobile ? "0 5%" : "0"};
    grid-template-rows: ${props => props.mobile ? " 1fr 1fr" : " 1fr 3fr 1fr"};

    p {
      font-weight: 500;
      font-size: ${props => props.mobile ? "3.6vw" : "14px"};
      color: ${props => props.mobile ? "#BDBDBD" : props.light ? "#333": "white"};
      line-height: 27px;

      &:last-child{
        color: ${props => props.mobile ? "#BDBDBD" : props.light ? "#828282": "white"};
      }
    }

    h1 {
      color: ${props => props.mobile ? "white" : "#40BA93"};
      font-weight: ${props => props.mobile ? "600" : "500"};
      font-size: ${props => props.mobile ? "6.6vw" : "24px"};
      line-height: 36px;
      align-self: flex-end;
    }
  }
`

export const Volume24h = ({ data }) => {

    const { theme } = useSystemContext();
    const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
    const [chartValue, setChartValue] = useState({ time: undefined, value: undefined })


    useEffect(() => {

        if (data.length > 0) {
            setChartValue({ time: data[data.length - 1].date, value: data[data.length - 1].uv })
        }

    }, [data])

    const block = useRef(null)

    const CustomBar = ({
        x,
        y,
        width,
        height,
        fill,
    }) => {
        return (
            <g>
                <rect x={x} y={y} fill={fill} width={width} height={height} rx="1%" />
            </g>
        )
    }

    return (
        <Volume24hChartWrapper mobile={isMobileScreen} light={theme === "light"}>
            <div className={'volume24-info'}>
                {!isMobileScreen ? <p>Volume 24h</p> : null}
                <h1>${formattedNum(chartValue.value)}</h1>
                <p>{chartValue.time}</p>
            </div>
            <div className={'volume24-chart'}>
                <ResponsiveContainer width={"100%"} height={'100%'}>
                    <BarChart
                        margin={{
                            top: 5,
                            bottom: 1,
                        }}
                        width={block?.current?.clientWidth - 200}
                        height={block?.current?.clientHeight - 50}
                        data={data}
                        onMouseLeave={() => setChartValue({
                            time: data[data.length - 1].date,
                            value: data[data.length - 1].uv
                        })}
                    >
                        <Bar
                            dataKey="uv"
                            shape={(props) => {
                                return <CustomBar height={props.height} width={props.width} x={props.x} y={props.y}
                                    fill={"#40BA93"} />
                            }}
                        />
                        <Tooltip
                            contentStyle={{ display: 'none' }}
                            cursor={{ fill: "rgba(255, 255, 255, 0.15)" }}
                            formatter={(value, name, props) => {
                                const { payload: { date, uv } } = props;
                                if (chartValue.value !== uv) {
                                    setChartValue({ time: date, value: uv })
                                }
                            }}
                        />
                        <XAxis
                            dy={10}
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: isMobileScreen ? "14px" : "1vw" }}
                            stroke={theme === "light" ? "black" : "white"}
                            minTickGap={isMobileScreen ? 0 : 15}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Volume24hChartWrapper>
    )

}