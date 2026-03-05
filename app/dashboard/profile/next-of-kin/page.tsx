'use client';
import Button from '@/components/Global/Button';
import ProfileFormCard from '@/components/Dashboard/ProfileFormCard';
import ProfileHeader from '@/components/Dashboard/ProfileHeader';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserFriends, FaSave, FaEdit } from 'react-icons/fa';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  relationship: Yup.string().required('Relationship is required'),
  gender: Yup.string().required('Gender is required'),
});

function NextOfKin() {
  const router = useRouter();
  const { userData } = useContext(UserDataContext);
  const [editState, setEditState] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData?.nextOfKin?.name || '',
      relationship: userData?.nextOfKin?.relationship || '',
      gender: userData?.nextOfKin?.gender || '',
      email: userData?.nextOfKin?.email || '',
      phoneNumber: userData?.nextOfKin?.phoneNumber || '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      const ref = doc(db, 'users', userData?._id ?? '');

      const fieldValuesUnchanged =
        values.name === userData?.nextOfKin?.name &&
        values.email === userData?.nextOfKin?.email &&
        values.phoneNumber === userData?.nextOfKin?.phoneNumber &&
        values.relationship === userData?.nextOfKin?.relationship &&
        values.gender === userData?.nextOfKin?.gender;

      if (!fieldValuesUnchanged) {
        toast.loading('Updating next of kin...');

        await updateDoc(ref, {
          nextOfKin: { ...values },
          lastUpdated: new Date(),
        }).finally(() => {
          setEditState(false);
          toast.dismiss();
          toast.success('Next of kin updated successfully!');
        });
      } else {
        toast.error('No changes to update');
      }
    },
  });

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
          title='Next of Kin'
          subtitle='Designate an emergency contact for your account and investments'
          icon={<FaUserFriends />}
        />

        {/* Form Card */}
        <ProfileFormCard>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-white/10 gap-4 sm:gap-0'>
            <div className='min-w-0'>
              <h2 className='text-xl sm:text-2xl font-bold text-white truncate'>Emergency Contact</h2>
              <p className='text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2 sm:line-clamp-none'>
                We will transfer your investments to this person in case of emergencies
              </p>
            </div>
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
                  Edit Details
                </>
              )}
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            {/* Personal Details Section */}
            <div className='mb-8 pb-6 border-b border-white/5'>
              <h3 className='text-lg font-bold text-white mb-6 flex items-center gap-2'>
                📋 Personal Information
              </h3>
              <div className='space-y-5'>
                {/* Full Name */}
                <div>
                  <label htmlFor='name' className='block text-sm font-semibold text-white mb-2'>
                    Full Name
                  </label>
                  <TextInput
                    name='name'
                    id='name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!editState}
                    placeholder='Enter full name'
                    sx='text-white'
                    className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className='text-red-600 text-sm mt-1'>{formik.errors.name}</p>
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
                    placeholder='Enter email address'
                    sx='text-white'
                    className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className='text-red-600 text-sm mt-1'>{formik.errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor='phoneNumber' className='block text-sm font-semibold text-white mb-2'>
                    Phone Number
                  </label>
                  <TextInput
                    name='phoneNumber'
                    id='phoneNumber'
                    type='tel'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!editState}
                    placeholder='Enter phone number'
                    sx='text-white'
                    className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className='text-red-600 text-sm mt-1'>{formik.errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Relationship Details Section */}
            <div>
              <h3 className='text-lg font-bold text-white mb-6 flex items-center gap-2'>
                🔗 Relationship Details
              </h3>
              <div className='space-y-5'>
                {/* Relationship */}
                <div>
                  <label htmlFor='relationship' className='block text-sm font-semibold text-white mb-2'>
                    Relationship
                  </label>
                  <TextInput
                    name='relationship'
                    id='relationship'
                    type='text'
                    value={formik.values.relationship}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!editState}
                    placeholder='e.g., Spouse, Parent, Sibling'
                    sx='text-white'
                    className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
                  />
                  {formik.touched.relationship && formik.errors.relationship && (
                    <p className='text-red-600 text-sm mt-1'>{formik.errors.relationship}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor='gender' className='block text-sm font-semibold text-white mb-2'>
                    Gender
                  </label>
                  <TextInput
                    name='gender'
                    id='gender'
                    type='text'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!editState}
                    placeholder='e.g., Male, Female'
                    sx='text-white'
                    className={!editState ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/5 border-white/10'}
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <p className='text-red-600 text-sm mt-1'>{formik.errors.gender}</p>
                  )}
                </div>
              </div>
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

export default NextOfKin;
