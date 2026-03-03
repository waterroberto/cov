'use client';
import React from 'react';
import { ImFilesEmpty } from 'react-icons/im';
import { IDeposit } from '@/interface';

interface RecentActivityCardProps {
  title: string;
  transactions: IDeposit[];
  currency: string;
  itemLimit?: number;
}

export default function RecentActivityCard({
  title,
  transactions,
  currency,
  itemLimit = 5,
}: RecentActivityCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      default:
        return 'text-red-600';
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date?.toDate?.() || new Date(date);
    return new Date(d).toLocaleDateString();
  };

  return (
    <div className='rounded-2xl bg-white shadow-lg border border-gray-200 p-6'>
      <h3 className='text-lg font-bold text-gray-900 mb-4'>{title}</h3>
      {transactions && transactions.length > 0 ? (
        <div className='space-y-3 max-h-64 overflow-y-auto'>
          {transactions.slice(0, itemLimit).map((transaction: IDeposit, idx: number) => (
            <div
              key={transaction._id || idx}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100'
            >
              <div>
                <p className='font-semibold text-gray-900 text-sm'>
                  {transaction.asset?.toUpperCase()} Transaction
                </p>
                <p className='text-gray-500 text-xs'>{formatDate(transaction.date)}</p>
              </div>
              <span className={`font-bold text-sm ${getStatusColor(transaction.status)}`}>
                {currency}
                {transaction.amount?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-8'>
          <ImFilesEmpty className='text-4xl text-gray-300 mx-auto mb-3 opacity-75' />
          <p className='text-gray-500 text-sm'>No transactions yet</p>
        </div>
      )}
    </div>
  );
}
