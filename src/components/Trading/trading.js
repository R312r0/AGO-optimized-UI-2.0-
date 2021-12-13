import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import info_icon from '../../assets/icons/additionally-info.svg';
import './trading.scss';
import TradingWindow from './trading-window/trading-window';
import { useSystemContext } from '../../systemProvider';
import { ThemeSwitcher } from '../Layout/ThemeSwitcher/theme-switcher';
import { styled } from '@mui/system';

export const Trading = () => {

    const chartBlockRef = useRef(null)
    const [chartDimensions, setChartDimensions] = useState(null);

    const {theme} = useSystemContext();
    
    useEffect(() => {
        setChartDimensions()
    },[chartBlockRef])

    return (
        <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
            <div className='trading-container'>
                <TradingWindow/>
                <div className='trading-window-box trading-wrapper-txs'> 
                    <div className='trading-wrapper-txs__header'>
                        <p>Pairs</p>
                        <p>Date</p>
                        <p>Price</p>
                        <p>Status</p>
                        <p>Profit</p>
                        <p>Edit</p>
                    </div>
                </div>
            </div>

            <div className="trading-wrapper-filter trading-window-box">
                <h1>Balance: 3000 USDT</h1>

                <div className="trading-wrapper-filter__buttons">
                    <button>Market</button>
                    <button className="active">Limit</button>
                </div>

                <div className="trading-wrapper-filter__item">
                    <div className="trading-wrapper-filter__item__input">
                        <p>WBTC/USDT
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0.901211L5 6L0 0.901211L0.88375 0L5 4.19758L9.11625 0" fill="white"/>
                            </svg>
                        </p>
                        <input type="text" placeholder="Amount" />
                    </div>
                    <div className="trading-wrapper-filter__item__input">
                        <input className="small__input" value="54300" type="text" />
                        <svg width="283" height="11" viewBox="0 0 283 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="3" width="278" height="5" rx="2" fill="#40BA93"/>
                            <circle cx="277.5" cy="5.5" r="5" fill="#40BA93" stroke="#333333"/>
                            <circle cx="5.5" cy="5.5" r="5" fill="#40BA93" stroke="#333333"/>
                            <circle cx="73.5" cy="5.5" r="5" fill="#40BA93" stroke="#333333"/>
                            <circle cx="141.5" cy="5.5" r="5" fill="#40BA93" stroke="#333333"/>
                            <circle cx="209.5" cy="5.5" r="5" fill="#40BA93" stroke="#333333"/>
                        </svg>
                    </div>

                    <div className="trading-wrapper-filter__item__spliter">
                        <div className="trading-wrapper-filter__item__spliter__switcher">
                            <div class="switch-wrapper">
                                <label>
                                    <input class="switch" type="checkbox" />
                                    <div>
                                        <div></div>
                                    </div>
                                </label>
                            </div>

                            <p>
                                Split Buy
                                <img src={info_icon} />
                            </p>
                        </div>

                        <div className="trading-wrapper-filter__item__spliter__amounts">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="53600" />
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="52800" />
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="52300" />
                        </div>
                    </div>
                </div>

                <h3 className="trading-wrapper-filter__heading">Take Profit</h3>
                <div className="trading-wrapper-filter__item">
                    <div className="trading-wrapper-filter__item__input">
                        <span>Last</span>
                        <input className="small__input" value="60000" type="text" />
                    
                    </div>

                    <div className="trading-wrapper-filter__item__spliter">
                        <div className="trading-wrapper-filter__item__spliter__switcher">
                            <div class="switch-wrapper">
                                <label>
                                    <input class="switch" type="checkbox" />
                                    <div>
                                        <div></div>
                                    </div>
                                </label>
                            </div>

                            <p>
                                Split T/P
                                <img src={info_icon} />
                            </p>
                        </div>

                        <div className="trading-wrapper-filter__item__spliter__amounts">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="53600" />
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="52800" />
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3.5" fill="#40BA93" stroke="#333333"/></svg>
                            <input className="switcher__input" type="text" value="52300" />
                        </div>
                    </div>

                    <div className="trading-wrapper-filter__item__spliter">
                        <div className="trading-wrapper-filter__item__spliter__switcher">
                            <div class="switch-wrapper">
                                <label>
                                    <input class="switch" type="checkbox" />
                                    <div>
                                        <div></div>
                                    </div>
                                </label>
                            </div>

                            <p>
                                Trailing Take Profit
                                <img src={info_icon} />
                            </p>
                        </div>
                    </div>

                    <Box sx={{ width: "3.542vw" }}>
                        <Slider
                            className="range-slider-filter"
                            defaultValue={2}
                            marks
                            marksLabel={{
                                color: '#000'
                            }}

                            sx={{ 
                                height: "0.208vw",
                                color: "#40BA93",

                                '& .MuiSlider-thumb': {
                                    width: '0.573vw',
                                    height: '0.573vw',
                                    border: '0.052vw solid #333',
                                    boxShadow: 'none !important',
                                    '&:hover': {
                                        boxShadow: 'none !important',
                                    }
                                },
                            }}

                            step={1}
                            min={1}
                            max={4}
                            hover={0}
                        />
                    </Box>
                    
                </div>

            </div>

            {/* TODO: by clicking on the Simple Swap button from ContentNoader, should be displayed this window}
            {/* <div className='trading-wrapper-exchange trading-window-box'> 
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
                        <h3> Wrapped BTC </h3>
                        <h5> =$60,600.36 </h5>
                    </div>
                    <main>
                        <span> <TokenIcon iconName={"AGO"}/>
                            <h3> AGO </h3>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.41 0L6 4.94879L10.59 0L12 1.531L6 8L0 1.531L1.41 0Z" fill="white"/>
                            </svg>
                        </span>
                        <input type="numbe" placeholder="Enter amount" value={1}/>
                    </main>
                </div>

                <img className="arrow-swap" src={ theme === "light" ? swap_trading_dark : swap_trading} alt="swap"/>

                <h4 className='trading-wrapper-exchange__title'>You Receive</h4>
                <div className="trading-wrapper-exchange__swap-input">
                    <div className="trading-wrapper-exchange__swap-input__header">
                        <h3> Tether USD </h3>
                        <h5> =$60,600.36 </h5>
                    </div>
                    <main>
                        <span><TokenIcon iconName={"AGOUSD"}/>
                            <h3> AGOUSD </h3>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.41 0L6 4.94879L10.59 0L12 1.531L6 8L0 1.531L1.41 0Z" fill="white"/>
                            </svg>
                        </span>
                        <input type="numbe" placeholder="Enter amount" value={47361.1}/>
                    </main>
                </div>      
                <div className="trading-wrapper-exchange__tx-info-block">
                    <span> <h3> Rate </h3> <h3> 1 WBTC = <b>47,361.871376</b> USDT </h3>  </span>
                    <span> <h3> Inverse Rate </h3> <h3> 1 USDT = <b>0.00002111</b> USDT </h3>  </span>
                    <span> <h3> Estimated Fee </h3> <b> = $65</b> </span>
                    <span> <h3> You Save </h3> <b className="active"> = $73.62 </b> </span>
                </div>
                <button className='trading-wrapper-exchange__swap-btn'> SWAP </button>
            </div> */}


        </div>
    )
}