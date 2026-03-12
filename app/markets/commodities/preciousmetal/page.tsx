'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import preciousMetalAbout from '@/assets/precious metals.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiBigDiamondRing, GiCrystalWand, GiGoldBar } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why invest in precious metals with Capital Online Ventures?",
    subTitle: "Precious metals like platinum and palladium offer a unique combination of industrial utility and investment stability. Our platform provides the security and market access needed to diversify your portfolio effectively."
  },
  {
    title: "What are the primary uses for platinum and palladium?",
    subTitle: "Beyond their value as investment assets, these metals are critical in the automotive, chemical, and technology sectors, ensuring sustained global demand through various economic cycles."
  },
  {
    title: "How do you ensure the security of metal investments?",
    subTitle: "We provide institutional-grade trading environments with professional-tier security protocols, ensuring that your digital exposure to physical assets is always protected."
  },
  {
    title: "What is the correlation between precious metals and the broader market?",
    subTitle: "Precious metals often have a low or inverse correlation with traditional equities, making them an excellent hedge during periods of high market volatility or economic uncertainty."
  },
];

const features = [
  {
    icon: <GiBigDiamondRing />,
    title: "Rare Utility",
    description: "Invest in metals that are as industrially vital as they are rare, ensuring a unique value proposition for your portfolio."
  },
  {
    icon: <BsShieldCheck />,
    title: "Wealth Preservation",
    description: "Harness the historical power of precious metals to safeguard your capital against currency devaluation and inflation."
  },
  {
    icon: <BsGraphUp />,
    title: "Market Diversification",
    description: "Balance your traditional stock and bond holdings with assets that often move independently of broader financial markets."
  }
];

export default function PreciousMetalsPage() {
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
                Secure Your Wealth with <span className="text-blue-600">Precious Metals</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Regarded as the ultimate stores of value for centuries, precious metals provide a foundational layer of security for the modern investor. At Capital Online Ventures, we make it seamless to access these timeless assets.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Institutional Grade", desc: "Access the same market conditions and execution quality as professional commodity traders." },
                  { title: "Global Demand", desc: "Capitalize on the essential role of platinum and palladium in the world's most advanced industries." },
                  { title: "Inflation Guard", desc: "Maintain your purchasing power with assets that have a proven track record of wealth preservation." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mt-1">
                      <BsShieldCheck size={14} />
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
                src={preciousMetalAbout}
                alt="Precious Metals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Precious Metals?"
        subtitle="Discover the stability and growth potential of metals that have stood the test of time and market cycles."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Precious Metals <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Find technical and market clarity for your metal investment strategy.
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