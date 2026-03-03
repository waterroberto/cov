import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/precious metals.jpg'

const items = [
  {
    title: "Why should I invest in precious metals?",
    subTitle: "Precious metals like gold, silver, and platinum provide stability during economic downturns. CAP VENTURES offers a secure way to invest in these assets, ensuring portfolio diversification and wealth preservation."
  },
  {
    title: "Which precious metals are the best investments?",
    subTitle: "Gold is the most stable, silver has high industrial use, and platinum and palladium are in demand for automotive and tech industries. CAP VENTURES provides access to all these metals to suit various investment strategies."
  },
  {
    title: "How does CAP VENTURES make investing in precious metals easier?",
    subTitle: "Our platform simplifies investing by offering real-time market data, secure transactions, and expert insights, allowing you to buy and sell precious metals with confidence."
  }
];


export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">  Secure Wealth with Precious Metals
</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
            {`Precious metals such as platinum, and palladium have long been regarded as stores of value. In times of economic uncertainty, they provide financial security and act as hedges against inflation. CAP VENTURES offers investors a seamless way to gain exposure to these valuable assets with expert market analysis.`}

            </p>
            <br />
            <p>
            {`Unlike paper currencies, precious metals maintain their value over time, making them an excellent portfolio diversifier. Whether for wealth preservation or capital appreciation, investing in metals offers stability in volatile markets. CAP VENTURES simplifies the process, allowing you to buy, sell, and hold precious metals with confidence.`}


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