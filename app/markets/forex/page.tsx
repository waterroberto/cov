import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/forex-about.png'

const items = [
  {
    title: "What are the most popular currency pairs to trade?",
    subTitle: "The most popular currency pairs to trade are the ones that offer the most liquidity - i.e. the ones that people trade the most. These include FX majors like AUDUSD, EURUSD, GBPUSD, NZDUSD, USDCAD, USDCHF, and USDJPY. These currency trading pairs are all available to trade completely swap-free at Exness, so you can hold your positions for longer at no extra charge. Other popular currency pairs that traders like to add to their portfolios are FX minors. These include AUDCAD, CADCHF, EURAUD, GBPCHF, and more. Most FX minors are also available with no overnight charges at Exness. You can see exactly which minors are included in the swap-free program in the instruments table on this page."
  },
  {
    title: "What are the most popular currency pairs to trade?",
    subTitle: "The most popular currency pairs to trade are the ones that offer the most liquidity - i.e. the ones that people trade the most. These include FX majors like AUDUSD, EURUSD, GBPUSD, NZDUSD, USDCAD, USDCHF, and USDJPY. These currency trading pairs are all available to trade completely swap-free at Exness, so you can hold your positions for longer at no extra charge. Other popular currency pairs that traders like to add to their portfolios are FX minors. These include AUDCAD, CADCHF, EURAUD, GBPCHF, and more. Most FX minors are also available with no overnight charges at Exness. You can see exactly which minors are included in the swap-free program in the instruments table on this page."
  },
  {
    title: "What are the most popular currency pairs to trade?",
    subTitle: "The most popular currency pairs to trade are the ones that offer the most liquidity - i.e. the ones that people trade the most. These include FX majors like AUDUSD, EURUSD, GBPUSD, NZDUSD, USDCAD, USDCHF, and USDJPY. These currency trading pairs are all available to trade completely swap-free at Exness, so you can hold your positions for longer at no extra charge. Other popular currency pairs that traders like to add to their portfolios are FX minors. These include AUDCAD, CADCHF, EURAUD, GBPCHF, and more. Most FX minors are also available with no overnight charges at Exness. You can see exactly which minors are included in the swap-free program in the instruments table on this page."
  },
  {
    title: "What are the most popular currency pairs to trade?",
    subTitle: "The most popular currency pairs to trade are the ones that offer the most liquidity - i.e. the ones that people trade the most. These include FX majors like AUDUSD, EURUSD, GBPUSD, NZDUSD, USDCAD, USDCHF, and USDJPY. These currency trading pairs are all available to trade completely swap-free at Exness, so you can hold your positions for longer at no extra charge. Other popular currency pairs that traders like to add to their portfolios are FX minors. These include AUDCAD, CADCHF, EURAUD, GBPCHF, and more. Most FX minors are also available with no overnight charges at Exness. You can see exactly which minors are included in the swap-free program in the instruments table on this page."
  },
]


export default function ForexPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Capitalize on currency pair price movements</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col gap-6">
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Trade FX majors, minors, and exotics</h3>
              <p className=" font-medium text-lg">with ultra-tight spreads and flexible leverage.³</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Enjoy fast and precise execution</h3>
              <p className=" font-medium text-lg">won trader-favorite platforms like MT4, MT5, the Exness Web Terminal and Exness Trade app.</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Access your earnings</h3>
              <p className=" font-medium text-lg">with no unnecessary delays.</p>
            </div>
          </div>

          <div>
            <Image 
              src={forexGuy}
              alt="guy with forex currencies"
              className=" w-full object-cover"
            />
          </div>

        </div>
      </div>
      
      {/* frequently asked question */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-2 grid grid-cols-1 md:grid-cols-[2fr_2fr]">
        <h2 className=" text-3xl md:text-4xl f text-neutral-800  font-semibold">
          Frequently asked questions
        </h2>
        <AccordionDemo  data={items}/>
      </div>
    </div>
  )
}