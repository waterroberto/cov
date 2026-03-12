'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import silverAbout from '@/assets/hm-silver-.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiDisc, GiSilverBullet, GiChart } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why should I invest in silver?",
    subTitle: "Silver is a unique asset that combines the characteristics of a precious metal with high industrial utility. It serves as a hedge against inflation and a critical component in emerging green technologies."
  },
  {
    title: "Is silver a better investment than gold?",
    subTitle: "Silver is often more volatile than gold, which can lead to higher potential returns. It is also more affordable, allowing investors to accumulate larger quantities for their portfolio."
  },
  {
    title: "How does the industrial demand affect silver prices?",
    subTitle: "Over half of all silver produced is used in industrial applications like solar panels and electronics. As the world shifts towards renewable energy, industrial demand for silver is expected to remain robust."
  },
  {
    title: "How do I start investing in silver with you?",
    subTitle: "Our platform provides instant access to silver prices. You can start with a small amount and build your position over time with institutional-grade tools and zero hidden fees."
  },
];

const features = [
  {
    icon: <GiSilverBullet />,
    title: "Industrial Utility",
    description: "Benefit from the massive demand for silver in electronics, solar energy, and medical applications, driving long-term value."
  },
  {
    icon: <BsLightningCharge />,
    title: "High Volatility",
    description: "Capitalize on silver's dynamic price movements, which often provide significant opportunities for agile investors compared to gold."
  },
  {
    icon: <BsShieldCheck />,
    title: "Wealth Preservation",
    description: "Maintain your purchasing power with an asset that has held intrinsic value for thousands of years, independent of any central bank."
  }
];

export default function SilverPage() {
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
                Capitalize on the Dynamic Power of <span className="text-blue-600">Silver</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Silver is a versatile asset that shines in both industrial applications and wealth preservation. At Capital Online Ventures, we provide the platform to capture its full potential.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Industrial Backbone", desc: "Silver is essential for solar panels, EVs, and high-tech electronics, ensuring constant demand." },
                  { title: "Affordable Entry Point", desc: "Start building your precious metals portfolio with an asset that offers institutional-grade security at an accessible price." },
                  { title: "Market Agility", desc: "Silver's price sensitivity often leads to outsized gains during precious metal bull markets." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mt-1">
                      <GiDisc size={14} />
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
                src={silverAbout}
                alt="Silver Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Silver?"
        subtitle="Uncover the unique balance of industrial growth and financial security that only silver can provide."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Silver <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Get the clarity you need to master the silver market and grow your wealth.
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