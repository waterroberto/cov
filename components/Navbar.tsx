'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgMenuRight } from 'react-icons/cg';
import { FaChevronDown, FaFire, FaChartLine, FaWheatAwn, FaOilCan, FaLeaf } from 'react-icons/fa6';
import { BsArrowRightShort, BsCurrencyExchange } from 'react-icons/bs';
import Button from './Global/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';
import Logo from './Global/Logo';

interface MarketItem {
  name: string;
  url: string;
  icon?: React.ReactNode;
  description?: string;
}

interface MarketCategory {
  title: string;
  items: MarketItem[];
}

const marketCategories: MarketCategory[] = [
  {
    title: "Financial Instruments",
    items: [
      { name: 'Forex Trading', url: '/markets/forex', icon: <BsCurrencyExchange className="text-blue-500" />, description: "Major and exotic currency pairs." },
      { name: 'Stock Market', url: '/markets/stocks', icon: <FaChartLine className="text-emerald-500" />, description: "Blue-chip stocks and global indices." },
      { name: 'Retirement Plans', url: '/markets/retirements', icon: <FaLeaf className="text-indigo-500" />, description: "Secure long-term growth strategies." },
    ]
  },
  {
    title: "Digital Assets",
    items: [
      { name: 'Bitcoin Market', url: '/markets/crypto/bitcoin', icon: <FaFire className="text-orange-500" />, description: "Direct exposure to Digital Gold." },
      { name: 'Ethereum Network', url: '/markets/crypto/etherum', icon: <FaFire className="text-indigo-600" />, description: "Smart contracts and DeFi assets." },
      { name: 'Crypto Overview', url: '/markets/crypto', icon: <BsCurrencyExchange className="text-blue-400" />, description: "Broad market digital asset sector." },
    ]
  },
  {
    title: "Commodities & Energy",
    items: [
      { name: 'Gold & Silver', url: '/markets/commodities/gold', icon: <FaChartLine className="text-yellow-500" />, description: "Spot Gold, Silver, and Precious Metals." },
      { name: 'Energy (Gas & Oil)', url: '/markets/commodities/energy/gasoline', icon: <FaOilCan className="text-slate-500" />, description: "Crude Oil, Gasoline, and Lithium." },
      { name: 'Industrial Metals', url: '/markets/commodities/maganese', icon: <FaChartLine className="text-blue-400" />, description: "Manganese and raw industrial materials." },
    ]
  },
  {
    title: "Agricultural Markets",
    items: [
      { name: 'Animal Livestock', url: '/markets/agriculture/livestock', icon: <FaWheatAwn className="text-amber-600" />, description: "Sustainable cattle and sheep farming." },
      { name: 'Productive Farmland', url: '/markets/agriculture/farmland', icon: <FaWheatAwn className="text-emerald-600" />, description: "Direct investment in fertile lands." },
      { name: 'Poultry & Marijuana', url: '/markets/agriculture/poultry', icon: <FaLeaf className="text-green-600" />, description: "Poultry cycles and legal cannabis." },
    ]
  }
];

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showMarkets, setShowMarkets] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileNav = () => setShowMobileNav(!showMobileNav);

  return (
    <>
      <header 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${
          scrolled ? 'top-4' : 'top-6'
        }`}
      >
        <nav className={`relative flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-2xl' 
            : 'bg-gray-950/40 backdrop-blur-md border-white/5'
        }`}>
          {/* Logo */}
          <Link href='/' className="flex-shrink-0">
            <Logo width={130} height={130} />
          </Link>

          {/* Desktop Links */}
          <ul className='hidden lg:flex items-center gap-2'>
            <li>
              <Link href="/whyus" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                Why Us
              </Link>
            </li>
            <li 
              onMouseEnter={() => setShowMarkets(true)}
              onMouseLeave={() => setShowMarkets(false)}
              className="relative"
            >
              <button className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all ${
                showMarkets ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}>
                Markets
                <FaChevronDown className={`text-[10px] transition-transform duration-300 ${showMarkets ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {showMarkets && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="bg-gray-900 border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] p-8 min-w-[850px] backdrop-blur-2xl">
                      <div className="grid grid-cols-4 gap-10">
                        {marketCategories.map((cat, i) => (
                          <div key={i} className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">
                              {cat.title}
                            </h4>
                            <div className="space-y-1">
                              {cat.items.map((item, j) => (
                                <Link 
                                  key={j} 
                                  href={item.url}
                                  className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-gray-700 transition-all">
                                    {item.icon}
                                  </div>
                                  <div className="pt-1">
                                    <p className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">
                                      {item.name}
                                    </p>
                                    <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-medium">Explore 500+ instruments with institutional conditions.</p>
                        <Link href="/markets" className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                          View All Markets <BsArrowRightShort size={20} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link href="/contact" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Auth */}
          <div className='hidden lg:flex items-center gap-3'>
            <Link href='/auth/login'>
              <button className="px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white transition-colors">
                Login
              </button>
            </Link>
            <Link href='/auth/register'>
              <Button color='primary_2' className="!rounded-full shadow-lg shadow-blue-500/20">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobileNav}
            className='lg:hidden flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white'
          >
            <CgMenuRight className='text-xl' />
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar Redesign */}
      <AnimatePresence>
        {showMobileNav && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileNav}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-gray-950 border-r border-white/5 z-[70] lg:hidden flex flex-col pt-8"
            >
              <div className="px-8 flex items-center justify-between mb-12">
                <Logo width={120} height={120} />
                <button 
                  onClick={toggleMobileNav}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                >
                  <BiX size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-8">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 px-2 mb-4">Navigation</h4>
                  <Link 
                    href="/whyus" 
                    onClick={toggleMobileNav}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 text-gray-200 font-bold hover:bg-white/10 transition-all"
                  >
                    Why Us <BsArrowRightShort size={24} className="text-gray-500" />
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={toggleMobileNav}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 text-gray-200 font-bold hover:bg-white/10 transition-all"
                  >
                    Contact Support <BsArrowRightShort size={24} className="text-gray-500" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 px-2">Featured Markets</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {marketCategories.flatMap(c => c.items).slice(0, 6).map((item, i) => (
                      <Link 
                        key={i} 
                        href={item.url} 
                        onClick={toggleMobileNav}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-xs">
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold text-gray-300">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/markets" onClick={toggleMobileNav} className="block text-center text-xs font-bold text-blue-400 py-2">
                    Explore All Assets
                  </Link>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-gray-900/50 space-y-3">
                <Link href='/auth/login' onClick={toggleMobileNav} className="block">
                  <button className="w-full py-4 rounded-2xl text-sm font-bold text-gray-300 border border-white/10 hover:bg-white/5 transition-all">
                    Login
                  </button>
                </Link>
                <Link href='/auth/register' onClick={toggleMobileNav} className="block">
                  <Button color='primary_2' className="w-full !py-4 !rounded-2xl shadow-xl shadow-blue-500/20">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
