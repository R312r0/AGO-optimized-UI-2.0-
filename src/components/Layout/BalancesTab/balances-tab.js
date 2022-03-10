import {
  BalanceListDesktop,
  BalanceListItemDesktop,
  BalanceTabWrapper,
  BalancesTabWrapper,
  IconWrapper,
  Text,
} from "./styles";
import React, { useEffect, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ReactComponent as PigIcon } from "../../../assets/icons/pig-balances.svg";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { formattedNum } from "../../../utils/helpers";
import { useMediaQuery } from "react-responsive";
import { useSystemContext } from "../../../systemProvider";
import { useThemeContext } from "../layout";
import { useWeb3React } from "@web3-react/core";

// import { useSwipeable } from 'react-swipeable';

const BalancesTab = () => {
  const [balancesExpanded, setBalancesExpaned] = useState(false);
  const [balancesMobileExpanded, setBalancesMobileExpanded] = useState(false);
  const { account } = useWeb3React();
  const { balances } = useSystemContext();
  const { theme } = useThemeContext();

  const [sumBalances, setSumBalances] = useState(0);

  useEffect(() => {
    if (balances) {
      setSumBalances(
        formattedNum(balances.reduce((a, { usdBalance }) => a + usdBalance, 0))
      );
    }
  }, [balances]);

  const isMobileScreen = useMediaQuery({ query: "(max-width: 750px)" });

  // const handlersMobileBalancesExpanded = useSwipeable({
  //   onSwipedUp: () => {
  //     setBalancesMobileExpanded(false)
  //   },
  //   preventDefaultTouchmoveEvent: true,
  // })

  const scroll = () => {
    const scrollContainer = document.querySelector("#balanceList");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  };

  const handleShiftKey = () => {
    scroll();
  };

  return (
    <BalancesTabWrapper
      opened={balancesExpanded}
      mobile={isMobileScreen}
      account={account}
      onClick={() =>
        isMobileScreen
          ? setBalancesMobileExpanded(true)
          : setBalancesExpaned(!balancesExpanded)
      }
      light={theme === "light"}
    >
      <>
        {account ? (
          <>
            <div className="balance-tab-wrapper">
              <PigIcon className="balance-tab-wrapper__pig" />
              {/* <img className='balance-tab-wrapper__pig' src={pig_icon} alt="balance" /> */}
              {/* <img className='balance-tab-wrapper__pig' src={theme === "light" ? pig_icon_light : pig_icon} alt="balance" /> */}
              <p className="balance"> Balance </p>
              <div className="balance-arrow-wrapper">
                <p> {sumBalances || 0.0}$ </p>
                <svg
                  className="vector"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.901211 1.07468e-08L6 5L0.901211 10L1.05386e-08 9.11625L4.19758 5L1.0871e-07 0.88375"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <BalanceListDesktop
              opened={balancesExpanded}
              onMouseEnter={handleShiftKey}
              id="balanceList"
            >
              {balances &&
                balances
                  .filter((b) => b.nativeBalance > 0)
                  .map((item, _ind) => {
                    return (
                      <BalanceTabItem
                        key={item.symbol + _ind}
                        balance={item}
                        theme={theme}
                      />
                    );
                  })}
            </BalanceListDesktop>
          </>
        ) : (
          <p> No balance, connect wallet! </p>
        )}
      </>
    </BalancesTabWrapper>
    // <BalanceTabWrapper
    //   opened={balancesExpanded}
    //   mobile={isMobileScreen}
    //   account={account}
    //   onClick={() =>
    //     isMobileScreen
    //       ? setBalancesMobileExpanded(true)
    //       : setBalancesExpaned(!balancesExpanded)
    //   }
    // >
    //   <IconWrapper mr="0.313vw">
    //     <PigIcon />
    //   </IconWrapper>
    //   <Text>Balance</Text>
    //   <Text ml="4vw">{sumBalances.toString().substring(0, 10) || 0.0}$</Text>
    //   <IconWrapper size="1vw" ml="0.885vw" style={{ cursor: "pointer" }}>
    //     <ArrowForwardIosIcon />
    //   </IconWrapper>
    // </BalanceTabWrapper>
  );
};

const BalanceTabItem = ({
  balance: { symbol, nativeBalance, usdBalance },
  theme,
}) => {
  return (
    <>
      <BalanceListItemDesktop key={"token-" + symbol} light={theme === "light"}>
        <IconWrapper size="1.198vw">
          <TokenIcon iconName={symbol} />
        </IconWrapper>
        <span>
          {formattedNum(nativeBalance).startsWith("<")
            ? "0"
            : formattedNum(nativeBalance)}
          {symbol}/{formattedNum(usdBalance)}${" "}
        </span>
      </BalanceListItemDesktop>
    </>
  );
};

// {isMobileScreen ?
//   <>
//     <BalancesMobileExpandWrapper opened={balancesMobileExpanded}>
//     </BalancesMobileExpandWrapper>
//     <BalanceExpand opened={balancesMobileExpanded}>
//       <BalanceOverall>
//         {/* <img src={theme === "light" ? pig_icon_light : pig_icon} alt="balance" /> */}
//         <h5> Balance </h5>
//         <h5> {userProtfolio ? formattedNum(userProtfolio.reduce((a, { userUsdBalance }) => a + userUsdBalance, 0)) : 0.00}$ </h5>
//       </BalanceOverall>
//       <BalanceList >
//         {userProtfolio?.map(item => {
//           return (
//             <BalanceListItem>
//               <TokenIcon iconName={item.name} />
//               <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span>
//             </BalanceListItem>
//           )
//         })}
//       </BalanceList>
//       <BalanceSwipeStripe {...handlersMobileBalancesExpanded}>
//       </BalanceSwipeStripe>
//     </BalanceExpand>
//   </>
//   :
//   null
// }

export default BalancesTab;
