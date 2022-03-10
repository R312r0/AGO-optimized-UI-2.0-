import styled from "styled-components";

export const ProvideLiquidityContainer = styled.div`
  flex-direction: row;
  margin-top: 1.823vw;
  display: flex;
`;

export const ProvideLiquidityInfoContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#4FCCA4"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 0.781vw 1.875vw 0 2.604vw;
  border-radius: 2.083vw;
  height: 18.385vw;
  width: 46.823vw;
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  margin-right: 0.521vw;
  /* background: ${(props) =>
    props.theme.light
      ? props.withoutWrapper ?? "#F2F2F2"
      : props.withoutWrapper ?? "#1f1e20"}; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.552vw;
  width: 2.552vw;
  img {
    height: ${(props) => props.h ?? "2.552vw"};
    width: ${(props) => props.w ?? "2.552vw"};
  }
`;

export const Text = styled.span`
  font-weight: ${(props) => props.fontWeight ?? "400"};
  font-size: ${(props) => props.fontSize ?? "0.938vw"};
  color: ${(props) =>
    props.color ?? props.theme.light
      ? props.theme.color
        ? "#fff"
        : "#828282"
      : "#4f4f4f"};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  line-height: 1.406vw;
  display: flex;

  b {
    line-height: 1.406vw;
    font-size: 0.938vw;
    font-weight: 500;
    color: ${(props) => (props.theme.color ? "#fff" : "#828282")};
  }
`;

export const LiquidityPoolsInputContainer = styled.div`
  color: ${(props) =>
    props.placeholderColor ?? (props.theme.light ? props.theme.color ? "#fff" : "#333" : "#fff")};
  border: 0.052vw solid;
  border-color: ${(props) =>
    props.theme.light
      ? props.theme.color !== "green" || "violet"
        ? "#E0E0E0"
        : "#fff"
      : "#333"};
  border-radius: 2.083vw;
  padding-left: 1.094vw;
  align-items: center;
  font-size: 0.938vw;
  font-weight: 300;
  display: flex;

  width: 26.615vw;
  height: 2.865vw;

  input {
    width: 100%;
    ::placeholder {
      color: ${(props) =>
        props.theme.light
          ? props.theme.color === "green"
            ? "#fff"
            : props.theme.color === "violet"
            ? "#9421EE"
            : "#bdbdbd"
          : "#333"};
    }
  }
`;

export const PieChartContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#4FCCA4"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  transform: matrix(-1, 0, 0, 1, 0, 0);
  flex-direction: column;
  border-radius: 2.083vw;
  margin-left: 2.396vw;
  align-items: center;
  height: 18.385vw;
  width: 24.792vw;
  display: flex;
`;

export const BtnWrapper = styled.div`
  transform: matrix(-1, 0, 0, 1, 0, 0);
  margin-top: 1.2vw;
  max-height: 1.510vw;
  display: flex;
  align-items: center;

  button:last-child {
    margin-left: 0.5vw;
  }
`;

export const ChartBtn = styled.button`
  border-radius: 1.563vw;
  background: #40ba93;
  height: 1.510vw;
  font-size: 0.729vw;
  width: 5.521vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;
