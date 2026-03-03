import Image from 'next/image';
import React from 'react';
import aboutImage from '@/assets/hm-howitworks.webp';
import { RiCheckDoubleLine } from 'react-icons/ri';


const aboutList = [
  {
    title: "Sign Up",
    subTitle: "Sign up for a complimentary CAP VENTURES Account to gain full access to high profit investment opportunities in our easy-to-use portal."
  },
  {
    title: "Invest",
    subTitle: "Determine what best fits your investment portfolio and invest. All opportunities have been carefully selected and offer high return possibilities."
  },
  {
    title: "Monitor",
    subTitle: "Congratulations, you're an investor! CAP VENTURES handles every aspect of your investment, from acquisition to management to profit realization, while you effortlessly track your portfolio's performance online."
  },
  {
    title: "Collect",
    subTitle: "Profits from investments are distributed to investors after assets are sold. At the end of the holding period, they receive their share from the final sale."
  },

];

const HowItWorks = () => {
  return (
    <div className='mx-auto  xl:px-32 px-4 md:px-16 py-14 items-center gap-10 bg-primary w-full h-full '>
  
            <h2
            className=' mt-6  font-extrabold text-gray-50 text-left text-xl md:text-3xl'
            style={{ 
              backgroundImage:' linear-gradient(-65deg, #85FFBD -12%, #ffeeee 100%)',
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }} 
            >
              How It Works
            </h2>
  
            <p className=' my-6 font-light text-gray-50 text-left text-lg'>
              CAP VENTURES is an investor-focused platform providing access to commodities, stocks, and more. We offer fractional ownership opportunities, allowing investors to diversify their portfolios with high-value assets.
            </p>
      <div className=' w-full h-full  flex flex-col xl:flex-row text-balance text-gray-50 '>

        <div className=" w-full">
          <Image
            src={aboutImage}
            alt='People smiling and happy'
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '700px',
              maxHeight: '700px',
              filter: 'hue-rotate(10deg)',
            }}
          />
        </div>

          <div className=" px-3">


            <div>
              {aboutList.map((d) => (
                <div className=' flex items-center justify-center gap-5' key={d.title}>
                  <span className=' text-gray-50'>
                    <RiCheckDoubleLine />
                  </span>
                  <div className=' flex flex-col gap-3 text-gray-50 capitalize border-b border-gray-300 py-3 leading-5'>

                    <p className=' text-lg text-[#0078ff] font-semibold'>{d.title}</p>
                  <p
                  className=' text-gray-50'
                  >{d.subTitle}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

    </div>
  );
};

export default HowItWorks;