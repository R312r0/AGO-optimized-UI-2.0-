import React, { useEffect, useState } from 'react';
import { Modal, Spin } from "antd";
import styled from "styled-components";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { useQuery } from "@apollo/client";
import { TOKENS_FOR_LIQUIDITY_POOLS } from "../../../api/client";
import { CONTRACT_ADRESESS, DEX_ADDRESESS, LOADER_INDICATOR_LOCAL, MAX_INT } from "../../../constants";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";
import ERC20_ABI from '../../../abi/ERC20.json';
import { formatFromDecimal, formatToDecimal } from "../../../utils/helpers";

const ModalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 21px;
  /* grid-template-rows: 1.5fr 2fr 2fr 1fr; */
  height: 100%;
 
`

const ModalHeader = styled.h1`
  color: white;
`

const TokenSelectBlock = styled.div`
    width: 100%;
    background: #1E1E1E;
    border-radius: 40px;
    justify-self: center;
    align-self: center;
    padding: 24px 46px;
    display: grid;
    grid-template-columns: 1fr;
  p {
    color: white;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 81px 180px;
    align-items: center;
    input {
      color: white;
      &::placeholder {
        color: white;
      }
    }  
    .max {
        background: #2C2C2C;
        border-radius: 40px;
        padding: 7px 15px;
        font-size: 12px;
        text-align: center;
        color: #FFFFFF;
    }
    .disabled {
      pointer-events: none;
      color: #4F4F4F;
    }
    
    .token-sel {
      display: grid;
      grid-template-columns: 1fr 2fr;
      background: transparent;
      border: 0px;
      img {
        width: 20px;
        height: 20px;
        justify-self: flex-end;
      }
      span {
        color: white;
      }
    }
  }
`

const CreatePairButtonWrapper = styled.button`
    max-width: 342px;
    margin: 42px auto 0;
    padding: 22px 80px;
    background: ${props => props.disabled ? "transparent" : "#40BA93"};
    border-radius: 30px;
    border: 1px solid ${props => props.disabled ? "#4F4F4F" : "transparent"};
    color: ${props => props.disabled ? "#828282" : "white"};
`

const SelectTokenWrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 25px;
  h1 {
    color: white;
  }
  
  input {
    padding: 17px 46px;
    border: 1px solid #4F4F4F;
    font-weight: 300;
    font-size: 24px;
    line-height: 36px;
    color: #4F4F4F;
    border-radius: 40px;
  }
`

const SelectionWindow = styled.ul`
  overflow-y: scroll;
  display: grid;
  justify-items: center;
  row-gap: 10px;
  height: 445px;
  li {
    width: calc(100% - 11px);
    margin-right: 11px;
    background: #1E1E1E;
    border-radius: 40px;
    padding: 21px 52px;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
    h5 {
      color: white;
      font-size: 14px;      
    }
  }
  &::-webkit-scrollbar {
    width: 0.208vw;

    background: #4F4F4F;
    border-radius: 0.260vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 0.260vw;
  }
`

const CancelSelection = styled.button`
  width: 50%;
  background: #40BA93;
  border: 0px;
  border-radius: 25px;
  color: white;
  width: 92px;
  height: 40px;
  place-self: center;
`

