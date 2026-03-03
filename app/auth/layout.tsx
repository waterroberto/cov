"use client"
// import Footer from '@/components/Footer';
import Logo from '@/components/Global/Logo';
// import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  console.log(pathname)
  const excludedRoutes = ['/auth/otp'];

  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // No layout applied
  }


  return (
      <>
      {/* <Navbar /> */}
    <>
      {/* <Link href='/' className=' my-5'>
        <Logo width={150} height={150} />
      </Link> */}
      {children}
    </>
     {/* <Footer /> */}
    </>
  );
}
