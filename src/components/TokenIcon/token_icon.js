import React from "react";
// Protocol icons import
import ago from "./svg/newIcons/AGO.svg";
import agoBtc from "./svg/newIcons/AGOBTC.svg";
import agoUsd from "./svg/newIcons/AGOUSD.svg";
import agoy from "./svg/newIcons/AGOy.svg";
import agoyx2 from "./svg/AGOYX2.svg";
import cnBtc from "./svg/newIcons/CNBTC.svg";
import cnUsd from "./svg/newIcons/CNUSD.svg";
import dai from "./svg/DAI.svg";
import matic from "./svg/MATIC.svg";
import quick from "./svg/QUICK.png";
// Market icons import
import real_matic from "./svg/real_matic.svg";
// Unknonw token icon
import unknow from "./svg/UNKNOWN_TOKEN.png";
import usdc from "./svg/USDC.svg";
import usdt from "./svg/USDT.svg";
import wbtc from "./svg/WBTC.svg";

// import real_matic from './svg/real_matic.svg';



export const TokenIcon = ({ iconName, width, height }) => {
  const tokens = [
    { name: "AGO", icon: ago },
    { name: "AGOy", icon: agoy },
    { name: "AGOyX2", icon: agoyx2 },
    { name: "AGOUSD", icon: agoUsd },
    { name: "MATIC", icon: real_matic },
    { name: "AGOBTC", icon: agoBtc },
    { name: "CNUSD", icon: cnUsd },
    { name: "CNBTC", icon: cnBtc },
    { name: "WMATIC", icon: matic },
    { name: "USDT", icon: usdt },
    { name: "WBTC", icon: wbtc },
    { name: "DAI", icon: dai },
    { name: "USDC", icon: usdc },
    { name: "QUICK", icon: quick },
  ];

  const returnedToken = tokens.find((item) => item.name === iconName);

  return (
    <img
      src={returnedToken?.icon ? returnedToken?.icon : unknow}
      alt="ico"
      width={width}
      height={height}
    />
  );
};
