'use client';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { BiSolidBank } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoIosSettings, IoMdAdd } from 'react-icons/io';
import Button from '../Global/Button';

export default function WalletBalance() {
  const { userData } = useContext(UserDataContext);

  const [showBalance, setShowBalance] = useState(false);

  const toggleShowBalance = () => setShowBalance((prev) => !prev);

  if (!userData) return;

  return (
    <div className='space-y-6'>
      {/* Welcome Message */}
      <div className='flex items-baseline justify-between'>
        <p className='text-2xl md:text-3xl capitalize text-white font-bold'>Hey welcome, <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>{userData.fullname.split(" ")[0]}</span>! 👋</p>
      </div>

      {/* Available Balance Card */}
      <div className='rounded-2xl bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-purple-900/20 p-8 md:p-10 border border-blue-500/20 shadow-lg'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-blue-400 text-lg tracking-wider uppercase font-semibold mb-1'>Available Balance</p>
            <p className='text-gray-100 text-xs'>Your  total balance</p>
          </div>
          <button role='button' onClick={toggleShowBalance} className='text-2xl text-gray-400 hover:text-blue-400 transition-colors'>
            {showBalance ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className='text-5xl md:text-6xl text-white font-bold my-6'>
        {showBalance ? (
          <span>
            {userData?.currency}
            {(
              userData?.wallet.profit +
              // userData?.wallet.bonus +
              userData?.wallet.withdraw + 
              userData?.wallet.deposit
            ).toLocaleString()}
          </span>
        ) : (
          <span>{userData?.currency} *******</span>
        )}
      </p>

      {/* Action Buttons & Plan Info */}
      <div className='mt-8 pt-6 border-t border-white/10'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm text-gray-400 font-medium'>Current Plan</p>
            <p className='text-lg md:text-xl text-white font-bold capitalize'>{userData.selectedPlan || 'No Plan Selected'}</p>
          </div>
          <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-3'>
            <Link href='/dashboard/profile' className='flex-1 sm:flex-none'>
              <Button
                startIcon={<IoIosSettings />}
                endIcon={<HiArrowNarrowRight />}
                className='w-full'
              >
                Account Settings
              </Button>
            </Link>
            <Link href='/dashboard/deposit' className='flex-1 sm:flex-none'>
              <Button
                startIcon={<BiSolidBank />}
                endIcon={<IoMdAdd />}
                color='secondary'
                className='w-full'
              >
                Deposit Funds
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
