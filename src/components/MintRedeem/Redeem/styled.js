import styled from "styled-components";

export const ActiveMintingContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 2.604vw 2.188vw 2.604vw 2.188vw;
  border-radius: 2.083vw;
  margin-top: 2.083vw;
  font-size: 0.729vw;
  height: 13.021vw;
  width: 17.396vw;
  box-shadow: ${(props) =>
    props.theme.light ? "0 0.208vw 3.125vw rgba(187, 187, 187, 0.25);" : ""};
`;

export const RedemptionContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 2.604vw 2.188vw 2.604vw 2.188vw;
  border-radius: 2.083vw;
  font-size: 0.729vw;
  width: 17.396vw;
  height: 9.427vw;
  box-shadow: ${(props) =>
    props.theme.light ? "0 0.208vw 3.125vw rgba(187, 187, 187, 0.25);" : ""};
`;

export const AdditionalBlocksContainer = styled.div``;

export const MintRedeemSwitcher = styled.div`
  font-size: 0.938vw;
  display: flex;
  margin-left: 3.3vw;
`;

export const SwithButton = styled.button`
  color: ${(props) =>
    props.theme.light
      ? props.isActive
        ? "#333"
        : "#4f4f4f"
      : props.isActive
      ? "#fff"
      : "#BDBDBD"};
  background: ${(props) => (props.isActive ? "#40ba93" : "transparent")};
  padding: 0.365vw 1.406vw;
  border-radius: 2.083vw;
  height: 2.135vw;

  &:hover {
    opacity: 0.8;
    color: ${(props) =>
      props.theme.light
        ? props.isActive
          ? ""
          : "#333"
        : props.isActive
        ? ""
        : "#fff"};
  }
`;

export const CollectBtn = styled.button`
  border: 0.052vw solid;
  border-color: ${(props) => (props.disabled ? "#4F4F4F" : "#40ba93")};
  color: ${(props) =>
    props.disabled ? "#4F4F4F" : props.theme.light ? "#4F4F4F" : "#fff"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 1.042vw;
  width: 4.896vw;
  height: 1.615vw;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "unset"
        : "linear-gradient(101.05deg, #40ba93 23.7%, #9421ee 145.83%)"};
  }
`;

export const Divider = styled.div`
  width: 13.021vw;
  height: 0.052vw;
  background-color: ${(props) => (props.theme.light ? "#F2F2F2" : "#333")};
  margin: 0.781vw 0 0.781vw 0;
`;

export const RedeemWindowContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
  border-radius: 2.083vw;
  box-shadow: ${(props) =>
    props.theme.light
      ? "box-shadow: 0 0.208vw 3.125vw rgba(187, 187, 187, 0.25);"
      : "box-shadow: 0 0.208vw 0.833vw rgba(0, 0, 0, 0.25);"}
  width: 100%;
  padding: 1.198vw 2.969vw 1.563vw 2.969vw;
  max-width: 41.563vw;
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-left: 2.448vw;

  svg {
    align-self: center;
    margin: 0.521vw 0;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => props.fontSize ?? "0.938vw"};
  color: ${(props) => props.color ?? "#4f4f4f"};
  display: flex;
  align-items: center;
  font-weight: 500;
  line-height: 1.406vw;

  img {
    width: 1.875vw;
    height: 1.875vw;
    margin-right: 0.26vw;
  }

  b {
    color: ${(props) => props.color ?? (props.theme.light ? "#000" : "#fff")};
    font-size: ${(props) => (props.isBalance ? "0.729vw" : "inherit")};
    font-weight: 400;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

export const RedeemBtn = styled.button`
  color: ${(props) =>
    props.disabled ? "#4F4F4F" : props.theme.light ? "#4F4F4F" : "#fff"};
  margin-top: 1.875vw;
  background-color: transparent;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  border-radius: 2.083vw;
  align-items: center;
  font-size: 0.938vw;
  align-self: center;
  border: 0.052vw solid;
  border-color: ${(props) => (props.disabled ? "#4F4F4F" : "#40ba93")};
  width: 15.625vw;
  height: 3.698vw;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "unset"
        : "linear-gradient(101.05deg, #40ba93 23.7%, #9421ee 145.83%)"};
  }
`;

export const RedeemExchangeContainer = styled.div`
  background-color: ${(props) => (props.theme.light ? "#FBFBFB" : "#1E1E1E;")};
  margin-top: ${(props) => props.mt};
  height: ${(props) => props.height};
  border-radius: 2.083vw;
  padding: 1.276vw;
  width: 100%;
`;

export const RedeemExchangeInputContainer = styled.div`
  color: ${(props) =>
    props.placeholderColor ?? (props.theme.light ? "#333" : "#fff")};
  margin-top: ${(props) => props.mt};
  padding: 0.521vw 0.573vw 0.521vw 1.302vw;
  justify-content: space-between;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  border-radius: 2.083vw;
  align-items: center;
  font-size: 1.25vw;
  display: flex;

  width: 33.073vw;
  height: 2.865vw;

  input {
    ::placeholder {
      color: ${(props) =>
        props.placeholderColor ?? (props.theme.light ? "#333" : "#fff")};
    }
  }

  button {
    font-size: 0.729vw;
    border-radius: 2.083vw;
    width: 4.219vw;
    height: 1.875vw;
    background: ${(props) =>
      props.theme.light
        ? "linear-gradient(288.26deg, #9421EE -65.56%, #40BA93 74.1%)"
        : "#2c2c2c"};
    color: #fff;

    &:hover {
      opacity: 0.8;
      color: #fff;
    }
`;
