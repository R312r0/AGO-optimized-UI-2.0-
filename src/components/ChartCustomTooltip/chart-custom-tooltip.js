import {formattedNum} from "../../utils/helpers";
import React from "react";
import styled from 'styled-components';

const CustomToolTipWrapper = styled.div`
    background: #171717;
    box-shadow: -8px -8px 20px rgba(28, 27, 27, 0.25), 4px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    color: white;
    display: grid;
    width: 120px;
    height: 50px;
    place-items: center;
`

export const CustomToolTip = ({active, payload, label}) => {


    if (payload[0]) {
        const value = formattedNum(payload[0].payload.value);
        if (active) {
            return (
                <CustomToolTipWrapper>
                    <span> {value}$ </span>
                </CustomToolTipWrapper>
            )
        }
    }

    return null;

}