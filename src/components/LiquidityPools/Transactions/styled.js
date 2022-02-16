import styled from "styled-components";

export const TransactionsContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const TransactionsInfoContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#4FCCA4"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 0.625vw 0 3vw 2.344vw;
  border-radius: 2.083vw;
  margin-top: 0.99vw;
  height: 18.385vw;
  width: 74.01vw;
`;

export const Text = styled.span`
  min-width: ${(props) => props.minW};
  margin-left: ${(props) => props.ml};
  line-height: 1.406vw;
  font-size: 0.938vw;
  font-weight: 300;
  color: ${(props) =>
    props.theme.light
      ? props.theme.color
        ? "#fff"
        : "#828282"
      : props.color ?? "#BDBDBD"};

  b {
    font-weight: 500;
    color: ${(props) =>
      props.theme.light ? (props.theme.color ? "#fff" : "#828282") : "#fff"};
  }
`;

export const BtnWrapper = styled.div`
  justify-content: flex-end;
  flex-direction: row;
  display: flex;
`;

export const TransactionsBtn = styled.button`
  background: ${(props) => (props.isActive ? "#40ba93" : "transparent")};
  color: ${(props) =>
    props.isActive
      ? "#fff"
      : props.theme.light && props.theme.color
      ? "#fff"
      : props.theme.color === "green"
      ? "#fff"
      : "#b0b0b0"};
  font-weight: ${(props) => (props.isActive ? 700 : 300)};
  justify-content: center;
  padding: 0.26vw 1.302vw;
  border-radius: 0.781vw;
  margin-left: 1.042vw;
  align-items: center;
  font-size: 0.729vw;
  height: 1.615vw;
  display: flex;

  &:hover {
    opacity: 0.8;
  }
`;

export const Divider = styled.div`
  background: ${(props) => (props.theme.light ? "transparent" : "#333")};
  width: 69.792vw;
  height: 0.052vw;
`;

export const Table = styled.div`
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  overflow-y: scroll;
  margin-top: 1.302vw;
  height: 13.3vw;
  width: 70.792vw;
  display: flex;
  margin-right: -2vw;

  &::-webkit-scrollbar {
    width: 0.208vw;

    background: ${(props) =>
      props.theme.light
        ? props.theme.color
          ? "#828282"
          : "#bdbdbd"
        : "#4f4f4f"};
    border-radius: 0.26vw;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.light ? (props.theme.color ? "#fff" : "#828282") : "#333"};
    border-radius: 0.26vw;
  }
`;

export const TableRow = styled.div`
  margin-top: ${(props) =>
    props.idx == null || props.idx === 0 ? "0vw" : "0.938vw"};
  display: flex;
`;

export const TalbleCell = styled.td`
  min-width: ${(props) => props.minW};
  width: ${(props) => props.w};
`;
