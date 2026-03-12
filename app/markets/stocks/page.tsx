'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import stocksAbout from '@/assets/hm-stocks-about.webp';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { AiOutlineStock, AiOutlineGlobal, AiOutlinePercentage } from 'react-icons/ai';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "How do I start trading stocks with Capital Online Ventures?",
    subTitle: "Starting is simple. Register an account, complete your profile, and make an initial deposit. You can then access thousands of global stocks through our professional trading terminals."
  },
  {
    title: "Are there any commissions on stock trades?",
    subTitle: "We offer zero-commission trading on a wide range of popular international stocks. This means you only pay the spread, allowing you to maximize your investment returns."
  },
  {
    title: "Which stock exchanges can I access?",
    subTitle: "You can trade stocks from major global exchanges including the NYSE, NASDAQ, London Stock Exchange, and more. Our platform provides real-time data and instant execution for all listed companies."
  },
  {
    title: "Can I earn dividends on my stock positions?",
    subTitle: "Yes, when you hold long positions in stocks that pay dividends, your account will be credited with the dividend amount. Similarly, for short positions, the dividend amount will be debited."
  },
];

const features = [
  {
    icon: <AiOutlinePercentage />,
    title: "Zero Commission",
    description: "Enjoy commission-free trading on thousands of global stocks. Lower costs mean higher potential returns for your portfolio."
  },
  {
    icon: <AiOutlineGlobal />,
    title: "Global Markets",
    description: "Access the biggest names in tech, healthcare, and finance from the world's most prestigious stock exchanges."
  },
  {
    icon: <AiOutlineStock />,
    title: "Fractional Trading",
    description: "Start small and grow your wealth by trading fractional shares of high-value companies like Apple, Amazon, and Tesla."
  }
];

export default function StocksPage() {
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
                Trade <span className="text-blue-600">Global Stocks</span> with Zero Commission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Diversify your portfolio with the {"world's"} most successful companies. From tech giants to legacy industries, access the international stock market with ease and precision.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Diverse Options", desc: "Choose from blue-chip stocks, growth companies, and emerging market leaders." },
                  { title: "Real-Time Analysis", desc: "Access high-level technical tools and market news to inform your strategy." },
                  { title: "Secure & Regulated", desc: "Trade with peace of mind knowing your investments are handled on a secure platform." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <AiOutlineStock size={14} />
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
                src={stocksAbout}
                alt="Stock Trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Elevate Your Stock Portfolio"
        subtitle="Access advanced trading tools and industry-leading conditions to trade the stocks of the world's biggest brands."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Stock Trading <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Find answers to the most common questions about investing in stocks through our platform.
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