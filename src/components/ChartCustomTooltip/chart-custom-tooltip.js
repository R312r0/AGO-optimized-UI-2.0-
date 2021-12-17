import {formattedNum} from "../../utils/helpers";
import React from "react";
import styled from 'styled-components';

const CustomToolTipWrapper = styled.div`
    background: #171717;
    box-shadow: -0.417vw -0.417vw 1.042vw rgba(28, 27, 27, 0.25), 0.208vw 0.208vw 0.521vw rgba(0, 0, 0, 0.25);
    border-radius: 0.833vw;
    color: white;
    padding: 0.5vw 1vw;
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