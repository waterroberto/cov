import bg from '@/assets/crude-hm.jpg';
import heroImage from '@/assets/hm-hero-bg-all.webp';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../Global/Button';


const Hero = () => {
  return (
    <section
      className='padding sm:pt-32  relative overflow-hidden gap-8 p-4 sm:px-8 lg:px-16 xl:px-32 pt-48 lg:pt-32 items-center bg-blend-normal  min-h-screen'
      style={{
        // background: `linear-gradient(48deg,#000 47%,#060606 63%,#0ea5e9 76%,#044ab2 89%,#033e8c), no-repeat center center/cover`,
        background: `linear-gradient(rgba(0, 22, 29, 0.7), rgba(0, 22, 29, 0.9)), url(${heroImage.src}) no-repeat center center/cover`,
      }}
    >
      <div className='mt-32 w-full max-w-5xl mx-auto text-gray-50 flex flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-extrabold lg:text-5xl text-center'>
          CAP VENTURES  Limitless Market Opportunities!
        </h1>
        <h3 className='text-xl xl:text-2xl text-center'>
          Empower Your Financial Future – Access Global Markets, Trade Forex, Commodities, and Stocks with Ease, and Watch Your Investments Grow with Confidence!
.
        </h3>
        <div className='flex items-center justify-center gap-4 my-6'>
          <Link href='/auth/register'>
            <Button color='primary_2' size='large'>Create Account</Button>
          </Link>
          <Link href='/auth/login'>
            <Button size='large' color='dark'>
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* <Image
        src={heroImage}
        alt='Screenshot of CAP VENTURES Dashboard'
        className='w-full max-w-xl block mx-auto rounded-lg'
      /> */}
    </section>
  );
};

export default Hero;