export const CreatePairModal = ({ visible, setVisible, pools }) => {

    // TODO: check user balance when he paste a input
    // TODO: maybe addLiquidityETH too as well


    const { userProtfolio, tokens, contracts } = useSystemContext();
    const { account, library } = useWeb3React();
    const [token0Select, setToken0Select] = useState({ id: CONTRACT_ADRESESS.WMATIC, symbol: "WMATIC", decimals: 18 });
    const [token1Select, setToken1Select] = useState(null);
    const [token0Input, setToken0Input] = useState(null);
    const [token1Input, setToken1Input] = useState(null);
    const [token0Allowance, setToken0Allowance] = useState(null);
    const [token1Allowance, setToken1Allowance] = useState(null);
    const [token0Balance, setToken0Balance] = useState(0);
    const [token1Balance, setToken1Balance] = useState(0);
    const [fieldSelected, setFieldSelected] = useState(null);
    const [tokenSelectWindow, setTokenSelectWindow] = useState(false)

    useEffect(() => {

        if (contracts) {
            const searchToken0 = contracts[token0Select?.symbol];
            const searchToken1 = contracts[token1Select?.symbol];
    
            if (searchToken0) {
                allowanceForRouter(searchToken0, 0)
                checkTokenBalance(searchToken0, 0)
            }
            else {
                const contr = new library.eth.Contract(ERC20_ABI, token0Select.id)
                allowanceForRouter(contr, 0);
                checkTokenBalance(contr, 0)
            }
    
            if (searchToken1) {
                allowanceForRouter(searchToken1, 1);
                checkTokenBalance(searchToken1, 1)
            }
            else {
                if (token1Select) {
                    const contr = new library.eth.Contract(ERC20_ABI, token1Select.id)
                    allowanceForRouter(contr, 1);
                    checkTokenBalance(contr, 0)
                }
            }
        }

    }, [contracts, token0Select, token1Select])



    const CreatePairButton = () => {

        const findPool = pools.find(item => {

            console.log(item);

            if (item.token0.symbol === token0Select.symbol || item.token0.symbol === token1Select?.symbol) {
                if (item.token1.symbol === token0Select.symbol || item.token1.symbol === token1Select?.symbol) {
                    return item;
                }
            }
        })

        if (findPool) {
            return <CreatePairButtonWrapper disabled={true}> Pair exist </CreatePairButtonWrapper>
        }

        if (!token0Select || !token1Select) {
            return <CreatePairButtonWrapper disabled={true}> Please choose tokens from list </CreatePairButtonWrapper>
        }

        if (+token0Balance < token0Input) {
            return <CreatePairButtonWrapper disabled={true}> Insufficient {token0Select.symbol} balance </CreatePairButtonWrapper>
        }

        if (+token1Balance < token1Input) {
            return <CreatePairButtonWrapper disabled={true}> Insufficient {token1Select.symbol} balance </CreatePairButtonWrapper>
        }

        if (!token0Allowance) {
            return <CreatePairButtonWrapper disabled={false} onClick={() => approveForRouter(token0Select)}> Approve {token0Select.symbol} </CreatePairButtonWrapper>
        }

        if (!token1Allowance) {
            return <CreatePairButtonWrapper disabled={false} onClick={() => approveForRouter(token1Select)}> Approve {token1Select.symbol} </CreatePairButtonWrapper>
        }

        return (
            <CreatePairButtonWrapper
                disabled={!token0Input || !token1Input}
                onClick={() => createPair(token0Select, token1Select, token0Input, token1Input)}>Create
            </CreatePairButtonWrapper>
        )

    }

    const checkTokenBalance = async (tokenContr, tokenNum) => {

        const bal = await tokenContr.methods.balanceOf(account).call();
        const tokenDecimals = await tokenContr.methods.decimals().call();


        if (tokenNum === 0) {
            setToken0Balance(formatFromDecimal(bal, tokenDecimals));
        }

        else {
            setToken1Balance(formatFromDecimal(bal, tokenDecimals));
        }

    }


    const createPair = async (token0, token1, token0Amount, token1Amount) => {

        const token0AmountFormatted = formatToDecimal(token0Amount, token0.decimals);
        const token1AmountFormatted = formatToDecimal(token1Amount, token1.decimals);


        await contracts.ROUTER.methods.addLiquidity(token0.id, token1.id, token0AmountFormatted, token1AmountFormatted, 0, 0, account, 9999999999).send({ from: account });

    }

    const allowanceForRouter = async (contract, tokenInd) => {
        const allowance = await contract.methods.allowance(account, DEX_ADDRESESS.ROUTER).call()

        if (tokenInd === 0) {
            setToken0Allowance(allowance.length === MAX_INT.length);
        }
        else {
            setToken1Allowance(allowance.length === MAX_INT.length);
        }
    }


    const approveForRouter = async (tokenObj) => {

        const searchContract = tokens[tokenObj.symbol]?.instance;

        if (!searchContract) {
            const contr = new library.eth.Contract(ERC20_ABI, tokenObj.id);
            await contr.methods.approve(DEX_ADDRESESS.ROUTER, MAX_INT).send({ from: account });
            const allowance = await contr.methods.allowance(account, DEX_ADDRESESS.ROUTER).call();

            if (tokenObj.id === token0Select.id) {
                setToken0Allowance(allowance.length === MAX_INT.length)
            }
            else {
                setToken1Allowance(allowance.length === MAX_INT.length)
            }
        }
        else {
            await searchContract.methods.approve(DEX_ADDRESESS.ROUTER, MAX_INT).send({ from: account });
            const allowance = await searchContract.methods.allowance(account, DEX_ADDRESESS.ROUTER).call();

            if (tokenObj.id === token0Select.id) {
                setToken0Allowance(allowance.length === MAX_INT.length)
            }
            else {
                setToken1Allowance(allowance.length === MAX_INT.length)
            }
        }
    }

    const handleTokenSelectWindow = (tokenNum) => {
        setFieldSelected(tokenNum);
        setTokenSelectWindow(true);
    }

    const handleMaxInput = async (inputNum) => {


        if (inputNum === 0) {
            setToken0Input(token0Balance);
        }
        else {
            setToken1Input(token1Balance);
        }
    }


    return (
        <Modal visible={visible}
            onCancel={() => setVisible(false)}
            wrapClassName={"create-pair-modal"}
            footer={null}
            width="798px"
        >
            {tokenSelectWindow ?
                <SelectTokenWindow
                    setWindow={setTokenSelectWindow}
                    selectedInput={fieldSelected}
                    token0Select={token0Select}
                    setToken0Select={setToken0Select}
                    token1Select={token1Select}
                    setToken1Select={setToken1Select}

                />
                :
                <ModalWrapper>
                    <ModalHeader> Create pair </ModalHeader>
                    <TokenSelectBlock>
                        <p> Input </p>
                        <div>
                            <input placeholder={"0.0"} onChange={(e) => setToken0Input(e.target.value)} value={token0Input} />
                            <button onClick={() => handleMaxInput(0)} className={'max'}>MAX</button>
                            <button onClick={() => handleTokenSelectWindow(0)} className={'token-sel'}>
                                <TokenIcon iconName={token0Select.symbol} />
                                <span>{token0Select.symbol}</span>
                            </button>
                        </div>
                    </TokenSelectBlock>
                    <TokenSelectBlock>
                        <p> Input </p>
                        <div>
                            <input placeholder={"0.0"} onChange={(e) => setToken1Input(e.target.value)} value={token1Input} />
                            <button onClick={() => handleMaxInput(1)} className={`max ${!token1Select ? "disabled" : ""}`}>MAX</button>
                            <button onClick={() => handleTokenSelectWindow(1)} className={'token-sel'}>
                                {token1Select ?
                                    <>
                                        <TokenIcon iconName={token1Select.symbol} />
                                        <span>{token1Select.symbol}</span>
                                    </>
                                    :
                                    <>
                                        <b>$</b>
                                        <span>Select a token</span>
                                    </>
                                }
                            </button>
                        </div>
                    </TokenSelectBlock>
                    <CreatePairButton />
                </ModalWrapper>
            }
        </Modal>
    )
}


