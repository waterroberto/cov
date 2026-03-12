'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexAbout from '@/assets/forex-about.png';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { BsCurrencyExchange, BsLightningCharge, BsShieldCheck } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "What are the most popular currency pairs to trade?",
    subTitle: "The most popular currency pairs to trade are the majors, which offer the highest liquidity. These include EUR/USD, GBP/USD, USD/JPY, and AUD/USD. Capital Online Ventures provides access to these and many more with ultra-tight spreads."
  },
  {
    title: "How does leverage work in Forex trading?",
    subTitle: "Leverage allows you to control a larger position with a smaller amount of capital. For example, 1:100 leverage means you can control $100,000 with just $1,000. While it can amplify profits, it also increases risk, so we provide comprehensive risk management tools."
  },
  {
    title: "When is the Forex market open?",
    subTitle: "The Forex market is open 24 hours a day, five days a week. It follows global financial centers, starting in Sydney, then moving to Tokyo, London, and New York, ensuring you can trade whenever opportunity strikes."
  },
  {
    title: "Can I trade Forex on my mobile?",
    subTitle: "Yes, our platform is fully optimized for mobile devices. You can trade, monitor your positions, and access real-time market news through our mobile-responsive web terminal or the Exness Trade app."
  },
];

const features = [
  {
    icon: <BsCurrencyExchange />,
    title: "Global Major Pairs",
    description: "Trade the world's most liquid pairs including EUR/USD, GBP/USD, and more with industry-leading spreads."
  },
  {
    icon: <BsLightningCharge />,
    title: "Instant Execution",
    description: "Benefit from lightning-fast order execution with no delays, ensuring your trades are placed at the price you want."
  },
  {
    icon: <BsShieldCheck />,
    title: "Flexible Leverage",
    description: "Choose leverage that suits your trading style and risk appetite, giving you more control over your market exposure."
  }
];

export default function ForexPage() {
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
                Capitalize on Global <span className="text-blue-600">Currency</span> Price Movements
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                The foreign exchange market is the largest and most liquid financial market in the world. At Capital Online Ventures, we provide you with the tools and conditions to trade with confidence.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Ultra-Tight Spreads", desc: "Enjoy some of the lowest spreads in the industry starting from 0.0 pips." },
                  { title: "No Hidden Fees", desc: "Transparent pricing with zero commissions on major pairs." },
                  { title: "24/5 Expert Support", desc: "Our team is here to assist you whenever the markets are open." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
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
                src={forexAbout}
                alt="Forex Trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Trade Forex with Us?"
        subtitle="Experience superior trading conditions and a platform designed for both beginners and professional traders."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Frequently Asked <span className="text-blue-600">Questions</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Everything you need to know about trading Forex on our platform. {"Can't"} find the answer? Contact our support.
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
