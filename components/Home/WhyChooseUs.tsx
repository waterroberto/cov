import whyUsImg from '@/assets/pexels-marcus-aurelius-4064227.jpg'
import Image from 'next/image';
import React from 'react';
import { LiaChartBar } from 'react-icons/lia';
import { MdContactSupport } from 'react-icons/md';
import { RiSecurePaymentFill } from 'react-icons/ri';

const features = [
  {
    icon: <LiaChartBar />,
    title: 'Clear & competitive pricing',
    body: 'Maximize your potential with straightforward pricing and exceptional trade executions.',
  },
  {
    icon: <RiSecurePaymentFill />,
    title: 'Real time market analysis',
    body: 'Stay ahead of price action with access to actionable market insights, real time trade signals and more',
  },
  {
    icon: <MdContactSupport />,
    title: 'Diversity',
    body: "Invest in diverse commodities and assets with as little as $10,000 using CAP VENTURES's easy-to-use platform.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className=' flex flex-col p-4 sm:px-8 lg:px-16 xl:px-32 py-16 items-center bg-[#f3f0f0]'>

      <div className=" mb-6">
        <span className='mb-4 text-lg p-2 px-4 block text-center  text-primary'>
          Why Choose Us
        </span>
        <p className='text-primary text-center text-2xl md:text-4xl lg:text-5xl font-bold gradient-text'>
          Why Traders Choose CAP VENTURES Online Platform
        </p>
        <p className='sm:text-lg text-center text-gray-600 my-4'>
          At HMAgrivest, we believe in the enduring power of strength and security. Every transaction is fortified with cutting-edge protection, ensuring your wealth is as safe as it is accessible. Trust in us to safeguard your financial future and investment with unwavering commitment
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>

        <div data-aos='fade-left'>
          <div className='mt-16'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`${features[0].title === feature.title && ' bg-white shadow-lg px-4 py-3 rounded-lg'} flex items-center gap-4 my-8 max-w-xl`}
              >
                <div className='h-20 w-20 bg-primary rounded-xl text-white text-4xl flex items-center justify-center'>
                  {feature.icon}
                </div>
                <div className='flex-1'>
                  <p className='font-semibold text-lg text-primary'>
                    {feature.title}
                  </p>
                  <p className='text-gray-500'>{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={whyUsImg}
          alt='Hero image - professional man and woman'
          width={500}
          height={500}
          className='w-full max-w-xl block mx-auto h-full rounded-lg'
          data-aos='fade-right'
        />    
      </div>

      </section>
  );
}
