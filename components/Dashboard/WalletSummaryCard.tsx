'use client';
import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';

interface WalletSummaryCardProps {
  title: string;
  available: number;
  profit: number;
  pending: number;
  currency: string;
  kycStatus?: 'verified' | 'pending' | 'rejected';
}

export default function WalletSummaryCard({
  title,
  available,
  profit,
  pending,
  currency,
  kycStatus = 'verified',
}: WalletSummaryCardProps) {
  const getKycColor = () => {
    switch (kycStatus) {
      case 'verified':
        return 'from-green-50 to-emerald-50 border-green-200/50';
      case 'pending':
        return 'from-amber-50 to-orange-50 border-amber-200/50';
      default:
        return 'from-red-50 to-pink-50 border-red-200/50';
    }
  };

  const getStatusText = () => {
    switch (kycStatus) {
      case 'verified':
        return 'Your account is verified and ready for trading.';
      case 'pending':
        return 'Your verification is being processed.';
      default:
        return 'Please complete verification to continue.';
    }
  };

  const getProgressWidth = () => {
    switch (kycStatus) {
      case 'verified':
        return 'w-full';
      case 'pending':
        return 'w-1/2';
      default:
        return 'w-1/4';
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Wallet Card */}
      <div className='rounded-2xl bg-white shadow-lg border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>{title}</h3>
        <div className='space-y-3'>
          <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
            <span className='text-gray-600'>Available</span>
            <span className='font-bold text-gray-900'>{currency}{available.toLocaleString()}</span>
          </div>
          <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
            <span className='text-gray-600'>Profit</span>
            <span className='font-bold text-green-600'>{currency}{profit.toLocaleString()}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600'>Pending</span>
            <span className='font-bold text-amber-600'>{currency}{pending.toLocaleString()}</span>
          </div>
        </div>
        <Link href='/dashboard/deposit'>
          <a className='block w-full mt-4'>
            <Button color='primary_2' block>
              Add Funds
            </Button>
          </a>
        </Link>
      </div>

      {/* KYC Status Card */}
      <div className={`rounded-2xl bg-gradient-to-br ${getKycColor()} p-6 border`}>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-lg font-bold text-gray-900'>Verification</h3>
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              kycStatus === 'verified'
                ? 'bg-green-500'
                : kycStatus === 'pending'
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
          ></span>
        </div>
        <p className='text-gray-600 text-sm mb-4'>{getStatusText()}</p>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div className={`${getProgressWidth()} h-2 rounded-full transition-all ${
            kycStatus === 'verified'
              ? 'bg-green-600'
              : kycStatus === 'pending'
              ? 'bg-amber-600'
              : 'bg-red-600'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
