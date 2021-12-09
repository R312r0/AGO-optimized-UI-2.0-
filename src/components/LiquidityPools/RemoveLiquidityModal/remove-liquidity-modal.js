import React, {useState, useEffect} from 'react';
import {Modal} from "antd";
import styled from 'styled-components';
import ERC20_ABI from '../../../abi/ERC20.json';
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";
import {TokenIcon} from "../../TokenIcon/token_icon";
import {useSystemContext} from "../../../systemProvider";
import { DEX_ADDRESESS, MAX_INT } from "../../../constants";

const ModalHeader = styled.h1`
  color: white;
`

export const RemoveLiquidityModal = ({visible, setVisible, token0, token1, lpTokenContract, lpUserBalance}) => {

    const { account } = useWeb3React();
    const {contracts} = useSystemContext();
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
        await lpTokenContract.methods.approve(DEX_ADDRESESS.ROUTER, MAX_INT).send({from: account});
        await checkAllowance()
    }

    const handleRemove = async (val) => {
        await contracts.ROUTER.methods.removeLiquidity(token0.address, token1.address, formatToDecimal(val, 18), 0, 0, account, 999999999999999).send({from: account});
    }

    return (
        <Modal visible={visible}
               onCancel={() => setVisible(false)}
               wrapClassName={"remove-liquidity-modal"}
               footer={null}
        >
            <ModalHeader> Remove Liquidity </ModalHeader>
            <h3>Pair <TokenIcon iconName={token0.symbol}/>{token0.symbol} <TokenIcon iconName={token1.symbol}/>{token1.symbol}</h3>
           <h3>LP balance: {lpUserBalance}</h3>
           <p>Enter amount to remove liquidity</p>
           <input type={"number"} onChange={(e) => setRemoveValue(e.target.value)}/>
            <button onClick={() => allowance ? handleRemove(removeValue) : handleApprove()}>{allowance ? "Submit" : "Approve LP for Router"}</button>
        </Modal>
    )

}