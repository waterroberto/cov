'use client';
import Button from '@/components/Global/Button';
import ProfileFormCard from '@/components/Dashboard/ProfileFormCard';
import ProfileHeader from '@/components/Dashboard/ProfileHeader';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { UserDataType } from '@/interface';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser, FaSave, FaEdit } from 'react-icons/fa';
import * as Yup from 'yup';

function ProfileSettings() {
  const router = useRouter();
  const { userData } = useContext(UserDataContext);
  const [editState, setEditState] = useState(false);
  const [userDataCopy, setUserDataCopy] = useState<UserDataType | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: userData!?.fullname,
      email: userData!?.email,
      phone: userData!?.phone,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
    }),
    async onSubmit(values) {
      const ref = doc(db, 'users', userData?._id ?? '');

      const fieldValuesUnchanged =
        values.fullname === userData?.fullname &&
        values.email === userData?.email &&
        values.phone === userData?.phone;

      if (!fieldValuesUnchanged) {
        toast.loading('Updating profile...');

        await updateDoc(ref, {
          ...values,
          lastUpdated: new Date(),
        }).finally(() => {
          setEditState(false);
          toast.dismiss();
          toast.success('Profile updated successfully!');
        });
      } else {
        toast.error('No changes to update');
      }
    },
  });

  useEffect(() => {
    if (userData) {
      setUserDataCopy(userData);
    }
  }, [userData]);

  return (
    <div className='min-h-screen w-full bg-slate-950 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden -z-10'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-8'>
        {/* Header */}
        <ProfileHeader
          title='Profile Settings'
          subtitle='Update your personal information and keep your account secure'
          icon={<FaUser />}
        />

        {/* Form Card */}
        <ProfileFormCard>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-white/10 gap-4 sm:gap-0'>
            <h2 className='text-xl sm:text-2xl font-bold text-white'>Personal Information</h2>
            <button
              type='button'
              onClick={() => setEditState(!editState)}
              className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all flex-shrink-0 whitespace-nowrap text-sm sm:text-base ${
                editState
                  ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                  : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
              }`}
            >
              {editState ? (
                <>
                  <span>Cancel Edit</span>
                </>
              ) : (
                <>
                  <FaEdit size={16} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            {/* Full Name */}
            <div>
              <label htmlFor='fullname' className='block text-sm font-semibold text-white mb-2'>
                Full Name
              </label>
              <TextInput
                name='fullname'
                id='fullname'
                type='text'
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!editState}
                placeholder='Enter your full name'
                sx='text-white'
                className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-semibold text-white mb-2'>
                Email Address
              </label>
              <TextInput
                name='email'
                id='email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!editState}
                placeholder='Enter your email'
                sx='text-white'
                className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor='phone' className='block text-sm font-semibold text-white mb-2'>
                Phone Number
              </label>
              <TextInput
                name='phone'
                id='phone'
                type='tel'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!editState}
                placeholder='Enter your phone number'
                sx='text-white'
                className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            {editState && (
              <div className='pt-4 flex gap-3'>
                <Button
                  type='submit'
                  color='primary_2'
                  block
                  startIcon={<FaSave />}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </ProfileFormCard>
      </div>
    </div>
  );
}

export default ProfileSettings;
