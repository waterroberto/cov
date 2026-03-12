import Link from 'next/link';
import React from 'react';

const ContactHeader = () => {
  return (
    <section className='relative pt-40 pb-20 px-8 text-center bg-gray-900 border-b border-gray-800 overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600 blur-[120px] rounded-full' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-emerald-600 blur-[120px] rounded-full' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-black text-white mb-6 tracking-tight'>
          Get in <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400'>Touch</span>
        </h1>
        <p className='text-lg md:text-xl text-gray-400 leading-relaxed font-medium'>
          Have questions or need assistance? Our dedicated support team is here to help you navigate your journey with Capital Online Ventures.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;
