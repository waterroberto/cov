import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-harvesting-marijuana.jpg'

const items = [
  {
    title: "Why invest in the marijuana industry?",
    subTitle: "The cannabis industry is rapidly expanding due to global legalization and medical advancements. CAP VENTURES provides access to top-performing marijuana stocks, allowing investors to capitalize on this growing market."
  },
  {
    title: "What are the risks of investing in marijuana stocks?",
    subTitle: "Like any emerging industry, marijuana stocks face regulatory risks and market fluctuations. However, CAP VENTURES helps investors navigate these challenges with expert analysis and diversified investment options."
  },
  {
    title: "How does CAP VENTURES support marijuana investors?",
    subTitle: "Our platform provides in-depth research, industry insights, and access to the top cannabis companies, ensuring you make informed investment decisions in this high-potential sector."
  }
];



export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Capitalize on the Booming Cannabis Industry</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
                   {`The global cannabis industry is expanding rapidly as medical and recreational legalization spreads. This emerging market offers investors the opportunity to benefit from high-growth companies engaged in cultivation, distribution, and cannabis-based pharmaceuticals. CAP VENTURES provides access to leading marijuana stocks and funds, allowing investors to capitalize on this industry’s growth.`}

            </p>
            <br />
            <p>
                {`As demand for cannabis-based products increases, so do the opportunities for significant returns. Market volatility remains a factor, but strategic investments in cannabis stocks can yield impressive gains. Through CAP VENTURES, investors can access expert market insights, diversified portfolios, and secure investment strategies to thrive in this fast-evolving sector.`}


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