'use client';
// import Sidebar from '@/components/Admin/Sidebar';
import Referral from '@/components/Dashboard/Referral';
import Loader from '@/components/Global/Loader';
import Meta from '@/components/Global/Meta';
// import Header from '@/components/Shared/Header';
import '../globals.css';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
// import { user_links } from '@/static';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '@/components/chad/Sidebar';
import Navbar from '@/components/chad/Navbar';
import WhatsAppButton from '@/components/Whatsappp';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { checkingStatus, isLoggedIn } = useContext(AuthContext);
  const { fetchingData, userData } = useContext(UserDataContext);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  console.log(sidebarOpen, setSidebarOpen);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!checkingStatus && !isLoggedIn) router.replace('/auth/login');
  }, [checkingStatus, isLoggedIn, router]);

  if (checkingStatus) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  if (!checkingStatus && isLoggedIn && !fetchingData && userData)
    return (
      <>
        <Meta />
      <main
        className={`${
          sidebarOpen ? "" : "collapsed"
        } admin-layout transition-all ease-in-out duration-300 min-h-screen relative bg-gradient-to-br from-gray-50 via-blue-50 to-white`}
      >
        <Navbar toggleSidebar={handleToggleSidebar} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} className="top-[68px] sm:z-0" />
        <div className="pt-[68px] min-h-screen z-10 relative">
          <div className="w-full p-4 sm:px-8 py-8 text-gray-900">{children}</div>
              <div className='mt-8'>
                {/* <GetSupport /> */}
                {/* <Referral /> */}
              </div>
        </div>
      </main>
      </>
    );
}
