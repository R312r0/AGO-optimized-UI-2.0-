import React from "react";
import { formattedNum } from "../../utils/helpers";
import styled from "styled-components";

const CustomToolTipWrapper = styled.div`
  padding: 0.677vw 1.563vw;
  border-radius: 0.833vw;
  background: #171717;
  height: 2.76vw;
  width: 6.667vw;
  display: flex;
  justify-content: center;
  font-size: 0.938vw;
  align-items: center;
  color: #fff;

  span {
    color: #4f4f4f;
  }
`;

export const CustomToolTip = ({ active, payload, label }) => {
  if (payload[0]) {
    const value = formattedNum(payload[0].payload.value);
    if (active) {
      return (
        <CustomToolTipWrapper>
          ${value.toString().split(".")[0]}
          <span>
            {value.toString().split(".")[1]
              ? `.${value.toString().split(".")[1]}`
              : ""}
          </span>
        </CustomToolTipWrapper>
      );
    }
  }

  return null;
};
