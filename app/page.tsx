import AgricHomeSection from '@/components/AgricHomeSection';
import { CarouselPlugin } from '@/components/chad/Carousel';
// import ContactUs from '@/components/ContactUs';
// import TradingViewCryptoMarket from '@/components/Dashboard/Widgets/TradingViewCryptoMarket';
// import TradingViewTimeline from '@/components/Dashboard/Widgets/TradingViewTimeline';
import Footer from '@/components/Footer';
import Meta from '@/components/Global/Meta';

import HeroSection from '@/components/Home/HeroSection';
import HomeWorkEthics from '@/components/Home/HomeWorkEthics';
import PlatformFeatures from '@/components/Home/PlatformFeatures';
import RecentTransactions from '@/components/Home/RecentTransactions';
import TradingPlans from '@/components/Home/TradingPlans';
import WhatIsForex from '@/components/Home/WhatIsForex';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import WhyChooseUs2 from '@/components/Home/WhyChooseUs2';
// import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import OurServices from '@/components/OurServices';
import StepsToRegister from '@/components/StepsToRegister';
import TradingViewTicker from '@/components/Widgets/TradingViewTicker';
import TradingViewTimeline from '@/components/Widgets/TradingViewTimeline';
import WorldOpportunities from '@/components/WorldOpportunities';

const testimonies = [
  {
    "name": "William Andersen",
    "title": "HMAgrivest Investor - United Kingdom",
    "subTitle": "After exploring numerous investment options in the UK and Europe, I found that HMAgrivest stands out with its high-return opportunities and unmatched security in the commodities market."
  },
  {
    "name": "Sophia Martinez",
    "title": "HMAgrivest Investor - United States",
    "subTitle": "I've invested in multiple trading platforms, but HMAgrivest truly delivers. Their expertise in commodities and stocks, combined with their seamless investment process, makes them the best in the industry."
  },
  {
    "name": "Hiroshi Takeda",
    "title": "HMAgrivest Investor - Japan",
    "subTitle": "As a seasoned investor in Asia, I prioritize stability and long-term growth. HMAgrivest has proven to be a reliable and high-potential platform for trading and investing in global markets."
  },
  {
    "name": "Elena Petrova",
    "title": "HMAgrivest Investor - Russia",
    "subTitle": "Finding a trustworthy investment platform can be difficult, but HMAgrivest has exceeded my expectations. Their market insights and investment opportunities in crude oil and stocks are second to none."
  },
  {
    "name": "David Chen",
    "title": "HMAgrivest Investor - Singapore",
    "subTitle": "Singapore’s financial market is competitive, but HMAgrivest offers a world-class experience with high-quality investment properties and exceptional profit potential."
  },
    {
    "name": "Lucas Fontaine",
    "title": "HMAgrivest Investor - France",
    "subTitle": "I've explored various European investment platforms, and none compare to HMAgrivest. Their commitment to high-quality assets and steady returns makes them my go-to choice for financial growth."
  },
  {
    "name": "Michael Rodriguez",
    "title": "HMAgrivest Investor - Canada",
    "subTitle": "Investing with HMAgrivest has been a game-changer. Their expert-backed strategies in commodities and stocks have helped me maximize my portfolio with confidence."
  },
  {
    "name": "Aisha Khan",
    "title": "HMAgrivest Investor - United Arab Emirates",
    "subTitle": "Dubai is a hub for global investments, but HMAgrivest stands out with its high-return opportunities in crude oil, forex, and stocks. A true leader in the industry!"
  },
]


export default function Home() {
  return (
    <>
      <Meta />
      <Navbar />
      <main>
        <HeroSection />
        <TradingViewTicker/>
        <WhyChooseUs2 />
        <WhyChooseUs />
        <PlatformFeatures/>
        <TradingPlans/>
        <WorldOpportunities />
        {/* <OurServices /> */}
        <RecentTransactions/>
        <AgricHomeSection />
        {/* <WhatIsForex /> */}
        {/* <HowItWorks /> */}
        <CarouselPlugin items={testimonies} />
        {/* <HomeWorkEthics /> */}
        {/* <TradingPlans /> */}
        {/* <ContactUs /> */}
        <StepsToRegister />
        <TradingViewTimeline/>
        <Footer />
      </main>
    </>
  );
}
