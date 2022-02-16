import styled from "styled-components";

export const NoWalletWarnWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  top: 50%;

  h3 {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  }

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

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const LiquidityPoolsContainer = styled.div`
  margin-left: 1vw;
`;

export const HDiv = styled.div`
  align-items: ${(props) => props.alignItems};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  padding: 0 2vw;
  flex-direction: row;
  display: flex;
`;

export const Text = styled.span`
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  font-weight: ${(props) => props.fontWeight ?? "300"};
  margin-left: ${(props) => props.ml};
  line-height: 1.875vw;
  font-size: 1.25vw;
`;

export const TableText = styled(Text)`
  line-height: 1.406vw;
  font-size: 0.938vw;
  color: #4f4f4f;
`;

export const SearchBarWrapper = styled.div`
  justify-content: space-between;
  border-radius: 2.083vw;
  margin-left: 14.063vw;
  padding: 0 2.083vw;
  align-items: center;
  background: ${(props) => (props.theme.light ? "#F2F2F2" : "#1a1a1a")};
  font-size: 0.938vw;
  font-weight: 300;
  width: 39.323vw;
  height: 4.063vw;
  display: flex;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};

  input {
    width: inherit;
    ::placeholder {
      color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4F4F4F")};
    }
  }
`;

export const CreatePairModalBtn = styled.button`
  margin-left: 7.76vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.083vw;
  font-size: 0.938vw;
  border: 0.052vw solid;
  border-color: #4f4f4f;
  height: 2.917vw;
  width: 11.771vw;
  color: #fff;

  svg {
    margin-right: 1.458vw;
    height: 1.094vw;
    width: 1.094vw;
  }

  &:hover {
    border-color: #fff;
  }
`;

export const SortArrowsContainer = styled.div`
  justify-content: space-between;
  margin-left: 1.25vw;
  align-items: center;
  display: flex;
  width: 2vw;

  svg {
    cursor: pointer;
    fill:red;
  }
`;

export const LiquidityPoolsTable = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 6vw;
`;
