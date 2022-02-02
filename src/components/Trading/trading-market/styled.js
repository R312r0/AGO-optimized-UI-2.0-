import styled from "styled-components";
import { useThemeContext } from "../../Layout/layout";

export const SwapButtonWrapper = styled.button`
  width: 7.292vw;
  height: 1.875vw;

  margin: 0.938vw auto 0;

  font-size: 0.729vw;
  font-weight: 500;
  background: ${(props) =>
    props.disabled
      ? "transparent"
      : props.approveButton
      ? "linear-gradient(98.62deg, #10DC9B 16.01%, #9421EE 160.52%)"
      : "#10DC9B"};
  color: ${(props) => (props.disabled ? "#4f4f4f" : "white")};
  box-shadow: 0 0.208vw 0.208vw rgba(24, 24, 24, 0.25);
  border: ${(props) => (props.approveButton ? "none" : "1px solid #10dc9b")};
  border-radius: 1.042vw;

  &:hover {
    background: ${(props) =>
      props.approveButton
        ? " linear-gradient(101.04deg, #28DEA4 45.43%, #9421EE 180.76%)"
        : ""};
  }

  cursor: ${(props) => (props.disabled ? "none" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
`;

export const TradingWindowContainer = styled.div`
  background: ${() =>
    useThemeContext().theme === "light"
      ? "#FFF"
      : "radial-gradient(94.26% 94.26% at 47.39% 30.04%, rgba(64, 186, 147, 0.16) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.25);
  padding: 42px 3.854vw 99px 3.854vw;
  border-radius: 40px;
  position: relative;
  flex-direction: column;
  width: 100%;
  display: flex;

  .arrow-swap {
    cursor: pointer;
    margin: 18px 0;
    height: 36px;
  }
`;

export const HeadingText = styled.h1`
  display: flex;
  text-align: left;
  margin-bottom: 36px;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: ${() => (useThemeContext().theme === "light" ? "#000" : "#fff")};
`;

export const HeadingButton = styled.button`
  display: flex;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${() =>
    useThemeContext().theme === "light" ? "#828282" : "#1f1e20"};
  border-radius: 10px;
  &:first-child {
    margin-right: 1.25vw;
  }
  svg {
    width: 1.042vw;
    height: 1.042vw;

    &:last-child {
      width: 1.458vw;
    }
  }
`;

export const Text = styled.div`
  color: ${(props) => props.color ?? "#828282"};
  margin-left: ${(props) => props.marginLeft};
  min-width: 76px;
  font-weight: 500;
  font-size: 18px;
  height: 27px;
`;
export const ExchangeContainer = styled.div`
  margin-top: ${(props) => props.marginTop};
  padding: 0 22px 0 22px;
  height: ${(props) => props.height};
  border-radius: 30px;
  background-color: ${() =>
    useThemeContext().theme === "light" ? "#E0E0E0" : "#1f1e20"};
  width: 100%;

  button {
    border: 1px solid #333333;
    box-sizing: border-box;
    border-radius: 10px;
    margin-left: 1.302vw;
    min-width: 36px;
    height: 36px;
  }
`;

export const HDiv = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;

  div {
    display: flex;
    height: 36px;
    align-items: center;
  }

  b {
    color: ${() => (useThemeContext().theme === "light" ? "#000" : "#fff")};
    font-weight: 500;
    margin: 0 4px;
  }
`;

export const ExchangeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #333333;
  padding: 0 9px 0 20px;
  margin-top: 15px;
  border-radius: 30px;
  width: 100%;
  height: 55px;
  color: #828282;

  button {
    background: #828282;
    border-radius: 40px;
    color: red;
  }
`;
