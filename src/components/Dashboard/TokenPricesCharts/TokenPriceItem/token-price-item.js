import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { TOKEN_DASHBOARD_CHARTS } from '../../../../api/queries';
import { useSystemContext } from '../../../../systemProvider';
import { formatFromDecimal } from '../../../../utils/helpers';
import { useThemeContext } from '../../../Layout/layout';
import { SinglePriceBlock } from '../styles';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis } from 'recharts';
import { CustomToolTip } from '../../../ChartCustomTooltip/chart-custom-tooltip';
import arrowUp from '../arrow-up.svg';
import arrowDown from '../arrow-down.svg';
import demoChart from '../../../../assets/charts/demo-chart.svg'

const Arrow = (change24h) => {
    return (
        <>
            {
                change24h.toString().charAt(0) === "-"
                ? <img src={arrowDown} alt="arrow-down-percent" />
                : <img src={arrowUp} alt="arrow-up-percent" />               
            }
        </>
    )
}

const TokenPriceItem = ({token, _ind, expandWindow}) => {

    const {data, loading, error} = useQuery(TOKEN_DASHBOARD_CHARTS, {
        variables: {id: token.address}
    })
    const { contracts } = useSystemContext();
    const { theme } = useThemeContext();

    const [tokenPriceItem, setTokenPriceItem] = useState(null);
    const [showChart, setShowChart] = useState(false);


    useEffect(() => {

        if (data && !loading) {
            prepareTokenItem(data.token.lineChartUSD, token)
            .then(res => setTokenPriceItem(res));
        }

    }, [data, loading])


    const prepareTokenItem = async (chartArr, tokenItem) => {

        const currentDate = new Date().getTime();

        const tokenTotalSupply = parseFloat(
            formatFromDecimal(
                await contracts[tokenItem.symbol].methods.totalSupply().call(),
                tokenItem.decimals));
        const marketCap = tokenTotalSupply * tokenItem.priceUSD;

        const latestRecordChange = chartArr.find((item) => item.timestamp * 1000 <= currentDate - (86400 * 1000));
        const change24h = !latestRecordChange || +latestRecordChange.valueUSD === 0 ? 
        0 : ((tokenItem.priceUSD - latestRecordChange.valueUSD) / latestRecordChange.valueUSD * 100).toFixed(2)

        const newLineChartData = chartArr.map(item => {
            const date = new Date(item.timestamp * 1000);
            const time = `${date.getHours()}:${date.getMinutes()}`

            return ({
                value: +item.valueUSD,
                time
            })
        })  

        return {
            symbol: tokenItem.symbol,
            price: tokenItem.priceUSD,
            supply: tokenTotalSupply,
            marketCap: marketCap,
            chart: newLineChartData,
            change24h: change24h
        }

    }

    return (
        <div className="price-block-wrapper">
              <main>
                {tokenPriceItem ? 
                    <>
                        <SinglePriceBlock
                  onMouseEnter={() => expandWindow ? null : setShowChart(true)}
                  onMouseLeave={() => expandWindow ? null : setShowChart(false)}
                  key={_ind}
                  isShowDivider={_ind === 1}
                  isWindowExpanded={expandWindow}
                  light={theme === "light"}
                >

                  <h3> {tokenPriceItem.symbol} </h3>
                  <h1> ${tokenPriceItem.price} </h1>
                  <span> <Arrow/> {tokenPriceItem.change24h === Infinity ? 0 : tokenPriceItem.change24h}% <span>(24h)</span> </span>
                  <ResponsiveContainer className='responsive-container-chart demo-chart' width={"100%"} height={"100%"}>
                      <LineChart
                        data={tokenPriceItem.chart}
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
                        {/* <Tooltip
                          content={CustomToolTip}
                        />
                        <XAxis
                          dy={10}
                          dataKey="time"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: "0.7vw" }}
                          stroke={theme === "light" ? "black" : "white"}
                        /> */}
                      </LineChart>
                    </ResponsiveContainer>
                  {/* <img src={demoChart} className='demo-chart' alt="chart-demo"/> */}
                </SinglePriceBlock>
                <div className="price-block-chart">
                  <div className='chart-wrapper'>
                    <ResponsiveContainer className='responsive-container-chart' width={"100%"} height={"100%"}>
                      <LineChart
                        data={tokenPriceItem.chart}
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
                      <span>{tokenPriceItem.supply}</span>
                    </div>
                    <div className="token-data">
                      <p>Market cap:</p>
                      <span>${tokenPriceItem.marketCap}</span>
                    </div>
                  </main>
                </div>
                    </>
                    :
                    null
                }
              </main>
            </div>
    )
}

export default React.memo(TokenPriceItem);