import React, { useEffect, useState } from "react";
import line_active from "../../../assets/icons/chart-switcher/line-active.svg";
import { useSystemContext } from "../../../systemProvider";
import { TradingChart } from "../trading-chart/trading-chart";
import "../trading.scss";
import { useQuery, useSubscription } from "@apollo/client";
import { TOKENS_TRADING } from "../../../api/client";
import { useThemeContext } from "../../Layout/layout";
import { styled } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Spin } from "antd";
import { TOKEN_PRICE_CHART } from "../../../api/subscriptions";
import axios from "axios";
import line from "../../../assets/icons/chart-switcher/line.svg";
import candle from "../../../assets/icons/chart-switcher/candle.svg";
import candle_active from "../../../assets/icons/chart-switcher/candle-active.svg";
import { COINGECKO_IDS, LOADER_INDICATOR_LOCAL } from "../../../constants";

const TradingWindow = () => {
  const { tokens } = useSystemContext();
  const { theme } = useThemeContext();
  const { data, loading } = useQuery(TOKENS_TRADING);

  // const [chartType, setChartType] = useState("candle");

  // const [chartTimeStamp, setChartTimeStamp] = useState([
  //     {timeframe: "1", active: true, value: "1D"},
  //     {timeframe: "30", active: false, value: "1M"},
  //     {timeframe: "max", active: false, value: "All"},
  // ]);

  const [activeToken, setActiveToken] = useState("");
  const [candleChart, setCandleChart] = useState(null);
  const [lineChart, setLineChart] = useState(null);

  useEffect(() => {
    if (data && !loading) {
      setActiveToken("CNBTC");
    }
  }, [data, loading]);

  useEffect(() => {
    if (activeToken) {
      setLineChart(
        data.tokens.find((item) => item.symbol === activeToken).lineChartUSD
      );
    }
  }, [activeToken]);

  // useEffect(() => {
  //
  //     if (tokens) {
  //         const tokensArr = Object.entries(tokens).map((item, _ind) => ({name: item[0], coindgeckoId: COINGECKO_IDS[item[0]], active: _ind === 0}));
  //         setTokensCoingecko(tokensArr);
  //     }
  //
  // }, [tokens])

  // useEffect(() => {
  //
  //     if (tokensCoinGecko && chartTimeStamp) {
  //         fetchChartTokenData(tokensCoinGecko.find(item => item.active).coindgeckoId, chartTimeStamp.find(item => item.active).timeframe);
  //     }
  //
  // }, [tokensCoinGecko, chartTimeStamp])

  // const fetchChartTokenData = async (token, timestamp) => {
  //
  //     try {
  //
  //         setLoading(true)
  //
  //         const candle = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/ohlc?vs_currency=usd&days=${timestamp}`)
  //         const line = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=max`)
  //         setCandleChart(candle.data);
  //         setLineChart(line.data.prices);
  //
  //         setLoading(false);
  //
  //     }
  //     catch (e) {
  //     }
  // }

  // TODO: When Trade Volume on proj is low we can't choose timeframe
  // const onChangeTimeStamp = (value) => {
  //     const newTime = chartTimeStamp.map(item => item.value === value ? {...item, active: true} : {...item, active: false})
  //     setChartTimeStamp(newTime);
  // }

  // useEffect(()=>{
  //     var x, i, j, l, ll, selElmnt, a, b, c;
  //     /* Look for any elements with the class "custom-select": */
  //     x = document.getElementsByClassName("custom-select");
  //     l = x.length;
  //     for (i = 0; i < l; i++) {
  //       selElmnt = x[i].getElementsByTagName("select")[0];
  //       ll = selElmnt.length;
  //       /* For each element, create a new DIV that will act as the selected item: */
  //       a = document.createElement("DIV");
  //       a.setAttribute("class", "select-selected");
  //       a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  //       x[i].appendChild(a);
  //       /* For each element, create a new DIV that will contain the option list: */
  //       b = document.createElement("DIV");
  //       b.setAttribute("class", "select-items select-hide");
  //       for (j = 1; j < ll; j++) {
  //         /* For each option in the original select element,
  //         create a new DIV that will act as an option item: */
  //         c = document.createElement("DIV");
  //         c.innerHTML = selElmnt.options[j].innerHTML;
  //         c.addEventListener("click", function(e) {
  //             /* When an item is clicked, update the original select box,
  //             and the selected item: */
  //             var y, i, k, s, h, sl, yl;
  //             s = this.parentNode.parentNode.getElementsByTagName("select")[0];
  //             sl = s.length;
  //             h = this.parentNode.previousSibling;
  //             for (i = 0; i < sl; i++) {
  //               if (s.options[i].innerHTML == this.innerHTML) {
  //                 s.selectedIndex = i;
  //                 h.innerHTML = this.innerHTML;
  //                 y = this.parentNode.getElementsByClassName("same-as-selected");
  //                 yl = y.length;
  //                 for (k = 0; k < yl; k++) {
  //                   y[k].removeAttribute("class");
  //                 }
  //                 this.setAttribute("class", "same-as-selected");
  //                 break;
  //               }
  //             }
  //             h.click();
  //         });
  //         b.appendChild(c);
  //       }
  //       x[i].appendChild(b);
  //       a.addEventListener("click", function(e) {
  //         /* When the select box is clicked, close any other select boxes,
  //         and open/close the current select box: */
  //         e.stopPropagation();
  //         closeAllSelect(this);
  //         this.nextSibling.classList.toggle("select-hide");
  //         this.classList.toggle("select-arrow-active");
  //       });
  //     }

  //     function closeAllSelect(elmnt) {
  //       /* A function that will close all select boxes in the document,
  //       except the current select box: */
  //       var x, y, i, xl, yl, arrNo = [];
  //       x = document.getElementsByClassName("select-items");
  //       y = document.getElementsByClassName("select-selected");
  //       xl = x.length;
  //       yl = y.length;
  //       for (i = 0; i < yl; i++) {
  //         if (elmnt == y[i]) {
  //           arrNo.push(i)
  //         } else {
  //           y[i].classList.remove("select-arrow-active");
  //         }
  //       }
  //       for (i = 0; i < xl; i++) {
  //         if (arrNo.indexOf(i)) {
  //           x[i].classList.add("select-hide");
  //         }
  //       }
  //     }

  //     /* If the user clicks anywhere outside the select box,
  //     then close all select boxes: */
  //     document.addEventListener("click", closeAllSelect);
  // },[])

  const DropdownMenu = styled(Select)(() => ({
    color: theme === "dark" ? "white" : "black",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiSelect-icon": {
      color: theme === "dark" ? "white" : "black",
    },
    border: "1px solid #40BA93",
    width: "100%",
    minWidth: "121px",
    height: "38px",
    borderRadius: "10px",
  }));

  const DropdownMenuItem = styled(MenuItem)(() => ({
    color: theme === "dark" ? "white" : "black",
    "&.MuiMenuItem-root": {
      "&:hover, &.Mui-focusVisible": {
        background:
          theme === "dark"
            ? "rgb(10%, 10%, 10%, .9)"
            : "rgb(10%, 10%, 10%, .2)",
      },
      "&.Mui-selected": {
        background:
          theme === "dark" ? "rgb(10%, 10%, 10%, 1)" : "rgb(10%, 10%, 10%, .5)",
        "&:hover": {
          background:
            theme === "dark"
              ? "rgb(10%, 10%, 10%, .9)"
              : "rgb(10%, 10%, 10%, .2)",
        },
      },
    },
  }));

  return (
    <div className="trading-wrapper-chart trading-window-box">
      {loading && !activeToken ? null : (
        <>
          <div className="trading-wrapper-chart__header">
            <h1> Chart </h1>
            <div className="trading-wrapper-chart__control-panel">
              {/*{chartType === "line" ?*/}
              {/*    null*/}
              {/*    :*/}
              {/*    <>*/}
              {/*        {chartTimeStamp.map((item) => {*/}
              {/*            return <button onClick={() => onChangeTimeStamp(item.value)} className={item.active ?  "active-time-frame" : null}> {item.value} </button>*/}
              {/*        })}*/}
              {/*    </>*/}
              {/*}*/}

              {/* <div class="custom-select" style={{ width: '121px' }}> */}
              <DropdownMenu
                onChange={(e) => setActiveToken(e.target.value)}
                value={activeToken}
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={{'MenuListProps': {'sx': {backgroundColor: theme === "dark" ? "#31283D" : "none",}}}}
              >
                {data.tokens
                  .filter(
                    (item) =>
                      item.symbol !== "AGO" &&
                      item.symbol !== "AGOBTC" &&
                      item.symbol !== "AGOUSD"
                  )
                  .map((item, index) => {
                    return (
                      <DropdownMenuItem
                        selected={false}
                        key={`index_opt_${index}`}
                        value={item.symbol}
                      >
                        {item.symbol}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenu>
              <div className="chart-switcher">
                {/*<button onClick={() => setChartType("candle")} className={chartType === "candle" ? "active-chart-type" : ""}> <img src={chartType === "candle" ? candle_active : candle} width={20} height={20} alt="candle"/> </button>*/}
                <button
                  onClick={() => console.log("lineChart")}
                  className={"active-chart-type"}
                >
                  <img src={line_active} width={20} height={20} alt="line" />
                </button>
              </div>
            </div>
          </div>
          <div className="trading-wrapper-chart__chart-graph">
            {lineChart ? (
              <TradingChart
                token={activeToken}
                candleData={candleChart}
                lineData={lineChart}
                chartType={"line"}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
export default TradingWindow;
