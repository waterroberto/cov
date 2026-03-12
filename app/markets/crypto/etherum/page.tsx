'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import ethereumAbout from '@/assets/etherum.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { SiEthereum } from 'react-icons/si';
import { BsLightningCharge, BsShieldCheck, BsLayers } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why should I invest in Ethereum?",
    subTitle: "Ethereum is more than just a currency; it's the foundation for decentralized finance (DeFi), NFTs, and smart contracts. Its widespread adoption and continuous technological evolution make it a high-potential asset."
  },
  {
    title: "How does Capital Online Ventures help me invest in Ethereum?",
    subTitle: "We provide a secure, institutional-grade platform with advanced trading tools, low latency, and competitive conditions to help you capitalize on Ethereum's market movements."
  },
  {
    title: "Is Ethereum a safe investment?",
    subTitle: "While all digital assets carry risk, Ethereum's deep liquidity and massive developer ecosystem make it one of the most established and reliable projects in the blockchain space."
  },
  {
    title: "Can I earn passive income with Ethereum?",
    subTitle: "Yes, our platform supports Ethereum staking and other DeFi-integrated opportunities, allowing you to generate yield on your holdings while participating in the network's security."
  },
  {
    title: "What is the future outlook for Ethereum?",
    subTitle: "With the transition to Proof of Stake and ongoing scalability upgrades (Layer 2s), Ethereum is positioned to become the settlement layer for the global digital economy."
  }
];

const features = [
  {
    icon: <BsLayers />,
    title: "Smart Contract Power",
    description: "Harness the power of the world's leading programmable blockchain to build and interact with the future of decentralized applications."
  },
  {
    icon: <BsLightningCharge />,
    title: "High Performance",
    description: "Experience low-latency execution and deep liquidity, essential for professional trading in the dynamic Ethereum market."
  },
  {
    icon: <BsShieldCheck />,
    title: "Global Security",
    description: "Protect your assets with multi-signature security and institutional-grade custody solutions, ensuring absolute peace of mind."
  }
];

export default function EthereumPage() {
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
                Empower Your Portfolio with <span className="text-blue-600">Ethereum</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Ethereum is more than just a cryptocurrency—it’s a decentralized platform powering the next generation of financial innovation. At Capital Online Ventures, we provide seamless access to the Ethereum ecosystem.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "DeFi Frontier", desc: "Access the backbone of decentralized finance and global innovation." },
                  { title: "Institutional Grade", desc: "Trade with confidence on a platform designed for professional standards." },
                  { title: "Staking Opportunities", desc: "Participate in network security and earn rewards on your ETH holdings." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <SiEthereum size={14} />
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
                src={ethereumAbout}
                alt="Ethereum Trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Unleash Ethereum's Potential"
        subtitle="Trade the world's most versatile blockchain with a platform that offers superior conditions and tools."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Ethereum <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Deep dive into the technology powering the future of the internet.
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