'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import Select from '@/components/Global/Select';
import countries from '@/static/countries';
import { currencies, plans } from '@/static/currencies';
import { UserService } from '@/services/user';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import * as Yup from 'yup';
import { Timestamp } from 'firebase/firestore';

const initialValues = {
  fullname: '',
  username: '',
  phone: '',
  country: '',
  email: '',
  password: '',
  currency: {
    symbol: '',
    code: '',
  },
  plan: "",
  referralCode: '',
  registrationDate: '',
};

const schema = Yup.object({
  fullname: Yup.string().required().label('Full Name'),
  username: Yup.string().required().label('Username'),
  phone: Yup.string().required().label('Phone'),
  country: Yup.string().required().label('Country'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Password'),
  currency: Yup.object({ country: Yup.string(), currency_code: Yup.string() })
    .required()
    .label('Currency'),
  plan: Yup.string().required(),
  referralCode: Yup.string().optional(),
  registrationDate: Yup.string().optional(),
});

const AdminAddUser = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [markets, setMarkets] = useState<any | undefined>(plans)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMarket = async () => {
      const marketsData = await UserService.fetchMarkets()
      if(marketsData){
        setMarkets(marketsData)
      }
    }
    fetchMarket()
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    async onSubmit(values) {
      setIsLoading(true);
      try {
        // 1. Register User in Auth
        const { uid } = await UserService.registerUser(values.email, values.password);
        
        if (uid) {
          console.log("User created with UID:", uid);

          // 2. Prepare Data for Firestore
          const userData = {
            fullname: values.fullname,
            username: values.username,
            phone: values.phone,
            country: values.country,
            email: values.email,
            password: values.password, // Storing password for admin reference if needed
            _id: uid.trim(),
            emailVerified: true, // Bypass verification
            wallet: {
              bonus: 0,
              deposit: 0,
              investment: 0,
              profit: 0,
              referral: 0,
              withdraw: 0,
            },
            gender: '',
            avatar_url: '',
            kyc_document: {
              type: '',
              documents: [],
            },
            kyc_submitted: true,
            kyc_approved: true, // Bypass kyc
            kyc_pending: false,
            account_level: 1,
            account_number: '',
            account_name: '',
            bank_name: '',
            swift_code: '',
            bitcoin_address: '',
            ethereum_address: '',
            cashapp_tag: '',
            paypal_email: '',
            deposits: [],
            withdrawals: [],
            investments: [],
            isAdmin: false,
            isVerified: true, // Bypass all checks
            timestamp: values.registrationDate ? Timestamp.fromDate(new Date(values.registrationDate)) : Timestamp.now(),
            nextOfKin: {
              email: '',
              gender: '',
              relationship: '',
              phoneNumber: '',
              name: '',
            },
            isBlocked: false,
            symbol: '',
            plans: [],
            selectedPlan: values.plan,
            tradingPercentage: 0,
            otpNumber: null,
            isRequestedOTP: false,
            referralCode: values.referralCode || '',
            currency: values.currency.symbol,
          };

          // 3. Set User Data in Firestore
          await UserService.setUserData(uid, userData);

          toast.success('Account created successfully!');
          formik.resetForm();
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        toast.error(error.message || 'An error occurred during registration');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { handleChange, values, handleSubmit, errors } = formik;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-white'>Register New Client</h1>
        <p className='text-slate-400 text-sm'>Create accounts directly (Bypass OTP/KYC)</p>
      </div>

      <div className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-8 shadow-xl'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Row 1: Full Name and Username */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Full Name *</label>
              <TextInput
                type='text'
                id='fullname'
                placeholder='John Doe'
                dark
                required
                onChange={handleChange}
                value={values.fullname}
                error={errors.fullname}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Username *</label>
              <TextInput
                type='text'
                id='username'
                placeholder='johndoe123'
                dark
                required
                onChange={handleChange}
                value={values.username}
                error={errors.username}
              />
            </div>
          </div>

          {/* Row 2: Email and Phone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Email Address *</label>
              <TextInput
                type='email'
                id='email'
                placeholder='client@example.com'
                dark
                required
                onChange={handleChange}
                value={values.email}
                error={errors.email}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Phone Number *</label>
              <TextInput
                type='tel'
                id='phone'
                placeholder='+1 (555) 000-0000'
                dark
                required
                onChange={handleChange}
                value={values.phone}
                error={errors.phone}
              />
            </div>
          </div>

          {/* Row 3: Nationality and Currency */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Nationality *</label>
              <Select
                id='country'
                name='country'
                value={values.country}
                onChange={handleChange}
                placeholder='Select Country'
                options={countries.map((country: any) => ({
                  label: country.name,
                  value: country.name,
                }))}
                error={errors.country}
                required
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Currency *</label>
              <Select
                id='currency'
                name='currency'
                value={values.currency.code}
                onChange={(e) => {
                  const selected = currencies.find((c: any) => c.code === e.target.value);
                  if (selected) {
                    formik.setFieldValue('currency', selected);
                  }
                }}
                placeholder='Select Currency'
                options={currencies.map((currency: any) => ({
                  label: `${currency.code} - ${currency.symbol}`,
                  value: currency.code,
                }))}
                error={errors.currency?.code}
                required
              />
            </div>
          </div>

          {/* Row 4: Investment Plan and Password */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Initial Investment Plan *</label>
              <Select
                id='plan'
                name='plan'
                value={values.plan}
                onChange={handleChange}
                placeholder='Select Plan'
                options={markets && markets.map((market: any) => ({
                  label: market.plan,
                  value: market.plan,
                }))}
                error={errors.plan}
                required
              />
            </div>
            <div className='space-y-2 relative'>
              <label className='text-sm font-semibold text-slate-300'>Password *</label>
              <TextInput
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                placeholder='Assign a password'
                dark
                required
                onChange={handleChange}
                value={values.password}
                rightIcon={<AiOutlineEye />}
                rightIconClick={() => setPasswordVisible(!passwordVisible)}
                error={errors.password}
              />
            </div>
          </div>

          {/* Row 5: Referral and Registration Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Referral Name (Optional)</label>
              <TextInput
                type='text'
                id='referralCode'
                placeholder='Enter referral name'
                dark
                onChange={handleChange}
                value={values.referralCode}
                error={errors.referralCode}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-300'>Registration Date (Optional)</label>
              <TextInput
                type='datetime-local'
                id='registrationDate'
                placeholder='Select Date'
                dark
                onChange={handleChange}
                value={values.registrationDate}
                error={errors.registrationDate}
              />
            </div>
          </div>

          <div className='pt-6'>
            <Button type='submit' color='primary_2' loading={isLoading} block>
              Register Client Account
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AdminAddUser;
