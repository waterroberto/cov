"use client"
import bg from '@/assets/hm-agricu-home.jpg';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';
import Image from 'next/image';
import populationImage from '@/assets/population.png'
import capacityImage from '@/assets/capacity.png'
import charityImage from '@/assets/charity.png'
import anualImage from '@/assets/annual return.png'

const AgricHomeSection = () => {
  return (
    <section
      className='padding py-8  relative contact-section  flex flex-col justify-end'
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg.src}) no-repeat center center/cover`,
      }}
    > 
    <div className=' flex flex-col sm:flex-row absolute top-0 left-0 w-full justify-center gap-4 sm:gap-12 items-center bg-[#0078FF] px-2 py-2 '>
      <h2 className='text-lg sm:text-2xl font-semibold sm:font-bold text-white'>Start Exploring High Profit Potential Agriculture Investments</h2>
      <div className='self-start'>
          <Link href='/auth/register' >
            <Button  size='large' variant='outlined' color='white'>
              Open an Account
            </Button>
          </Link>
      </div>
    </div>
    <div className=" flex items-center flex-col sm:flex-row gap-6 justify-center pt-28 sm:py-14 mt-8">
      <div className='flex flex-col items-center justify-center p-4 gap-4  text-gray-50 h-60 border border-gray-50'>
        <Image alt='population' src={populationImage.src} width={60} height={60} />
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          10 BILLION
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          THE WORLD POPULATION BY 2050
        </p>
      </div>
      <div className='flex flex-col items-center justify-center p-4 gap-4  text-gray-50 h-60 border border-gray-50'>
         <Image alt='population' src={charityImage.src} width={60} height={60}/>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          70%
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          MORE FOOD WILL NEED TO BE PRODUCED
        </p>

      </div>
      <div className='flex flex-col items-center justify-center p-4 gap-4  text-gray-50 h-60 border border-gray-50'>
         <Image alt='population' src={anualImage.src} width={60} height={60} />
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          11.5%
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          THE AVERAGE ANNUAL RETURN OF Agriculture
        </p>
      </div>

    </div>
    </section>
  );
};

export default AgricHomeSection;
