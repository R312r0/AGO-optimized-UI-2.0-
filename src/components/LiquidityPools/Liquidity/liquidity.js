import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import {CustomToolTip} from "../../ChartCustomTooltip/chart-custom-tooltip";

export const Liquidity = ({data}) => {

  const {theme} = useSystemContext();

    return(
      <div className='liq-chart'>
        <ResponsiveContainer className='liq-chart' width="100%" height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "white" : "#3A3C45"} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              stroke={theme === "light" ? "black" : "white"}
            />
            <Tooltip content={CustomToolTip}/>
            <Area type="monotone" strokeWidth={3} dataKey="value" stroke="#40BA93" fill="rgba(64, 186, 147, 0.2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
}