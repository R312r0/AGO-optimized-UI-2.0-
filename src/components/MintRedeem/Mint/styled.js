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

export const Divider = styled.div`
  width: 13.021vw;
  height: 0.052vw;
  background-color: ${(props) => (props.theme.light ? "#F2F2F2" : "#333")};
  margin: 0.781vw 0 0.781vw 0;
`;

export const MintWindowContainer = styled.div`
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
  padding: 1.198vw 2.969vw 2.031vw 2.969vw;
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
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
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

export const MintBtn = styled.button`
  color: ${(props) => (props.theme.light ? "#4F4F4F" : "#fff")};
  margin-top: ${(props) => props.mt};
  background: transparent;
  cursor: pointer;
  display: flex;
  font-size: 0.938vw;
  justify-content: center;
  border-radius: 2.083vw;
  align-items: center;
  align-self: center;
  border: 0.052vw solid #40ba93;
  width: 15.625vw;
  height: 3.698vw;

  &:hover {
    background: linear-gradient(101.05deg, #40ba93 23.7%, #9421ee 145.83%);
    /* background: green; */
    /* background: -webkit-linear-gradient(top, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); */
  }
`;

export const MintExchangeContainer = styled.div`
  background-color: ${(props) => (props.theme.light ? "#FBFBFB" : "#1E1E1E")};
  margin-top: ${(props) => props.mt};
  height: ${(props) => props.height};
  border-radius: 2.083vw;
  padding: 1.276vw;
  width: 100%;
`;

export const MintExchangeInputContainer = styled.div`
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
  }
`;

export const TCRInput = styled.input`
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  font-weight: 300;
  font-size: 0.938vw;
  line-height: 1.406vw;

  ::placeholder {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    font-weight: 300;
    font-size: 0.938vw;
    line-height: 1.406vw;
  }
`;
