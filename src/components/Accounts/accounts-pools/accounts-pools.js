import React, { useEffect, useState } from "react";
import { formatFromDecimal, formattedNum } from "../../../utils/helpers";

import ERC20_ABI from "../../../abi/ERC20.json";
import { LIQ_POOLS_ACCOUNTS } from "../../../api/client";
import { TokenIcon } from "../../TokenIcon/token_icon";
import agologo from "./../../../assets/icons/ago-logo.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";

const ManageBtnWrapper = styled.div`
  margin-top: ${(props) => props.mt};
  border-radius: 1.563vw;
  height: 1.719vw;
  width: 6.458vw;
  align-self: center;
  border-radius: 1.042vw;
  margin-bottom: 2.813vw;

  font-size: 0.729vw;

  button {
    justify-content: center;
    border-radius: 1.563vw;
    border: 0.05vw solid;
    border-color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4f4f4f")};
    color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4f4f4f")};
    align-items: center;
    position: relative;
    overflow: hidden;
    height: inherit;
    width: inherit;
    z-index: 1;
    display: flex;
  }

  button:after {
    background: linear-gradient(98.91deg, #40ba93 24.2%, #9421ee 180.77%);
    transition: all 0.3s ease-out;
    background-repeat: repeat;
    position: absolute;
    overflow: hidden;
    height: inherit;
    width: inherit;
    content: "";
    z-index: 2;
    opacity: 0;
    left: 0;
    top: 0;
  }

  button:hover {
    color: #fff;
  }

  button:hover:after {
    opacity: 1;
  }

  button span {
    position: relative;
    z-index: 3;
  }
`;

const AccountsPools = ({ data }) => {
  const { account, library } = useWeb3React();
  const [totalPages, setTotalPages] = useState(null);
  const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
  const [dataPaginated, setDataPaginated] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (account && data) {
      getUserPools();
    }
  }, [account, data]);

  const determineNumberOfPages = (arr) => {
    const itemsPerPage = 3;

    let paginatedDataObject = {};

    let index = 0;
    let dataLength = arr.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk = arr.slice(index, index + itemsPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setTotalPages(chunkArray.length);
    setDataPaginated(paginatedDataObject);
  };

  const getUserPools = async () => {
    const userPools = data.pairs.map(async (item) => {
      const lp = new library.eth.Contract(ERC20_ABI, item.id);
      const userLpBalance = formatFromDecimal(
        await lp.methods.balanceOf(account).call(),
        18
      );
      const lpTotalSupply = formatFromDecimal(
        await lp.methods.totalSupply().call(),
        18
      );
      // const myLiquidity = (liquidityUSD / lpTotalSupply) * lpUserBalance;

      const percentPartInPool = ((userLpBalance / lpTotalSupply) * 100).toFixed(
        2
      );
      const userLpUsdBalance =
        (item.reserveUSD / lpTotalSupply) * userLpBalance;

      return {
        id: item.id,
        token0: item.token0.symbol,
        token1: item.token1.symbol,
        userLpBalance,
        userLpUsdBalance,
        percentPartInPool,
      };
    });

    const userPoolsFiltered = (await Promise.all(userPools)).filter(
      (item) => item.userLpBalance > 0
    );

    userPoolsFiltered
      .sort((a, b) => a.userLpUsdBalance - b.userLpUsdBalance)
      .reverse();

    determineNumberOfPages(userPoolsFiltered);
  };

  return (
    <div className="accounts-wrapper-use-staking-pools cosmetical-wrapper">
      <h1> Pools </h1>
      <div className="accounts-wrapper-use-staking-pools__list-header">
        <span> Pair </span>
        <span> My Liquidity </span>
        <span> LP Balance </span>
      </div>

      <ul>
        {dataPaginated && dataPaginated[`${currentClickedNumber}`] ? (
          dataPaginated[`${currentClickedNumber}`].map((item) => {
            return (
              <li>
                <div>
                  <TokenIcon iconName={item.token0} />
                  <TokenIcon iconName={item.token1} />
                  <p>
                    {item.token0}-{item.token1}
                  </p>
                </div>
                <span>
                  ${formattedNum(parseFloat(item.userLpUsdBalance).toFixed(2))}{" "}
                  ({item.percentPartInPool}%){" "}
                </span>
                <span style={{ color: "rgb(64, 186, 147)" }}>
                  {formattedNum(item.userLpBalance)}
                </span>
              </li>
            );
          })
        ) : (
          <h1> No Pools </h1>
        )}
      </ul>

      <div className="accounts-wrapper-use-staking-pools__pagination">
        {dataPaginated &&
          Object.entries(dataPaginated).map((item) => {
            return (
              <span
                onClick={() => setCurrentClickedNumber(item[0])}
                className={item[0] === currentClickedNumber ? "active" : ""}
              >
                {item[0]}
              </span>
            );
          })}
      </div>

      <ManageBtnWrapper>
        <button onClick={() => history.push("/liquidity-pools")}>
          <span>Manage</span>
        </button>
      </ManageBtnWrapper>
    </div>
  );
};

export default AccountsPools;
