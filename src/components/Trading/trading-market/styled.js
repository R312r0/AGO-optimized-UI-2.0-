import styled from "styled-components";

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
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "radial-gradient(94.26% 94.26% at 47.39% 30.04%, rgba(64, 186, 147, 0.16) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 1.25vw 2.344vw 1.563vw 2.344vw;
  box-shadow: 0 0.208vw 2.083vw rgba(0, 0, 0, 0.25);
  border-radius: 2.083vw;
  flex-direction: column;
  margin-left: 2.031vw;
  margin-top: 1.302vw;
  width: 33.438vw;
  height: 37.656vw;
  display: flex;
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
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  display: flex;
  text-align: left;
  margin-left: 1.51vw;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.875vw;
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
  background-color: ${(props) => (props.theme.light ? "#828282" : "#1f1e20")};
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

  b {
    font-weight: 400;
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  }
`;

export const IconWrapper = styled.div`
  margin: ${(props) => props.margin ?? "0.625vw 0"};
  align-self: center;
  display: flex;

  img {
    height: 1.4vw;
    width: 1.4vw;
  }
`;

export const ChangeTokenBtn = styled.button`
  background: ${(props) => (props.theme.light ? "#f2f2f2" : "#1F1E20")};
  border-radius: 0.521vw;
  border: ${(props) => (props.theme.light ? "none" : " 0.052vw solid #333")};
  height: 1.875vw;
  width: 1.875vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2.188vw;

  img {
    width: 1.042vw;
    height: 0.625vw;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ExchangeContainer = styled.div`
  background-color: ${(props) => (props.theme.light ? "#FBFBFB" : "#1f1e20")};
  margin-top: ${(props) => props.mt};
  padding: 0.521vw 1.094vw 1.146vw 1.094vw;
  height: ${(props) => props.height};
  border-radius: 1.563vw;
  width: 28.75vw;
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  display: flex;
`;

export const ExchangeInputContainer = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  padding: 0 0.521vw 0 1.25vw;
  border-radius: 1.563vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  align-items: center;
  width: 26.563vw;
  height: 2.865vw;
  display: flex;

  input {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    font-size: 0.938vw;
    font-weight: 300;
    height: 2.865vw;
    width: 26.563vw;
    ::placeholder {
      color: ${(props) => (props.theme.light ? "#BDBDBD" : "#333")};
    }
  }

  button {
    border-radius: 2.083vw;
    background: ${(props) =>
      props.theme.light
        ? "linear-gradient(115.52deg, #40BA93 33.63%, #C407E3 130.81%)"
        : "#2c2c2c"};
    font-size: 0.729vw;
    height: 1.875vw;
    width: 4.219vw;
    border: none;
    color: #fff;

    &:hover {
      opacity: 0.8;
    }
  }
`;
