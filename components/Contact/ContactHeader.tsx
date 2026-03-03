import Link from 'next/link';
import React from 'react';

const ContactHeader = () => {
  return (
    <section className='px-14 products-hero-section pt-32 lg:pt-24 h-[50vh] grid grid-cols-1 gap-8 lg:grid-cols-2 text-gray-50'>
      <div className='w-full h-full  flex flex-col justify-center gap-4'>
        <h1 className='text-5xl font-extrabold sm:text-6xl'>Contact Us</h1>
        <h2 className='text-2xl'>
          Do you have any enquiries or complaints? Send us a message or use the
          below contact options.
        </h2>
      </div>
      <div />
    </section>
  );
};

export default ContactHeader;
