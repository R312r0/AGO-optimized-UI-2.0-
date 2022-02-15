import {
  BtnWrapper,
  Divider,
  Table,
  TableRow,
  TalbleCell,
  Text,
  TransactionsBtn,
  TransactionsContainer,
  TransactionsInfoContainer,
} from "./styled";
import { LOADER_INDICATOR_LOCAL, TXS_NAME } from "../../../constants";
import React, { useEffect, useState } from "react";
import {
  calculateTimeDifference,
  formatAddress,
  formattedNum,
} from "../../../utils/helpers";

import { GET_PAIR_TXS } from "../../../api/client";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";

export const Transactions = ({ token0, token1 }) => {
  const { data, loading } = useQuery(GET_PAIR_TXS, {
    variables: { token0: token0.symbol, token1: token1.symbol },
  });

  const [convertedData, setConvertedData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingReadyData, setLoadingReadyData] = useState(true);
  const [currentActiveBtn, setCurrentActiveBtn] = useState(0);

  useEffect(() => {
    if (data && !loading) {
      setConvertedData(convertTxsData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const convertTxsData = () => {
    const { SWAP, ADD, BURN } = TXS_NAME;

    const res = data.transactions.map((item) => {
      let txName;
      let totalValue = formattedNum((+item.amountTotalUSD).toFixed(2));
      let token0Amount = `${(+item.amount0).toFixed(2)} ${item.token0}`;
      let token1Amount = `${(+item.amount1).toFixed(2)} ${item.token1}`;
      let acc = formatAddress(item.from);
      let time = calculateTimeDifference(item.timestamp);
      // eslint-disable-next-line default-case
      switch (item.name) {
        case SWAP:
          txName = `${item.name} ${item.token0} for ${item.token1}`;
          break;
        case ADD:
          txName = `${item.name} ${item.token0} and ${item.token1}`;
          break;
        case BURN:
          txName = `${item.name} ${item.token0} and ${item.token1}`;
          break;
      }
      return { txName, totalValue, token0Amount, token1Amount, acc, time };
    });
    return res;
  };

  return (
    <>
      <TransactionsContainer>
        <BtnWrapper>
          <TransactionsBtn
            isActive={currentActiveBtn === 0}
            onClick={() => setCurrentActiveBtn(0)}
          >
            All
          </TransactionsBtn>
          <TransactionsBtn
            isActive={currentActiveBtn === 1}
            onClick={() => setCurrentActiveBtn(1)}
          >
            Swaps
          </TransactionsBtn>
          <TransactionsBtn
            isActive={currentActiveBtn === 2}
            onClick={() => setCurrentActiveBtn(2)}
          >
            Adds
          </TransactionsBtn>
          <TransactionsBtn
            isActive={currentActiveBtn === 3}
            onClick={() => setCurrentActiveBtn(3)}
          >
            Removes
          </TransactionsBtn>
        </BtnWrapper>
        <TransactionsInfoContainer>
          <TableRow>
            <Text minW="21vw" />
            <Text minW="8.5vw">
              <b>Total Value</b>
            </Text>
            <Text minW="9.5vw">
              <b>Token Amount</b>
            </Text>
            <Text minW="9.5vw">
              <b>Token Amount</b>
            </Text>
            <Text minW="10vw">
              <b>Account</b>
            </Text>
            <Text minW="11vw">
              <b>Time</b>
            </Text>
          </TableRow>
          <Divider />
          <Table>
            {!convertedData ? (
              <Spin indicator={LOADER_INDICATOR_LOCAL} />
            ) : (
              convertedData.map((item, idx) => (
                <TableRow key={idx} idx={idx}>
                  <TalbleCell minW="21vw">
                    <Text color="#40BA93">{item.txName}</Text>
                  </TalbleCell>
                  <TalbleCell minW="8.5vw">
                    <Text>${item.totalValue}</Text>
                  </TalbleCell>
                  <TalbleCell minW="9.5vw">
                    <Text>{item.token0Amount}</Text>
                  </TalbleCell>
                  <TalbleCell minW="9.5vw">
                    <Text>{item.token1Amount}</Text>
                  </TalbleCell>
                  <TalbleCell minW="10vw">
                    <Text color="#40BA93">{item.acc}</Text>
                  </TalbleCell>
                  <TalbleCell minW="11vw">
                    <Text>
                      <b>{item.time}</b>
                    </Text>
                  </TalbleCell>
                </TableRow>
              ))
            )}
          </Table>
        </TransactionsInfoContainer>
      </TransactionsContainer>
    </>
  );
};
