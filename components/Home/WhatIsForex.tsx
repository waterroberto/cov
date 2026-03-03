import React from 'react';

export default function WhatIsForex() {
  return (
    <section className='p-8 py-24 bg-primary lg:px-24'>
      <p className='text-3xl md:text-4xl font-bold text-white mb-16 text-center'>
        {/* About <span className='text-neutral'>CAP VENTURES</span> */}
         Who we are. What we do.
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='md:p-4'>
          <p className='text-2xl font-semibold text-gray-50 mb-8'>
            CAP VENTURES – Trade Commodities, Stocks & More with Confidence
          </p>

          <p className='md:text-lg text-white mt-3'>
            For decades, the world of commodities and stock trading was dominated by industry giants, leaving little room for independent investors. But at CAP VENTURES, we’re changing that narrative—empowering individuals with cutting-edge tools, expert insights, and seamless access to lucrative markets, including crude oil, agriculture, metals, stocks, and more. Now, you can break free from traditional investment barriers and capitalize on global opportunities.
            <br />

           <br />
            We specialize in commodities and stock trading, offering strategic market entry and risk management solutions to maximize returns. Our expert team continuously monitors price movements, economic trends, and supply-demand dynamics, ensuring you make informed investment decisions.
            <br />

            <br />
            With over seven years of experience in commodities, energy, and stock trading, our seasoned analysts and account managers have successfully guided investors through volatile markets. Join thousands of traders who trust CAP VENTURES to navigate the ever-evolving landscape of commodities, stocks, and global financial markets.
            {/* We specialize in trading and ensuring profitable transactions in Forex, Commodities (stocks), Indices, and more. Our team manages losses and oversees the trading process to achieve the average required monthly ROI for your selected package, facilitating your success in the global market.
            <br />
            Our elite trade development team and account managers are handpicked experts with over 7 years of experience, having traded for several of the most reputable brokers. Join over 4,000 satisfied investors worldwide who trust our services. */}
          </p>
        </div>
        <iframe
          width='420'
          height='315'
          className='w-full max-w-[1024px] mx-auto block h-[315px] sm:h-[400px] md:h-[512px] rounded-2xl'
          src='https://www.youtube.com/embed/FOIy_kPlu5M?autoplay=1'
        ></iframe>
      </div>
    </section> 
  );
}
