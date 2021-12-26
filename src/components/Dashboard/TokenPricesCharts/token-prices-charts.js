import React,  { useState } from 'react';
import { TokenPriceChartWrapper } from './styles';
import { useDataContext } from '../../../dataProvider';
import { checkDashboardToken } from '../../../utils/helpers';
import TokenPriceItem from './TokenPriceItem/token-price-item';
import { useThemeContext } from '../../Layout/layout';

export const TokenPricesCharts = () => {

  const { theme } = useThemeContext();
  const { tokens } = useDataContext();
  const [expandWindow, setExpandWindow] = useState(false);

  return (
    <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)} light={theme === "light"}>
      <h1 className="token-heading">Main tokens info</h1>
      <div className="single-price-wrapper" id='chartWrapper'>
        {tokens && tokens.filter(item => checkDashboardToken(item.symbol)).map((token, _ind) => {
          return (
            <TokenPriceItem key={`price_block_${_ind}`} token={token} _ind={_ind} expandWindow={expandWindow}/>
          )
        })}
      </div>
    </TokenPriceChartWrapper>
  )
}