import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-poultry-hero.jpg'

const items = [
  {
    title: "Is poultry farming a profitable investment?",
    subTitle: "Yes, poultry farming offers high returns due to the constant demand for eggs and meat. With CAP VENTURES, investors can access professionally managed poultry farms that ensure efficient production, cost control, and market-driven pricing for maximum profitability."
  },
  {
    title: "How does CAP VENTURES help investors in poultry farming?",
    subTitle: "CAP VENTURES handles all aspects of poultry investment, from farm operations to sales distribution. Investors benefit from optimized farming techniques, disease management, and a steady supply chain, ensuring consistent earnings and long-term growth."
  },
  {
    title: "What are the risks associated with poultry farming?",
    subTitle: "Poultry farming risks include disease outbreaks, feed price fluctuations, and market volatility. However, CAP VENTURES mitigates these risks through advanced biosecurity measures, bulk feed purchasing strategies, and diversified sales channels."
  },
  {
    title: "What is the expected return on investment for poultry farming?",
    subTitle: "ROI varies depending on the type of poultry (broilers, layers, or breeders) and market conditions. With CAP VENTURES’s efficient operations, investors can expect steady income from egg production, meat sales, and value-added poultry products."
  },
  {
    title: "Can I invest in poultry farming without prior experience?",
    subTitle: "Absolutely! CAP VENTURES manages all farming operations on behalf of investors, ensuring they reap the benefits without any hands-on involvement. Our team of experts takes care of everything, from breeding to marketing, while you enjoy passive returns."
  },
];



export default function PoultryPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Profitable Poultry Farming, Managed by Experts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
              {`Poultry farming is one of the fastest-growing agricultural sectors, providing investors with high returns through the production of eggs, meat, and other poultry-based products. At CAP VENTURES, we eliminate the complexities of farm management by offering investors a fully managed poultry investment experience. Our farms utilize advanced biosecurity measures, optimized feeding strategies, and efficient production cycles to ensure maximum profitability.`}
            </p>
            <br />
            <p>
              {`With rising demand for poultry products worldwide, investing in this sector provides a sustainable and profitable income stream. CAP VENTURES ensures that every aspect of the poultry business, from hatching to market distribution, is expertly handled. By investing with us, you gain access to a lucrative market without the operational challenges, making poultry investment a smart choice for steady and long-term returns.`}

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