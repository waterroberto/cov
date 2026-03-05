'use client';
import Button from '@/components/Global/Button';
import ProfileFormCard from '@/components/Dashboard/ProfileFormCard';
import ProfileHeader from '@/components/Dashboard/ProfileHeader';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { getAuth, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BiShowAlt, BiSolidHide } from 'react-icons/bi';
import { FaLock, FaSave } from 'react-icons/fa';
import * as Yup from 'yup';

const schema = Yup.object({
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required')
    .notOneOf([Yup.ref('oldPassword')], 'New password must be different from current password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

function ChangePassword() {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userData } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      setIsLoading(true);
      const ref = doc(db, 'users', userData?._id ?? userData?.id ?? '');

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          toast.error('User not authenticated');
          setIsLoading(false);
          return;
        }

        // Update password in Firebase Auth
        await updatePassword(user, values.newPassword);

        // Update password record in Firestore
        await updateDoc(ref, {
          password: values.newPassword,
          lastUpdated: new Date(),
        });

        toast.dismiss();
        toast.success('Password updated successfully!');
        formik.resetForm();
      } catch (error: any) {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          toast.error('Current password is incorrect');
        } else if (error.code === 'auth/requires-recent-login') {
          toast.error('Please log in again to change your password');
        } else {
          toast.error('Error updating password. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className='min-h-screen w-full bg-slate-950 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden -z-10'>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 left-1/3 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-8'>
        {/* Header */}
        <ProfileHeader
          title='Change Password'
          subtitle='Update your password to keep your account secure'
          icon={<FaLock />}
        />

        {/* Form Card */}
        <ProfileFormCard>
          <div className='mb-6 pb-6 border-b border-white/10'>
            <h2 className='text-xl sm:text-2xl font-bold text-white'>Security Settings</h2>
            <p className='text-gray-400 text-xs sm:text-sm mt-1 line-clamp-3 sm:line-clamp-none'>
              Choose a strong password with a mix of uppercase, lowercase, numbers and symbols
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            {/* Current Password */}
            <div>
              <label htmlFor='oldPassword' className='block text-sm font-semibold text-white mb-2'>
                Current Password
              </label>
              <div className='relative'>
                <TextInput
                  type={showOldPassword ? 'text' : 'password'}
                  name='oldPassword'
                  id='oldPassword'
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter your current password'
                  sx='text-white'
                  rightIcon={showOldPassword ? <BiShowAlt /> : <BiSolidHide />}
                  rightIconClick={() => setShowOldPassword(!showOldPassword)}
                />
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.oldPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor='newPassword' className='block text-sm font-semibold text-white mb-2'>
                New Password
              </label>
              <div className='relative'>
                <TextInput
                  type={showNewPassword ? 'text' : 'password'}
                  name='newPassword'
                  id='newPassword'
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter your new password'
                  sx='text-white'
                  rightIcon={showNewPassword ? <BiShowAlt /> : <BiSolidHide />}
                  rightIconClick={() => setShowNewPassword(!showNewPassword)}
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.newPassword}</p>
              )}
              <div className='mt-3 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20'>
                <p className='text-xs text-blue-400 font-medium'>Password Requirements:</p>
                <ul className='text-xs text-blue-300/80 mt-1 space-y-1'>
                  <li>• At least 6 characters long</li>
                  <li>• Different from current password</li>
                  <li>• Mix of uppercase and lowercase letters</li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-semibold text-white mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <TextInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  id='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Re-enter your new password'
                  sx='text-white'
                  rightIcon={showConfirmPassword ? <BiShowAlt /> : <BiSolidHide />}
                  rightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className='text-red-600 text-sm mt-1'>{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className='pt-4 flex gap-3'>
              <Button
                type='submit'
                color='primary_2'
                block
                startIcon={<FaSave />}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </ProfileFormCard>
      </div>
    </div>
  );
}

export default ChangePassword;
