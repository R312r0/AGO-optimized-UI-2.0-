import React, {useContext, useEffect, useState, useRef} from 'react';
import {formatFromDecimal, formattedNum} from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import chart from './../../../assets/charts/chart.svg'
import demoChart from './../../../assets/charts/demo-chart.svg'
import {LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip} from 'recharts';
import {} from '../../App/App';
import {useSystemContext} from '../../../systemProvider';
import {useDashboardContext} from '../../../providers/dashboard-provider';
import {CustomToolTip} from "../../ChartCustomTooltip/chart-custom-tooltip";
import styled from 'styled-components';
import {useQuery} from "@apollo/client";
import {MAIN_TOKENS_DATA_QUERY} from "../../../api/client";


const TokenPriceChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  position: relative;
  overflow: hidden;
  transition: 0.3s all;
  cursor: pointer;

  height: ${props => props.isWindowExpanded ? "28vw" : "10.5vw"};
  padding: 1.823vw 2.084vw;
  
  background: radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
  box-shadow: 0px 0.208vw 0.833vw rgba(0, 0, 0, 0.25);
  border-radius: 2vw;
  box-sizing: border-box;
  
  // Responsive || Width
  
  @media only screen and (max-width: 1024px){
    height: ${props => props.isWindowExpanded ? "28.5vw" : "11.3vw"};
    padding: 2vw 1.074vw;
  }
  
  .token-heading {
    opacity: ${props => props.isWindowExpanded ? "1" : "0"};
    transition: ${props => props.isWindowExpanded ? "0.4s all" : "0.1s all"};
    height: ${props => props.isWindowExpanded ? "3.2vw" : "0"};
    
    margin: 0 0 0 1vw;
    color: white;
    font-size: 1.25vw;
    
    @media only screen and (max-width: 1024px){
      font-weight: 300;
      font-size: 1.5vw;

      height: ${props => props.isWindowExpanded ? "4vw" : "0"};
    }
  }

  .separator {
    margin-bottom: auto;

    width: 0.052vw;
    height: 100%;
    background: #40BA93;

    transition: 0.4s ease;

    &:not(:nth-child(4)) {
      height: ${props => props.isWindowExpanded ? "0" : "100%"};
    }

    &:last-child {
      display: none;
    }
  }

  .single-price-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s all;

    .price-block-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.3s all;

      padding: 0 1.0415vw 0 1vw;

      margin-bottom: auto;

      .price-block-chart {
        display: flex;
        flex-direction: column;
        opacity: ${props => props.isWindowExpanded ? "1" : "0"};
        transition: ${props => props.isWindowExpanded ? "2s all" : "0.1s all"};
        .chart-wrapper {
          width: 17.708vw;
          height: 8.490vw;
          cursor: pointer;
          font-size: 1vw;
        }
        main {
          display: flex;
          flex-direction: column;

          margin-top: 1.354vw;
          font-size: 0.729vw;

          .token-data {
            padding: 0.365vw 0.938vw;

            display: flex;
            margin-right: auto;

            color: white;
            background: #1E1E1E;
            border-radius: 0.625vw;

            &:not(:last-child) {
              margin-bottom: 0.573vw;
            }

            p {
              color: #4F4F4F;
            }

            span {
              margin-left: 1.25vw;
            }
          }
        }
      }
    }
  }
`

const SinglePriceBlock = styled.div`
  display: flex;
  flex-direction: column;

  .demo-chart {
    width: ${props => props.isWindowExpanded ? "0" : "10vw"};
    height: 0;

    transition: 0.1s ease;
    opacity: 0;
    margin-bottom: auto;
    margin-right: auto;
  }

  &:hover {
    transition: .4s ease;

    .demo-chart {
      transition: ${props => props.isWindowExpanded ? "0.1s ease" : ".5s ease"};

      height: ${props => props.isWindowExpanded ? "0" : "3vw"};
      opacity: 1;
    }

    h3 {
      margin-bottom: ${props => props.isWindowExpanded ? "0.938vw" : "0"};
    }

    h1 {
      font-size: ${props => props.isWindowExpanded ? "1.875vw" : "0.729vw"};
    }
  }

  @media only screen and (max-width: 1024px){
    &:hover {
      .demo-chart {
        height: 0;
      }

      h3 {
        margin-bottom: 0;
        @media only screen and (max-width: 1024px){
          font-size: 1.5vw;
        }
      }

      h1 {
        font-size: 0.729vw;
        @media only screen and (max-width: 1024px){
          font-size: 1.9vw;
        }
      }
    }
  }

  h3 {
    font-size: 1vw;
    margin-bottom: 0.938vw;
    transition: .4s ease;

    color: white;

    @media only screen and (max-width: 1024px){
      font-size: 1.5vw;
      margin-bottom: 0;
    }

    @media only screen and (max-width: 750px) {
      font-size: 2vw;
    }
  }

  h1 {
    font-size: 1.875vw;
    color: #40BA93;
    transition: .4s ease;

    @media only screen and (max-width: 1024px){
      font-size: 1.9vw;
      margin: auto 0;
    }

    @media only screen and (max-width: 750px) {
      font-size: 2.6vw;
    }
  }

  span {
    display: flex;
    align-items: center;

    font-size: 0.729vw;
    color: white;

    @media only screen and (max-width: 1024px){
      font-size: 1vw;
    }

    img {
      display: block;

      width: 0.8vw;
      height: 1.1vw;
      margin-right: 0.313vw;

      @media only screen and (max-width: 1024px){
        width: 1.4vw;
        height: 1.2vw;
      }
    }

    span {
      font-size: 0.729vw;
      color: #4F4F4F;
      margin-left: 0.469vw;
    }
  }
