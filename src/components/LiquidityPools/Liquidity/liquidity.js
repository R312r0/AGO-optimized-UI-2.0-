import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import {CustomToolTip} from "../../ChartCustomTooltip/chart-custom-tooltip";

export const Liquidity = ({data}) => {

  const {theme} = useSystemContext();

    return( 
      <ResponsiveContainer className='liq-chart'>
        
        <AreaChart
          data={data}
        >
          <CartesianGrid strokeDasharray="0.156vw 0.156vw" strokeWidth={'0.052vw'} stroke={theme === "light" ? "white" : "#3A3C45"} />
          <XAxis
            width={'100%'}
            dataKey="time"
            axisLine={false}
            tickLine={false}
            stroke={theme === "light" ? "black" : "white"}
            fontSize={'0.521vw'}
          />
          <Tooltip content={CustomToolTip}/>
          <Area type="monotone" strokeWidth={'0.104vw'} dataKey="value" stroke="#40BA93" fill="rgba(64, 186, 147, 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    )
}