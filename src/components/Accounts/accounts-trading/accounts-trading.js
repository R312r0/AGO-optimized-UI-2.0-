import React from 'react';
import { Slider } from '@mui/material';
import agologo from './../../../assets/icons/ago-logo.svg'

const AccountsTrading = () => {

    const mockUserStaked = [
        {name: "AGO", staked: 12, reward: 0.013},
        {name: "AGOUSD", staked: 12, reward: 0.013},
        {name: "AGOBTC", staked: 12, reward: 0.013},
        {name: "CNUSD", staked: 12, reward: 0.013},
        {name: "CNBTC", staked: 12, reward: 0.013},
    ]

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Trading </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Symbol </span>
                <span> Size </span>
                <span> ROE% </span>
            </div>

            <ul> 
                <li>
                    <div>
                        <img src={agologo} />
                        <p>AGOBTC</p>
                    </div>
                    <span>0.053 (20%)</span>
                    <span>29 (+3%)</span>
                </li>
            </ul>

            <div className='accounts-wrapper-use-staking-pools__data'> 
                <span> Mark Price </span>
                <span> 10,670 </span>
            </div>

            <div className='accounts-wrapper-use-staking-pools__data'> 
                <span> Entry Price </span>
                <span> 10,200 </span>
            </div>

            <div className='range-slider'>
                <p> 
                    <span></span> 
                    <b>-6.52%</b>
                    0.00000172
                </p>
                <Slider
                    defaultValue={30}
                    sx={{ 
                        width: "13.2vw",
                        height: "0.260vw",
                        color: "#EF3725",
                        margin: "auto",

                        '.Mui-disabled': {
                            color: "#333",
                            backgroundcolor: "#333",

                            '& .MuiSlider-valueLabel': {
                                color: '#333',
                            },
                        },

                        "&.MuiSlider-root.Mui-disabled": {
                            color: "#333",
                            backgroundcolor: "#333",

                            '& .MuiSlider-track': {
                                backgroundColor: '#333',
                            },

                            '& .MuiSlider-markActive': {
                                backgroundColor: '#333',
                            },
                        },

                        '& .MuiSlider-thumb': {
                            display: 'none',
                        },

                        '& .MuiSlider-track': {
                            height: "0.35vw",
                        },

                        '& .MuiSlider-markActive': {
                            backgroundColor: '#40BA93',
                        },

                        '& .MuiSlider-rail ': {
                            backgroundColor: '#333',
                            opacity: '1',
                        },     
                    }}
                    step={1}
                    min={1}
                    max={100}
                />

                <p> 
                    0.00000230
                    <span></span>
                </p>
            </div>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                <span className='active'>1</span>
                <span>2</span>
                <span>3</span>
            </div>
        </div>
    )
}

export default AccountsTrading;