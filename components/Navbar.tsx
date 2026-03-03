'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgMenu } from 'react-icons/cg';
// import TradingViewTicker from './Dashboard/Widgets/TradingViewTicker';
import Button from './Global/Button';
import { FaChevronDown } from 'react-icons/fa';
// import Logo from './Global/Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';
import Logo from './Global/Logo';


const links: LinkProps [] = [
  // { name: 'home', url: '/' },
  { name: 'why CAP VENTURES', url: '/whyus' },
  // { name: 'service', url: '/contact' },
  { name: 'contact', url: '/contact' },
  {
    name: 'markets',
    url: '#',
    children: [
      { name: 'Forex', url: '/markets/forex'},  
      { name: 'Crypto', url: '#', children: [
        { name: 'Bitcoin', url: '/markets/crypto/bitcoin' },
        { name: 'Etherum', url: '/markets/crypto/etherum' },
        // { name: 'Binance Coin', url: '/markets/crypto/binance coin' },
        // { name: 'Litecoin', url: '/markets/crypto/litecoin' },
      ]
      },  
      {
        name: 'Stocks',
        url: '/markets/stocks',
      },
      { 
        name: 'Agriculture', 
        url: '#', 
        children: [
          { name: 'Animal livestock', url: '/markets/agriculture/livestock' },
          { name: 'Farm Land', url: '/markets/agriculture/farmland' },
          { name: 'Poultry', url: '/markets/agriculture/poultry' },
        ]
      },
      { 
        name: 'Retirement Plan', 
        url: '/markets/retirements', 
        // children: [
        //   { name: 'Animal livestock', url: '/services/markets/animal livestock' },
        //   { name: 'Fishery', url: '/services/markets/fishery' },
        // ]
      },
      { 
        name: 'Commodities', 
        url: '#', 
        children: [
          { name: 'Gold', url: '/markets/commodities/gold' },
          { name: 'Silver', url: '/markets/commodities/silver' },
          { name: 'Crude Oil', url: '/markets/commodities/crudeoil' },
          { name: 'Precious Metal', url: '/markets/commodities/preciousmetal' },
          { name: 'Maganeses', url: '/markets/commodities/maganese' },
          { name: 'Marijuana', url: '/markets/commodities/marijuana' },
          { 
            name: 'Energy', 
            url: '#', 
            children: [
              { name: 'Gasoline', url: '/markets/commodities/energy/gasoline' },
              // { name: 'Fuel', url: '/markets/commodities/energy/fuel' },
              { name: 'lithium', url: '/markets/commodities/energy/lithium' },
            ]
            },
        ]
      },
    ],
  },
];

  // Recursive Menu Component
  const DropdownMenu = ({ items, parentKey = '', handleTogleDropdown, openDropdowns, browserWidth, handleToggleNavbar }: DropdownMenuProps) => {
    return (
    <AnimatePresence>
      {items && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10}}
          transition={{ duration: 0.3 }}
          className={`relative text-sm left-0 mt-2 w-full max-h-full  text-white rounded-md items-start  flex  flex-col padding duration-500 `}
        >
          {items.map((item, index) => {
            const key = `${parentKey}-${index}`;

            return (
              <li key={key} className='text-sm  text-white font-semibold capitalize flex flex-col justify-between w-full p-3'>
                {item.children  ? (
                  <>
                    <button
                      onClick={() => {
                         handleTogleDropdown(key)
                      }}
                      className='text-sm text-white font-semibold capitalize flex items-center justify-between w-full p-3 hover:bg-gray-50 hover:text-gray-800 rounded-md ease-in-out transition-all duration-150'
                    >
                      {item.name}
                      <motion.span
                        animate={{ rotate: openDropdowns[key] === true ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown size={12} />
                      </motion.span>
                    </button>

                    {openDropdowns[key] && <DropdownMenu handleToggleNavbar={handleToggleNavbar} items={item.children} parentKey={key} handleTogleDropdown={handleTogleDropdown} openDropdowns={openDropdowns} browserWidth={browserWidth} />}
                  </>
                ) : (
                  <Link onClick={handleToggleNavbar}  href={item.url} className='text-sm text-white font-semibold capitalize flex justify-between w-full p-3 hover:bg-gray-50 hover:text-gray-800 rounded-md ease-in-out transition-all duration-150'>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
  }
  interface DropdownMenuProps {
    items: LinkProps[];
    parentKey?: string;
    handleTogleDropdown: (key: string) => void;
    openDropdowns: OpenDropdownProps;
    browserWidth?: number;
    handleToggleNavbar: () => void
  }

  // interface NavbarProps {
  //   showMobileNav: boolean;
  //   setShowMobileNav: (value: boolean) => void;
  //   openDropdown: any;
  //   setOpenDropdown: (value: any) => void;
  // }

  type LinkProps  = {
    name: string;
    url: string;
    children?:  LinkProps[] | undefined;
  }

  
  // interface NavbarProps {
  //   links: LinkProps[];
  // }

 type OpenDropdownProps = {
  [key: string | number]: boolean;
}

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<OpenDropdownProps>({});
  const [browserWidth, setBrowserWidth] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  


  // const toggleDropdown = (index: any) => {
  //   console.log(index, openDropdown);
  //   setOpenDropdown(openDropdown === index ? null : index);
  // };

  const toggleDropdown = (key: string | number) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  console.log(openDropdown)
  };

  const toggleMobileNav = () => setShowMobileNav((prev) => !prev);



  return (
    <header className='bg-primary w-full fixed backdrop-blur-md shadow-sm top-0  z-50'>
      {showMobileNav &&  <div className='absolute sm:hidden top-0 left-0 h-screen w-screen bg-primary z-5 inset-0 opacity-50'></div> }
   
      <nav className=' p-4 border-b border-b-gray-100 flex items-center justify-between w-full gap-4 md:gap-6 z-10'>
        <Link href='/'>
          <Logo width={120} height={120} />
        </Link>

        <ul className='padding items-center gap-16 hidden sm:flex'>
          {links.map((link, index) => {

            return <li key={link.name} className='relative w-fit'>
              {link.children ? (
                <>
               <button
                  onClick={() => toggleDropdown(`${index}`)}
                  className='text-sm text-white font-semibold gap-3 flex justify-between w-full p-3 hover:bg-gray-50 hover:text-gray-800 rounded-md items-center ease-in-out transition-all duration-150'
                >
                  {link.name} 
                <motion.span
                  animate={{ rotate: openDropdown[`${index}`] === true ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown size={12} />
                </motion.span>
                </button>
                { openDropdown[`${index}`] === true && (
                  <div 
                  className='border-t-2 absolute z-10 p-2 bg-gray-950 shadow-xl rounded  text-sm max-h-[450px] overflow-hidden overflow-y-auto'
                  style={{
                    bottom: "auto", 
                    top: "48px", 
                    minWidth: "450px", 
                    left: "50%", 
                    transform: "translateX(-25%)"
                  }}
                  >
                    <DropdownMenu
                      items={link.children}
                      parentKey={`${index}`}
                      handleTogleDropdown={toggleDropdown}
                      // setTogleDropDown = {}
                      handleToggleNavbar={toggleMobileNav}
                      openDropdowns={openDropdown}
                      browserWidth={browserWidth}
                      />
                    

                  </div>

                )}
              </>
              
              ) : 
              (
                <Link href={link.url} className='text-white font-medium capitalize'>
                  {link.name}
                </Link>
              )}
           
            </li>
          })}
        </ul>


        <div className='items-center gap-3 hidden sm:flex'>
          <Link href='/auth/login'>
            <Button color='white' variant='outlined'>Login</Button>
          </Link>
          <Link href='/auth/register'>
            <Button color='primary_2'>Create Account</Button>
          </Link>
        </div>

        <button
          aria-label='navbar toggle Button'
          onClick={toggleMobileNav}
          className='block sm:hidden text-gray-50 p-2  duration-500 border-[1px] rounded-md'
        >
          <CgMenu className='text-2xl' />
        </button>
      </nav>

        
      <AnimatePresence>
      {showMobileNav && (

      <div className='relative w-full flex items-center justify-between flex-col z-50 px-2'>
        <motion.ul
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.123 }}
        className={` fixed text-sm top-0 left-0 w-[80%] h-screen bg-opacity-50 z-50 padding items-start flex sm:hidden flex-col bg-primary duration-500 p-2 overflow-y-auto  overflow-x-hidden`}
        >
        <div className='flex justify-between w-full mb-4 my-2'>
          <Logo width={150} height={150} />
          <button
            aria-label='navbar toggle Button'
            onClick={toggleMobileNav}
            className='block sm:hidden text-gray-50 p-2 z-30  duration-500 border-[1px] rounded-md self-end'
          >
            <BiX className='text-2xl' />
          </button>      
        </div>
        {links.map((link, index) => {
          const key =  `${index}`
          return <li key={key} className='p-3 w-full'>
            {link.children ? (
              <>
                
                <button
                  onClick={() => toggleDropdown(key)}
                  className='text-sm text-white font-semibold capitalize flex justify-between w-full p-3 hover:bg-gray-50 hover:text-gray-800 rounded-md items-center ease-in-out transition-all duration-150'
                  >
                  {link.name} 
                <motion.span
                  animate={{ rotate: openDropdown[key] === true ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown size={12} />
                </motion.span>
                </button>
                {openDropdown[key] && (
                  <DropdownMenu
                  items={link.children}
                  parentKey={key}
                  handleTogleDropdown={toggleDropdown}
                  openDropdowns={openDropdown}
                  handleToggleNavbar={toggleMobileNav}
                  />
                )}
              </>
            ) : (
              <Link onClick={() => setShowMobileNav((prev) => !prev)} href={link.url} className='text-sm text-white font-semibold capitalize flex justify-between w-full p-3 hover:bg-gray-50 hover:text-gray-800 rounded-md ease-in-out transition-all duration-150'>
                {link.name}
              </Link>
            )}
          </li>
      })}

      <div className='flex w-full gap-2 justify-end bg-gray-950 my-6 p-3 rounded-xl'>
        <Link className=' w-full' href={`/auth/register`}>
          <Button
            variant='fill'
            color='primary_2'
            size='large'
          >
            Register
          </Button>
        </Link>
        <Link className=' w-full' href={`/auth/login`}>
          <Button
            variant='outlined'
            color='primary_2'
            size='large'
          >
            Login
          </Button>
        </Link>
      </div>      
      </motion.ul>

      </div>
      )}
    </AnimatePresence>
      {/* <TradingViewTicker /> */}
      </header>
    );
};

export default Navbar;
