'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import goldAbout from '@/assets/hm-gold.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiGoldBar, GiCoins } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsShieldLock } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why should I invest in gold?",
    subTitle: "Gold has historically been a safe-haven asset, protecting investors from inflation, currency fluctuations, and economic instability. It acts as a reliable store of value when other markets are volatile."
  },
  {
    title: "How does Capital Online Ventures make gold investment easier?",
    subTitle: "We provide secondary markets for gold-backed assets, allowing you to gain exposure to gold prices without the high costs and security risks of physical storage."
  },
  {
    title: "Is gold a good long-term investment?",
    subTitle: "Gold retains purchasing power over decades and often appreciates during market downturns, making it a critical component of any diversified long-term portfolio."
  },
  {
    title: "Can I invest in gold with a small budget?",
    subTitle: "Yes, our fractional investment options allow you to start building your gold position with manageable amounts, making institutional-grade assets accessible to everyone."
  },
];

const features = [
  {
    icon: <GiGoldBar />,
    title: "Safe Haven Asset",
    description: "Protect your wealth with one of the most reliable stores of value in human history, essential for times of economic uncertainty."
  },
  {
    icon: <BsShieldLock />,
    title: "Secure Custody",
    description: "Your gold-backed investments are held in high-security, insured facilities, ensuring your assets are protected at all times."
  },
  {
    icon: <BsGraphUp />,
    title: "Portfolio Balance",
    description: "Reduce overall portfolio risk by adding an asset that historically has a low correlation with traditional stocks and bonds."
  }
];

export default function GoldPage() {
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
                Master the Timeless Value of <span className="text-blue-600">Gold</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Gold has remained a standard of wealth for centuries. At Capital Online Ventures, we provide you with modern, secure, and efficient ways to integrate this precious metal into your investment strategy.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Inflation Protection", desc: "Gold historically maintains its value and purchasing power as fiat currencies fluctuate." },
                  { title: "Global Liquidity", desc: "Access a market that is active 24/7 across the globe, ensuring you can move in and out of positions easily." },
                  { title: "Strategic Diversification", desc: "Enhance your portfolio's resilience by adding an asset that performs well during market stress." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mt-1">
                      <GiGoldBar size={14} />
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
                src={goldAbout}
                alt="Gold Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Gold?"
        subtitle="Leverage the stability of precious metals with the convenience of our advanced trading platform."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Gold <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Everything you need to know about starting your journey with precious metals.
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