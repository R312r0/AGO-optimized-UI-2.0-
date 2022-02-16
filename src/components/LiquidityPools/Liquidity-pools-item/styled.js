import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/system";

export const LiquidityPoolsItemContainer = styled.div`
  align-items: ${(props) => (props.isExpanded ? "flex-start" : "center")};
  height: ${(props) => (props.isExpanded ? "29.479vw" : "4.375vw")};
  transition: all 0.2s ease-in-out;
  padding: 0.911vw 3.906vw;
  flex-direction: column;
  border-radius: 2.083vw;
  margin-top: 0.833vw;
  width: 81.823vw;
  display: flex;
  background: ${(props) =>
    props.isExpanded
      ? props.theme.light
        ? props.theme.color === "green"
          ? "linear-gradient(90.44deg, #0A8080 -0.21%, #33D8A3 106.52%)"
          : props.theme.color === "violet"
          ? "linear-gradient(90.19deg, #BB70FB -3.27%, #CFAAEC 103.63%)"
          : "#fff"
        : props.theme.color === "green"
        ? "linear-gradient(90.44deg, #0a8080 -0.21%, #33d8a3 106.52%)"
        : props.theme.color === "violet"
        ? "linear-gradient(158.87deg, #560397 -77.98%, #202020 41.57%)"
        : "linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%)"
      : props.theme.light
      ? props.theme.color === "green"
        ? "linear-gradient(90.44deg, #0a8080 -0.21%, #33d8a3 106.52%)"
        : props.theme.color === "violet"
        ? "linear-gradient(90.19deg, #BB70FB -3.27%, #CFAAEC 103.63%)"
        : "#fff"
      : props.theme.color === "green"
      ? "linear-gradient(90.44deg, #0a8080 -0.21%, #33d8a3 106.52%)"
      : props.theme.color === "violet"
      ? "linear-gradient(90.19deg, #560397 -3.27%, #3D1B57 103.63%)"
      : "linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%)"};

  box-shadow: 0 0.208vw 1vw rgba(0, 0, 0, 0.25);
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  margin-right: ${(props) => props.mr};
  left: ${(props) => props.left};
  background: ${(props) =>
    props.theme.light
      ? props.withoutWrapper ?? "#F2F2F2"
      : props.withoutWrapper ?? "#1f1e20"};
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.552vw;
  width: 2.552vw;
  img {
    height: ${(props) => props.h ?? "1.771vw"};
    width: ${(props) => props.w ?? "1.771vw"};
  }
`;

export const Text = styled.span`
  color: ${(props) =>
    props.color ?? props.theme.light
      ? props.theme.color
        ? "#fff"
        : "#828282"
      : "#fff"};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  display: flex;

  b {
    line-height: 1.406vw;
    font-size: 0.938vw;
    font-weight: 500;
  }
`;

export const ExpandedDataWrapper = styled.div`
  animation: 0.2s show ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const AprValueWrapper = styled.div`
  color: ${(props) =>
    props.theme.color ? "#fff" : props.theme.light ? "#333" : "#fff"};
  justify-content: center;
  border-radius: 1.042vw;
  align-items: center;
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#009B78"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : props.theme.color === "green"
      ? "#005e48;"
      : props.theme.color === "violet"
      ? "#320952"
      : "#2D2D2D"};
  font-size: 0.938vw;
  height: 2.031vw;
  width: 5.521vw;
  display: flex;
`;

export const ToggleExpandBtn = styled.button`
  justify-content: center;
  border-radius: 1.042vw;
  margin-left: 6.45vw;
  background: ${(props) => (props.theme.light ? "#F2F2F2" : "#1e1e1e")};
  align-items: center;
  height: 1.615vw;
  width: 3.542vw;
  display: flex;

  svg {
    height: 0.729vw;
    width: 0.729vw;
    fill: ${(props) => (props.theme.light ? "#828282" : "#4f4f4f")};
    stroke: ${(props) => (props.theme.light ? "#828282" : "#4f4f4f")};
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const LiquidityInfoContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#4FCCA4"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  margin-left: ${(props) => props.ml};
  padding: 2.031vw 2.005vw;
  border-radius: 2.083vw;
  height: 13.021vw;
  width: 19.063vw;
  font-weight: 300;
  font-size: 0.729vw;
  line-height: 1.094vw;
  color: #828282;

  b {
    color: ${(props) => (props.theme.light ? props.theme.color ? "#fff" : "#828282" : "#fff")};
    font-weight: 500;
    font-size: 0.729vw;
    line-height: 1.094vw;
  }
`;

export const Divider = styled.div`
  background: ${(props) => (props.theme.light ? "#66D6B2" : "#333")};
  width: 15.052vw;
  height: 0.052vw;
  margin: 0.417vw 0;
`;

export const TabContentWrapper = styled.div`
  padding-top: 1.823vw;
  display: flex;
`;

export const Tabs = styledMUI(TabsUnstyled)(() => ({
  marginTop: "1.563vw",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const TabsList = styledMUI(TabsListUnstyled)(() => ({
  height: "2.135vw",
  display: "flex",
}));

export const Tab = styledMUI(TabUnstyled)(() => ({
  borderRadius: "1.042vw",
  fontSize: "0.729vw",
  display: "flex",
  alignItems: "center",
  padding: "0.521vw 1.250vw",
  marginRight: "1.042vw",
  fontWeight: 500,

  "&.Mui-selected": {
    background: "#40BA93",
    color: "#fff",
  },

  "&:hover": {
    opacity: "0.8",
  },

  "&.MuiTab-root": {
    padding: "1vw",
    width: "10vw",
  },
}));

export const TabPanel = styledMUI(TabPanelUnstyled)(() => ({}));
