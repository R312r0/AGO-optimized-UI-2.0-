import styled from "styled-components";

export const FoundryContainer = styled.div`
  margin-right: 6.146vw;
  margin-left: 1vw;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.light ? "#828282" : "#4f4f4f"};
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  line-height: 1.406vw;
  font-size: 0.938vw;

  b {
    color: ${(props) => props.theme.light ? "#333" : "#fff"};
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
