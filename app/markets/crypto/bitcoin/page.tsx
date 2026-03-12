'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import bitcoinAbout from '@/assets/hm-bitcoin-hero.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { FaGlobe, FaLock, FaWallet } from "react-icons/fa";
import { BsLightningCharge, BsShieldCheck, BsGraphUp } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "What makes Bitcoin unique?",
    subTitle: "Bitcoin is the world's first decentralized digital currency. It operates on a peer-to-peer network without intermediaries, making it resistant to censorship and inflation due to its fixed supply of 21 million coins."
  },
  {
    title: "Is Bitcoin a safe investment?",
    subTitle: "Bitcoin has established itself as the leading digital asset over the last decade. While historically volatile, it is increasingly viewed as 'digital gold' and a hedge against traditional market instability."
  },
  {
    title: "How do I store my Bitcoin safely?",
    subTitle: "We provide secure integrated wallets, but we also support and encourage the use of external 'cold' storage for long-term holdings. Our platform offers multi-factor authentication for maximum account security."
  },
  {
    title: "What are the fees for trading Bitcoin?",
    subTitle: "We offer some of the most competitive spreads in the industry for Bitcoin trading. Our goal is to provide a low-cost entry point for both retail and institutional investors."
  },
];

const features = [
  {
    icon: <FaLock />,
    title: "Institutional Security",
    description: "Your assets are protected by industry-leading encryption and multi-layered security protocols, ensuring maximum peace of mind."
  },
  {
    icon: <BsLightningCharge />,
    title: "Instant Settlement",
    description: "Benefit from rapid trade execution and lightning-fast deposit/withdrawal processes, allowing you to move capital efficiently."
  },
  {
    icon: <BsGraphUp />,
    title: "Market Insights",
    description: "Access real-time data and professional-grade technical analysis tools to stay ahead of market trends and optimize your strategy."
  }
];

export default function BitcoinPage() {
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
                Invest in the <span className="text-blue-600">Digital Gold</span> of the 21st Century
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without intermediaries. At Capital Online Ventures, we make it easier than ever to securely buy, sell, and trade the {"world's"} leading cryptocurrency.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Decentralized & Transparent", desc: "Built on blockchain technology, ensuring every transaction is secure and verifiable." },
                  { title: "Finite Supply", desc: "Only 21 million Bitcoins will ever exist, making it a powerful hedge against fiat inflation." },
                  { title: "24/7 Global Trading", desc: "The Bitcoin market never sleeps. Trade anytime, anywhere with our high-speed platform." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <FaGlobe size={14} />
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
                src={bitcoinAbout}
                alt="Bitcoin Trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Choose Bitcoin?"
        subtitle="Discover why Bitcoin has become the choice for millions of investors looking for a secure and decentralized store of value."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Bitcoin <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Everything you need to know about the future of digital currency.
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