const SelectTokenWindow = ({ setWindow, token0Select, setToken0Select, token1Select, setToken1Select, selectedInput }) => {

    const { data, loading } = useQuery(TOKENS_FOR_LIQUIDITY_POOLS);
    const { library } = useWeb3React();
    const [tokensArr, setTokensArr] = useState(null);

    useEffect(() => {

        if (data && !loading) {
            setTokensArr(data.tokens);
        }

    }, [data, loading])

    const handleSearchToken = async (value) => {

        let res;

        if (value.startsWith("0x")) {

            const token = data.tokens.filter(item => item.id.startsWith(value));

            if (token.length === 0) {

                if (value.length !== 42) {
                    res = []
                }
                else {
                    try {
                        const contr = new library.eth.Contract(ERC20_ABI, value);
                        const symbol = await contr.methods.symbol().call();
                        const decimals = await contr.methods.decimals().call()
                        res = [{ id: value, symbol, decimals }];
                    }
                    catch (e) {
                        res = []
                    }
                }
            }
            else {
                res = token;
            }
        }

        else {
            res = data.tokens.filter(item => item.symbol.startsWith(value.toUpperCase()))
        }
        setTokensArr(res);
    }

    const handleTokenSelect = (tok) => {

        if (selectedInput === 0) {
            setToken0Select(tok)
        }
        else {
            setToken1Select(tok)
        }
        setWindow(false);
    }


    return (
        <SelectTokenWrapper>
            <h1> Select token</h1>
            <input type={"text"} onChange={(e) => handleSearchToken(e.target.value)} placeholder={"0x or token name"} />
            <SelectionWindow>
                {!tokensArr ? <Spin indicator={LOADER_INDICATOR_LOCAL} /> :
                    <>
                        {tokensArr.map((item, _ind) => {

                            if (item.symbol === token0Select?.symbol || item.symbol === token1Select?.symbol) {
                                return;
                            }

                            return (
                                <li onClick={() => handleTokenSelect({ id: item.id, symbol: item.symbol, decimals: item.decimals })} key={`${item.symbol}_${_ind}`}>
                                    <TokenIcon iconName={item.symbol} />
                                    <h5>{item.symbol}</h5>
                                    <h5>{item.id}</h5>
                                </li>
                            )
                        })}
                    </>
                }
            </SelectionWindow>
            <CancelSelection onClick={() => setWindow(false)}>Cancel</CancelSelection>
        </SelectTokenWrapper>
    )
}