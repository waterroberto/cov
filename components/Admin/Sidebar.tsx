'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Global/Logo';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  links: {
    name: string;
    icon: React.ReactNode;
    page: string;
  }[];
};

export default function Sidebar({
  isOpen,
  toggleSidebar,
  links,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 backdrop-blur-sm bg-[#0000004f] duration-300 block text-gray-50 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 z-50 bg-[#090D1F] border-r border-white/5 shadow-2xl h-screen duration-300 overflow-y-auto ${
          isOpen
            ? 'lg:w-[260px] translate-x-0 w-64 left-0'
            : 'lg:w-20 -translate-x-[100%] lg:translate-x-0 w-0 -left-4 lg:left-0'
        }`}
      >
        <div className='p-4 mt-4 mb-16 flex items-center justify-center'>
          <Logo />
        </div>
        <div className={'p-2'}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.page}
              className=' text-gray-50'
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '8px 0',
              }}
              onClick={toggleSidebar}
            >
              <div
                className={clsx(
                  'my-1 py-3 flex gap-4 w-full h-12 items-center duration-300 rounded-xl text-sm font-medium transition-all group',
                  pathname.trim() === link.page
                    ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5',
                  isOpen ? 'justify-start pl-6 pr-4' : 'justify-center pl-0'
                )}
              >
                <span className={clsx('text-xl transition-transform duration-300', pathname.trim() !== link.page && 'group-hover:scale-110')}>{link.icon}</span>
                {isOpen && <p className={`capitalize tracking-wide`}>{link.name}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
