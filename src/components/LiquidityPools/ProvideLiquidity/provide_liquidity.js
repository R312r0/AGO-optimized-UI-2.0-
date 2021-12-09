import React, {useState} from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import {formattedNum, formatToDecimal} from "../../../utils/helpers";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";


export const ProvideLiquidity = ({token0, token1}) => {

    const {account} = useWeb3React();
    const {contracts} = useSystemContext();
    const [input0, setInput0] = useState(null);
    const [input1, setInput1] = useState(null);
    const [usdValue, setUsdValue] = useState(0);

    const handleInput0 = (value) => {

        setInput0(value);
        const priceForEquality = value * token0.price;
        const token1Amount = priceForEquality / token1.price;
        setInput1(token1Amount);
        setUsdValue(priceForEquality * 2);
    }

    const handleInput1 = (value) => {
        setInput1(value);
        setInput0(0);
        const priceForEquality = value * token1.price;
        const token0Amount = priceForEquality / token0.price;
        setInput0(token0Amount);
        setUsdValue(formattedNum(priceForEquality * 2));
    }


    const provideLiquidity = async () => {

        await contracts.ROUTER.methods.addLiquidity(
            token0.address,
            token1.address,
            formatToDecimal(input0, 18),
            formatToDecimal(input1, 18),
            0,
            0,
            account,
            9999999999).send({from: account})

    }

    const ProvideLiquidityPieChart = ({token1, token2}) => {


        const data = [
            {name: token1, value: 400},
            {name: token2, value: 400},
        ];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x > cx ? x - 20 : x + 20} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div className='chart-block'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={200} height={200}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#40BA93"/>
                                <stop offset="1" stopColor="rgba(64, 186, 147, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="colorUvSecond" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#358269"/>
                                <stop offset="1" stopColor="rgba(53, 130, 105, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <Pie
                            startAngle={90}
                            endAngle={450}
                            data={data}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            stroke="none"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                      fill={index === 0 ? "url(#colorUv)" : "url(#colorUvSecond)"}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }

    return(
        <>
        <div className='provide-liquidity-block'>


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p>{token0.symbol}</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <TokenIcon iconName={token0.symbol}/>
                        <h5>{token0.symbol}</h5>
                        <input type="number" onChange={(e) => handleInput0(e.target.value)} value={input0} placeholder={`Enter ${token0.symbol} amout`}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'>
                    <p>0.236956852637269</p>
                    <p>=${token0.price}</p>
                </div>
            </div>


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p>{token1.symbol}</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <TokenIcon iconName={token1.symbol}/>
                        <h5>{token1.symbol}</h5>
                        <input type="number" placeholder={`Enter ${token1.symbol} amout`} onChange={(e) => handleInput1(e.target.value)} value={input1}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'>
                    <p>0.236956852637269</p>
                    <p>=${token1.price}</p>
                </div>
            </div>

            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p className='provide-liq-heading'>USD Value</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <span className="provide-liq-white"> {usdValue}$ </span>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'> 
                    <p className='provide-liq-max__data'>Max: = -$140.26</p>
                </div>
            </div>
        </div>
        <div className='provide-liq-wrapper'>
            <ProvideLiquidityPieChart token1={token0.symbol}
                                      token2={token1.symbol}/>
            <button onClick={() => provideLiquidity()}> Porvide</button>
        </div>
        </>
    )
}