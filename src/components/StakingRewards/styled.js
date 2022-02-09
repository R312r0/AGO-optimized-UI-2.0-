import styled from "styled-components";

export const StakingContainer = styled.div`
  flex-direction: column;
  margin-right: 8.021vw;
  display: flex;
  padding: 0 1vw;
`;

export const Text = styled.span`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  line-height: 1.406vw;
  font-size: 0.938vw;
  font-weight: 300;
  color: #4F4F4F;

  b {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    line-height: 1.875vw;
    font-size: 1.25vw;
    font-weight: 500;
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const StakingTable = styled.ul`

`
