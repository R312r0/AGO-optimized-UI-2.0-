import {
  AmountSlider,
  Container,
  Dot,
  HDiv,
  HeadingText,
  IOSSwitch,
  InputWrapper,
  SplitSlider,
  SplitSlider2,
  SplitSlider3,
  StopLossSlider,
  Text,
  TradeBtn,
  TradingFiltersContainer,
  TrailingSlider,
  VDiv,
} from "./styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import info_icon from "./../../../assets/icons/additionally-info.svg";

const TradingFilters = () => {
  function valuetext(value) {
    return `-${value}%`;
  }

  return (
    <>
      <TradingFiltersContainer>
        <HeadingText>Balance: 3000 USDT</HeadingText>
        <HDiv
          alignItems="center"
          justifyContent="space-between"
          ml="8.542vw"
          mr="8.542vw"
          mt="2.083vw"
        >
          <Text>
            <b>Market</b>
          </Text>
          <Text color="#40BA93">
            <b>Limit</b>
          </Text>
        </HDiv>
        <Container height="10.990vw" mt="1.406vw">
          <HDiv alignItems="center" justifyContent="space-between">
            <div
              style={{
                display: "flex",
                flexDireaction: "row",
                alignItems: "center",
              }}
            >
              <Text>
                <b>WBTC/USDT</b>
              </Text>
              <KeyboardArrowDownIcon />
            </div>
            <InputWrapper height="1.979vw" width="14.740vw" fontSize="0.729vw">
              <input type="text" placeholder="Amount" />
            </InputWrapper>
          </HDiv>
          <HDiv mt="0.313vw">
            <InputWrapper
              height="1.979vw"
              width="5.885vw"
              padding="0 1.510vw"
              fontSize="0.938vw"
            >
              <input type="text" value="54300" />
            </InputWrapper>
            <AmountSlider
              className="range-slider-filter"
              defaultValue={5}
              marks
              step={1}
              min={1}
              max={5}
            />
          </HDiv>
          <HDiv alignItems="center">
            <IOSSwitch />
            <Dot ml="0 0.313vw 0 5.521vw" />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="53600" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>1</span>
            </VDiv>
            <Dot />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="52800" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>2</span>
            </VDiv>
            <Dot />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="52300" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>3</span>
            </VDiv>
          </HDiv>
          <HDiv alignItems="center">
            <Text>Split Buy</Text>
            <img
              src={info_icon}
              alt="ico"
              style={{
                marginLeft: "0.156vw",
                width: "0.625vw",
                height: "0.625vw",
              }}
            />
            <VDiv ml="6.198vw">
              <SplitSlider defaultValue={2} step={2} min={1} max={2} />
            </VDiv>
            <VDiv ml="3.7vw">
              <SplitSlider2 defaultValue={2} step={1} min={1} max={3} />
            </VDiv>
            <VDiv ml="2.3vw">
              <SplitSlider3 defaultValue={2} step={1} min={1} max={4} />
            </VDiv>
          </HDiv>
          <HDiv alignItems="center" mt="8">
            <VDiv ml="10.4vw" color="#fff">
              <span>20%</span>
            </VDiv>
            <VDiv ml="4.4vw" color="#fff">
              <span>50%</span>
            </VDiv>
            <VDiv ml="4.1vw" color="#fff">
              <span>70%</span>
            </VDiv>
          </HDiv>
        </Container>
        <HDiv mt="0.833vw" ml="0.6vw">
          <Text fontSize="0.938vw">
            <b>Take Profit</b>
          </Text>
        </HDiv>
        <Container mt="0.156vw">
          <HDiv alignItems="center" justifyContent="space-between" mt="-0.4vw">
            <Text fontSize="0.938vw">Last</Text>
            <InputWrapper
              height="1.979vw"
              width="5.885vw"
              padding="0 1.510vw"
              fontSize="0.938vw"
            >
              <input type="text" value="54300" />
            </InputWrapper>
          </HDiv>
          <HDiv alignItems="center">
            <IOSSwitch />
            <Dot ml="0 0.313vw 0 5.521vw" />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="53600" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>1</span>
            </VDiv>
            <Dot />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="52800" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>2</span>
            </VDiv>
            <Dot />
            <VDiv style={{ paddingTop: "0.8vw" }}>
              <InputWrapper height="1.458vw" width="4.219vw" fontSize="0.729vw">
                <input value="52300" />
              </InputWrapper>
              <span style={{ marginTop: "0.104vw" }}>3</span>
            </VDiv>
          </HDiv>
          <HDiv alignItems="center">
            <Text>Split T/P</Text>
            <img
              src={info_icon}
              alt="ico"
              style={{
                marginLeft: "0.156vw",
                width: "0.625vw",
                height: "0.625vw",
              }}
            />
            <VDiv ml="6.198vw">
              <SplitSlider defaultValue={2} step={2} min={1} max={2} />
            </VDiv>
            <VDiv ml="3.7vw">
              <SplitSlider2 defaultValue={2} step={1} min={1} max={3} />
            </VDiv>
          </HDiv>
          <HDiv alignItems="center" mt="8">
            <VDiv ml="10.4vw" color="#fff">
              <span>20%</span>
            </VDiv>
            <VDiv ml="4.4vw" color="#fff">
              <span>50%</span>
            </VDiv>
          </HDiv>
          <HDiv mt="1.719vw">
            <IOSSwitch />
          </HDiv>
          <HDiv alignItems="center" mt="0.729vw">
            <Text>Trailing Take Profit</Text>
            <img
              src={info_icon}
              alt="ico"
              style={{
                marginLeft: "0.156vw",
                width: "0.625vw",
                height: "0.625vw",
              }}
            />
          </HDiv>
          <HDiv alignItems="center" justifyContent="space-between">
            <TrailingSlider
              size="small"
              defaultValue={5}
              max={10}
              min={1}
              valueLabelDisplay="auto"
              valueLabelFormat={valuetext}
              track="inverted"
              disabled
            />
            <InputWrapper
              height="1.458vw"
              width="4.219vw"
              fontSize="0.729vw"
              padding="0  0 0 1.4vw"
            >
              <input type="text" placeholder="-0%" disabled />
            </InputWrapper>
          </HDiv>
        </Container>
        <HDiv ml="0.6vw" mt="1.823vw">
          <Text fontSize="0.938vw">
            <b>Stop Loss</b>
          </Text>
          <IOSSwitch sx={{ marginLeft: "0.573vw" }} />
        </HDiv>
        <Container mt="0.313vw">
          <HDiv alignItems="center" justifyContent="space-between">
            <Text fontSize="0.938vw">Last</Text>
            <InputWrapper
              height="1.979vw"
              width="5.885vw"
              padding="0 1.510vw"
              fontSize="0.938vw"
            >
              <input type="text" value="51500" />
            </InputWrapper>
          </HDiv>
          <HDiv alignItems="center" justifyContent="space-between">
            <StopLossSlider
              size="small"
              defaultValue={5}
              max={10}
              min={1}
              valueLabelDisplay="auto"
              valueLabelFormat={valuetext}
              track="inverted"
            />
            <InputWrapper
              height="1.458vw"
              width="4.219vw"
              fontSize="0.729vw"
              padding="0  0 0 1.4vw"
            >
              <input type="text" value="-5%" disabled />
            </InputWrapper>
          </HDiv>
        </Container>
        <TradeBtn>Trade</TradeBtn>
      </TradingFiltersContainer>
    </>
  );
};

export default TradingFilters;
