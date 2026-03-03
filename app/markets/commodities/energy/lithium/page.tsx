import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/lithium-hero.jpg'

const items = [
  {
    title: "Why is lithium an important investment?",
    subTitle: "Lithium is essential for electric vehicle batteries and renewable energy storage. As demand surges, investing in lithium through CAP VENTURES provides strong growth potential in the energy transition sector."
  },
  {
    title: "How does CAP VENTURES facilitate lithium investments?",
    subTitle: "We provide access to lithium mining stocks and ETFs, offering investors exposure to this high-growth industry while minimizing direct market risks."
  },
  {
    title: "Is lithium a long-term investment?",
    subTitle: "Yes, as the global push for sustainability increases, lithium’s demand will continue to grow. Investing in lithium today positions you for future gains as battery technology advances."
  }
];


export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">  Invest in Lithium: The Future of Energy Storage</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
            {`Lithium is the backbone of the electric vehicle and renewable energy industries, making it a high-growth investment opportunity. As demand for battery technology accelerates, lithium's value continues to rise. CAP VENTURES offers investors a way to participate in this booming market through strategic lithium investments.`}

            </p>
            <br />
            <p>
            {`The transition to clean energy and energy storage solutions further drives lithium’s market demand. Investing in lithium today secures a stake in the future of sustainable energy. With CAP VENTURES, you can access top-performing lithium stocks and ETFs, ensuring a diversified approach to this evolving industry.`}


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