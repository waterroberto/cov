'use client';

import ProfileLinkItem from '@/components/Dashboard/ProfileLinkItem';
import Button from '@/components/Global/Button';
import ProfileHeader from '@/components/Dashboard/ProfileHeader';
import { auth } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaUser, FaShieldAlt, FaLock, FaSignOutAlt, FaCheck, FaTimes } from 'react-icons/fa';

export default function DashboardProfile() {
  const { userData } = useContext(UserDataContext);

  if (!userData) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sections = [
    {
      title: 'General',
      icon: <FaUser size={20} />,
      subtitle: 'Manage your basic information',
      color: 'from-blue-500 to-blue-600',
      items: [
        {
          label: 'Profile Settings',
          description: 'Update your name, email, and phone',
          url: '/dashboard/profile/profile-settings',
        },
        {
          label: 'Next of Kin',
          description: 'Designate an emergency contact',
          url: '/dashboard/profile/next-of-kin',
        },
      ],
    },
    {
      title: 'Verification',
      icon: <FaCheck size={20} />,
      subtitle: 'Complete account verification',
      color: 'from-green-500 to-green-600',
      items: [
        {
          label: 'KYC & Account Upgrade',
          description: 'Verify your identity for full access',
          url: '/dashboard/kyc',
        },
      ],
    },
    {
      title: 'Security',
      icon: <FaLock size={20} />,
      subtitle: 'Protect your account',
      color: 'from-purple-500 to-purple-600',
      items: [
        {
          label: 'Change Password',
          description: 'Update your security credentials',
          url: '/dashboard/profile/change-password',
        },
      ],
    },
  ];

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden -z-10'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-8'>
        {/* User Info Header Card */}
        <div className='rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 overflow-hidden'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-8 py-8 md:py-10'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
              {/* Avatar */}
              <div className='flex-shrink-0'>
                <div className='w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-lg'>
                  <span className='text-4xl font-bold'>
                    {userData?.fullname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* User Details */}
              <div className='flex-1'>
                <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                  {userData?.fullname}
                </h2>
                <p className='text-blue-100 text-sm md:text-base mb-4'>
                  {userData?.email}
                </p>

                {/* Status Badges */}
                <div className='flex flex-wrap gap-3'>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                    userData?.isVerified
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-amber-500 text-white shadow-lg'
                  }`}>
                    {userData?.isVerified ? (
                      <>
                        <FaCheck size={14} /> Verified
                      </>
                    ) : (
                      <>
                        <FaTimes size={14} /> Unverified
                      </>
                    )}
                  </div>

                  {userData?.kyc_approved && (
                    <div className='px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-blue-500 text-white shadow-lg'>
                      <FaShieldAlt size={14} /> KYC Approved
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Link */}
              {userData?.isAdmin && (
                <div className='flex-shrink-0'>
                  <Link href='/admin'>
                    <Button color='secondary' size='small'>
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* User Stats */}
          <div className='px-6 md:px-8 py-6 md:py-7 border-t border-gray-200/20'>
            <div className='grid grid-cols-3 gap-4 md:gap-6'>
              <div className='text-center'>
                <p className='text-gray-600 text-sm font-medium mb-1'>Account Level</p>
                <p className='text-2xl md:text-3xl font-bold text-gray-900'>{userData?.account_level || 1}</p>
              </div>
              <div className='text-center'>
                <p className='text-gray-600 text-sm font-medium mb-1'>Member Since</p>
                <p className='text-2xl md:text-3xl font-bold text-gray-900'>{userData?.timestamp?.toDate?.()?.getFullYear() || new Date().getFullYear()}</p>
              </div>
              <div className='text-center'>
                <p className='text-gray-600 text-sm font-medium mb-1'>Phone</p>
                <p className='text-lg md:text-xl font-bold text-gray-900'>{userData?.phone?.slice(-4) || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className='space-y-4'>
            {/* Section Header */}
            <div className='flex items-center gap-3'>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} text-white`}>
                {section.icon}
              </div>
              <div>
                <h3 className='text-xl md:text-2xl font-bold text-gray-900'>
                  {section.title}
                </h3>
                <p className='text-sm text-gray-600'>
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Section Items */}
            <div className='grid gap-3'>
              {section.items.map((item, itemIdx) => (
                <Link key={itemIdx} href={item.url}>
                  <div className='rounded-xl bg-white/80 backdrop-blur-md shadow-sm border border-white/20 p-4 md:p-5 hover:shadow-md hover:border-white/40 transition-all duration-300 cursor-pointer group'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                          {item.label}
                        </p>
                        <p className='text-sm text-gray-600 mt-1'>
                          {item.description}
                        </p>
                      </div>
                      <div className='text-2xl text-gray-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1 duration-300'>
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className='rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 p-6 md:p-8'>
          <Button
            type='button'
            block
            color='danger'
            onClick={handleLogout}
            startIcon={<FaSignOutAlt />}
            className='py-3 text-base md:text-lg font-semibold'
          >
            Logout from Account
          </Button>
          <p className='text-center text-gray-600 text-sm mt-4'>
            You will be logged out from all devices
          </p>
        </div>
      </div>
    </div>
  );
}
