
'use client';
import React from 'react';
import { MarketOverview } from 'react-tradingview-embed';

const tabs = {
  "commodities":  [
    {
      "title": "Commodities",
      "symbols": [
        {
          "s": "COMEX:SI1!",
          "d": "silver"
        },
        {
          "s": "COMEX:LTH1!",
          "d": "lithium"
        },
        {
          "s": "EUREX:FCPR1!",
          "d": "metals"
        },
        {
          "s": "NYMEX:CL1!",
          "d": "crude2"
        },
        {
          "s": "EUREX:FCPR1!",
          "d": "precious metals"
        },
        {
          "s": "EUREX:FCPE1!",
          "d": "Petrol"
        },
        {
          "s": "NYMEX:RB1!",
          "d": "gasoline"
        }
      ],
      "originalTitle": "Indices"
    }
  ],
  'agriculture': [
    {
      "title": "Agriculture",
      "symbols": [
        {
          "s": "CME:LE1!",
          "d": "Animal livestock"
        },
        {
          "s": "EUREX:FCAG1!",
          "d": "Farm Land"
        },
        {
          "s": "NZX:SMP1!",
          "d": "Poultry"
        }
      ],
      "originalTitle": "Indices"
    }
  ],
  'crypto':  [
    {
      "title": "Crypto",
      "symbols": [
        {
          "s": "BITSTAMP:BTCUSD",
          "d": "BTC/USD"
        },
        {
          "s": "BITSTAMP:ETHUSD",
          "d": "ETH/USD"
        },
        {
          "s": "COINBASE:SOLUSD",
          "d": "SOL/USD"
        },
        {
          "s": "CRYPTO:XRPUSD",
          "d": "XRP/USD"
        },
        {
          "s": "PYTH:XAUUSD",
          "d": "XAU/USD"
        },
        {
          "s": "COINBASE:LTCUSD",
          "d": "LTC/USD"
        },
        {
          "s": "BINANCE:BNBUSD",
          "d": "BNB/USD"
        }
      ],
      "originalTitle": "Indices"
    }
  ],
  "stocks": [
    {
      "title": "Crypto",
      "symbols": [
        {
          "s": "NASDAQ:TSLA",
          "d": "tsla"
        },
        {
          "s": "NASDAQ:NVDA",
          "d": "nvda"
        },
        {
          "s": "NASDAQ:AAPL",
          "d": "apple"
        },
        {
          "s": "NASDAQ:META",
          "d": "meta"
        },
        {
          "s": "NASDAQ:GOOGL",
          "d": "google"
        },
        {
          "s": "NASDAQ:NFLX",
          "d": "netflix"
        },
        {
          "s": "NYSE:WMT",
          "d": "walmart"
        },
        {
          "s": "NYSE:RDDT",
          "d": "reddit"
        },
        {
          "s": "NASDAQ:AMZN",
          "d": "amazon"
        },
        {
          "s": "NYSE:CRM",
          "d": "crm"
        }
      ],
      "originalTitle": "Indices"
    }
  ],
  'forex': [
    {
      "title": "Forex",
      "symbols": [
        {
          "s": "FX:EURUSD",
          "d": "EUR to USD"
        },
        {
          "s": "FX:GBPUSD",
          "d": "GBP to USD"
        },
        {
          "s": "FX:USDJPY",
          "d": "USD to JPY"
        },
        {
          "s": "FX:USDCHF",
          "d": "USD to CHF"
        },
        {
          "s": "FX:AUDUSD",
          "d": "AUD to USD"
        },
        {
          "s": "FX:USDCAD",
          "d": "USD to CAD"
        }
      ],
      "originalTitle": "Forex"
    }
  ],
  
}

export default function TradingViewCommoditiesMarket({tab}: {tab: 'crypto' | 'forex' | 'agriculture' | 'commodities' | 'stocks'}) {
  console.log(tabs[tab])
  return (
    <div className='my-4'>
      <MarketOverview
        widgetProps={{
          colorTheme: "dark",
          tabs: tabs["commodities"],
          dateRange: "12M",
          showChart: true,
          locale: "en",
          largeChartUrl: "",
          isTransparent: false,
          showSymbolLogo: true,
          // showFloatingTooltip: false,
          width: "100%",
          height: "550",
          plotLineColorGrowing: "rgba(41, 98, 255, 1)",
          plotLineColorFalling: "rgba(41, 98, 255, 1)",
          gridLineColor: "rgba(42, 46, 57, 0)",
          scaleFontColor: "rgba(219, 219, 219, 1)",
          belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
          belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
          // belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
          // belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
          symbolActiveColor: "rgba(41, 98, 255, 0.12)",
          // originalTitle: "Indices"

        }}
      />
    </div>
  );
}

{/* <div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
  {
  "colorTheme": "dark",
  "dateRange": "12M",
  "showChart": true,
  "locale": "en",
  "largeChartUrl": "",
  "isTransparent": false,
  "showSymbolLogo": true,
  "showFloatingTooltip": false,
  "width": "400",
  "height": "550",
  "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
  "plotLineColorFalling": "rgba(41, 98, 255, 1)",
  "gridLineColor": "rgba(42, 46, 57, 0)",
  "scaleFontColor": "rgba(219, 219, 219, 1)",
  "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
  "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
  "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
  "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
  "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
  "tabs": [
    {
      "title": "Commodities",
      "symbols": [
        {
          "s": "COMEX:SI1!",
          "d": "silver"
        },
        {
          "s": "COMEX:LTH1!",
          "d": "lithium"
        },
        {
          "s": "EUREX:FCPR1!",
          "d": "metals"
        },
        {
          "s": "NYMEX:CL1!",
          "d": "crude2"
        },
        {
          "s": "EUREX:FCPR1!",
          "d": "precious metals"
        },
        {
          "s": "EUREX:FCPE1!",
          "d": "Petrol"
        },
        {
          "s": "NYMEX:RB1!",
          "d": "gasoline"
        }
      ],
      "originalTitle": "Indices"
    }
  ]
}
  </script>
</div> */}
