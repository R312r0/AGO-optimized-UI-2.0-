import React, { useState, useRef, useEffect } from 'react';
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { formattedNum } from '../../../utils/helpers';
import { useMediaQuery } from 'react-responsive';
import {Spin} from "antd";
import {LOADER_INDICATOR_LOCAL} from "../../../constants";
import { Volume24hChartWrapper } from './styles';
import { useThemeContext } from '../../Layout/layout';


export const Volume24h = ({ data }) => {

    const { theme } = useThemeContext();
    const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
    const [chartValue, setChartValue] = useState({ time: undefined, value: undefined })
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (data.length > 0) {
            setChartValue({ time: data[data.length - 1].date, value: data[data.length - 1].uv })
            setLoading(false);
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
            {!loading ?
                <>
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
                                dy={5}
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

                </>
               : <Spin indicator={LOADER_INDICATOR_LOCAL}/>
            }

        </Volume24hChartWrapper>
    )

}