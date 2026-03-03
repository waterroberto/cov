import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/crude-hm.jpg'

const items = [
  {
    title: "Why is crude oil a valuable investment?",
    subTitle: "Crude oil is one of the world's most traded commodities, essential to global economies. Investing in oil through CAP VENTURES allows you to benefit from price fluctuations and long-term energy demand."
  },
  {
    title: "What factors impact crude oil prices?",
    subTitle: "Oil prices are influenced by supply and demand, geopolitical tensions, and economic trends. CAP VENTURES helps investors navigate these factors with expert analysis and market insights."
  },
  {
    title: "How do I invest in crude oil with CAP VENTURES?",
    subTitle: "Our platform offers multiple oil investment options, including stocks in energy companies, futures trading, and ETFs, ensuring you have diverse opportunities to profit from the oil market."
  }
];



export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">  Crude Oil: Powering Global Markets
</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
                    {`Crude oil remains one of the most sought-after commodities, influencing economies and industries worldwide. Its significance in energy production, transportation, and manufacturing makes it a powerful investment asset. CAP VENTURES provides access to crude oil investment options, helping investors capitalize on price fluctuations and market trends.`}

            </p>
            <br />
            <p>
                  {`Despite the push for renewable energy, oil remains a dominant force in global markets. Geopolitical events, supply constraints, and economic policies continue to impact oil prices, creating investment opportunities. CAP VENTURES helps you navigate this volatile market with data-driven insights and a secure platform for maximizing profits.`}


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