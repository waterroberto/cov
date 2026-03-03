import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-bitcoin-hero.jpg'
import { FaGlobe, FaLock, FaWallet } from "react-icons/fa";
import GlownCard from "@/components/chad/Card";

const items = [
  {
    title: " What makes Ethereum unique?",
    subTitle: "Ethereum is a programmable blockchain, allowing developers to build and deploy decentralized applications using smart contracts."
  },
  {
    title: "Is Ethereum a good investment?",
    subTitle: "Many consider Ethereum a strong long-term investment due to its role in DeFi, NFTs, and Web3 development. However, always do your research!"
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


export default function BitcoinPage  () {
  return (
    <div>

          {/* What is Bitcoin? */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold">What is Bitcoin?</h2>
          <p className="text-lg text-gray-600 mt-4">
            Bitcoin is a decentralized digital currency that enables peer-to-peer transactions
            without intermediaries like banks.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <GlownCard>
            <FaLock className="text-5xl text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Security & Privacy</h3>
            <p className="text-gray-600 mt-2">Transactions are encrypted and pseudonymous.</p>
          </GlownCard>

          <GlownCard>
            <FaGlobe className="text-5xl text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Global Accessibility</h3>
            <p className="text-gray-600 mt-2">Anyone with internet access can use Bitcoin.</p>
          </GlownCard>

          <GlownCard>
            <FaWallet className="text-5xl text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Low Fees & Fast Transactions</h3>
            <p className="text-gray-600 mt-2">Cheaper and faster than traditional banking.</p>
          </GlownCard>
        </section>

      </div>
      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Capitalize on currency pair price movements</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col gap-6">
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl"> Seamless Bitcoin Trading with Ultimate Control</h3>
              <p className=" font-medium text-lg">Withdraw your profits on your terms, with no unnecessary delays.</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Power Your Bitcoin Trades with Speed and Security</h3>
              <p className=" font-medium text-lg">Experience fast and secure transactions with competitive spreads and flexible leverage</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Access your earnings</h3>
              <p className=" font-medium text-lg">Seamlessly buy, sell, and trade Bitcoin on cutting-edge platforms like MT4, MT5, and our intuitive trading app</p>
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