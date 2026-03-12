'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaChartLine, FaWheatAwn, FaOilCan, FaLeaf, FaChevronRight } from 'react-icons/fa6';
import { BsCurrencyExchange, BsLightningCharge, BsShieldCheck } from 'react-icons/bs';

const categories = [
  {
    title: "Forex Trading",
    description: "Trade over 50+ currency pairs with institutional-grade liquidity and lightning-fast execution.",
    icon: <BsCurrencyExchange className="text-blue-500" />,
    url: "/markets/forex",
    color: "blue",
    subLinks: [
      { name: "Major Pairs", url: "/markets/forex" },
      { name: "Exotics", url: "/markets/forex" }
    ]
  },
  {
    title: "Stock Market",
    description: "Invest in high-performance stocks of global leaders. Benefit from dividends and long-term appreciation.",
    icon: <FaChartLine className="text-emerald-500" />,
    url: "/markets/stocks",
    color: "emerald",
    subLinks: [
      { name: "International Stocks", url: "/markets/stocks" },
      { name: "Indices", url: "/markets/stocks" }
    ]
  },
  {
    title: "Cryptocurrencies",
    description: "Access the digital frontier. Trade Bitcoin, Ethereum and major altcoins with 24/7 market access.",
    icon: <BsLightningCharge className="text-orange-500" />,
    url: "/markets/crypto",
    color: "orange",
    subLinks: [
      { name: "Bitcoin (BTC)", url: "/markets/crypto/bitcoin" },
      { name: "Ethereum (ETH)", url: "/markets/crypto/etherum" },
      { name: "Market Overview", url: "/markets/crypto" }
    ]
  },
  {
    title: "Commodities & Energy",
    description: "From Gold to Energy. Diversify your portfolio with tangible assets that hedge against inflation.",
    icon: <FaOilCan className="text-slate-400" />,
    url: "/markets/commodities/gold",
    color: "slate",
    subLinks: [
      { name: "Gold & Silver", url: "/markets/commodities/gold" },
      { name: "Crude Oil", url: "/markets/commodities/crudeoil" },
      { name: "Gasoline & Lithium", url: "/markets/commodities/energy/gasoline" },
      { name: "Manganese", url: "/markets/commodities/maganese" }
    ]
  },
  {
    title: "Agriculture & Specialty",
    description: "Support global food security while earning from high-yielding farmland and livestock operations.",
    icon: <FaWheatAwn className="text-amber-600" />,
    url: "/markets/agriculture/livestock",
    color: "amber",
    subLinks: [
      { name: "Animal Livestock", url: "/markets/agriculture/livestock" },
      { name: "Productive Farmland", url: "/markets/agriculture/farmland" },
      { name: "Poultry Farming", url: "/markets/agriculture/poultry" },
      { name: "Legal Marijuana", url: "/markets/commodities/marijuana" }
    ]
  },
  {
    title: "Retirement Plans",
    description: "Tailored long-term strategies designed to secure your financial freedom and peace of mind.",
    icon: <BsShieldCheck className="text-indigo-500" />,
    url: "/markets/retirements",
    color: "indigo",
    subLinks: [
      { name: "Personal Plans", url: "/markets/retirements" },
      { name: "Corporate Plans", url: "/markets/retirements" }
    ]
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function MarketsOverview() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Comprehensive <span className="text-blue-600">Trading Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Explore a world of opportunities. From traditional markets to digital assets, we provide the tools and security for every investor.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((cat, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="group relative p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${cat.color}-100/50 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-${cat.color}-100 transition-all duration-500`}>
                {cat.icon}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Sub-links Grid */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.subLinks.map((link, j) => (
                    <Link 
                      key={j} 
                      href={link.url}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-[12px] font-bold text-gray-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      {link.name}
                      <FaChevronRight size={8} className="opacity-50" />
                    </Link>
                  ))}
                </div>
                
                <Link 
                  href={cat.url}
                  className="inline-flex items-center gap-2 pt-6 text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors border-t border-gray-200/60 w-full"
                >
                  Explore Category <FaChevronRight size={12} className="group-hover:translate-x-1 transition-transform ml-auto" />
                </Link>
              </div>

              {/* Decorative hover gradient */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Global Statistics/Trust Bar */}
        <div className="mt-24 p-10 rounded-[3rem] bg-gray-900 text-white flex flex-wrap justify-around gap-12 text-center shadow-2xl">
          {[
            { label: "Assets", value: "500+" },
            { label: "Daily Volume", value: "$4.2B" },
            { label: "Active Traders", value: "85k" },
            { label: "Support", value: "24/7" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
