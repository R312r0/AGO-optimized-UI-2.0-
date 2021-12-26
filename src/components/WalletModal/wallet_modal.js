import React, {useContext, useState} from 'react'
import CloseSvg from './svg/closeSvg'

// Wallet icons
import metaMask from './wallet-icons/metamask.svg'
import walletConnect from './wallet-icons/wallet-connect.svg'
import trustWallet from './wallet-icons/trust-wallet.svg'
import mathWallet from './wallet-icons/math-wallet.svg'
import tokenPocket from './wallet-icons/token-pocket.svg'
import safepalWallet from './wallet-icons/safepal-logo.svg'

import './wallet_modal.scss'
import { useSystemContext } from '../../systemProvider'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../Layout/layout'

const walletList = [
    {name:'MetaMask',       icon: <img className='walletModal-list__img-wrapper' src={metaMask}         alt={'icon'} /> },
    {name:'WalletConnect',  icon: <img className='walletModal-list__img-wrapper' src={walletConnect}    alt={'icon'} /> },
    {name:'CoinBase',       icon: <img className='walletModal-list__img-wrapper' src={trustWallet}      alt={'icon'} /> },
    {name:'MathWallet',     icon: <img className='walletModal-list__img-wrapper' src={mathWallet}       alt={'icon'} /> },
    {name:'Token Poket',    icon: <img className='walletModal-list__img-wrapper' src={tokenPocket}      alt={'icon'} /> },
    {name:'SafePal Wallet', icon: <img className='walletModal-list__img-wrapper' src={safepalWallet}    alt={'icon'} /> },
]


export const WalletModal = () => {

    const { connectWallet, isWalletModal, setIsWalletModal} = useSystemContext();
    const { theme } = useThemeContext();
    const closeModal = e => e.target === document.querySelector('#modalBg') && setIsWalletModal(false)
    const isTabletScreen = useMediaQuery({query: '(max-width: 1024px)'})
        
    return (
        <>
        { isWalletModal ?
            <div className={'walletModal-bg'} onClick={closeModal} id={'modalBg'}>
                <div className={`walletModal ${theme === 'dark' ? isTabletScreen ? 'walletModal-light' : '' : 'walletModal-light'}`}>
                    <span className={'walletModal-close'} onClick={() => setIsWalletModal(false)}>
                    <CloseSvg color={theme === "dark" ? isTabletScreen ? '#4F4F4F' : '#fff' : '#4F4F4F'}/>
                    </span>
                    <h3 className={'walletModal-h3 walletModal-margin'}>Connect Wallet</h3>
                    <h4 className={'walletModal-h4 walletModal-margin'}>Choose Your Wallet</h4>
                    <div className={'walletModal-terms walletModal-margin'}>
                        <label className={'container'}>
                            <input type={'checkbox'}/>
                            <span className="checkmark"></span>
                        </label>
                        <p>I accept <a>Terms of Service</a>, <a>Legal Disclosure</a> and <a>Privacy Policy</a>.</p>
                    </div>
                    <div className={'walletModal-list'}>
                        {walletList && walletList.map((wallet, _ind) => (
                            <div onClick={() => connectWallet(wallet.name)} key={`wallet__item__${_ind}`} className={'walletModal-list__item'}>
                                {wallet.icon}
                                <h5 className={'walletModal-list__item__h5'}>{wallet.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : null
        }
        </>
    )

}

export default WalletModal