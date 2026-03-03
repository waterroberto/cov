'use client';
import UserDataContext from '@/context/UserDataContext';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { FaArrowsDownToPeople } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { TbMoneybag } from 'react-icons/tb';

const card_icon_style =
  'h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-14 lg:w-14 flex items-center justify-center rounded-lg text-white flex-shrink-0';

export default function AccountBalance() {
  const { userData } = useContext(UserDataContext);

  if (!userData) return;

  return (
    <section className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
      {/* Capital Card */}
      <div className='rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-3 md:gap-4 border border-red-200/30 shadow-md hover:shadow-lg transition-shadow'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <p className='text-gray-700 font-semibold text-xs sm:text-xs md:text-sm'>Capital</p>
            <p className='text-xs text-gray-600 line-clamp-1'>Total Deposit</p>
          </div>
          <span className={`${card_icon_style} bg-gradient-to-br from-red-500 to-red-600`}>
            <TbMoneybag className='text-sm sm:text-base md:text-lg' />
          </span>
        </div>
        <div className='min-w-0'>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 font-bold flex items-baseline gap-0.5 flex-wrap'>
            <span>{userData.currency}</span>
            <span className='break-all'>{userData.wallet.deposit.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Profit Card */}
      <div className='rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100/50 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-3 md:gap-4 border border-green-200/30 shadow-md hover:shadow-lg transition-shadow'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <p className='text-gray-700 font-semibold text-xs sm:text-xs md:text-sm'>Profit</p>
            <p className='text-xs text-gray-600 line-clamp-1'>Total Earnings</p>
          </div>
          <span className={`${card_icon_style} bg-gradient-to-br from-green-500 to-emerald-600`}>
            <GiReceiveMoney className='text-sm sm:text-base md:text-lg' />
          </span>
        </div>
        <div className='min-w-0'>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 font-bold flex items-baseline gap-0.5 flex-wrap'>
            <span>{userData.currency}</span>
            <span className='break-all'>{userData.wallet.profit.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Withdrawable Balance Card */}
      <div className='rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-3 md:gap-4 border border-purple-200/30 shadow-md hover:shadow-lg transition-shadow'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <p className='text-gray-700 font-semibold text-xs sm:text-xs md:text-sm'>Withdrawable</p>
            <p className='text-xs text-gray-600 line-clamp-1'>Available Balance</p>
          </div>
          <span className={`${card_icon_style} bg-gradient-to-br from-purple-500 to-purple-600`}>
            <FaArrowsDownToPeople className='text-sm sm:text-base md:text-lg' />
          </span>
        </div>
        <div className='min-w-0'>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 font-bold flex items-baseline gap-0.5 flex-wrap'>
            <span>{userData.currency}</span>
            <span className='break-all'>{userData.wallet.withdraw.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Account Status Card */}
      <div className={clsx(
        'rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-3 md:gap-4 border shadow-md hover:shadow-lg transition-shadow',
        !userData.isVerified 
          ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/30' 
          : 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/30'
      )}>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <p className='text-gray-700 font-semibold text-xs sm:text-xs md:text-sm'>Status</p>
            <p className='text-xs text-gray-600 line-clamp-1'>Trading Account</p>
          </div>
          <span className={clsx(
            card_icon_style,
            !userData.isVerified ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-emerald-500 to-green-600'
          )}>
            <HiOutlineStatusOnline className='text-sm sm:text-base md:text-lg' />
          </span>
        </div>
        <p className={clsx(
          'text-xs sm:text-sm md:text-base lg:text-lg font-bold',
          !userData.isVerified ? 'text-amber-700' : 'text-green-700'
        )}>
          {!userData.isVerified ? 'Pending' : 'Active'}
        </p>
      </div>
    </section>
  );
}
