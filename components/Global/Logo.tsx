'use client'
import logo from '@/assets/hm-2-logo.svg';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Logo({width = 100, height = 100, src = logo}: {width?: number, height?: number, src?: any}) {
    const pathname = usePathname();
    const authPaths = ['/dashboard', '/admin']; // Add all your auth paths here
  const shouldShowNavbar = authPaths.includes(pathname);

  return (
    <div className=" flex flex-row items-center">
    <Image
      src={src}
      alt='Art Chain Market Logo'
      width={width}
      height={height}
      className='rounded-xl p-1'
    />
    {/* {!shouldShowNavbar ?   <h2 className=" text-white text-xl">CAP VENTURES Platfom</h2> : null } */}
    </div>
  );
}
