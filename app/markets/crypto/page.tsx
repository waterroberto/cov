import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-crypto-about.png'

const items = [
  {
    title: "What is blockchain technology, and how does it work?",
    subTitle: "Blockchain technology is a distributed ledger system where each transaction is verified across multiple computers in a secure way, making it impossible to hack or change.It works by creating a continuous chain of blocks, each containing a record of the previous transaction.The blockchain is secured via a consensus mechanism known as “mining,” where the nodes of the network are incentivized to validate transactions and create new blocks.This makes it virtually impossible for anyone to tamper with the data stored on the blockchain, or to make unauthorized changes. Also, due to its distributed nature, there is no single point of failure.That means if one node goes down, the other nodes will continue to operate without interruption."
  },
  {
    title: "How do i decide the best cryptocurrencies to trade in the crypto market?",
    subTitle: "When deciding which cryptocurrencies to trade, it is important to consider a range of factors. These include volatility, liquidity, market capitalization, and technological features.Traders should also research the development team behind the coin or token and consider their past successes with other projects.It's also very important to keep up with crypto market news when trying to identify crypto trading opportunities. And finally, always conduct thorough fundamental and technical analysis of cryptocurrency prices over several time frames before deciding when to enter or exit a trade"
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


export default function CryptoPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Open an account and trade crypto</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col gap-6">
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Access the growing crypto market</h3>
              <p className=" font-medium text-lg">through derivatives and enjoy the ability to capitalize on crypto price movements without needing to own the underlying asset.</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Trade all available cryptocurrencies</h3>
              <p className=" font-medium text-lg">completely swap-free and hold yourcrypto trading positions at no extra cost.</p>
            </div>
            <div className=" w-full space-y-2">
              <h3 className=" font-medium text-2xl">Leverage proprietary trading features</h3>
              <p className=" font-medium text-lg">to strengthenyour positions and give your strategy a unique advantage in a dynamic market.</p>
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