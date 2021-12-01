import React from 'react';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import {useWeb3React} from '@web3-react/core';
import {formatAddress} from '../../../utils/helpers';
import {useSystemContext} from '../../../systemProvider';
import disconnect_icon from '../../../assets/icons/plugging-plugs.svg';
import disconnect_icon_white from '../../../assets/icons/plugging-plugs-white.svg';

const ConnectWallet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  text-align: right;

  span {
    color: white;
    align-self: center;
    justify-self: flex-end;
    white-space: nowrap;
    font-size: 0.990vw;

    @media screen and (min-width: 500px) and (max-width: 750px) {
      margin-right: 8px;
      margin-bottom: 34px;
      font-size: 17px;
    }
  }

  button {
    justify-self: center;
    align-self: center;
    display: grid;
    align-items: center;
    justify-items: center;

    width: 3.281vw;
    height: 3.281vw;

    background-color: transparent;
    border: 0.104vw solid #40BA93;
    border-radius: 50%;
    color: white;

    font-size: 1.250vw;

    cursor: pointer;

    @media screen and (min-width: 500px) and (max-width: 750px) {
      width: 40px;
      height: 40px;
      margin-bottom: 32px;
      margin-right: 30px;
    }

    img {
      width: 1.302vw;
      height: 1.302vw;
    }

    &:hover {
      background-color: #40BA93;
      transition: 0.3s all;
    }
  }
`
export const ConnectWalletButton = () => {

    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'})
    const {account} = useWeb3React();
    const {theme, disconnectWallet, setIsWalletModal} = useSystemContext();

    return (
        <ConnectWallet mobile={isMobileScreen}>
            <span> {account ? formatAddress(account) : "Connect Wallet"}</span>
            <button onClick={() => account ? disconnectWallet() : setIsWalletModal(true)}>
                {account ?
                    <img src={theme === "dark" ? disconnect_icon_white : disconnect_icon} alt="disconnect-connect"/> :
                    <i className="fas fa-plug"/>}
            </button>
        </ConnectWallet>
    )
}