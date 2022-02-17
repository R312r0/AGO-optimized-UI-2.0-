import "../trading.scss";

import {
  ChartSwitchBtn,
  ChartWrapper,
  DropdownMenu,
  DropdownMenuItem,
  HDiv,
  ResetBtn,
  Text,
  TradingChartContainer,
} from "./styled";
import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LineActiveIcon from "../../../assets/icons/chart-switcher/LineActiveIcon";
import { Spin } from "antd";
import { TOKENS_TRADING } from "../../../api/client";
import { TradingChart } from "../trading-chart/trading-chart";
import { useQuery } from "@apollo/client";
import { useThemeContext } from "../../Layout/layout";

const TradingWindow = () => {
  const { theme } = useThemeContext();
  const { data, loading } = useQuery(TOKENS_TRADING);

  const [activeToken, setActiveToken] = useState("");
  // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToken]);

  return (
    <>
      <TradingChartContainer>
        {loading && !activeToken ? null : (
          <>
            <HDiv alignItems="center" justifyContent="flex-end">
              <DropdownMenu
                onChange={(e) => setActiveToken(e.target.value)}
                value={activeToken}
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={{
                  MenuListProps: {
                    sx: {
                      background: theme === "dark" ? "#31283D" : "radial-gradient(131.68% 131.68% at 50.41% 82.78%, rgba(150, 81, 237, 0.2) 0%, rgba(153, 80, 244, 0.052) 100%), #D19AFF",
                    },
                  },
                }}
                theme={theme}
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
                        theme={theme}
                      >
                        {item.symbol}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenu>
              <ChartSwitchBtn onClick={() => console.log("lineChart")}>
                <LineActiveIcon color="red"/>
              </ChartSwitchBtn>
            </HDiv>
            <HDiv ml="1.250vw">
              <Text>
                <b>Chart</b>
              </Text>
            </HDiv>
            <ChartWrapper>
              {lineChart ? (
                <TradingChart
                  token={activeToken}
                  candleData={candleChart}
                  lineData={lineChart}
                  chartType={"line"}
                />
              ) : null}
            </ChartWrapper>
            <HDiv justifyContent="flex-end">
              <ResetBtn>Reset</ResetBtn>
            </HDiv>
          </>
        )}
      </TradingChartContainer>
    </>
  );
};
export default TradingWindow;
