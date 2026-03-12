'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import lithiumAbout from '@/assets/lithium-hero.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiAtom, GiBatteryPack, GiElectric } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why is lithium the 'white gold' of the modern economy?",
    subTitle: "Lithium is the indispensable core of rechargeable batteries. As the world pivots toward electric vehicles and renewable grid storage, lithium demand is reaching unprecedented levels."
  },
  {
    title: "What are the primary factors driving lithium prices?",
    subTitle: "The market is driven by EV adoption rates, breakthroughs in battery chemistry, and the opening of new mining and processing facilities. We provide institutional-level tracking of these core drivers."
  },
  {
    title: "How does Capital Online Ventures provide exposure to lithium?",
    subTitle: "We provide access to leading lithium producers, chemical processors, and battery tech ETFs, offering a comprehensive way to invest in the entire electrification value chain."
  },
  {
    title: "What is the long-term outlook for lithium investments?",
    subTitle: "With global commitments to net-zero emissions, the demand for lithium is projected to grow exponentially over the next decade, making it a cornerstone of a future-focused commodity portfolio."
  },
];

const features = [
  {
    icon: <GiBatteryPack />,
    title: "Storage Revolution",
    description: "Invest in the fundamental material powering the transition from fossil fuels to high-capacity, renewable energy storage systems."
  },
  {
    icon: <GiElectric />,
    title: "EV Supercycle",
    description: "Capitalize on the global surge in electric vehicle production, where lithium requirements can reach tens of kilograms per vehicle."
  },
  {
    icon: <BsGraphUp />,
    title: "Exponential Growth",
    description: "Access a market sector with unique growth dynamics, relatively decoupled from traditional industrial metal cycles."
  }
];

export default function LithiumPage() {
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
                Invest in the <span className="text-blue-600">Lithium Revolution</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                The future is electric, and lithium is its foundation. At Capital Online Ventures, we bridge the gap between savvy investors and the critical materials powering {"tomorrow's"} technology.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Electrification Frontier", desc: "Gain exposure to the heart of the renewable energy transition with specialized investment vehicles." },
                  { title: "Institutional Custody", desc: "Your investments in the 'white gold' market are managed on a secure, high-performance platform." },
                  { title: "Future-Ready Analysis", desc: "Stay ahead with proprietary research that tracks global EV trends and battery manufacturing breakthroughs." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <GiAtom size={14} />
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
                src={lithiumAbout}
                alt="Lithium Processing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Lithium?"
        subtitle="Explore the cornerstone of the green energy era with a platform that delivers clarity and strategic market access."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Lithium <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Understand the essential role of lithium in the global energy shift and how to optimize your investment strategy.
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