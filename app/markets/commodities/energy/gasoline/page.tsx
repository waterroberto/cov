import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-gasoline.jpg'

const items = [
  {
    title: "Why invest in gasoline?",
    subTitle: "Gasoline remains a key energy source worldwide, and price fluctuations create investment opportunities. CAP VENTURES offers exposure to gasoline markets through commodities and energy sector investments."
  },
  {
    title: "What affects gasoline prices?",
    subTitle: "Gasoline prices are impacted by crude oil supply, refining capacity, geopolitical events, and seasonal demand shifts. Our platform provides insights to help you make strategic investment decisions."
  },
  {
    title: "How can I profit from gasoline investments?",
    subTitle: "With CAP VENTURES, you can invest in gasoline futures, ETFs, or stocks in oil refineries and energy companies, ensuring multiple ways to capitalize on this market."
  }
];


export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Gasoline: Profiting from Energy Demand</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
               {`Gasoline remains a critical part of the global energy infrastructure, with millions of vehicles relying on it daily. Its pricing is influenced by crude oil costs, refining capacity, and market demand, creating opportunities for strategic investors. CAP VENTURES provides a streamlined approach to investing in gasoline markets for stable returns.`}

            </p>
            <br />
            <p>
              {`Despite the push toward alternative fuels, gasoline continues to be a major economic driver. Seasonal price fluctuations and geopolitical factors offer traders and long-term investors profitable opportunities. With CAP VENTURES, you can gain exposure to gasoline investments through futures, ETFs, and leading energy companies.`}

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