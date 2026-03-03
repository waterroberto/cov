import AccountBalance from '@/components/Dashboard/AccountBalance';
import WalletBalance from '@/components/Dashboard/WalletBalance';
import TradingViewChart from '@/components/Dashboard/Widgets/TradingViewChart';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import TradingSingleTicker from '@/components/Dashboard/Widgets/TradingSingleTicker';
import TraderLevel from '@/components/Shared/TraderLevel';
import React, { useContext } from 'react';
import { FaCreditCard, FaWallet, FaChartLine, FaCog, FaQuestionCircle, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';

export default function Dashboard() {
  const quickActions = [
    { icon: FaCreditCard, label: 'Deposit', href: '/dashboard/deposit', color: 'from-blue-500 to-blue-600' },
    { icon: FaWallet, label: 'Withdraw', href: '/dashboard/withdraw', color: 'from-purple-500 to-purple-600' },
    { icon: FaChartLine, label: 'Trading', href: '/dashboard/trading', color: 'from-green-500 to-green-600' },
    { icon: FaCog, label: 'Settings', href: '/dashboard/profile', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-6">
        {/* Market Ticker - Sticky Header */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
          <TradingViewTicker />
        </div>

        {/* Wallet Balance Section */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
          <WalletBalance />
        </div>

        {/* Quick Actions Grid */}
        {/* <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link key={idx} href={action.href}>
                  <div className="group rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300 transition-all duration-300 p-5 text-center cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-lg mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </div>
                    <p className="text-gray-900 font-semibold text-sm">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div> */}

        {/* Single Ticker & Trader Level Section */}
        <div className="flex flex-col w-full sm:flex-row items-center gap-4">
          <div className="flex-1 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
            <TradingSingleTicker />
          </div>
          {/* <div className="flex-1 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
            <TraderLevel />
          </div> */}
        </div>

        {/* Account Balance Section */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
          <AccountBalance />
        </div>

        {/* Trading Chart Section */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden">
          <TradingViewChart />
        </div>

        {/* Support & Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Help Center */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg border border-blue-200/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <FaQuestionCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Help Center</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">Need assistance? Our support team is here to help you with any questions about trading, deposits, withdrawals, and more.</p>
            <Link href="/#contact">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                Get Support
              </button>
            </Link>
          </div>

          {/* Learning Resources */}
          {/* <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg border border-purple-200/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                <FaHeadset size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Learning Resources</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">Improve your trading skills with our comprehensive guides, tutorials, and market insights designed to help you succeed.</p>
            <Link href="/whyus">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
