import styled from "styled-components";
import { useThemeContext } from "../../Layout/layout";

export const ActiveMintingContainer = styled.div`
  background: linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%);
  border-radius: 2.083vw;
  width: 17.396vw;
  height: 13.021vw;
  padding: 2.604vw 2.188vw 2.604vw 2.188vw;
  font-size: 0.729vw;
`;

export const Divider = styled.div`
  width: 13.021vw;
  height: 0.052vw;
  background-color: #333;
  margin: 0.781vw 0 0.781vw 0;
`;

export const MintWindowContainer = styled.div`
  background: radial-gradient(
      61.16% 3404.86% at 48.28% 79.61%,
      rgba(30, 117, 89, 0.3) 0%,
      rgba(9, 33, 25, 0.3) 100%
    ),
    linear-gradient(90.99deg, #272727 2.18%, #1c1c1c 104.4%);
  border-radius: 2.083vw;
  width: 100%;
  padding: 1.094vw 2.969vw 2.031vw 2.969vw;
  max-width: 41.563vw;
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-left: 2.448vw;

  svg {
    align-self: center;
    margin: 1.198vw 0;
  }
`;

export const HeadingText = styled.h1`
  color: ${() => (useThemeContext().theme === "light" ? "#333" : "#fff")};
  display: flex;
  text-align: left;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.875vw;
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
    color: ${() => (useThemeContext().theme === "light" ? "#000" : "#fff")};
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
  color: ${() => (useThemeContext().theme === "light" ? "#4F4F4F" : "#fff")};
  margin-top: ${(props) => props.mt};
  background-color: transparent;
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
  }
`;

export const MintModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -0.417vw -0.417vw 1.042vw rgba(28, 27, 27, 0.25),
    0.208vw 0.208vw 0.521vw rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 0.833vw;
  background: #171717;
  width: 3.542vw;
  height: 2.344vw;

  img {
    width: 1.146vw;
    height: 1.146vw;
  }

  &:hover {
    transition: all 0.25s ease-out;
    background: #0e0e0e;
  }
`;

export const MintExchangeContainer = styled.div`
  background-color: ${() =>
    useThemeContext().theme === "light" ? "#FBFBFB" : "#1E1E1E;"};
  margin-top: ${(props) => props.mt};
  height: ${(props) => props.height};
  border-radius: 2.083vw;
  padding: 1.276vw;
  width: 100%;
`;

export const MintExchangeInputContainer = styled.div`
  color: ${(props) =>
    props.placeholderColor ??
    (useThemeContext().theme === "light" ? "#333" : "#fff")};
  margin-top: ${(props) => props.mt};
  padding: 0.521vw 0.573vw 0.521vw 1.302vw;
  justify-content: space-between;
  border: 0.052vw solid #333333;
  border-radius: 2.083vw;
  align-items: center;
  font-size: 1.25vw;
  display: flex;

  width: 33.073vw;
  height: 2.865vw;

  input {
    ::placeholder {
      color: ${(props) =>
        props.placeholderColor ??
        (useThemeContext().theme === "light" ? "#333" : "#fff")};
    }
  }

  button {
    background: #2c2c2c;
    border-radius: 2.083vw;
    width: 4.219vw;
  }
`;

export const TCRInput = styled.input`
  color: ${() => (useThemeContext().theme === "light" ? "#333" : "#fff")};
  font-weight: 300;
  font-size: 0.938vw;
  line-height: 1.406vw;

  ::placeholder {
    color: ${() => (useThemeContext().theme === "light" ? "#333" : "#fff")};
    font-weight: 300;
    font-size: 0.938vw;
    line-height: 1.406vw;
  }
`;
