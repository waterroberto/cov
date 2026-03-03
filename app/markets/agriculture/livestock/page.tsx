import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-livestokc-hero.jpg'

const items = [
  {
    title: "Why should I invest in livestock through CAP VENTURES?",
    subTitle: "Livestock investment provides a steady and reliable source of income, as global demand for meat, dairy, and other animal products continues to rise. CAP VENTURES offers investors access to well-managed livestock farms, ensuring profitability through sustainable and efficient farming practices."
  },
  {
    title: "How does livestock investment generate returns?",
    subTitle: "Returns come from the sale of livestock and related products such as milk, wool, and meat. With CAP VENTURES, investors benefit from expert farm management, optimized feeding strategies, and access to high-demand markets, ensuring consistent profits over time."
  },
  {
    title: "How does CAP VENTURES manage risks in livestock farming?",
    subTitle: "We implement best-in-class farm management strategies, including proper disease control, balanced nutrition, and efficient breeding programs. Additionally, we hedge against market fluctuations by securing long-term supply contracts with buyers."
  },
  {
    title: "What is the minimum investment required for livestock farming?",
    subTitle: "The investment amount varies depending on the livestock type and market conditions. CAP VENTURES offers flexible investment plans, allowing both small and large investors to participate in this profitable sector."
  },
];



export default function LiveStockPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Unlock Profits in Livestock Investment with CAP VENTURES</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
              {`Investing in livestock offers a unique opportunity to generate consistent income while benefiting from the ever-growing demand for meat, dairy, and other animal-based products. At CAP VENTURES, we connect investors to high-quality livestock farms, ensuring expert management, optimal breeding strategies, and efficient feeding programs. By leveraging sustainable farming techniques, we help maximize yields and minimize risks, making livestock a profitable and reliable asset class..`}
            </p>
            <br />
            <p>
              {`With livestock investments, you’re not just funding an agricultural project—you’re securing long-term wealth. Our platform ensures that your investment is actively managed, providing a steady flow of returns from livestock sales. From cattle and poultry to sheep and goats, we carefully select and monitor every investment, ensuring strong market positioning and consistent profitability.`}

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