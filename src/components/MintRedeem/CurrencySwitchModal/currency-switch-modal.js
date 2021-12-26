import React from 'react';
import { Switch } from 'antd';
import './currency-switch-modal.scss';
import { useSystemContext } from '../../../systemProvider';
import { useThemeContext } from '../../Layout/layout';
import { ReactComponent as ExitIcon } from './exit-icon.svg';
import { ReactComponent as SwapIcon } from './swap_icon.svg';

export const CurrencySwitchModal = ({mintRedeemCurrency, setMintRedeemCurrency, mintRedeemSlipage, setMintRedeemSlipage, mintRedeemCurrencyModal, setMintRedeemCurrencyModal }) => {

    const {theme} = useThemeContext();
    

    // TODO: Should be slippage here.

    const handleSlippageChange = (value) => {

        if (value > 100) {
            setMintRedeemSlipage(100)
        }
        else if (value < 0) {
            setMintRedeemSlipage(0)
        }
        else if (value === "") {
            setMintRedeemSlipage(0)
        }
        else {
            setMintRedeemSlipage(parseInt(value));
        }
    }

    return (
        <>
        {mintRedeemCurrencyModal ? 
                <div className='currency-switch-wrapper '> 
                    <div className='currency-switch-modal modal-switch'> 
                        <a href="#" onClick={() => setMintRedeemCurrencyModal(false)}> <ExitIcon /> </a>
                        {/* <a href="#" onClick={() => setMintRedeemCurrencyModal(false)}> <i className="fas fa-times"></i> </a> */}
                        <h2> Switch between</h2>
                        <div className='modal-switch__swap-block'>
                            <div>AGOUSD </div>
                            <SwapIcon />
                            <div>AGOBTC</div>
                        </div>
                        <Switch checked={mintRedeemCurrency === "AGOBTC" ? true : false} onChange={() => setMintRedeemCurrency(mintRedeemCurrency === "AGOUSD" ? "AGOBTC" : "AGOUSD")}/>
                        {/* <span> Set slippage: </span>
                        <input type='number' min={0} max={100} onChange={(e) => handleSlippageChange(e.target.value)} value={mintRedeemSlipage}/> */}
                    </div>
                </div>
                :
                ""
        }
        </>
    )
}