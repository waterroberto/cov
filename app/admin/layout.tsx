'use client';
import Sidebar from '@/components/Admin/Sidebar';
import Loader from '@/components/Global/Loader';
import Meta from '@/components/Global/Meta';
import Header from '@/components/Shared/Header';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { admin_links } from '@/static';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function AdminLayout({
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
    } else if (
      !checkingStatus &&
      isLoggedIn &&
      userData &&
      !userData?.isAdmin
    ) {
      router.replace('/dashboard');
    }
  }, [checkingStatus, isLoggedIn, router, userData]);

  if (checkingStatus) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (
    !checkingStatus &&
    isLoggedIn &&
    !fetchingData &&
    userData &&
    userData?.isAdmin
  )
    return (
      <>
        <Meta />
        <div className='flex bg-[#050814] relative min-h-screen overflow-hidden'>
          {/* Animated Background */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl' />
            <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl' />
          </div>

          <div
            className={`duration-300 transition-all z-50 ${
              sidebarOpen ? 'w-[260px]' : 'w-20 hidden lg:block'
            }`}
          >
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={handleToggleSidebar}
              links={admin_links}
            />
          </div>
          <div
            className={`flex-1 duration-300 min-h-screen relative z-10 flex flex-col w-full`}
          >
            <Header isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} />
            <div className='w-full p-4 md:p-8 pb-12 overflow-y-auto'>
              <div className='max-w-7xl mx-auto space-y-6'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
