'use client';
import React from 'react';
import { IconType } from 'react-icons';
import Button from '@/components/Global/Button';

interface SupportItem {
  icon: IconType;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

interface SupportCardProps {
  title: string;
  items: SupportItem[];
  supportHref?: string;
}

export default function SupportCard({
  title,
  items,
  supportHref = '/#contact',
}: SupportCardProps) {
  return (
    <div className='rounded-2xl bg-white shadow-lg border border-gray-200 p-6'>
      <h3 className='text-lg font-bold text-gray-900 mb-4'>{title}</h3>
      <div className='space-y-3 mb-4'>
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`p-4 ${item.bgColor} rounded-lg border ${item.borderColor}`}>
              <div className='flex items-start gap-3'>
                <Icon className={`${item.iconColor} mt-1 flex-shrink-0 text-lg`} />
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>{item.title}</p>
                  <p className='text-gray-600 text-xs mt-1'>{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a href={supportHref} className='block w-full'>
        <Button color='primary_2' block>
          Contact Support
        </Button>
      </a>
    </div>
  );
}
