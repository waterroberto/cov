import Link from 'next/link';
import React from 'react';
import Logo from './Global/Logo';

const Footer = () => {
  return (
    <footer className='p-4 sm:p-8 md:p-16 xl:px-32 pt-24 pb-10 footer text-gray-50 bg-gray-950'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 pb-16'>
        <div>
          <Link href='/' className='block mb-4 font-extrabold text-xl'>
            <Logo width={150} height={150} />
          </Link>
          <p>
            CAP VENTURES: Trade Commodites, Stock, Forex, Retirement, and many more. Experience seamless trading with unbeatable benefits and cutting-edge features
          </p>

          <div className=' w-full flex gap-3 my-4'>
          
          <p className='mb-4 text-lg sm:text-xl font-semibold text-neutral'>
            Company & Group Overview
          </p>
          <div className='flex flex-col mb-3 gap-4 text-sm font-normal'>
            <p>
              CAP VENTURES Trade Organisation is one of the leading platforms Across globally offering Forex, crude Oil, Family/Retirement plan investment with 0% Risk and 0% Withdrawal free-charge as well as agricultural sector and other future stocks indices. The company are build up by more offshore Organisation bodies whom are skilled in financial & Technical Analysis in terms of market structure and volatility.
            </p>
          </div>
        </div>

        </div>
        {/* . . . */}
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-8 max-h-[500px]'>
        <div className=' w-full'>
          <p className='mb-4 text-lg sm:text-xl font-semibold text-neutral'>
             Account 
          </p>
          <div className='flex flex-col mb-3 gap-4 text-sm font-normal'>
            <Link href='/auth/login'>Login</Link>
            <Link href='/auth/register'>Open an Account</Link>
            <Link href='/auth/login'>Finish an Application</Link>
          </div>
        </div>
        <div className=' w-full'>
          <p className='mb-4 text-lg sm:text-xl font-semibold text-neutral'>
            Support 
          </p>
          <div className='flex flex-col mb-3 gap-4 text-sm font-normal'>
            <Link href='/contact'>Contact Us</Link>
            <Link href='/terms-condition'>Terms & condition</Link>
            <Link href='/privacy'>Privacy</Link>
          </div>
        </div>
        <div className=' w-full'>
          <p className='mb-4 text-lg sm:text-xl font-semibold text-neutral'>
            Markets
          </p>
          <div className='flex flex-col mb-3 gap-4 text-sm font-normal'>
            <Link href='/markets/stocks'>Stocks</Link>
            <Link href='/markets/crypto/bitcoin'>Crypto</Link>
            <Link href='/markets/forex'>Forex</Link>
            <Link href='/markets/commodities/gold'>Commodities</Link>
          </div>
        </div>
          <div className=' w-full my-4'>
            <p className='mb-4 text-lg sm:text-xl font-semibold text-neutral'>
              Contact Us
            </p>
            <div>
              <p>support@capitalonlineventures.com</p>
              <p>HPQCH, 11 Wilson St, Montreal Canada.</p>
            </div>
        </div>


        </div>
      </div>
        {/* . . . */}


        <div className=" text-center mt-6">
          {/* <h4>CAP VENTURES</h4>
          <p>Is a member NYSE - FINRA - SIPC and regulated by the US Securities and Exchange Commission and the Commodity Futures Trading Commission.</p> */}
          <p className=" text-sm">
            Website:  
            <a className=' underline ml-2' href="https://www.capitalonlineventures.com">www.capitalonlineventures.com</a>
          </p>
          <p> &copy; <span>HMAgrivest ,</span> {new Date().getFullYear()}</p>
        </div>
    </footer>
  );
};

export default Footer;
