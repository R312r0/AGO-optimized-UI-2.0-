import React from 'react';
import {useMediaQuery} from 'react-responsive';
import {useWeb3React} from '@web3-react/core';
import {formatAddress} from '../../../utils/helpers';
import {useSystemContext} from '../../../systemProvider';
import disconnect_icon from '../../../assets/icons/plugging-plugs.svg';
import disconnect_icon_white from '../../../assets/icons/plugging-plugs-white.svg';
import { useThemeContext } from '../layout';
import { ConnectWallet } from './styles';

export const ConnectWalletButton = () => {

    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'})
    const {account} = useWeb3React();
    const { disconnectWallet, setIsWalletModal} = useSystemContext();
    const { theme } = useThemeContext();

    return (
        <ConnectWallet mobile={isMobileScreen} light={theme === "light"}>
            <span> {account ? formatAddress(account) : "Connect Wallet"}</span>
            <button onClick={() => account ? disconnectWallet() : setIsWalletModal(true)}>
                {account ?
                  <img src={theme === "dark" ? disconnect_icon_white : disconnect_icon} alt="disconnect-connect"/> :
                  <i className="fas fa-plug"/>
                }
            </button>
        </ConnectWallet>
    )
}