`

export const TokenPricesCharts = () => {

    const [expandWindow, setExpandWindow] = useState(false);
    const {theme, tokens} = useSystemContext();

    const {data} = useQuery(MAIN_TOKENS_DATA_QUERY);

    // const Chart = ({data}) => {
    //   const tickColor = theme === "light" ? "black" : "white"
    //   return (
    //       <ResponsiveContainer width={"100%"} height={"100%"}>
    //           <LineChart
    //               data={data}
    //           >
    //               <Line
    //                   type="basis"
    //                   dataKey="value"
    //                   stroke="#40BA93"
    //                   strokeWidth={5}
    //                   dot={false}
    //                   activeDot={true}
    //               />
    //               <Tooltip
    //                   content={<CustomToolTip/>}
    //               />
    //                   <XAxis
    //                       dataKey="time"
    //                       axisLine={false}
    //                       tickLine={false}
    //                       stroke={tickColor}
    //                       minTickGap={5}
    //                   />
    //               }
    //
    //           </LineChart>
    //       </ResponsiveContainer>
    //     )
    // }

    const [showChart, setShowChart] = useState({active: true, index: 0})

    return (
        <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)}>
          <h1 className="token-heading">Total Value Locked</h1>
          <div className="single-price-wrapper">
            {data?.tokens.map((item, _ind) => {


                if (item.name === "USDC") {
                    return;
                }
                const currentDate = new Date().getTime();
                const reverseLineChartArr = [...item.lineChartUSD].reverse();
                const latestRecordChange = reverseLineChartArr.find((item) => item.timestamp * 1000 <= currentDate - (86400 * 1000));

                let change24h = !latestRecordChange || +latestRecordChange.valueUSD === 0 ? 0 : ((item.priceUSD - latestRecordChange.valueUSD) / latestRecordChange.valueUSD * 100).toFixed(2)

                const newLineChartData = item.lineChartUSD.map(item => {
                    const date = new Date(item.timestamp * 1000);
                    const time = `${date.getHours()}:${date.getMinutes()}`

                    return ({
                        value: item.valueUSD,
                        time
                    })
                })

                const Arrow = change24h.toString().charAt(0) === "-"
                ? <img src={arrowDown} alt="arrow-down-percent"/>
                : <img src={arrowUp} alt="arrow-up-percent"/>

                let supply;
                // FIXME: fix in future when name will be AGO
                if (item.name == "Argano") {
                    supply = formatFromDecimal(tokens["AGO"].totalSupply, tokens["AGO"].decimals);
                }
                else {
                    supply = formatFromDecimal(tokens[item.name].totalSupply, tokens[item.name].decimals);
                }

                return (
                  <>
                    <div className="price-block-wrapper">
                      <main>
                        <SinglePriceBlock
                          onMouseEnter={() => expandWindow ? null : setShowChart({active: true, index: _ind})}
                          onMouseLeave={() => expandWindow ? null : setShowChart({active: false, index: null})}
                          key={_ind}
                          isShowDivider={_ind === 1}
                          isWindowExpanded={expandWindow}
                        >
                          <h3> {item.name} </h3>
                          <h1> ${(+item.priceUSD).toFixed(2)} </h1>
                          <span> {Arrow} { change24h === Infinity ? 0 : change24h}% <span>(24h)</span> </span>
                        </SinglePriceBlock>
                        <div className="price-block-chart">
                            <div className='chart-wrapper'>
                                <ResponsiveContainer className='responsive-container-chart' width={"100%"} height={"100%"}>
                                    <LineChart
                                        data={newLineChartData}
                                        // onMouseLeave={() => setChartValue({
                                        //     time: data[data.length - 1].date,
                                        //     value: data[data.length - 1].uv
                                        // })}
                                    >
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="rgba(64, 186, 147, 0.05)"
                                            strokeWidth={"1vw"}
                                            dot={false}
                                            activeDot={true}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#40BA93"
                                            strokeWidth={"0.25vw"}
                                            dot={false}
                                            activeDot={true}
                                        />
                                        <Tooltip
                                            content={CustomToolTip}
                                            // contentStyle={{display: 'none'}}
                                            // formatter={(value, name, props) => {
                                            //     const {payload: {date, uv}} = props;
                                            //     if (chartValue.value !== uv) {
                                            //         setChartValue({time: date, value: uv})
                                            //     }
                                            // }}
                                        />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{fontSize: "0.7vw"}}
                                            stroke={theme === "light" ? "black" : "white"}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                          <main>
                            <div className="token-data">
                              <p>Supply:</p>
                              <span>{formattedNum(supply)}</span>
                            </div>
                            <div className="token-data">
                              <p>Market cap:</p>
                              <span>${formattedNum(supply * item.priceUSD)}</span>
                            </div>
                          </main>
                        </div>
                      </main>
                    </div>
                    <div className="separator"></div>
                  </>
                )
            })}
          </div>
        </TokenPriceChartWrapper>
    )
}