'use client';
import Loader from '@/components/Global/Loader';
import Meta from '@/components/Global/Meta';
import '../globals.css';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '@/components/chad/Sidebar';
import Navbar from '@/components/chad/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { checkingStatus, isLoggedIn } = useContext(AuthContext);
  const { fetchingData, userData } = useContext(UserDataContext);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!checkingStatus && !isLoggedIn) {
        router.replace('/auth/login');
    }
  }, [checkingStatus, isLoggedIn, router]);

  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050814]">
        <Loader />
      </div>
    );
  }

  if(userData?.kyc_pending === true && userData?.kyc_submitted === true) {
    router.replace('/auth/login');
    return;
  }

  if(userData?.isBlocked) {
    router.replace('/auth/login');
    return;
  }

  if (!checkingStatus && isLoggedIn && !fetchingData && userData)
    return (
      <>
        <Meta />
        <main
          className={`${sidebarOpen ? '' : 'collapsed'} admin-layout transition-all ease-in-out duration-300 min-h-screen flex bg-[#050814] relative overflow-hidden`}
        >
          {/* Animated Background */}
          <div className='fixed inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl' />
            <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl' />
          </div>

          <Navbar toggleSidebar={handleToggleSidebar} />
          <Sidebar isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} className="top-[68px] sm:z-0" />
          <div className="pt-[68px] min-h-screen z-10 flex flex-col w-full relative">
            <div className="w-full p-2 md:p-8 pb-12 overflow-y-auto">{children}</div>
          </div>
        </main>
      </>
    );
}
