'use client';
import React from 'react';
import { TickerTape } from 'react-tradingview-embed';
import { useContext } from 'react';
import UserDataContext from '@/context/UserDataContext';
interface IS {
  [key: string]: {proName: string, description: string}[]
}
const symbols: IS  = {
  'crypto':[
    {
      "proName": "FOREXCOM:SPXUSD",
      "description": "S&P 500 Index"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "description": "US 100 Cash CFD"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "description": "EUR to USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "description": "Bitcoin"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "description": "Ethereum"
    }
  ],
  'stocks':[
    {
      "description": "tsla",
      "proName": "NASDAQ:TSLA"
    },
    {
      "description": "nvda",
      "proName": "NASDAQ:NVDA"
    },
    {
      "description": "apples",
      "proName": "NASDAQ:AAPL"
    },
    {
      "description": "amazon",
      "proName": "NASDAQ:AMZN"
    },
    {
      "description": "meta",
      "proName": "NASDAQ:META"
    },
    {
      "description": "microsoft",
      "proName": "NASDAQ:MSFT"
    },
    {
      "description": "google",
      "proName": "NASDAQ:GOOGL"
    }
  ],
  'forex': [
    {
      "description": "eur/usd",
      "proName": "FX:EURUSD"
    },
    {
      "description": "bbp/usd",
      "proName": "FX:GBPUSD"
    },
    {
      "description": "gbp/jpy",
      "proName": "OANDA:GBPJPY"
    },
    {
      "description": "usd/cad",
      "proName": "OANDA:USDCAD"
    },
    {
      "description": "aud/usd",
      "proName": "OANDA:AUDUSD"
    },
    {
      "description": "eur/jpy",
      "proName": "FX:EURJPY"
    }
  ],
  'agriculture': [
    {
      "description": "wheat",
      "proName": "CBOT:ZW1!"
    },
    {
      "description": "cattle",
      "proName": "CME:LE1!"
    },
    {
      "description": "cocoa",
      "proName": "ICEUS:CC1!"
    },
    {
      "description": "oats",
      "proName": "CBOT:ZO1!"
    },
    {
      "description": "cotton",
      "proName": "NYMEX:TT1!"
    }
  ],
  'commodities': [
    {
      "description": "cl1",
      "proName": "NYMEX:CL1!"
    },
    {
      "description": "maganease",
      "proName": "MAGX_SHORT_VOLUME"
    },
    {
      "description": "gold",
      "proName": "COMEX:GC1!"
    },
    {
      "description": "silver",
      "proName": "COMEX:SI1!"
    },
    {
      "description": "fcpr1",
      "proName": "EUREX:FCPR1!"
    },
    {
      "description": "lithium",
      "proName": "COMEX:LTH1!"
    },
    {
      "description": "precious metal",
      "proName": "TSX:MMP.UN"
    },
    {
      "description": "marijuana",
      "proName": "MARIJUANA"
    }
  ],
  
}

export default function TradingViewTicker() {
  const {userData} =  useContext(UserDataContext)
  let s: any
  if(userData){
    if(!Object.keys(symbols).includes(userData.selectedPlan.toLowerCase())){
      s = symbols["commodities"]
    }else{      
      s = symbols[userData.selectedPlan.toLowerCase()]
    }
  }else {
    s = symbols["stocks"]
  }
  return (
    <div className='mb-8'>
      <TickerTape
        widgetProps={{
          showSymbolLogo: false,
          colorTheme: 'dark',
          symbols:s
        }}
      />
    </div>
  );
}
