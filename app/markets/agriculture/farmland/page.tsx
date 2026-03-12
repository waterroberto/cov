'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import farmlandAbout from '@/assets/hm-farm-ladn.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiWheat, GiHandTruck, GiEarthAmerica } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsHouseDoor } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why is farmland a smart investment?",
    subTitle: "Farmland is a tangible asset that historically appreciates in value over time. It provides a double-benefit: capital growth of the land itself and recurring income from crop production and leases."
  },
  {
    title: "How do I earn from farmland investments?",
    subTitle: "Profits are generated through the sale of high-demand crops, land appreciation, and strategic leasing. We use sustainable practices to ensure the long-term fertility and value of your agricultural holdings."
  },
  {
    title: "What types of crops are grown on your lands?",
    subTitle: "We diversify our operations with a mix of staple cash crops like wheat and corn, as well as high-value specialty crops like avocados and almonds, depending on the region's climate and market demand."
  },
  {
    title: "How do you ensure sustainable management?",
    subTitle: "We implement precision farming techniques, soil conservation methods, and efficient water management to maintain the land's health, ensuring consistent yields for generations."
  },
  {
    title: "What happens at the end of the investment period?",
    subTitle: "At the end of the term, you can choose to liquidate your shares at the current market value, reinvest into new projects, or continue receiving passive income through continued leasing."
  },
];

const features = [
  {
    icon: <GiEarthAmerica />,
    title: "Global Demand",
    description: "Capitalize on the world's increasing need for food security. As populations grow, the value of productive farmland continues to rise."
  },
  {
    icon: <BsShieldCheck />,
    title: "Inflation Hedge",
    description: "Farmland is an asset that traditionally outperforms inflation, preserving and growing your purchasing power over the long term."
  },
  {
    icon: <BsHouseDoor />,
    title: "Tangible Asset",
    description: "Own real, productive soil instead of just digital numbers. Farmland is one of the oldest and most reliable stores of value in history."
  }
];

export default function FarmlandPage() {
  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                Own a Stake in <span className="text-blue-600">Productive Farmland</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Farmland has long been a foundational asset for generational wealth. At Capital Online Ventures, we provide fractional ownership in high-yielding agricultural land, managed by experts for optimal returns.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Stable Asset Class", desc: "Lower volatility compared to traditional stock markets with consistent upward potential." },
                  { title: "Precision Agriculture", desc: "We utilize advanced tech to monitor soil health, water usage, and crop growth in real-time." },
                  { title: "Strategic Locations", desc: "Our lands are selected based on climate resilience, soil quality, and proximity to major markets." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <GiWheat size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image 
                src={farmlandAbout}
                alt="Farmland Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Farmland?"
        subtitle="Experience the stability and growth potential of the world's most essential resource."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Farmland <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Everything you need to know about investing in the ground beneath our feet.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <AccordionDemo data={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}