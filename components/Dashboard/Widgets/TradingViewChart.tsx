'use client';
import React from 'react';
import { AdvancedChart } from 'react-tradingview-embed';
import UserDataContext from '@/context/UserDataContext';
import { useContext } from 'react';
interface IS {
  [key: string]: string
}
const symbol:IS  = {
  gold: "GOLDJ2025",
  silver: "SI1!",
  crudeoil: "CL1!",
  agriculture: 'LE1!',
  forex: "EURUSD",
  crypto: "BTCUSD",
  commodities: "GD1!",
  stocks: "SMCI",
  maganease: "MAGX_SHORT_VOLUME",
  "precious metal": "TSX:MMP.UN",
  marijuana: "MARIJUANA",
  energy: "ENERGY",
  retirement: "UVXY"
}
export default function TradingViewChart() {
    const {userData} =  useContext(UserDataContext)
  let s: string
  if(userData){
    s = symbol[userData.selectedPlan.toLowerCase()]
  }else {
    s = "gold"
  }
  return (
    <div className='my-4'>
      <AdvancedChart
        widgetProps={{
          theme: 'dark',
          symbol: s,
          "timezone": "exchange",
          "style": "0",
          "locale": "en",
          "allow_symbol_change": false,
          
        }}
      />
    </div>
  );
}


