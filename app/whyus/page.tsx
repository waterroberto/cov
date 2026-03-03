import Footer from '@/components/Footer';
import Meta from '@/components/Global/Meta';
import Hero from '@/components/Home/Hero';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React from 'react'
import whyUsImage from '@/assets/hm-whyus.webp'
import { FaGlobeAfrica } from 'react-icons/fa';
import { AwardIcon, CheckCircle2Icon, DollarSign, Globe } from 'lucide-react';
import { MdSpeed } from 'react-icons/md';
import { AccordionDemo } from '@/components/chad/Accordion';
import OurServices from '@/components/OurServices';
import WhyChooseUs from '@/components/Home/WhyChooseUs';

const lists = [
  {
    label:"Global Market",
    icon: <Globe />
  },
  {
    label:"Professional Pricing",
    icon: <DollarSign />
  },
  {
    label:"Innovative Technology",
    icon: <MdSpeed />
  },
  {
    label:"Strength & Security",
    icon: <CheckCircle2Icon />
  },

  {
    label:"Awards",
    icon: <AwardIcon />
  },
]

const FaqData = [
  {
    title: 'Who can use your platform?',
    subTitle:
      'Our platform is available to users across 90 countries. We make sure that our users are adults so we have their identity verified through any documents available to them.',
  },
  {
      "title": "How can I deposit to my account?",
      "subTitle": "You can deposit funds into your account through various third-party platforms such as Coinbase, Paxful, Bitpay, PayPal, and Credit Card."
  },
  {
    title: 'How does HMAgrivest Investment make profit?',
    subTitle:
      'CAP VENTURES generates profit by providing investors with access to diverse investment opportunities across commodities, stocks, and other high-value assets, earning management fees and a share of successful returns. Our platform offers exclusive financial tools, educational resources, and expert market insights through subscription-based plans, creating a sustainable revenue stream. Additionally, transaction fees from investment allocations and asset trading contribute to our earnings, while strategic partnerships, referral programs, and premium advisory services further enhance profitability. By empowering investors with data-driven insights and passive income opportunities, we ensure long-term financial growth for both our clients and our business.'
  },
  {
    title: 'What problems does HMAgrivest Investment solve?',
    subTitle:
      'CAP VENTURES bridges the gap for investors seeking profitable opportunities but lacking the expertise or time to navigate complex markets. By offering diversified investment options across commodities, stocks, and other high-value assets, we eliminate the barriers to entry and provide a seamless, expertly managed experience. Our platform ensures consistent returns by leveraging data-driven insights, strategic market analysis, and risk management techniques, reducing uncertainty and emotional decision-making. Additionally, we empower investors with exclusive financial tools, educational resources, and passive income opportunities, enabling them to grow their wealth confidently and efficiently.'
  },
  {
    title: 'Why can`t I pass Level 1 verification?',
    subTitle:
      'Users must upload a valid document as stated, before they can be verified to higher levels. Users get an email stating if their account was verified or not so make sure your email is valid and active. ACCOUNTS ARE DELETED IN 7 DAYS IF NOT VERIFIED.',
  },
  {
    title: 'How do I withdraw from my account?',
    subTitle:
      'After your registration, verification and deposit, you MUST wait for the valid maturity date of your invesment plan before making withdrawal. ',
  },
  // {
  //   title: 'How can I get all my money back?',
  //   subTitle:
  //     'You can get your money back if you have not activated an Investment plan yet, or if your investments are matures. But note that you can only withdraw 95% of your total balance because 5% goes to us, as we use them for gas fees on the blockchain. So DECIDE CAREFULLY',
  // },
];

export default function WhyUsPage() {
 return (
    <>
      <Meta />
      <Navbar />
      <main>
        <section className="items-center gap-10 bg-primary pt-20 relative overflow-hidden  md:gap-8 lg:gap-20 grid grid-cols-1 lg:grid-cols-5 w-full">
          <div className='space-y-10 lg:col-span-3 order-2 lg:order-1 p-4 sm:pl-16 lg:pl-32 pt-10'>
            <h2 className='text-3xl md:text-4xl font-medium text-gray-50'>{`HMAgrivest is the Professional's Gateway to the World's Markets`}</h2>
          </div>
          <div className='lg:col-span-2 order-1 lg:order-2'>
          <Image alt='whys hero us image' src={whyUsImage} className='w-full h-full object-contain md:object-cover' />
          </div>
        </section>

        <section className='w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12'>
          <div className='w-full lg:w-10/12 mx-auto grid grid-cols-3 md:grid-cols-5 gap-8'>
            {
              lists.map((data, index) => (
              <div key={index} className='group flex flex-col gap-3 justify-center items-center cursor-pointer'>
                {data.icon}
                <p className="text-xs font-light text-center text-neutral-500 group-hover:text-secondary">{data.label}</p>

              </div>

              ))
            }

          </div>

        </section>
        
        <OurServices/>
        
      <section
        className='bg-gray-950 py-16'

      >
      <div>
        <h2
          className=' text-gray-50 font-bold text-center text-3xl sm:text-5xl'
          data-aos='fade-up'
        >
          Our Company`s Open Statistics
        </h2>
        <h4
          className=' text-gray-50 mt-1 mb-4 font-light text-center text-xl sm:text-2xl'
          data-aos='fade-up'
        >
          Trace us to our periodical milestones
        </h4>
        <div
          className=' grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 mt-8 lg:gap-0 max-w-screen-lg mx-auto px-4'
        >
          <div className="w-full items-center gap-4" data-aos="fade-down">
            <p className=' text-center text-xl sm:text-2xl text-green-300 font-bold'>28,124,232</p>
            <p className=' text-center text-lg sm:text-xl font-light text-gray-50'>INVESTORS TRUSTING US DAILY</p>
          </div>
          {/* <div className="w-full items-center gap-4" data-aos="fade-down">
            <p className=' text-center text-xl sm:text-2xl text-green-300 font-bold'>$1,142,857</p>
            <p className=' text-center text-lg sm:text-xl font-light text-gray-50'>MONTHLY WITHDRAWALS</p>
          </div>
          <div className="w-full items-center gap-4" data-aos="fade-down">
            <p className=' text-center text-xl sm:text-2xl text-green-300 font-bold'>$2,142,857</p>
            <p className=' text-center text-lg sm:text-xl font-light text-gray-50'>MONTHLY DEPOSITS</p>
          </div>
          <div className="w-full items-center gap-4" data-aos="fade-down">
            <p className=' text-center text-xl sm:text-2xl text-green-300 font-bold'>$10,169,000</p>
            <p className=' text-center text-lg sm:text-xl font-light text-gray-50'>IN APPROVED LOANS</p>
          </div> */}
        </div>
      </div>
    </section>

        <section className='w-full bg-[#0078FF]'>
          <div className=' w-full  md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 flex flex-col items-center text-gray-200 gap-5'>
            <p className=' text-2xl font-semibold text-center'>{`"I saw a need to offer people the opportunity to invest in Commodities, Stocks, etc. without putting up huge amounts of capital."`}</p>
            <p className=' text-lg font-bold'>John Chriswood</p>
          </div>
        </section>
          <WhyChooseUs />
        <section className='w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12'>
          <AccordionDemo data={FaqData} />
        </section>
        <Footer />
      </main>
    </>
  );
}
