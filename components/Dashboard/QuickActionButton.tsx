'use client';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface QuickActionButtonProps {
  icon: IconType;
  label: string;
  href: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function QuickActionButton({
  icon: Icon,
  label,
  href,
  gradientFrom,
  gradientTo,
}: QuickActionButtonProps) {
  return (
    <Link href={href} className='group rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 p-6 text-center cursor-pointer block'>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
        <Icon />
      </div>
      <p className='text-gray-900 font-semibold text-sm'>{label}</p>
    </Link>
  );
}
