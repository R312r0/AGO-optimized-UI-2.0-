import {
  Divider,
  FoundryDataContainer,
  FoundryDataItemContainer,
  HDiv,
  Text,
  VDiv,
} from "./styled";

import ChainIcon from "../../../assets/icons/ChainIcon";
import MoneyBagIcon from "../../../assets/icons/MoneyBagIcon";
import React from "react";
import StonksIcon from "../../../assets/icons/StonksIcon";
import TargetIcon from "../../../assets/icons/TargetIcon";
import { formattedNum } from "../../../utils/helpers";

const FoundryData = ({ data }) => {
  return (
    <FoundryDataContainer>
      <FoundryDataItemContainer>
        <HDiv>
          <VDiv>
            <Text>Estimated Allocation</Text>
            <HDiv mt="0.781vw">
              <VDiv>
                <Text>
                  <b>CNUSD</b>
                </Text>
                <Text fontSize="1.250vw" lineHeight="1.875vw">
                  <b>{data ? formattedNum(data.usdt) : 0}</b>
                </Text>
              </VDiv>
              <Divider />
              <VDiv>
                <Text>
                  <b>WBTC</b>
                </Text>
                <Text fontSize="1.250vw" lineHeight="1.875vw">
                  <b>{data ? formattedNum(data.wbtc) : 0}</b>
                </Text>
              </VDiv>
            </HDiv>
          </VDiv>
          <TargetIcon />
        </HDiv>
      </FoundryDataItemContainer>
      <FoundryDataItemContainer>
        <HDiv>
          <VDiv>
            <Text>Time until next allocate</Text>
            <HDiv mt="0.781vw">
              <Text fontSize="1.250vw" lineHeight="1.875vw">
                <b>Allocation not started yet</b>
              </Text>
            </HDiv>
          </VDiv>
          <StonksIcon />
        </HDiv>
      </FoundryDataItemContainer>
      <FoundryDataItemContainer>
        <HDiv>
          <VDiv>
            <Text>CNUSD / CNBTC Staked</Text>
            <HDiv mt="0.781vw">
              <VDiv>
                <Text>
                  <b>CNUSD</b>
                </Text>
                <Text fontSize="1.250vw" lineHeight="1.875vw">
                  <b>{data ? formattedNum(data.cnusd) : 0}</b>
                </Text>
              </VDiv>
              <Divider />
              <VDiv>
                <Text>
                  <b>CNBTC</b>
                </Text>
                <Text fontSize="1.250vw" lineHeight="1.875vw">
                  <b>{data ? formattedNum(data.cnbtc) : 0}</b>
                </Text>
              </VDiv>
            </HDiv>
          </VDiv>
          <ChainIcon />
        </HDiv>
      </FoundryDataItemContainer>
      <FoundryDataItemContainer>
        <HDiv>
          <VDiv>
            <Text>Total Value Locked</Text>
            <HDiv mt="0.781vw">
              <Text fontSize="1.250vw" lineHeight="1.875vw">
                <b>${data ? formattedNum(data.tvl) : 0}</b>
              </Text>
            </HDiv>
          </VDiv>
          <MoneyBagIcon />
        </HDiv>
      </FoundryDataItemContainer>
    </FoundryDataContainer>
  );
};

export default FoundryData;
