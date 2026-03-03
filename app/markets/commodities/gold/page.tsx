import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-gold.jpg'

const items = [
  {
    title: "Why should I invest in gold?",
    subTitle: "Gold has historically been a safe-haven asset, protecting investors from inflation, currency fluctuations, and economic instability. With CAP VENTURES, you can seamlessly invest in gold and diversify your portfolio with a time-tested store of value."
  },
  {
    title: "How does CAP VENTURES make gold investment easier?",
    subTitle: "CAP VENTURES provides a secure and user-friendly platform for investing in gold without the complexities of physical storage. Our market insights, expert guidance, and seamless transactions ensure a hassle-free investment experience."
  },
  {
    title: "Is gold a good long-term investment?",
    subTitle: "Gold retains value over time and often appreciates during market downturns. It serves as a hedge against inflation and economic crises, making it a strong asset for long-term wealth preservation."
  },
  {
    title: "Can I invest in gold with a small budget?",
    subTitle: "Yes! With CAP VENTURES, you don’t need large capital to start investing in gold. Our flexible investment options allow you to gain exposure to the gold market at various price points, making it accessible to all investors."
  },
  {
    title: "How does gold compare to stocks as an investment?",
    subTitle: "Unlike stocks, gold is a tangible asset that isn't directly affected by corporate performance or market speculation. While stocks offer higher growth potential, gold provides stability, acting as a safety net during market volatility."
  },
  {
    title: "Can I withdraw or sell my gold investment anytime?",
    subTitle: "Yes, CAP VENTURES offers liquidity options that allow you to sell your gold investments when needed. We ensure transparent pricing and seamless transactions so you can access your funds at your convenience."
  }
];


export default function GoldPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Gold Investment</h2>
        <div className="grid grid-cols-1 grid-flow-dense lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col order-2 sm:order-1">
            <p>
                   {`Gold has remained one of the most reliable investments for centuries, offering stability and security during economic uncertainties. It serves as a hedge against inflation, currency devaluation, and stock market fluctuations, making it a preferred choice for long-term wealth preservation. As global demand for gold continues to grow, its value remains strong across different financial cycles.`}

            </p>
            <br />
            <p>
                    {`At CAP VENTURES, we provide seamless access to gold investment opportunities, allowing individuals to diversify their portfolios with this precious metal. Whether you're a seasoned investor or just starting, our platform offers a secure and transparent way to invest in gold. With real-time market insights and expert guidance, you can make informed decisions and maximize your returns.`}

            </p>
          </div>

          <div>
            <Image 
              src={forexGuy}
              alt="guy with forex currencies"
              className=" w-full object-cover order-1 sm:order-2"
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