import React from 'react';
import Slider from '@mui/material/Slider';
import info_icon from './../../../assets/icons/additionally-info.svg';

const TradingFilters = () => {

    function valuetext(value) {
        return `-${value}%`;
    }

    return (
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
                    <Slider
                        className="range-slider-filter"
                        defaultValue={5}
                        marks
                        sx={{ 
                            width: "13.2vw",
                            height: "0.260vw",
                            color: "#40BA93",
                            padding: "0",
                            marginRight: '0.4vw',

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

                            '& .MuiSlider-mark': {
                                width: '0.573vw',
                                height: '0.573vw',
                                border: '0.052vw solid #333',
                                borderRadius: '50%',
                                backgroundColor: '#333',
                            },

                            '& .MuiSlider-markActive': {
                                backgroundColor: '#40BA93',
                            },

                            '& .MuiSlider-rail ': {
                                backgroundColor: '#333 !important',
                                opacity: '1',
                            },     
                        }}
                        step={1}
                        min={1}
                        max={5}
                    />
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
                        <div className='trading-wrapper-filter__item__spliter__amounts__sliders__wrapper'>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="53600" />
                                </div>
                                <p>1</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={2}
                                    sx={{ 
                                        width: "1.302vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                        },

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
                                    step={2}
                                    min={1}
                                    max={2}
                                />
                                <b>20%</b>
                            </div>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="52800" />
                                </div>
                                <p>2</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={3}
                                    sx={{ 
                                        width: "2.292vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                        },

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
                                    max={3}
                                />
                                <b>50%</b>
                            </div>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="52300" />
                                </div>
                                <p>3</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={4}
                                    sx={{ 
                                        width: "3.594vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                        },

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
                                />
                                <b>70%</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="trading-wrapper-filter__heading">Take Profit</h3>
            <div className="trading-wrapper-filter__item">
                <div className="trading-wrapper-filter__item__input">
                    <p>Last</p>
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
                        <div className='trading-wrapper-filter__item__spliter__amounts__sliders__wrapper'>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="53600" />
                                </div>
                                <p>1</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={2}
                                    sx={{ 
                                        width: "1.302vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                    step={2}
                                    min={1}
                                    max={2}
                                />
                                <b>20%</b>
                            </div>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="52800" />
                                </div>
                                <p>2</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={3}
                                    sx={{ 
                                        width: "2.292vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                    max={3}
                                />
                                <b>50%</b>
                            </div>
                            <div className='trading-wrapper-filter__item__spliter__amounts__sliders'>
                                <div className='trading-wrapper-filter__item__spliter__amounts__sliders__input'>
                                    <div className='circle-separator'></div>
                                    <input className="switcher__input" type="text" value="52300" />
                                </div>
                                <p>3</p>
                                <Slider
                                    className="range-slider-filter"
                                    defaultValue={4}
                                    sx={{ 
                                        width: "3.594vw",
                                        height: "0.208vw",
                                        color: "#40BA93",
                                        padding: "0",

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
                                />
                                <b>70%</b>
                            </div>
                        </div>
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

                        <div className='red-range-filter'>
                            <Slider
                                size="small"
                                defaultValue={5}
                                max={10}
                                min={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={valuetext}
                                track="inverted"
                                disabled

                                sx={{
                                    width: "12.188vw",
                                    height: "0.208vw",
                                    color: "#EF3725",
                                    padding: "1vw 0",
                                    margin: "0 0 0 2.438vw",

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
                                    },

                                    '& .MuiSlider-thumb': {
                                        width: '0.573vw',
                                        height: '0.573vw',
                                        border: '0.052vw solid #333',
                                        boxShadow: 'none !important',

                                        '&:hover': {
                                            boxShadow: 'none !important',
                                        },
                                    },

                                    '& .MuiSlider-track': {
                                        backgroundColor: '#BDBDBD',
                                    },
                                    
                                    '& .MuiSlider-valueLabel': {
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: '0.729vw',
                                        backgroundColor: 'transparent',
                                        transform: 'translateY(70%) scale(1) !important',
                                    },
                                }}
                            />
                            <input type="text" value="-5%" disabled/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="trading-wrapper-filter__switch-wrapper">
                <h3 className="trading-wrapper-filter__heading">Stop Loss</h3>
                <div class="switch-wrapper">
                    <label>
                        <input class="switch" type="checkbox" />
                        <div>
                            <div></div>
                        </div>
                    </label>
                </div>
            </div>
            
            <div className="trading-wrapper-filter__item">
                <div className="trading-wrapper-filter__item__input">
                    <p>Last</p>
                    <input className="small__input" value="60000" type="text" />
                </div>

                <div className="trading-wrapper-filter__item__spliter">
                    <div className="trading-wrapper-filter__item__spliter__switcher">

                        <div className='red-range-filter'>
                            <Slider
                                size="small"
                                defaultValue={5}
                                max={10}
                                min={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={valuetext}
                                track="inverted"

                                sx={{
                                    width: "12.188vw",
                                    height: "0.208vw",
                                    color: "#EF3725",
                                    padding: "1vw 0",
                                    margin: "0 0 0 2.438vw",

                                    '& .MuiSlider-thumb': {
                                        width: '0.573vw',
                                        height: '0.573vw',
                                        border: '0.052vw solid #333',
                                        boxShadow: 'none !important',

                                        '&:hover': {
                                            boxShadow: 'none !important',
                                        },
                                    },

                                    '& .MuiSlider-track': {
                                        backgroundColor: '#BDBDBD',
                                    },
                                    
                                    '& .MuiSlider-valueLabel': {
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: '0.729vw',
                                        backgroundColor: 'transparent',
                                        transform: 'translateY(70%) scale(1) !important',
                                    },
                                }}
                            />
                            <input type="text" value="-5%"/>
                        </div>
                    </div>
                </div>
            </div>
            <button className='trade-btn'>Trade</button>
        </div>
    );
}

export default TradingFilters;