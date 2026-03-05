'use client';
import UserDataContext from '@/context/UserDataContext';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import UserAvatar from '../Shared/UserAvatar';
import Button from '../Global/Button';
import Link from 'next/link';

export interface AdminType {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  profileImage: string | null;
  status: 'ACTIVATED';
  token: string;
  twoFactorAuth: number;
  updatedAt: string;
  userType: 'ADMIN';
  uuid: string;
  verified: number;
}

export default function Header({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { userData } = useContext(UserDataContext);
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState('');
  const [adminDetails, setAdminDetails] = useState<null | AdminType>(null);

  const page = pathname.split('/');

  useEffect(() => {
    const lastIndex = page.length - 1;
    const pageName = page[lastIndex];
    if(page.includes('/admin')) return

    setCurrentPage(pageName);
  }, [page]);

  if (!userData) return;

  return (
    <div
      className='sticky top-0 z-40 w-full p-4 md:px-8 border-b border-white/5 bg-[#050814]/80 backdrop-blur-md flex items-center justify-between transition-all duration-300'
    >
      <div className='flex items-center gap-4 md:gap-8'>
        <button
          className='flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50'
          onClick={toggleSidebar}
          aria-label='Toggle Sidebar'
        >
          <CgMenu className='text-3xl' />
        </button>
        <div className='hidden sm:block'>
          <h1 className='font-bold text-xl md:text-2xl capitalize bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
            {currentPage || 'Dashboard'}
          </h1>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Link 
          href='/dashboard'
          className='px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-sm'
        >
          User Dashboard
        </Link>
      </div>
    </div>
  );
}
