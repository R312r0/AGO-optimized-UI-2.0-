import styled from "styled-components";

export const NoWalletWarnWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  top: 50%;

  button {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
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

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
`;

export const HeadingText = styled.h1`
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
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
    color: ${(props) => (props.theme.light ? "#000" : "#333")};
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
  padding: 0.625vw 0 0.625vw 3.177vw;
  border-radius: 2.083vw;
  align-items: center;
  display: flex;
  width: 66.979vw;
  height: 2.396vw;
  background: ${(props) => (props.theme.light ? "#fff" : "#1e1e1e")};

  b{
    color: ${(props) => (props.theme.light ? "#40BA93" : "#fff")};
  }
`;

export const ContactLinkContainer = styled.div`
  font-size: ${(props) => props.fontSize ?? "0.729vw"};
  color: ${(props) => (props.theme.light ? "#4f4f4f" : "#fff")};
  text-decoration: underline;
  margin-left: 11.667vw;
  line-height: 1.094vw;
  font-weight: 300;

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

export const ExchangeContainer = styled.div`
  margin-top: 1.719vw;
  display: flex;
`;
