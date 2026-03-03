'use client';

import {  SingleTicker } from 'react-tradingview-embed';
import UserDataContext from '@/context/UserDataContext';
import { useContext } from 'react';

interface IS {
  [key: string]: string
}
const symbols:IS = {
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


export default function TradingSingleTicker() {

  const {userData} =  useContext(UserDataContext)
  let s: string
  if(userData){
    s = symbols[userData.selectedPlan.toLowerCase()]
    console.log(s)
  }else {
    s = "gold"
  }
  return (
    <div className=' w-full rounded-2xl border border-gray-200 p-[0.3px] overflow-hidden'>
      <SingleTicker
        widgetProps={{
          colorTheme: "dark",
          width: "100%",
          symbol: s
        }}
      />
    </div>
  );
}