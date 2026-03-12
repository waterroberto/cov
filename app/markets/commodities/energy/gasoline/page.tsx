'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import gasolineAbout from '@/assets/hm-gasoline.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiGasPump, GiJerrycan, GiOilDrum } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "How do global gasoline markets operate?",
    subTitle: "Gasoline markets are highly dynamic, influenced by regional refining capacities, seasonal demand fluctuations, and crude oil benchmarks. We provide the data and tools to trade these movements effectively."
  },
  {
    title: "What are the primary drivers of gasoline price changes?",
    subTitle: "Key factors include changes in consumer demand, disruptions in refinery operations, and shifts in international trade policies. Our analysis helps you anticipate and react to these catalysts."
  },
  {
    title: "Can I trade gasoline directly on your platform?",
    subTitle: "Yes, we provide access to RBOB Gasoline futures and related energy ETFs, allowing for diversified exposure to the fuel market with institutional execution quality."
  },
  {
    title: "How does gasoline fit into a balanced commodity portfolio?",
    subTitle: "Gasoline acts as a refined product benchmark, providing exposure to downstream energy processing and consumer economic activity, distinct from crude oil's upstream dynamics."
  },
];

const features = [
  {
    icon: <GiJerrycan />,
    title: "Refining Insights",
    description: "Gain exposure to the downstream energy sector, capitalizing on the spread between crude oil and finished fuel products."
  },
  {
    icon: <GiGasPump />,
    title: "Seasonal Dynamics",
    description: "Capitalize on predictable seasonal demand shifts, such as the 'summer driving season', with specialized market analysis."
  },
  {
    icon: <BsGraphUp />,
    title: "Consumer Sentiment",
    description: "Trade a commodity that is a direct indicator of consumer health and global economic transportation activity."
  }
];

export default function GasolinePage() {
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
                Navigate the <span className="text-blue-600">Gasoline Markets</span> with Precision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Gasoline is more than just fuel; {"it's"} a vital economic indicator. At Capital Online Ventures, we offer the transparency and execution power required to capitalize on the fluctuations of this essential refined product.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Refined Execution", desc: "Access specialized energy instruments with ultra-low latency and competitive institutional pricing." },
                  { title: "Market-Specific Tools", desc: "Utilize advanced charting and volatility metrics tailored for the unique behavior of the fuel markets." },
                  { title: "Diversified Energy", desc: "Balance your energy exposure by trading downstream products alongside crude oil and natural gas." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mt-1">
                      <GiJerrycan size={14} />
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
                src={gasolineAbout}
                alt="Gasoline Infrastructure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Gasoline?"
        subtitle="Uncover the unique opportunities in fuel trading with a platform designed for both speed and strategic insight."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Gasoline <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Explore the market mechanisms and seasonal indicators that drive gasoline trading strategies.
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