import styled from "styled-components";

export const FoundryDataContainer = styled.div`
  width: 63.542vw;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  display: grid;
  grid-gap: 1.042vw;
  margin-top: 3.125vw;
`;

export const FoundryDataItemContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "linear-gradient(84.78deg, #40BA93 -6.91%, #05FCAD 161.21%)"
      : "radial-gradient(61.16% 3404.86% at 48.28% 79.61%,rgba(30, 117, 89, 0.3) 0%,rgba(9, 33, 25, 0.3) 100%),linear-gradient(90.99deg, #272727 2.18%, #1c1c1c 104.4%)"};
  box-shadow: ${(props) =>
    props.theme.light
      ? "0 0.208vw 3.125vw rgba(187, 187, 187, 0.25)"
      : "0 0.208vw 0.833vw rgba(0, 0, 0, 0.25)"};
  padding: 1.406vw 2.161vw 0 2.161vw;
  flex-direction: column;
  display: flex;
  border-radius: 2.083vw;
  height: 7.188vw;
  width: 31.25vw;
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  flex-direction: row;
  display: flex;

  svg {
    fill: ${(props) => (props.theme.light ? "#fff" : "#1E7559")};
    align-self: center;
  }
`;

export const VDiv = styled.div`
  flex-direction: column;
  display: flex;
`;

export const Text = styled.span`
  color: ${(props) => (props.theme.light ? "#fff" : "#828282")};
  font-size: ${(props) => props.fontSize ?? "0.729vw"};
  margin-top: ${(props) => props.mt};
  line-height: ${(props) => props.lineHeight ?? "1.094vw"};
  font-weight: ${(props) => props.fontWeight ?? 400};

  b {
    font-weight: inherit;
    color: #fff;
  }
`;

export const Divider = styled.div`
  background: ${(props) => (props.theme.light ? "#fff" : "#40ba93")};
  margin: 0 2.083vw;
  height: 2.865vw;
  width: 0.052vw;
`;
