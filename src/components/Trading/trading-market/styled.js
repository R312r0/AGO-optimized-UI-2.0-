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
  box-shadow: 0 0.208vw 2.083vw rgba(0, 0, 0, 0.25);
  border-radius: 2.083vw;
  position: relative;
  flex-direction: column;
  width: 33.438vw;
  display: flex;
  padding: 1.25vw 2.344vw 1.563vw 2.344vw;
  min-height: 20.833vw;
`;

export const SwapIconContainer = styled.div`
  display: flex;
  align-items: flex-end;

  img {
    cursor: pointer;
    margin-bottom: 0.625vw;
    margin-top: 0.625vw;
    margin-left: 6.979vw;
    height: 1.875vw;
  }
`;

export const HeadingText = styled.h1`
  display: flex;
  text-align: left;
  margin-left: 1.51vw;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.875vw;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
`;

export const HeadingButton = styled.button`
  display: flex;
  width: 2.292vw;
  height: 2.292vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${() =>
    useThemeContext().theme === "light" ? "#828282" : "#1f1e20"};
  border-radius: 0.521vw;
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
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  font-weight: 500;
  font-size: 0.938vw;
  line-height: 1.406vw;
  min-width: 3.958vw;
`;
export const ExchangeContainer = styled.div`
  background-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#1f1e20")};
  margin-top: ${(props) => props.mt};
  padding: 0.521vw 1.094vw 1.146vw 1.094vw;
  height: ${(props) => props.height};
  border-radius: 1.563vw;
  width: 28.75vw;

  button {
    border: 0.052vw solid #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.521vw;
    margin-left: 2.188vw;
    width: 1.875vw;
    height: 1.875vw;

    img {
      width: 1.042vw;
      height: 0.625vw;
    }
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  display: flex;
  min-height: ${(props) => props.minH};

  div {
    display: flex;
    align-items: center;
  }

  b {
    color: ${() => (useThemeContext().theme === "light" ? "#000" : "#fff")};
    font-weight: 500;
  }

  img {
    margin-left: 0.625vw;
    margin-right: 0.469vw;
    width: 1.458vw;
    height: 1.458vw;
  }

  .swap-icon {
    margin: 0;
  }
`;

export const ExchangeInputContainer = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  align-items: center;
  border: 0.052vw solid #333333;
  align-items: center;
  display: flex;
  padding: 0 0.521vw 0 1.25vw;
  border-radius: 1.563vw;
  font-size: 0.938vw;

  width: 26.563vw;
  height: 2.865vw;
  color: #828282;

  button {
    background: #2c2c2c;
    font-size: 0.938vw;
    border-radius: 2.083vw;
    width: 4.219vw;
    height: 1.875vw;

    &:hover {
      opacity: 0.8;
    }
  }
`;
