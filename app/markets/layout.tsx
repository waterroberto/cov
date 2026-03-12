'use client';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Button from '@/components/Global/Button';
import page1 from '@/assets/hm-hero-forex.jpg'
import StocksImage from '@/assets/hm-stocks-2.jpg'
import RetirementImage from '@/assets/reitrement-about.jpg'
import CryptoImage from '@/assets/hm-crypto-hero-2.png'
import BitcoinImage from '@/assets/hm-bitcoin-hero.jpg'
import liveStock from '@/assets/hm-livestock.webp'
import farmLand from '@/assets/hm-agricu-home.jpg'
import poultry from '@/assets/hm-poultry.jpg'
import marijuanaImage from '@/assets/hm-marijuan-hero.jpg'
import maganesesImage from '@/assets/hm-maganease-hero.jpg'
import gasolineImage from '@/assets/gasoline-hero.jpg'
import silverImage from '@/assets/hm-silver-hero.jpg'
import lithiumImage from '@/assets/hm-lithium.jpg'
import goldImage from '@/assets/hm-gold-hero.jpg'
import crudeOilImage from '@/assets/crude-hm.jpg'
import preciousMetalImage from '@/assets/precious-metal-hero.jpg'
import etherumImage from '@/assets/etherum-hero.jpg'
// import Sidebar from '@/components/Admin/Sidebar';

import Meta from '@/components/Global/Meta';
import Navbar from '@/components/Navbar';


