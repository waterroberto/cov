import React from 'react';
import WorldOppImage from '@/assets/hm-world-opp.webp'
import Image from 'next/image';

export default function WorldOpportunities() {
  return (
    <section className='p-8 py-24 bg-gray-950 lg:px-24'>
      <div className='md:grid-cols-2 text-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div className=''>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>
          Discover a World of Opportunities
          </h2>
          <p className=' leading-7 font-light text-xl'>
            Invest globally in commodities, stocks, and more from a single unified platform. Fund your account in multiple currencies and trade assets denominated in multiple currencies. Access market data 24 hours a day and six days a week.
          </p>
          <div className="flex justify-between sm:w-8/12 lg:w-full w-10/12 mx-aut my-4 text-lg">
            <div className=' space-y-2'>
              <p>126</p>
              <p>Markets</p>
            </div>
            <div className='space-y-2'>
              <p>150</p>
              <p>Countries</p>
            </div>
            <div className='space-y-2'>
              <p>145</p>
              <p>Currencies</p>
            </div>
          </div>

        </div>
        <Image
          alt='world image'
          className='w-full max-w-[1024px] mx-auto block h-[315px] sm:h-[400px] md:h-[512px] rounded-2xl'
          src={WorldOppImage}
        ></Image>
      </div>
    </section> 
  );
}
