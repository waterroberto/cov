import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-maganease.jpg'

const items = [
  {
    title: "Why invest in manganese?",
    subTitle: "Manganese is a critical metal in steel production and battery technology, making it an essential resource for industrial growth. CAP VENTURES offers investment opportunities in high-demand manganese markets."
  },
  {
    title: "What drives manganese demand?",
    subTitle: "The increasing demand for steel, electric vehicles, and battery storage technology boosts the need for manganese. As industries shift toward sustainability, manganese’s investment potential continues to rise."
  },
  {
    title: "How does CAP VENTURES help investors in manganese?",
    subTitle: "We provide access to manganese mining stocks and commodity investments, allowing investors to tap into this essential metal’s growth potential with expert-backed strategies."
  }
];



export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Manganese: A Key Metal for Industry & Innovation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
                  {`Manganese plays a crucial role in the global economy, being a fundamental component in steel manufacturing and battery production. As infrastructure projects grow and the demand for electric vehicles rises, manganese is positioned as a high-value commodity. CAP VENTURES offers a seamless way to invest in this vital industrial metal.`}

            </p>
            <br />
            <p>
                {`Beyond steel, manganese is an essential mineral in lithium-ion batteries, making it a key player in the renewable energy revolution. Its increasing importance in sustainable energy solutions ensures long-term investment potential. By leveraging CAP VENTURES’s expertise, investors can gain exposure to this expanding market with strategic investment opportunities.`}


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