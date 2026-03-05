import { AiFillPieChart } from 'react-icons/ai';
import {
  BiCopy,
  BiSolidBarChartSquare,
  BiSolidCreditCard,
  BiSolidDashboard,
} from 'react-icons/bi';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { HiOutlineUser } from 'react-icons/hi';
import { HiShieldCheck } from 'react-icons/hi2';
import { IoDocumentAttachSharp } from 'react-icons/io5';
import { LuPackage } from 'react-icons/lu';
import { MdCopyAll } from 'react-icons/md';

export const links = [
  { slug: "dashbaord",name: 'dashboard', url: '/dashboard', 
    icon: (color: string) => <BiSolidDashboard color={color} /> },
    // {
      //   name: 'Copy Trading',
      //   url: '/dashboard/copyTrading',
      //   slug: "copyTrading",
      //   icon: (color: string) => <AiFillPieChart color={color} />,
      // },
      {
        name: 'deposit',
        url: '/dashboard/deposit',
        slug: "deposit",
        icon: (color: string) => <BiSolidCreditCard  color={color}/>,
      },
      {
        name: 'withdrawal',
        url: '/dashboard/withdraw',
        slug: "widthdraw",
        icon: (color: string) => <FaMoneyBillTransfer color={color} />,
      },
      // {
        //   name: 'funds transfer',
        //   url: '/dashboard/transfer',
        //   slug: "transfer",
        //   icon: (color: string) => <FaMoneyBillTransfer  color={color}/>,
        // },
        // {
        //   name: 'trading',
        //   url: '/dashboard/trading',
        //   slug: "trading",
        //   icon: (color: string) => <BiSolidBarChartSquare  color={color} />,
        // },
  // {
  //   name: 'Plan (Subscription)',
  //   url: '/dashboard/plan',
  //   slug: "plan",
  //   icon: (color: string) => <LuPackage color={color}/>,
  // },
  // {
  //   name: 'packages',
  //   url: '/dashboard/packages',
  //   slug: " packages",
  //   icon: (color: string) => <HiShieldCheck color={color} />,
  // },

  {
    name: 'profile',
    url: '/dashboard/profile',
    slug: "profile",
    icon: (color: string) => <HiOutlineUser color={color} />,
  },
];

export const admin_links = [
  { name: 'home', url: '/admin', icon: <BiSolidDashboard /> },
  // { name: 'users', url: '/admin/users', icon: <FaUsers /> },
  { name: 'wallets', url: '/admin/wallets', icon: <FaMoneyBillTransfer /> },
  { name: 'Investment Code', url: '/admin/code', icon: <MdCopyAll /> },
  {
    name: 'Withdrawal Code',
    url: '/admin/withdrawal-code',
    icon: <BiCopy />,
  },
  // {
  //   name: 'withdrawal requests',
  //   url: '/admin/withdrawals',
  //   icon: <FaMoneyBillTransfer />,
  // },
  // {
  //   name: 'live trades',
  //   url: '/admin/trades',
  //   icon: <AiFillPieChart />,
  // },
  // {
  //   name: 'kyc uploads',
  //   url: '/admin/kyc',
  //   icon: <HiIdentification />,
  // },
];
