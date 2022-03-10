import {
  ChartsContainer,
  HDiv,
  Text,
  ToggleBtn,
  ToggleTabBtnWrapper,
  TradingBar,
  TradingContainer,
  TradingTableContainer,
  TradingWrapper,
} from "./styled";
import { LIQ_POOLS_TRADING, quickswapClient } from "../../api/client";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { SINGLE_PAIR_QUERY } from "../../api/quickswapQueries";
import { TokenIcon } from "../TokenIcon/token_icon";
import TradingFilters from "./trading-filters/trading-filters";
import TradingMarket from "./trading-market/trading-market";
import TradingWindow from "./trading-window/trading-window";
import { formattedNum } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { useSystemContext } from "../../systemProvider";
import { useThemeContext } from "../Layout/layout";

const TRADING_TABS = {
  SIMPLE_SWAP: "Simple Swap",
  TRADING: "Trading",
};

export const Trading = () => {
  function valuetext(value) {
    return `-${value}%`;
  }

  const { SIMPLE_SWAP, TRADING } = TRADING_TABS;

  const { theme } = useThemeContext();
  const { data, loading } = useQuery(LIQ_POOLS_TRADING);

  const { tokens } = useSystemContext();
  const chartBlockRef = useRef(null);
  const pools = useRef(null);
  const [expandLiqPoolsList, setExpandLiqPoolsList] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [chartDimensions, setChartDimensions] = useState(null);
  const [tradingTab, setTradingTab] = useState(SIMPLE_SWAP);
  const [chosedPool, setChosedPool] = useState(null);
  const [quickswapPools, setQuickSwapPools] = useState(null);

  const wmaticMaticPairObj = {
    id: "matic-wmatic-wrap-unwrap",
    token0: {
      id: "wmatic",
      name: "Wrapped Matic",
      symbol: "WMATIC",
      priceUSD: tokens?.find((item) => item.symbol === "WMATIC").priceUSD,
    },
    token1: {
      id: "matic",
      name: "Matic",
      symbol: "MATIC",
      priceUSD: tokens?.find((item) => item.symbol === "WMATIC").priceUSD,
    },
    token0Price: "1",
    token1Price: "1",
  };

  useEffect(() => {
    if (!loading && data) {
      setChosedPool(data.pairs.find((item) => item.token1.symbol === "CNBTC"));
    }
  }, [data, loading]);

  const handleClickOutside = (event) => {
    if (pools.current && !pools.current.contains(event.target)) {
      setExpandLiqPoolsList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    setChartDimensions();
  }, [chartBlockRef]);

  useEffect(() => {
    getQuickSwapPools();
  }, []);

  const getQuickSwapPools = async () => {
    const WMATIC_WBTC = (
      await quickswapClient.query({
        query: SINGLE_PAIR_QUERY,
        variables: { id: "0xf6b87181bf250af082272e3f448ec3238746ce3d" },
      })
    ).data.pair;

    const WMATIC_USDT = (
      await quickswapClient.query({
        query: SINGLE_PAIR_QUERY,
        variables: { id: "0x604229c960e5cacf2aaeac8be68ac07ba9df81c3" },
      })
    ).data.pair;

    setQuickSwapPools(
      await Promise.all([
        { ...WMATIC_WBTC, isQuickSwapPool: true },
        { ...WMATIC_USDT, isQuickSwapPool: true },
      ])
    );
  };

  return (
    <>
      <TradingContainer>
        <HDiv alignItems="center" justifyContent="space-between" mr="12.604vw">
          <Text>
            <b>Trading</b>
          </Text>
          <TradingBar
            listExapned={expandLiqPoolsList}
          >
            <main
              style={{
                background: chosedPool?.isQuickSwapPool
                  ? "radial-gradient(94.26% 94.26% at 47.39% 30.04%, rgba(59, 175, 211, 0.342) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%)"
                  : "", opacity: 1,
              }}
              onClick={() => setExpandLiqPoolsList(!expandLiqPoolsList)}
              ref={pools}
            >
              {expandLiqPoolsList ? (
                <ul className="expanded-liquidity-list">
                  <li
                    onClick={() => setChosedPool(wmaticMaticPairObj)}
                    key={"wmatic-matic_pool_0"}
                  >
                    <div className="data-wrapper">
                      <TokenIcon iconName={"WMATIC"} />
                      <TokenIcon iconName={"MATIC"} />
                      <p> WMATIC-MATIC</p>
                    </div>
                  </li>
                  {data?.pairs &&
                    data?.pairs
                      .filter(
                        (item) =>
                          item.token0.symbol !== "AGO" &&
                          item.token1.symbol !== "AGO" &&
                          item.token1.symbol !== "AGOBTC" &&
                          item.token0.symbol !== "AGOUSD"
                      )
                      .map((item, _ind) => {
                        return (
                          <li
                            onClick={() => setChosedPool(item)}
                            key={_ind + "_pool" + item.id}
                          >
                            <div className="data-wrapper">
                              <TokenIcon iconName={item.token0.symbol} />
                              <TokenIcon iconName={item.token1.symbol} />
                              <p>
                                {item.token0.symbol}-{item.token1.symbol}
                              </p>
                            </div>
                            <svg width="1" height="27" viewBox="0 0 1 27">
                              <line
                                x1="0.5"
                                y1="2.1857e-08"
                                x2="0.499999"
                                y2="27"
                                stroke="white"
                              />
                            </svg>
                            <span>
                              Liquidity: <b>${formattedNum(item.reserveUSD)}</b>
                            </span>
                          </li>
                        );
                      })}
                  {quickswapPools &&
                    quickswapPools.map((item, _ind) => {
                      return (
                        <li
                          onClick={() => setChosedPool(item)}
                          key={_ind + "_pool" + item.id}
                          className="quick-swap-pool-item"
                        >
                          <TokenIcon iconName={"QUICK"} />
                          <div className="data-wrapper">
                            <TokenIcon iconName={item.token0.symbol} />
                            <TokenIcon iconName={item.token1.symbol} />
                            <p>
                              {item.token0.symbol}-{item.token1.symbol}
                            </p>
                          </div>
                          <svg width="1" height="27" viewBox="0 0 1 27">
                            <line
                              x1="0.5"
                              y1="2.1857e-08"
                              x2="0.499999"
                              y2="27"
                              stroke="white"
                            />
                          </svg>
                          <span>
                            Liquidity: <b>${formattedNum(item.reserveUSD)}</b>
                          </span>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <>
                  <TokenIcon iconName={chosedPool?.token0.symbol} />
                  <TokenIcon iconName={chosedPool?.token1.symbol} />
                  <p>
                    {chosedPool?.token0.symbol}-{chosedPool?.token1.symbol}
                  </p>
                  {chosedPool?.id !== "matic-wmatic-wrap-unwrap" ? (
                    <>
                      <svg width="1" height="27" viewBox="0 0 1 27">
                        <line
                          x1="0.5"
                          y1="2.1857e-08"
                          x2="0.499999"
                          y2="27"
                          stroke="white"
                        />
                      </svg>
                      <span>Liquidity:</span>
                      <b>${formattedNum(chosedPool?.reserveUSD)}</b>
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0.901211L5 6L0 0.901211L0.88375 0L5 4.19758L9.11625 0"
                          fill="white"
                        />
                      </svg>
                    </>
                  ) : null}
                </>
              )}
            </main>
          </TradingBar>
          <ToggleTabBtnWrapper>
            <ToggleBtn
              onClick={() => setTradingTab(SIMPLE_SWAP)}
              active={tradingTab === SIMPLE_SWAP}
            >
              Simple Swap
            </ToggleBtn>
            <ToggleBtn
              disabled
              onClick={() => setTradingTab(TRADING)}
              active={tradingTab === TRADING}
            >
              Trading
            </ToggleBtn>
          </ToggleTabBtnWrapper>
        </HDiv>
        <TradingWrapper style={{ background: "" }}>
          <ChartsContainer>
            <TradingWindow />
            <TradingTableContainer>
              <HDiv>
                <Text minW="7.5vw">Pairs</Text>
                <Text minW="7.5vw">Date</Text>
                <Text minW="7.5vw">Price</Text>
                <Text minW="7.5vw">Status</Text>
                <Text minW="7.5vw">Profit</Text>
                <Text>Edit</Text>
              </HDiv>
            </TradingTableContainer>
          </ChartsContainer>
          {tradingTab === SIMPLE_SWAP ? (
            <TradingMarket pool={chosedPool} />
          ) : (
            <TradingFilters />
          )}
        </TradingWrapper>
      </TradingContainer>
    </>
  );
};
