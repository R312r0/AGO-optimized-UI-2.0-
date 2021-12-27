import React, {useEffect, useState} from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import swap_trading from './../../../assets/icons/swap-trading.svg';
import swap_trading_dark from './../../../assets/icons/swap-trading-dark.svg';
import { useSystemContext } from '../../../systemProvider';
import {formatFromDecimal, formattedNum, formatToDecimal} from "../../../utils/helpers";
import {Spin} from "antd";
import {DEX_ADDRESESS, LOADER_INDICATOR_LOCAL, MAX_INT} from "../../../constants";
import {useWeb3React} from "@web3-react/core";
import styled from "styled-components";

const SwapButtonWrapper = styled.button`
  width: 7.292vw;
  height: 1.875vw;

  margin: 0.938vw auto 0;

  font-size: 0.729vw;
  font-weight: 500;

  background: ${props => props.disabled ? "transparent" : "#10DC9B"};
  color: ${props => props.disabled ? "#4f4f4f" : "white"};

  box-shadow: 0 0.208vw 0.208vw rgba(24, 24, 24, 0.25);
  border: 1px solid #10DC9B;
  border-radius: 1.042vw;

  cursor: ${props => props.disabled ? "none" : "pointer"};
  pointer-events: ${props => props.disabled ? "none" : "all"};
`

