import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-silver-.jpg'

const items = [
  {
    title: "Why should I invest in silver?",
    subTitle: "Silver is a valuable industrial and precious metal, offering portfolio diversification and acting as a hedge against inflation. With CAP VENTURES, you can easily access silver investments and benefit from its long-term value appreciation."
  },
  {
    title: "Is silver a better investment than gold?",
    subTitle: "Silver is more affordable and has high industrial demand, making it a dynamic investment. While gold offers greater stability, silver tends to have higher growth potential due to its extensive use in electronics and renewable energy."
  },
  {
    title: "How does CAP VENTURES simplify silver investments?",
    subTitle: "CAP VENTURES offers an intuitive platform that enables investors to buy, hold, and sell silver efficiently. We provide real-time market data, expert insights, and seamless transactions to help you make informed decisions."
  },
  {
    title: "What factors affect silver prices?",
    subTitle: "Silver prices are influenced by industrial demand, inflation, mining supply, and geopolitical events. As industries increasingly rely on silver, its long-term investment potential remains strong."
  }
];



export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">  Invest in Silver: Stability & Growth</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
                    {`Silver is a unique asset that combines the stability of a precious metal with the growth potential of an industrial commodity. Its applications in electronics, solar panels, and medical industries make it a valuable investment for those looking to diversify their portfolio. With CAP VENTURES, you can easily invest in silver without the complexities of physical storage or market speculation.`}

            </p>
            <br />
            <p>
            {`As economic uncertainties rise, silver continues to be a safe haven, preserving wealth against inflation. Unlike fiat currencies, silver has intrinsic value, making it a hedge against market volatility. Investing in silver through CAP VENTURES gives you direct access to this high-demand asset with expert-backed insights to maximize your returns.`}


            </p>
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