import React, { useContext, useEffect, useState, useRef } from 'react';
import { formatFromDecimal, formattedNum } from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import chart from './../../../assets/charts/chart.svg'
import demoChart from './../../../assets/charts/demo-chart.svg'
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { } from '../../App/App';
import { useSystemContext } from '../../../systemProvider';
import { CustomToolTip } from "../../ChartCustomTooltip/chart-custom-tooltip";
import styled from 'styled-components';
import { useQuery } from "@apollo/client";
import { MAIN_TOKENS_DATA_QUERY } from "../../../api/client";
import {LOADER_INDICATOR_LOCAL} from "../../../constants";
import {Spin} from "antd";


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
  /* margin-bottom: 3.646vw; */
  
  background: ${props => props.light ? 'radial-gradient(225.24% 9617% at -0.8% -6.31%, rgba(95, 234, 190, 0.3) 0%, rgba(95, 234, 190, 0.057) 100%);' : 'radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)'};
  box-shadow: ${props => props.light ? "none" : "0px 0.208vw 0.833vw rgba(0, 0, 0, 0.25)"};
  border-radius: ${props => props.light ? "40px" : "2vw"};
  border:  ${props => props.light ? "0.5px solid #40BA93;" : "none"};
  box-sizing: border-box;
  
  // Responsive || Width
  
  @media only screen and (max-width: 1024px){
    height: ${props => props.isWindowExpanded ? "28.5vw" : "11.3vw"};
    padding: 2vw 1.074vw;
    margin-bottom: 2vw;
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
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    overflow-x: scroll;
    overflow-y: hidden;
    justify-content: space-between;
    transition: 0.3s all;
    

    &::-webkit-scrollbar {
      height:0px;
    }
    
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

    .price-block-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.3s all;

      padding: 0 1.0415vw 0 1vw;

      margin-bottom: auto;

      border-right: 1px solid #40BA93;

    &:last-child{
      border-right: none;
    }

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

            color: ${props => props.light ? '#333' : '#1E1E1E'};
            background: ${props => props.light ? '#fff' : '#1E1E1E'};
            border-radius: 0.625vw;

            &:not(:last-child) {
              margin-bottom: 0.573vw;
            }

            p {
              color: ${props => props.light ? '#828282' : '#4F4F4F'};
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
    /* margin-bottom: 0.938vw; */
    transition: .4s ease;

    color: ${props => props.light ? '#333333' : '#fff'};

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
    color: ${props => props.light ? '#333333' : '#fff'};

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
  const { theme, tokens } = useSystemContext();

  const { data, loading, error } = useQuery(MAIN_TOKENS_DATA_QUERY);
  const [tokenPricesData, setTokenPricesData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {

    if (data && tokens && !loading) {
      const filteredData = data.tokens.filter((item) => {
        if (item.symbol === "AGOUSD" || item.symbol === "CNUSD" || item.symbol === "AGOBTC" || item.symbol === "CNBTC") {
          return item
        }
        else {
          return false
        }
      })

      const readyData = convertFilteredData(filteredData);

      setTokenPricesData(readyData)
      setDataLoading(false)

    }

  }, [data, loading, tokens])


  const convertFilteredData = (arr) => {

    const res = arr.map((item) => {

      const name = item.symbol;
      const price = (+item.priceUSD).toFixed(2)
      const currentDate = new Date().getTime();
      const reverseLineChartArr = [...item.lineChartUSD].reverse();
      const latestRecordChange = reverseLineChartArr.find((item) => item.timestamp * 1000 <= currentDate - (86400 * 1000));

      console.log(latestRecordChange)
      console.log(reverseLineChartArr)

      let change24h = !latestRecordChange || +latestRecordChange.valueUSD === 0 ? 0 : ((item.priceUSD - latestRecordChange.valueUSD) / latestRecordChange.valueUSD * 100).toFixed(2)

      const newLineChartData = item.lineChartUSD.map(item => {
        const date = new Date(item.timestamp * 1000);
        const time = `${date.getHours()}:${date.getMinutes()}`

        return ({
          value: +item.valueUSD,
          time
        })
      })

      const supply = formatFromDecimal(tokens[item.symbol].totalSupply, tokens[item.symbol].decimals);
      const market = item.priceUSD * supply;
      return { name, price, chartData: newLineChartData, change24h, supply: formattedNum(supply), marketCap: formattedNum(market) }

    })

    return res;

  }

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

  const [showChart, setShowChart] = useState({ active: true, index: 0 })

  const scroll = () => {
    const scrollContainer = document.querySelector("#chartWrapper");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }

  const handleShiftKey = () => {
    scroll();
  }


  return (
    <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)} onMouseEnter={handleShiftKey} light={theme === "light"}>
      <h1 className="token-heading">Total Value Locked</h1>
      <div className="single-price-wrapper" id='chartWrapper'>
        {dataLoading ?  <Spin indicator={LOADER_INDICATOR_LOCAL}/> :  tokenPricesData.map(({ name, price, chartData, change24h, supply, marketCap }, _ind) => {

          const Arrow = change24h.toString().charAt(0) === "-"
            ? <img src={arrowDown} alt="arrow-down-percent" />
            : <img src={arrowUp} alt="arrow-up-percent" />

          return (
            <div className="price-block-wrapper" key={`price_block_${_ind}`}>
              <main>
                <SinglePriceBlock
                  onMouseEnter={() => expandWindow ? null : setShowChart({ active: true, index: _ind })}
                  onMouseLeave={() => expandWindow ? null : setShowChart({ active: false, index: null })}
                  key={_ind}
                  isShowDivider={_ind === 1}
                  isWindowExpanded={expandWindow}
                  light={theme === "light"}
                >
                  <h3> {name} </h3>
                  <h1> ${price} </h1>
                  <span> {Arrow} {change24h === Infinity ? 0 : change24h}% <span>(24h)</span> </span>
                  <img src={demoChart} className='demo-chart' />
                </SinglePriceBlock>
                <div className="price-block-chart">
                  <div className='chart-wrapper'>
                    <ResponsiveContainer className='responsive-container-chart' width={"100%"} height={"100%"}>
                      <LineChart
                        data={chartData}
                      // onMouseLeave={() => setChartValue({
                      //     time: data[data.length - 1].date,
                      //     value: data[data.length - 1].uv
                      // })}
                      >
                        <defs>
                          <filter id="shadow" height="200%">
                            <feDropShadow dx="0" dy="10" stdDeviation="10" />
                          </filter>
                        </defs>
                        <Line
                          filter="url(#shadow)"
                          type="monotone"
                          dataKey="value"
                          stroke="#40BA93"
                          strokeWidth={"0.2vw"}
                          dot={false}
                          activeDot={true}
                        />
                        <Tooltip
                          content={CustomToolTip}
                        />
                        <XAxis
                          dy={10}
                          dataKey="time"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: "0.7vw" }}
                          stroke={theme === "light" ? "black" : "white"}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <main>
                    <div className="token-data">
                      <p>Supply:</p>
                      <span>{supply}</span>
                    </div>
                    <div className="token-data">
                      <p>Market cap:</p>
                      <span>${marketCap}</span>
                    </div>
                  </main>
                </div>
              </main>
            </div>
          )
        })}
      </div>
    </TokenPriceChartWrapper>
  )
}