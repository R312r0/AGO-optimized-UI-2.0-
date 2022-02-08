import { FoundryContainer, HDiv, Text } from "./styled";
import React, { useEffect, useState } from "react";

import { CONTRACT_ADRESESS } from "../../constants";
import FoundryActions from "./foundry-actions/foundry-actions";
import FoundryData from "./foundry-data/foundry-data";
import { formatFromDecimal } from "../../utils/helpers";
import { useSystemContext } from "../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const Foundry = () => {
  const { account } = useWeb3React();
  const { contracts, tokens } = useSystemContext();
  const [foundryStaked, setFoundryStaked] = useState(null);

  useEffect(() => {
    if (contracts && tokens) {
      getFoundryInfo();
    }
  }, [contracts, tokens]);

  const getFoundryInfo = async () => {
    const cnusdToken = tokens.find((item) => item.symbol === "CNUSD");
    const cnbtcToken = tokens.find((item) => item.symbol === "CNBTC");

    const cnUsdFoundryBalance = formatFromDecimal(
      await contracts.CNUSD.methods
        .balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOUSD)
        .call(),
      cnusdToken.decimals
    );
    const cnBtcFoundryBalance = formatFromDecimal(
      await contracts.CNBTC.methods
        .balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOBTC)
        .call(),
      cnbtcToken.decimals
    );

    const usdCollateralBalance = await contracts.TREASURY_AGOUSD.methods
      .calcCollateralBalance()
      .call();
    const wbtcCollateralBalance = await contracts.TREASURY_AGOBTC.methods
      .calcCollateralBalance()
      .call();

    const usdtCollateralPrice = formatFromDecimal(
      await contracts.USDT_CHAINLINK.methods.latestAnswer().call(),
      8
    );
    const wbtcCollateralPrice = formatFromDecimal(
      await contracts.WBTC_CHAINLINK.methods.latestAnswer().call(),
      8
    );

    const usdtEstimatedAllocation = usdCollateralBalance._exceeded
      ? formatFromDecimal(usdCollateralBalance._collateral_value, 18) /
        usdtCollateralPrice
      : 0;
    const wbtcEstimatedAllocation = wbtcCollateralBalance._exceeded
      ? formatFromDecimal(wbtcCollateralBalance._collateral_value, 18) /
        wbtcCollateralPrice
      : 0;

    const tvl =
      parseFloat(cnUsdFoundryBalance) * parseFloat(cnusdToken.priceUSD) +
      parseFloat(cnBtcFoundryBalance) * parseFloat(cnbtcToken.priceUSD);

    setFoundryStaked({
      cnusd: cnUsdFoundryBalance,
      cnbtc: cnBtcFoundryBalance,
      usdt: usdtEstimatedAllocation - usdtEstimatedAllocation * 0.05,
      wbtc: wbtcEstimatedAllocation - wbtcEstimatedAllocation * 0.05,
      tvl,
    });
  };

  return (
    <>
      <FoundryContainer>
        <Text ml="1.250vw">
          <b>Foundry</b>
        </Text>
        <HDiv ml="1.250vw">
          <Text>Stake your CNUSD and CNBTC</Text>
          <Text>Earn profit from the protocol's performance</Text>
        </HDiv>
        <FoundryData data={foundryStaked} />
        <FoundryActions />
      </FoundryContainer>
    </>
  );
};
