import styled from "styled-components";
import { useThemeContext } from "../Layout/layout";

export const NoWalletWarnWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  top: 50%;

  button {
    color: ${() => (useThemeContext().theme === "light" ? "#333" : "#fff")};
    justify-content: center;
    margin-top: 1vw;
    border-radius: 2.083vw;
    align-items: center;
    align-self: center;
    font-size: 1vw;
    display: flex;
    width: 15.625vw;
    background: #40ba93;
    height: 3.698vw;
  }
`;

export const HeadingText = styled.h1`
  color: ${() => (useThemeContext().theme === "light" ? "#333" : "#fff")};
  line-height: 1.875vw;
  font-size: 1.25vw;
  font-weight: 500;
`;

export const Text = styled.span`
  font-size: ${(props) => props.fontSize ?? "0.729vw"};
  color: ${(props) => props.color ?? "#4f4f4f"};
  display: flex;
  align-items: center;
  font-weight: 500;
  line-height: 1.094vw;

  img {
    width: 1.875vw;
    height: 1.875vw;
    margin-right: 0.26vw;
  }

  b {
    color: ${() => (useThemeContext().theme === "light" ? "#000" : "#fff")};
    font-size: ${(props) => (props.isBalance ? "0.729vw" : "inherit")};
    font-weight: 400;
  }
`;

export const Dot = styled.div`
  background: #40ba93;
  border-radius: 50%;
  margin: 0 2.604vw;
  width: 0.313vw;
  height: 0.313vw;
`;

export const MintingRedeemingContainer = styled.div`
  padding: 0 0 3vw 2.5vw;
  flex-direction: column;
  display: flex;
`;

export const MintRedeemInfoContainer = styled.div`
  padding: 0.625vw 3.62vw 0.625vw 3.62vw;
  border-radius: 2.083vw;
  align-items: center;
  margin-top: 2.083vw;
  background: #1e1e1e;
  display: flex;
  width: 86.51vw;
  height: 2.396vw;
`;

export const ContactLinkContainer = styled.div`
  font-size: ${(props) => props.fontSize ?? "0.729vw"};
  text-decoration: underline;
  margin-left: 15.469vw;
  line-height: 1.094vw;
  font-weight: 300;
  color: #fff;

  a,
  a:hover,
  a:visited,
  a:active {
    color: inherit;
    text-decoration: none;
  }

  i {
    margin-left: 0.573vw;
  }
`;

export const MintRedeemSwitcher = styled.div`
  margin-top: 1.719vw;
  font-size: 0.938vw;
  align-self: center;
  display: flex;
`;

export const SwithButton = styled.button`
  color: ${(props) =>
    props.isActive
      ? useThemeContext().theme === "light"
        ? "#000"
        : "#fff"
      : "#4F4F4F"};
  background: ${(props) => (props.isActive ? "#40ba93" : "transparent")};
  padding: 0.365vw 1.406vw;
  border-radius: 2.083vw;
  height: 2.135vw;
`;

export const ExchangeContainer = styled.div`
  margin-top: 1.771vw;
  display: flex;
`;
