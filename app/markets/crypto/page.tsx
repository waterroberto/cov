'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import cryptoAbout from '@/assets/hm-crypto-about.png';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { SiBitcoin, SiEthereum, SiBinance } from 'react-icons/si';
import { BsShieldLock, BsLightningCharge, BsGlobe } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "What is blockchain technology, and how does it work?",
    subTitle: "Blockchain is a decentralized digital ledger that records transactions across many computers so that the record cannot be altered retroactively. This ensures transparency and security without the need for a central authority."
  },
  {
    title: "How do I decide which cryptocurrencies to trade?",
    subTitle: "Consider factors like market capitalization, liquidity, and the underlying technology. We provide real-time market insights and historical data to help you make informed decisions in the dynamic crypto market."
  },
  {
    title: "Can I trade crypto 24/7?",
    subTitle: "Yes, unlike traditional stock markets, the cryptocurrency market is open 24 hours a day, 7 days a week, 365 days a year. You can trade anytime opportunity strikes."
  },
  {
    title: "How secure is crypto trading on your platform?",
    subTitle: "We employ industry-leading security protocols, including multi-factor authentication and cold storage for assets, to ensure your crypto investments are always protected."
  },
];

const features = [
  {
    icon: <BsShieldLock />,
    title: "Secure Trading",
    description: "Benefit from advanced encryption and multi-layered security protocols designed to keep your digital assets safe at all times."
  },
  {
    icon: <BsLightningCharge />,
    title: "Lightning-Fast Execution",
    description: "Never miss a market move. Our high-performance trading engine ensures your orders are executed in milliseconds."
  },
  {
    icon: <BsGlobe />,
    title: "24/7 Global Access",
    description: "Trade top cryptocurrencies any time of the day or night. The crypto market never sleeps, and neither does our platform."
  }
];

export default function CryptoPage() {
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
                Unlock the Power of <span className="text-blue-600">Digital Assets</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Step into the future of finance. Trade the {"world's"} most popular cryptocurrencies with competitive spreads and no overnight charges on key pairs.
              </p>
              
              <div className="flex flex-wrap gap-8 py-4">
                <div className="flex items-center gap-3 text-gray-700 bg-gray-100 px-6 py-3 rounded-2xl font-bold">
                  <SiBitcoin className="text-[#F7931A] text-2xl" /> Bitcoin
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-gray-100 px-6 py-3 rounded-2xl font-bold">
                  <SiEthereum className="text-[#627EEA] text-2xl" /> Ethereum
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-gray-100 px-6 py-3 rounded-2xl font-bold">
                  <SiBinance className="text-[#F3BA2F] text-2xl" /> BNB
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Zero Swap Fees", desc: "Hold your crypto positions for as long as you want without any overnight charges." },
                  { title: "Advanced Charting", desc: "Utilize professional-grade technical analysis tools to perfect your timing." },
                  { title: "Instant Withdrawals", desc: "Access your profits quickly with our streamlined payment systems." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                      <BsLightningCharge size={14} />
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
                src={cryptoAbout}
                alt="Crypto Trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Trade Crypto with Us?"
        subtitle="Experience the best of traditional trading combined with the innovation of digital assets."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Cryptocurrency <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Get the technical clarity you need to navigate the world of digital finance.
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