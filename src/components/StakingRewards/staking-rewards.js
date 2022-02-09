import { SINGLE_STAKING_POOL } from "../../constants";
import { HDiv, StakingContainer, StakingTable, Text } from "./styled";
import React from "react";

import { StakingItem } from "./StakingItem/staking-item";

export const StakingRewards = () => {
  return (
    <>
      <StakingContainer style={{}}>
        <Text>
          <b>Staking Rewards</b>
        </Text>
        <Text>Select to stake</Text>
        <HDiv mt="3.438vw" ml="3.802vw" mr="22.396vw">
          <Text>Pool</Text>
          <Text>Estimated Allocation</Text>
          <Text>Contract</Text>
        </HDiv>
        <StakingTable>
          {SINGLE_STAKING_POOL.map((item, _ind) => (
            <StakingItem pool={item} key={`staking_item_${_ind}`} />
          ))}
        </StakingTable>
      </StakingContainer>
    </>
  );
};
