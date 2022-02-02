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
