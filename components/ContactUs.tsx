"use client"
import bg from '@/assets/hm-contact-1.jpg';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';

const ContactUs = ({title, subTitle}: {title: string, subTitle: string}) => {
  return (
    <section
      className='padding py-8 contact-section'
      style={{
        background: `url(${bg.src}) no-repeat center center/cover`,
      }}
    >
      <div className='flex flex-col items-center justify-center p-4 gap-4 mb-12 text-gray-50'>
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold '>
          {title}
        </h2>
        <p className='font-medium lg:text-lg text-center'>
          {subTitle}
        </p>
        <Link href='/auth/register'>
          <Button  size='large' color='dark'>
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactUs;
