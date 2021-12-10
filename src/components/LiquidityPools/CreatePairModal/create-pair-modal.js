import React, {useState} from 'react';
import {Modal} from "antd";
import styled from "styled-components";
import {TokenIcon} from "../../TokenIcon/token_icon";

const ModalHeader = styled.h1`
  color: white;
`

const TokenSelectBlock = styled.div`
  background: #1E1E1E;
  justify-self: center;
  align-self: center;
  width: 80%;
  height: 80%;
  border-radius: 25px;
  box-sizing: border-box;
  padding: 5px 10px;
  display: grid;
  grid-template-rows: 1fr 2fr;
  p {
    color: white;
  }
  div {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    align-items: center;
    input {
      color: white;
      &::placeholder {
        color: white;
      }
    }  
    .max {
        background: #40BA93;
        border-radius: 25px;
        color: white;
        height: 50%;
        width: 80%;
        border: 0px;
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
  width: 50%;
  height: 80%;
  background: #40BA93;
  border-radius: 25px;
  justify-self: center;
  align-self: center;
  border: 0px;
  color: white;
`
const SelectionWindow = styled.ul`
  height: 100%;
  overflow-y: scroll;
`

export const CreatePairModal = ({visible, setVisible}) => {

    const [token0Select, setToken0Select] = useState(null);
    const [token1Select, setToken1Select] = useState(null);
    const [tokenSelectWindow, setTokenSelectWindow] = useState(false)

    const CreatePairButton = () => {

        return (
            <CreatePairButtonWrapper>Create</CreatePairButtonWrapper>
        )

    }

    return (
        <Modal visible={visible}
               onCancel={() => setVisible(false)}
               wrapClassName={"create-pair-modal"}
               footer={null}
        >
            {tokenSelectWindow ?
                <SelectTokenWindow/>
                :
                <>
                    <ModalHeader> Create pair </ModalHeader>
                    <TokenSelectBlock>
                        <p> Input </p>
                        <div>
                            <input placeholder={"0.0"}/>
                            <button className={'max'}>MAX</button>
                            <button className={'token-sel'}>
                                <TokenIcon iconName={"WMATIC"}/>
                                <span>MATIC </span>
                            </button>
                        </div>
                    </TokenSelectBlock>
                    <TokenSelectBlock>
                        <p> Input </p>
                        <div>
                            <input placeholder={"0.0"}/>
                            <button className={'max'}>MAX</button>
                            <button className={'token-sel'}>
                                <TokenIcon iconName={"AGO"}/>
                                <span>AGO</span>
                            </button>
                        </div>
                    </TokenSelectBlock>
                    <CreatePairButton/>
                </>
            }
        </Modal>
    )
}

const SelectTokenWindow = ({set}) => {



    return (
        <>
            <h1> Select token</h1>
            <button>x</button>
            <SelectionWindow>

            </SelectionWindow>
        </>
    )
}