"use client"
import bg from '@/assets/hm-home-page-bg.webp';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';

const StepsToRegister = () => {
  return (
    <section
      className='padding py-8 contact-section'
      style={{
        background: `url(${bg.src}) no-repeat center center/cover`,
      }}
    > 
    <div className=" flex items-center flex-col sm:flex-row gap-6 justify-center">
      <div className='flex flex-col items-center justify-center p-4 gap-4 mb-12 text-gray-50'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          Step 1
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          Complete the Application
        </p>
        <p className='font-medium lg:text-lg text-center'>
          It only takes a few minutes
        </p>
      </div>
      <div className='flex flex-col items-center justify-center p-4 gap-4 mb-12 text-gray-50'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          Step 2
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          Fund Your Account
        </p>
        <p className='font-medium lg:text-lg text-center'>
          Connect your bank or transfer an account
        </p>

      </div>
      <div className='flex flex-col items-center justify-center p-4 gap-4 mb-12 text-gray-50'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          Step 3
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          Get Started
        </p>
        <p className='font-medium lg:text-lg text-center'>
          Take your investing to the next level
        </p>
      </div>

    </div>
    <div className='justify-center mx-auto w-full flex items-center'>
        <Link href='/auth/register' >
          <Button  size='large' color='primary_2'>
            Open an Account
          </Button>
        </Link>
    </div>
    </section>
  );
};

export default StepsToRegister;
