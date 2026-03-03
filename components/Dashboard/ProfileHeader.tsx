'use client';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
}

export default function ProfileHeader({
  title,
  subtitle,
  icon,
  showBackButton = true,
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg border border-blue-400/20'>
      <div className='flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6'>
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className='flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors duration-200'
            aria-label='Go back'
          >
            <FiArrowLeft size={20} className='text-white sm:w-7 sm:h-7' />
          </button>
        )}

        <div className='flex items-start gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0'>
          {icon && (
            <div className='flex-shrink-0 text-2xl sm:text-3xl md:text-4xl mt-0.5'>
              {icon}
            </div>
          )}
          <div className='flex-1 min-w-0'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 truncate sm:truncate-none'>
              {title}
            </h1>
            <p className='text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-none'>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
