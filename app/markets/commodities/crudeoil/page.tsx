'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import crudeOilAbout from '@/assets/crude-hm.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiOilDrum, GiGasPump, GiGlobe } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why is crude oil a cornerstone of commodity trading?",
    subTitle: "Crude oil is the world's most actively traded commodity, essential for global transportation, heating, and plastic manufacturing. Its deep liquidity and high volatility provide numerous opportunities for traders."
  },
  {
    title: "What factors primarily influence crude oil prices?",
    subTitle: "Prices are driven by geopolitical events, OPEC+ production decisions, global economic growth, and the ongoing transition to alternative energy sources. We provide real-time analysis on all these fronts."
  },
  {
    title: "How can I trade oil on your platform?",
    subTitle: "We offer seamless access to major global benchmarks like Brent and WTI through institutional-grade trading terminals, allowing you to go long or short with tight spreads and flexible leverage."
  },
  {
    title: "Is oil still a relevant investment in a green-energy world?",
    subTitle: "While the world is transitioning, oil remains critical for global industry and logistics. Strategic investments in the energy sector continue to be a vital part of a diversified portfolio."
  },
];

const features = [
  {
    icon: <GiOilDrum />,
    title: "Global Benchmarks",
    description: "Trade the world's most recognized oil benchmarks, including West Texas Intermediate (WTI) and Brent, with real-time institutional pricing."
  },
  {
    icon: <BsLightningCharge />,
    title: "High Liquidity",
    description: "Benefit from the massive trading volume of the oil market, ensuring you can enter and exit positions instantly at the price you want."
  },
  {
    icon: <GiGlobe />,
    title: "Geopolitical Insights",
    description: "Access expert market commentary that decodes global events and their immediate impact on energy prices and supply chains."
  }
];

export default function CrudeOilPage() {
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
                Fuel Your Portfolio with <span className="text-blue-600">Crude Oil</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Crude oil is the lifeblood of the global economy. At Capital Online Ventures, we provide the tools and expertise required to navigate the complexities of the energy markets and capitalize on global price movements.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Dynamic Volatility", desc: "Capture significant market moves driven by global supply and demand dynamics." },
                  { title: "Strategic Hedging", desc: "Use oil positions to hedge against inflation and broader market fluctuations." },
                  { title: "Institutional Infrastructure", desc: "Trade on a platform designed for professional standards with ultra-tight spreads." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mt-1">
                      <GiGasPump size={14} />
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
                src={crudeOilAbout}
                alt="Crude Oil Industry"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Trade Crude Oil?"
        subtitle="Leverage the power of the energy sector with a platform that delivers speed, security, and market-leading conditions."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Crude Oil <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Master the essentials of energy trading and understand the forces shaping the oil market.
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