import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/retirement-plan-hero-2.jpg'

const items = [
  {
    title: "Why should I start planning for retirement early?",
    subTitle: "Starting early allows you to take advantage of compound interest, meaning your investments have more time to grow. The sooner you start, the less you need to invest each month to reach your retirement goals."
  },
  {
    title: " How much should I save for retirement?",
    subTitle: "A general rule is to save at least 15% of your income annually. However, the exact amount depends on factors like your expected lifestyle, inflation, and retirement age. Using a retirement calculator can help estimate your needs."
  },
  {
    title: "What investment options are best for retirement?",
    subTitle: "Common options include 401(k) plans, IRAs (Roth & Traditional), mutual funds, stocks, bonds, and annuities. Diversifying your portfolio ensures a balance between risk and growth."
  },
  {
    title: "How do I protect my retirement savings from inflation?",
    subTitle: "Investing in stocks, real estate, and inflation-protected securities (TIPS) can help. Keeping a well-diversified portfolio and adjusting investments over time ensures your purchasing power remains strong."
  },
  {
    title: " What’s a good retirement age?",
    subTitle: "The typical retirement age is between 60-67, but it depends on your financial stability and personal goals. Some choose early retirement (before 60), while others work longer for additional security."
  },
]


export default function RetirementPage  () {
  return (
    <div>

      {/* about forx */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Retirement planning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className=" flex flex-col">
            <p>
              {`Retirement planning involves determining retirement income goals and what's needed to achieve those goals. Retirement planning includes identifying income sources, sizing up expenses, implementing a savings program, and managing assets and risk. Future cash flows are estimated to gauge whether the retirement income goal is possible.`}
            </p>
            <br />
            <p>
              {`You can start at any time, but it works best if you factor it into your financial planning as early as possible. That’s the best way to ensure a safe, secure—and fun—retirement. The fun part is why it makes sense to pay attention to the serious and perhaps boring part: planning how you’ll get there.`}

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