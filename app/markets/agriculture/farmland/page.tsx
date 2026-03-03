import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/hm-farm-ladn.jpg'

const items = [
  {
    title: "Why is farmland a smart investment?",
    subTitle: "Farmland is a tangible asset that appreciates in value over time, offering investors both long-term capital growth and recurring income. Through CAP VENTURES, investors can own a share in productive farmland without the need for direct management, benefiting from agricultural revenue and land appreciation."
  },
  {
    title: "How do I earn from farmland investments?",
    subTitle: "Profits are generated through leasing farmland to farmers, crop sales, and land value appreciation. CAP VENTURES ensures that farmland investments are managed efficiently, using sustainable farming practices to maximize yields and investor returns."
  },
  {
    title: "What types of crops are grown on CAP VENTURES farmlands?",
    subTitle: "Our farmlands support a variety of crops, including cash crops like wheat, corn, and soybeans, as well as high-value specialty crops. We strategically select crops based on market trends and climate conditions to ensure maximum profitability."
  },
  {
    title: "How does CAP VENTURES ensure sustainable farmland management?",
    subTitle: "We implement precision farming techniques, soil conservation methods, and efficient water management to maintain long-term soil fertility. Our commitment to sustainable agriculture ensures consistent yields and long-term farmland value."
  },
  {
    title: "What happens at the end of the investment period?",
    subTitle: "At the end of the agreed investment term, investors may choose to liquidate their farmland shares, reinvest, or lease the land for continued passive income. CAP VENTURES ensures seamless exits with strong market liquidity options."
  },
];



export default function LiveStockPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Own a Share of Productive Farmland with CAP VENTURES</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
              {`Farmland has long been a stable and appreciating asset, offering investors both long-term capital growth and recurring income. CAP VENTURES provides access to high-yielding farmland, strategically managed for crop production and land appreciation. With food demand on the rise, farmland remains one of the safest and most rewarding investments, offering a hedge against inflation and economic volatility.`}
            </p>
            <br />
            <p>
              {`Our farmland investments allow individuals to diversify their portfolios without the hassle of direct farm management. Through precision agriculture, sustainable soil management, and strategic crop selection, we ensure that every piece of land generates maximum value. Whether you’re looking for passive income or long-term growth, farmland investment with CAP VENTURES is a smart way to build wealth.`}

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