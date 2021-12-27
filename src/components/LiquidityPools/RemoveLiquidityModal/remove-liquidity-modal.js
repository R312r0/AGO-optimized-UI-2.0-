import React, { useState, useEffect } from 'react';
import { Modal } from "antd";
import styled from 'styled-components';
import ERC20_ABI from '../../../abi/ERC20.json';
import { useWeb3React } from "@web3-react/core";
import { formatFromDecimal, formatToDecimal } from "../../../utils/helpers";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { useSystemContext } from "../../../systemProvider";
import { DEX_ADDRESESS, MAX_INT } from "../../../constants";

const ModalHeader = styled.h1`
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */


    color: #FFFFFF;
`


const ModaBox = styled.div`
    background: #1E1E1E;
    border-radius: 40px;
    padding: 20px 55px 35px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 40px;

    & h3{
        font-size: 24px;
        line-height: 36px;

        color: #FFFFFF;
    }

    .tokens{
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        &__token{
            font-weight: 500;
            font-size: 20px;
            line-height: 36px;

            color: #FFFFFF;

            &:last-child{
                text-align: right;
                border-left:1px solid #333333;
            }
        }
         & img{
            max-width: 20px;
            margin-right: 7px;
        }
    }

    .info{
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #FFFFFF;

        & input{
            font-weight: normal;
            font-size: 18px;
            line-height: 27px;
            color: #FFFFFF;
            

            ::placeholder {
                color: #4F4F4F;
            }
        }
    }
`

export const RemoveLiquidityModal = ({ visible, setVisible, token0, token1, lpTokenContract, lpUserBalance }) => {

    const { account } = useWeb3React();
    const { contracts } = useSystemContext();
    const [removeValue, setRemoveValue] = useState(0);
    const [allowance, setAllowance] = useState(false);

    useEffect(() => {

        if (account && lpTokenContract) {
            checkAllowance()
        }

    }, [allowance, account, lpTokenContract])


    const checkAllowance = async () => {
        const res = await lpTokenContract.methods.allowance(account, DEX_ADDRESESS.ROUTER).call();
        setAllowance(res === MAX_INT)
    }

    const handleApprove = async () => {
        await lpTokenContract.methods.approve(DEX_ADDRESESS.ROUTER, MAX_INT).send({ from: account });
        await checkAllowance()
    }

    const handleRemove = async (val) => {
        await contracts.ROUTER.methods.removeLiquidity(token0.address, token1.address, formatToDecimal(val, 18), 0, 0, account, 999999999999999).send({ from: account });
    }

    return (
        <Modal visible={visible}
            onCancel={() => setVisible(false)}
            wrapClassName={"remove-liquidity-modal"}
            footer={null}
            width="798px"
        >
            <ModalHeader> Remove Liquidity </ModalHeader>
            <ModaBox>
                <h3>Pair</h3>
                <div className='tokens'>
                    <div className='tokens__token'>
                        <TokenIcon iconName={token0.symbol} />{token0.symbol}
                    </div>
                    <div className='tokens__token'>
                        <TokenIcon iconName={token1.symbol} />{token1.symbol}
                    </div>
                </div>

                <div className='info'>
                    <p>LP balance: {lpUserBalance}</p>
                    <input type={"number"} placeholder='Enter amount to remove liquidity' onChange={(e) => setRemoveValue(e.target.value)} />
                </div>
            </ModaBox>
            <div className='button-area'>
            <button className='enter' onClick={() => allowance ? handleRemove(removeValue) : handleApprove()}>{allowance ? "Submit" : "Approve LP for Router"}</button>
            <button className='back' onClick={() => setVisible(false)}>Back</button>
            </div>
            

            {/* <h3>Pair <TokenIcon iconName={token0.symbol} />{token0.symbol} <TokenIcon iconName={token1.symbol} />{token1.symbol}</h3>
            <h3>LP balance: {lpUserBalance}</h3>
            <p>Enter amount to remove liquidity</p>
            <input type={"number"} onChange={(e) => setRemoveValue(e.target.value)} />
            <button onClick={() => allowance ? handleRemove(removeValue) : handleApprove()}>{allowance ? "Submit" : "Approve LP for Router"}</button> */}
        </Modal>
    )

}