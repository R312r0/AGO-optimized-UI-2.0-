import React, {useContext, useEffect, useState, useRef} from 'react';
import {formattedNum} from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import chart from './../../../assets/charts/chart.svg'
import demoChart from './../../../assets/charts/demo-chart.svg'
import {LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip, AreaChart, Area} from 'recharts';
import {} from '../../App/App';
import {useSystemContext} from '../../../systemProvider';
import {useDashboardContext} from '../../../providers/dashboard-provider';
import styled from 'styled-components';
import { TVLChart } from '../TVLChart/TVLChart';


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
          font-size: 0.521vw;
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
    const {theme} = useSystemContext();
    const {dashTokens} = useDashboardContext();

    const CustomToolTip = ({active, payload, label}) => {
      if (payload[0]) {
          const value = payload[0].payload.value;
          if (active) {
              return (
                  <div className='custom-tooltip'>
                      <span> {value}$ </span>
                  </div>
              )
          }
      }
      return null;
    }

    const data = [
      {time: '01', uv: 100000, date: "Jul 1, 2021"},
      {time: '02', uv: 110000, date: "Jul 2, 2021"},
      {time: '03', uv: 90000, date: "Jul 3, 2021"},
      {time: '04', uv: 100000, date: "Jul 4, 2021"},
      {time: '05', uv: 150000, date: "Jul 5, 2021"},
      {time: '06', uv: 125000, date: "Jul 6, 2021"},
      {time: '07', uv: 126000, date: "Jul 7, 2021"},
      {time: '08', uv: 143000, date: "Jul 8, 2021"},
      {time: '09', uv: 130000, date: "Jul 9, 2021"},
      {time: '10', uv: 200000, date: "Jul 10, 2021"},
      {time: '11', uv: 400000, date: "Jul 11, 2021"},
      {time: '12', uv: 500000, date: "Jul 12, 2021"},
      {time: '13', uv: 600000, date: "Jul 13, 2021"},
      {time: '14', uv: 800000, date: "Jul 14, 2021"},
      {time: '15', uv: 1000000, date: "Jul 15, 2021"},
      {time: '16', uv: 1100000, date: "Jul 16, 2021"},
      {time: '17', uv: 1100000, date: "Jul 1, 2021"},
      {time: '18', uv: 1310000, date: "Jul 2, 2021"},
      {time: '19', uv: 900000, date: "Jul 3, 2021"},
      {time: '20', uv: 1000000, date: "Jul 4, 2021"},
      {time: '21', uv: 1050000, date: "Jul 5, 2021"},
      {time: '22', uv: 1025000, date: "Jul 6, 2021"},
      {time: '23', uv: 1260000, date: "Jul 7, 2021"},
      {time: '24', uv: 900000, date: "Jul 8, 2021"},
      {time: '25', uv: 1030000, date: "Jul 9, 2021"},
      {time: '26', uv: 200000, date: "Jul 10, 2021"},
      {time: '27', uv: 400000, date: "Jul 11, 2021"},
      {time: '28', uv: 500000, date: "Jul 12, 2021"},
      {time: '29', uv: 600000, date: "Jul 13, 2021"},
      {time: '30', uv: 800000, date: "Jul 14, 2021"},
      {time: '31', uv: 1000000, date: "Jul 15, 2021"},
      {time: '01', uv: 900000, date: "Jul 16, 2021"},
  ];

    const [chartValue, setChartValue] = useState({
      time: data[data.length - 1].date,
      value: data[data.length - 1].uv
    })

    const [showChart, setShowChart] = useState({active: true, index: 0});

    return (
        <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)}>
          <h1 className="token-heading">Total Value Locked</h1>
          <div className="single-price-wrapper">
            {dashTokens.map((item, _ind) => {

                const Arrow = item.change24h.charAt(0) === "-" 
                ? <img src={arrowDown} alt="arrow-down-percent"/> 
                : <img src={arrowUp} alt="arrow-up-percent"/>

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
                          <h1> ${item.currentPrice} </h1>
                          <span> {Arrow} {item.change24h} <span>(24h)</span> </span>
                          <img src={demoChart} className='demo-chart' />
                        </SinglePriceBlock>
                        <div className="price-block-chart">
                          <div className='chart-wrapper'>
                            <ResponsiveContainer className='responsive-container-chart' width={"100%"} height={"100%"}>
                                <LineChart
                                data={data}
                                onMouseLeave={() => setChartValue({
                                    time: data[data.length - 1].date,
                                    value: data[data.length - 1].uv
                                })}
                                >
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="rgba(64, 186, 147, 0.05)"
                                    strokeWidth={"1vw"}
                                    dot={false}
                                    activeDot={true}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#40BA93"
                                    strokeWidth={"0.25vw"}
                                    dot={false}
                                    activeDot={true}
                                />
                                <Tooltip
                                    contentStyle={{display: 'none'}}
                                    formatter={(value, name, props) => {
                                        const {payload: {date, uv}} = props;
                                        if (chartValue.value !== uv) {
                                            setChartValue({time: date, value: uv})
                                        }
                                    }}
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
                              <span>253,22K</span>
                            </div>
                            <div className="token-data">
                              <p>Market cap:</p>
                              <span>$249,65K</span>
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