const TradingMarket = ({pool}) => {

    const {contracts, tokens, balances, theme} = useSystemContext();
    const {account} = useWeb3React();

    const [token0, setToken0] = useState(null);
    const [token1, setToken1] = useState(null);

    const [token0Allowance, setToken0Allowance] = useState(false);
    const [token1Allowance, setToken1Allowance] = useState(false);

    const [token0Input, setToken0Input] = useState(null);
    const [token1Input, setToken1Input] = useState(null);

    useEffect(() => {

        if (pool && balances) {
            checkAllowance();
            setToken0({token: pool.token0, poolPrice: pool.token0Price})
            setToken1({token: pool.token1, poolPrice: pool.token1Price})
        }

    }, [pool, balances])


    const checkAllowance = async () => {

        const tok0 = contracts[pool.token0.symbol];
        const tok1 = contracts[pool.token1.symbol];

        setToken0Allowance((await tok0.methods.allowance(account, DEX_ADDRESESS.ROUTER).call()).length === MAX_INT.length)
        setToken1Allowance((await tok1.methods.allowance(account, DEX_ADDRESESS.ROUTER).call()).length === MAX_INT.length)

    }

    const handleChangeTokens = () => {
        const token0Loc = token0;
        const token1Loc = token1;
        setToken0(token1Loc);
        setToken1(token0Loc);
        setToken1Input(token0Input * token0Loc.poolPrice)
    }

    const handleApprove = async (tok) => {

        const inst = tokens[tok.symbol].instance;
        await inst.methods.approve(DEX_ADDRESESS.ROUTER, MAX_INT).send({from: account});
        checkAllowance()
    }

    const handleInput = (value) => {
        setToken0Input(value);
        setToken1Input(value * token1.poolPrice);
    }

    const handleSwap = async (tokenInput) => {

        await contracts.ROUTER.methods.swapExactTokensForTokens(
            formatToDecimal(tokenInput, token0.token.decimals),
            0,
            [token0.token.id, token1.token.id],
            account,
            999999999999).send({from: account})
    }

    const SwapButtonFunc = () => {

        const zeroInputCheck = token0Input === 0 || token1Input === 0;

        // const insuficientBalance = token0Input > balances.find(item => item.symbol === token0.token.symbol).nativeBalance;

        if (!token0Allowance) {
            return <SwapButtonWrapper onClick={() => handleApprove(pool.token0)}> Approve {pool.token0.symbol} </SwapButtonWrapper>
        }

        else if (!token1Allowance) {
            return <SwapButtonWrapper onClick={() => handleApprove(pool.token1)}> Approve {pool.token1.symbol} </SwapButtonWrapper>
        }

        // else if (insuficientBalance) {
        //     return <SwapButtonWrapper disabled={true}> Insuficient balance  </SwapButtonWrapper>
        // }

        else {
            return <SwapButtonWrapper disabled={zeroInputCheck} onClick={() => handleSwap(token0Input)}> SWAP </SwapButtonWrapper>
        }

    }

    return (
        <>
        {token0 && token1 ?
            <>
                <div className='trading-wrapper-exchange trading-window-box'>
                    <div className='trading-wrapper-exchange__header'>
                        <h1>Market</h1>
                        <div className='trading-wrapper-exchange__header__buttons'>
                            <button>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.63177 0.0940445C10.6982 -0.19138 12.8022 0.176598 14.6492 1.14646C16.4961 2.11631 17.9935 3.63949 18.9317 5.50271C19.8698 7.36593 20.2018 9.47591 19.8811 11.5372C19.5605 13.5985 18.6032 15.5079 17.1433 16.9981C15.6835 18.4882 13.7941 19.4845 11.7399 19.8475C9.68559 20.2104 7.56924 19.9219 5.68714 19.0222C3.80504 18.1225 2.25143 16.6567 1.24383 14.8301C0.236238 13.0035 -0.174885 10.9075 0.0680274 8.83556L2.90455 9.16812C2.73101 10.6483 3.02472 12.1457 3.74455 13.4506C4.46438 14.7556 5.57429 15.8027 6.91887 16.4455C8.26346 17.0882 9.77539 17.2944 11.243 17.0351C12.7106 16.7758 14.0603 16.064 15.1032 14.9995C16.1462 13.9349 16.8301 12.5708 17.0591 11.0982C17.2882 9.62558 17.0511 8.11821 16.3808 6.78711C15.7106 5.45602 14.6408 4.36785 13.3214 3.67498C12.0019 2.98211 10.4988 2.71922 9.02253 2.92313L8.63177 0.0940445Z" fill="#40BA93"/>
                                </svg>
                            </button>
                            <button>
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2 8.57132H7.1414L7.1428 8.55847C7.3256 7.64506 7.68338 6.77748 8.1956 6.00553C8.95784 4.85952 10.027 3.96141 11.2756 3.41831C11.6984 3.23545 12.1394 3.09544 12.5888 3.00258C13.521 2.80971 14.4818 2.80971 15.414 3.00258C16.7538 3.28272 17.9831 3.95892 18.949 4.94693L20.9314 2.92972C20.0379 2.01775 18.9809 1.28973 17.8178 0.78537C17.2246 0.529118 16.6079 0.333861 15.9768 0.202495C14.6746 -0.0674982 13.3324 -0.0674982 12.0302 0.202495C11.3986 0.334405 10.7814 0.530137 10.1878 0.786798C8.43854 1.54411 6.9411 2.80128 5.8758 4.40691C5.15884 5.48959 4.65747 6.70554 4.4002 7.98559C4.361 8.17846 4.34 8.3756 4.312 8.57132H0L5.6 14.2858L11.2 8.57132ZM16.8 11.4286H20.8586L20.8572 11.44C20.4914 13.2711 19.4337 14.8816 17.913 15.923C17.1567 16.4461 16.3065 16.8112 15.4112 16.9973C14.4794 17.1902 13.5192 17.1902 12.5874 16.9973C11.6923 16.8108 10.8421 16.4457 10.0856 15.923C9.71407 15.6665 9.36719 15.3747 9.0496 15.0515L7.07 17.0716C7.96391 17.9833 9.02149 18.7109 10.185 19.2145C10.7786 19.4717 11.3988 19.6674 12.026 19.7974C13.3277 20.0675 14.6695 20.0675 15.9712 19.7974C18.4808 19.2659 20.6882 17.7565 22.1242 15.5901C22.8405 14.5083 23.3414 13.2933 23.5984 12.0143C23.6362 11.8214 23.6586 11.6243 23.6866 11.4286H28L22.4 5.71409L16.8 11.4286Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <h4 className='trading-wrapper-exchange__title'>You Pay</h4>
                    <div className="trading-wrapper-exchange__swap-input">
                        <div className="trading-wrapper-exchange__swap-input__header">
                            <h3> {token0.token.name} </h3>
                            <h5> =${formattedNum(token0.token.priceUSD)} </h5>
                        </div>
                        <main>
                    <span>
                        <TokenIcon iconName={token0.token.symbol}/>
                        <h3> {token0.token.symbol} </h3>
                    </span>
                            <input type="numbe" placeholder="Enter amount" value={token0Input} onChange={(e) => handleInput(e.target.value)}/>
                        </main>
                    </div>

                    <img className="arrow-swap" src={ theme === "light" ? swap_trading_dark : swap_trading} alt="swap"  onClick={() => handleChangeTokens()}/>

                    <h4 className='trading-wrapper-exchange__title'>You Receive</h4>
                    <div className="trading-wrapper-exchange__swap-input">
                        <div className="trading-wrapper-exchange__swap-input__header">
                            <h3> {token1.token.name} </h3>
                            <h5> =${formattedNum(token1.token.priceUSD)} </h5>
                        </div>
                        <main>
                    <span>
                        <TokenIcon iconName={token1.token.symbol}/>
                        <h3> {token1.token.symbol} </h3>
                    </span>
                            <input type="numbe" placeholder="Enter amount" value={token1Input}/>
                        </main>
                    </div>
                    <div className="trading-wrapper-exchange__tx-info-block">
                        <span> <h3> Rate </h3> <h3> 1 {token0.token.symbol} = <b>{parseFloat(token1.poolPrice).toFixed(2)}</b> {token1.token.symbol} </h3>  </span>
                        <span> <h3> Inverse Rate </h3> <h3> 1 {token1.token.symbol} = <b>{parseFloat(token0.poolPrice).toFixed(2)}</b> {token0.token.symbol} </h3>  </span>
                        <span> <h3> Estimated Fee </h3> <b> = ${(((token0.token.priceUSD * token0Input) / 100) * 0.3).toFixed(4)}</b> </span>
                        <span> <h3> USD amount  </h3> <b className="active"> = ${(token0.token.priceUSD * token0Input).toFixed(4)} </b> </span>
                    </div>
                    <SwapButtonFunc/>
                </div>
            </>
                :
            <Spin indicator={LOADER_INDICATOR_LOCAL}/>
        }
        </>

    )
}

export default TradingMarket;