import { usePathname, useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { motion } from 'framer-motion';

interface PageHeroSection {
  [key: string] : {
  name: string
  image: StaticImageData
  title: string
  subTitle: string
  bgColor: string
  }
}

const pages: PageHeroSection = {
  "/markets/forex": {
    name: "forex", 
    image:page1, 
    title: "Trade Forex", 
    subTitle: "Tap into the world’s largest financial market",
    bgColor: "rgb(4, 4, 6)"
  },
  "/markets/stocks": {
    name: "stocks", 
    image:StocksImage, 
    title: "Trade stocks with zero commission", 
    subTitle: "Trade stocks of the biggest names in the international stock market with low transaction costs.",
    bgColor: "rgb(4, 0, 0)"
  },
  "/markets/retirements": {
    name: "retirements", 
    image:RetirementImage, 
    title: "Secure Your Future: Smart Retirement Planning Made Easy", 
    subTitle: "Plan today, retire comfortably tomorrow. Invest wisely and achieve financial freedom with a retirement plan tailored to your goals",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/crypto": {
    name: "crypto", 
    image:CryptoImage, 
    title: "Trade crypto swap-free", 
    subTitle: "Trade popular cryptocurrencies including BTCUSD and ETHUSD, and hold your positions with no overnight charges.",
    bgColor: "rgba(9, 24, 73)"
  },
  "/markets/crypto/bitcoin": {
    name: "bitcoin", 
    image:BitcoinImage, 
    title: "Bitcoin: The Future of Digital Money", 
    subTitle: "Secure, Decentralized, and Borderless Currency for the Digital Age",
    bgColor: "rgb(4, 4, 6)"
  },
  "/markets/crypto/etherum": {
    name: "etherum", 
    image:etherumImage, 
    title: "💰 Unlock the Power of Ethereum with CAP VENTURES", 
    subTitle: "Ethereum is more than just a cryptocurrency—it’s a gateway to smart contracts, DeFi, and NFTs. Start investing today and secure your stake in the future of digital assets.",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/agriculture/livestock": {
    name: "livestock", 
    image:liveStock, 
    title: "Livestock investment is a powerful shield against inflation", 
    subTitle: "Rising costs can erode wealth, but livestock remains a valuable asset. With steady demand and growing markets, investing in cattle, sheep, or goats offers financial security and long-term growth.",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/agriculture/farmland": {
    name: "farmland", 
    image:farmLand, 
    title: "Farmland Investment is a Hedge Against Inflation", 
    subTitle: "Plan today, retire comfortably tomorrow. Invest wisely and achieve financial freedom with a retirement plan tailored to your goals",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/agriculture/poultry": {
    name: "poultry", 
    image:poultry, 
    title: "Poultry farming offers a stable and profitable hedge in uncertain times", 
    subTitle: "Eggs and poultry meat are daily essentials, ensuring a constant revenue stream. As food prices rise, poultry farming provides a reliable way to safeguard wealth while meeting a growing demand.",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/commodities/gold": {
    name: "gold", 
    image:goldImage, 
    title: "Turn Gold into Growth – Invest in Stability", 
    subTitle: "Harness the power of gold to safeguard your future. With CAP VENTURES, access premium gold investment opportunities designed for long-term success.",
    bgColor: "rgba(255, 215, 0, 0.3)"
  },
  "/markets/commodities/silver": {
    name: "silver", 
    image:silverImage, 
    title: "Silver: A Timeless Asset for a Stronger Portfolio", 
    subTitle: "Secure your future with silver—an investment that holds its value and offers growth potential in a changing economy.",
    bgColor: "rgb(4, 4, 6)"
  },
  "/markets/commodities/preciousmetal": {
    name: "preciousmetal", 
    image:preciousMetalImage, 
    title: "Precious Metals: Wealth That Stands the Test of Time", 
    subTitle: "Hedge against market volatility with precious metals, the ultimate store of value throughout history.",
    bgColor: "rgba(169, 169, 169,0.5) "
  },
  "/markets/commodities/maganese": {
    name: "maganese", 
    image:maganesesImage, 
    title: "Manganese: The Essential Metal for Global Innovation", 
    subTitle: "Invest in manganese, a critical component in steel and battery technology driving modern industry.",
    bgColor: "rgb(112, 128, 144)"
  },
  "/markets/commodities/marijuana": {
    name: "marijuana", 
    image:marijuanaImage, 
    title: "Invest in Cannabis: A Thriving Industry with Limitless Potential", 
    subTitle: "Seize the opportunity in the booming marijuana market and grow your wealth in a rapidly expanding sector.",
    bgColor: "rgb(34, 139, 34)"
  },
  "/markets/commodities/crudeoil": {
    name: "crudeoil", 
    image:crudeOilImage, 
    title: "Turn Oil into Opportunity – Secure Your Stake in Energy", 
    subTitle: "Crude oil remains a powerhouse investment, offering long-term returns in the ever-evolving energy sector.",
    bgColor: "rgb(20, 20, 20)"
  },
  "/markets/commodities/energy/gasoline": {
    name: "gasoline", 
    image:gasolineImage, 
    title: "Gasoline: A High-Demand Asset for Smart Investors", 
    subTitle: "Fuel your portfolio with gasoline investments, a vital resource driving economies and industries worldwide.",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },
  "/markets/commodities/energy/lithium": {
    name: "lithium", 
    image:lithiumImage, 
    title: "The Lithium Boom – Invest in the Future of Energy", 
    subTitle: "Secure your place in the fast-growing lithium market and profit from the rise of clean energy solutions.",
    bgColor: "rgba(169, 126, 22, 0.65)"
  },

}

const bannerSection: {[key: string]: {name: string, title: string, subTitle: string}} = {
    "/markets/forex": {
    name: "forex", 

    title: "Forex trading with low and stable spreads", 
    subTitle: "Access the global forex market and trade the world’s most popular currency pairs with better-than-market conditions."
  },
  "/markets/stocks": {
    name: "stocks",
    title: "Trade Stocks", 
    subTitle: "Invest in the biggest names in tech and industry."
  },
  "/markets/retirements": {
    name: "retirements",
    title: "Plan Your Retirement", 
    subTitle: "Build Wealth, Retire Smart: Your Path to Financial Freedom."
  },
  "/markets/crypto": {
    name: "crypto",
    title: "Trade 24/7 crypto", 
    subTitle: "Capitalize on the world’s top cryptocurrency pairs."
  },
  "/markets/crypto/bitcoin": {
    name: "bitcoin",
    title: "⚡ Invest in Bitcoin: The Future of Digital Wealth", 
    subTitle: "Bitcoin remains the world’s most valuable digital asset, offering security, scarcity, and long-term growth potential. With CAP VENTURES, investing in Bitcoin is easier and more rewarding than ever."
  },
  "/markets/crypto/etherum": {
    name: "etherum",
    title: "Invest in Ethereum: The Future of Digital Finance", 
    subTitle: "Ethereum is revolutionizing decentralized finance and blockchain applications. With CAP VENTURES, you can securely invest in this high-potential asset and capitalize on the next wave of financial innovation."
  },
    "/markets/agriculture/livestock": {
    name: "livestock", 
    title: "Livestock Investment: A Smart Way to Build Wealth", 
    subTitle: "Turn your farm into a financial powerhouse. Invest in livestock today and enjoy sustainable profits that grow with time, securing your future against inflation.",
  },
  "/markets/agriculture/farmland": {
    name: "farmland", 
    title: "Farmland Investment: A Stable Path to Wealth and Security", 
    subTitle: "Owning farmland isn't just about agriculture—it's a long-term hedge against inflation. As land values rise and food demand grows, farmland remains a tangible, appreciating asset that secures your financial future.",
  },
  "/markets/agriculture/poultry": {
    name: "poultry", 
    title: "Poultry Farming: A Profitable Path to Financial Stability", 
    subTitle: "Stable, scalable, and always in demand—poultry farming is your key to consistent income. Start today and build a thriving business that secures your financial future.",
  },

   "/markets/commodities/gold": {
    name: "gold", 
    title: "Gold: The Smart Choice for Lasting Wealth", 
    subTitle: "Diversify your investments with gold—an asset that withstands market fluctuations and preserves your purchasing power over time",
  },
  "/markets/commodities/silver": {
    name: "silver", 
    title: "Silver: A Shining Opportunity for Smart Investors", 
    subTitle: "Invest in silver to diversify your portfolio with a high-demand, inflation-resistant asset that offers both stability and growth potential.",
  },
  "/markets/commodities/preciousmetal": {
    name: "preciousmetal", 
    title: 'Precious Metals: Timeless Wealth, Unmatched Stability', 
    subTitle: "Protect your wealth with gold, silver, and platinum investments—assets that have stood the test of time and market fluctuations.",
  },
  "/markets/commodities/maganese": {
    name: "maganese", 
    title: "Manganese: Powering the Future of Industry & Innovation", 
    subTitle: "Secure your stake in a critical metal driving steel production and battery technology for the modern world.",
  },
  "/markets/commodities/marijuana": {
    name: "marijuana", 
    title: '"Invest in the Future of Cannabis – A Growing Market"', 
    subTitle: "Capitalize on the expanding marijuana industry with strategic investments in one of the fastest-growing global markets.",
  },
  "/markets/commodities/crudeoil": {
    name: "crudeoil", 
    title: "Fuel Your Portfolio with Crude Oil Investments", 
    subTitle: "Tap into the energy sector with crude oil investments, a cornerstone of global markets and economic growth",
  },
  "/markets/commodities/energy/gasoline": {
    name: "gasoline", 
    title: "Gasoline Investments: Driving Profits in a High-Demand Market", 
    subTitle: "Capitalize on gasoline, a vital global commodity, and fuel your investment strategy with long-term growth",
  },
  "/markets/commodities/energy/lithium": {
    name: "lithium", 
    title: "Lithium: The Power Behind the Electric Revolution", 
    subTitle: "Invest in lithium and be part of the booming EV and renewable energy market, securing your future in the next energy wave.",
  },
}


// export const metadata: Metadata = {
//   title: "CAP VENTURES Markets",
//   description: "Markets",
// };


export default function MarketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName)

  const currentPage = pages[pathName] || {
    name: "markets",
    title: "Global Markets",
    subTitle: "Trade the world's most popular financial instruments with Capital Online Ventures.",
    image: page1,
    bgColor: "rgb(4, 4, 6)"
  };

  

    return (
      <div className="min-h-screen bg-white">
        <Meta />
        <Navbar />
        
        {/* Modern Hero Section */}
        <section 
          className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: currentPage.bgColor || '#111827' }}
        >
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <motion.div 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] bg-blue-600 blur-[120px] rounded-full"
            />
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] bg-emerald-600 blur-[120px] rounded-full"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
              >
                <h1 className={`text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight ${currentPage.bgColor.includes('255, 215, 0') || currentPage.name === 'retirements' ? 'text-gray-900' : 'text-white'}`}>
                  {currentPage.title.split(':').map((part, i) => (
                    <span key={i} className={i === 1 ? `block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600` : ''}>
                      {part}{i === 0 && currentPage.title.includes(':') ? ':' : ''}
                    </span>
                  ))}
                  {!currentPage.title.includes(':') && currentPage.title}
                </h1>
                <p className={`text-xl mb-10 leading-relaxed font-medium md:max-w-xl ${currentPage.name === 'retirements' ? 'text-gray-700' : 'text-gray-400'}`}>
                  {currentPage.subTitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/auth/register">
                    <Button variant="fill" size="large" color="primary_2" className="px-10 py-4 text-lg rounded-2xl shadow-xl shadow-blue-500/20">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outlined" size="large" color={currentPage.name === 'retirements' ? 'dark' : 'white'} className="px-10 py-4 text-lg rounded-2xl">
                      Talk to Expert
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image 
                    src={currentPage.image}
                    alt={currentPage.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <main className="relative z-10">
          {children}
        </main>

        <ContactUs 
          title={bannerSection[pathName]?.title || "Ready to Trade?"} 
          subTitle={bannerSection[pathName]?.subTitle || "Join thousands of traders worldwide and start your journey today."} 
        />
        <Footer />
      </div>
    );
}
