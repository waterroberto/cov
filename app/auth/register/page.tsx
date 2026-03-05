'use client';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import TextInput from '@/components/Global/TextInput';
import Select from '@/components/Global/Select';
import { auth, db } from '@/config/firebase.config';
import {  UserDataType } from '@/interface';
import { UserService } from '@/services/user';
import countries from '@/static/countries';
import { currencies, plans } from '@/static/currencies';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import * as Yup from 'yup';

interface ICURRENCY {
  symbol: string;
  code: string;
}

interface IFormData {
  fullname: string;
  username: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  currency: ICURRENCY;
  // plan: IPackage;
  plan: string;
}

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

  plan: Yup.string().required()
});

const Register = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [markets, setMarkets] = useState<any | undefined>(plans)

  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading)

  useEffect(() => {
    const fetchMarket = async () => {
      const markets = await UserService.fetchMarkets()
      if(markets){
        setMarkets(markets)
      }
    }
    // UserService.updateMarkets([...plans.map((p) => ({plan: p.plan, id: crypto.randomUUID()}))])
    fetchMarket()
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit(values) {

      handleUserRegister(values);
    },
  });

  const handleUserRegister = async (formData: IFormData) => {
    if (Object.keys(formik.errors).length === 0 && termsAndConditions) {
      let dupUserRef;
      try {
        setIsLoading(true);
        console.log('working');

        const userRef = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        dupUserRef = userRef;
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const data: UserDataType = {
          ...formData,
          currency: formData.currency.symbol,
          _id: userRef.user.uid.trim(),
          emailVerified: false,
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
          kyc_submitted: false,
          kyc_approved: false,
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
          isVerified: false,
          timestamp: Timestamp.now(),
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
          selectedPlan: formData.plan,
          tradingPercentage: 0,
          otpNumber: otp,
          isRequestedOTP: true,
        };

        // delete the plan object
        delete data.plan;

        const ref = doc(db, 'users', userRef.user.uid);
        const res = await setDoc(ref, {...data, isOtpCreatedAt: serverTimestamp() });
        console.log(res)

        // Fetch the updated document
        const updatedDoc = await getDoc(ref);
        console.log(updatedDoc.data()); // Logs the newly stored data

        setIsLoading(false);

        const template = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>OTP for CapVentures</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .header img {
                width: 150px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 16px;
                color: #333333;
                line-height: 1.6;
              }
              .otp {
                font-size: 28px;
                font-weight: bold;
                color: #2d9cdb;
                text-align: center;
                margin: 20px 0;
              }
              .footer {
                font-size: 14px;
                color: #888888;
                text-align: center;
                margin-top: 20px;
              }
              .footer a {
                color: #2d9cdb;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="CapVentures Logo" />
                <h2>CapVentures OTP Verification</h2>
              </div>

              <div class="message">
                <p>Dear ${data.fullname},</p>

                <p>
                  Thank you for registering with CapVentures! We are excited to have you on board. Please use the one-time passcode (OTP) below to verify your account:
                </p>

                <div class="otp">
                  ${otp}
                </div>

                <p>
                  For your security, this OTP is valid for 5 minutes. If you did not request this OTP, please disregard this email.
                </p>

                <p>
                  If you encounter any issues or need assistance, don't hesitate to reach out to our support team at <a href="mailto:support@capitalonlineventures.com">support@capitalonlineventures.com</a>.
                </p>
              </div>

              <div class="footer">
                <p>
                  Best regards,<br />
                  The CapVentures Team
                </p>
                <p>
                  <a href="https://www.capitalonlineventures.com">www.capitalonlineventures.com</a>
                </p>
              </div>
            </div>
          </body>
        </html>
        `

        await UserService.sendEmail({
          to: data.email,
          subject: "Otp Verification",
          html: template

        })

        router.push(`/auth/otp`);
      } catch (error) {
        dupUserRef?.user.delete();
        
        toast.error('Something failed please try again');
        setIsLoading(false);
      }
    } else {
      toast.error('One or more inputs are invalid');
      if (!termsAndConditions)
        toast.error('Please agree to terms and conditions');
    }
  };

  const { handleChange, values, handleSubmit, errors } = formik;


  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
        
        {/* Floating elements */}
        <div className='absolute top-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl'></div>

        {/* Grid pattern */}
        <div className='absolute inset-0 opacity-10'>
          <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                <path d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='0.5'/>
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>
      </div>

      <div className='relative z-10 min-h-screen p-4 flex items-center justify-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full items-center'>
          
          {/* Left side - Branding and benefits */}
          <div className='hidden lg:flex flex-col justify-center space-y-8'>
            <div>
              <h1 className='text-5xl font-bold text-white mb-4 leading-tight'>
                Start <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Building</span> Your Investment Portfolio
              </h1>
              <p className='text-slate-300 text-lg mb-8'>
                Join thousands of investors using CAP VENTURES to grow their wealth with smart, diversified investment strategies.
              </p>
            </div>

            {/* Benefits */}
            <div className='space-y-4'>
              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Diversified Plans</h3>
                  <p className='text-slate-400 text-sm'>Multiple investment options tailored to your risk profile</p>
                </div>
              </div>

              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Transparent Returns</h3>
                  <p className='text-slate-400 text-sm'>Real-time tracking of your portfolio performance</p>
                </div>
              </div>

              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Maximum Security</h3>
                  <p className='text-slate-400 text-sm'>Your funds are protected with enterprise-grade encryption</p>
                </div>
              </div>

              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M13 7H7v6h6V7z' />
                    <path fillRule='evenodd' d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a2 2 0 01-2-2v-1H4a1 1 0 110-2h1v-2H4a1 1 0 110-2h1V9H4a1 1 0 110-2h1V5a2 2 0 012-2h1V2z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Expert Support</h3>
                  <p className='text-slate-400 text-sm'>24/7 customer support from our investment specialists</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Registration form */}
          <div className='w-full max-w-md mx-auto lg:mx-0'>
            <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
              <div className='flex justify-center mb-8'>
                <Link href='/' className='hover:opacity-80 transition-opacity'>
                  <Logo width={120} height={120} />
                </Link>
              </div>

              <div className='mb-8 text-center'>
                <p className='text-white font-bold text-2xl mb-2'>Create Account</p>
                <p className='text-slate-400 text-sm'>
                  Join our investment community and start building wealth
                </p>
              </div>

              <form className='gap-8 py-4 w-full flex flex-col' onSubmit={handleSubmit}>
                {/* Row 1: Full Name and Username */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='fullname'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Full Name *
                    </label>
                    <TextInput
                      type='text'
                      id='fullname'
                      placeholder='John Doe'
                      className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                      required
                      dark
                      onChange={handleChange}
                      error={errors.fullname}
                    />
                  </div>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='username'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Username *
                    </label>
                    <TextInput
                      type='text'
                      id='username'
                      placeholder='johndoe123'
                      className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                      required
                      dark
                      onChange={handleChange}
                      error={errors.username}
                    />
                  </div>
                </div>

                {/* Row 2: Email and Phone */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='email'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Email Address *
                    </label>
                    <TextInput
                      type='email'
                      id='email'
                      placeholder='your@email.com'
                      className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                      required
                      dark
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='phone'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Phone Number *
                    </label>
                    <TextInput
                      type='tel'
                      id='phone'
                      name='phone'
                      placeholder='+1 (555) 000-0000'
                      className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                      dark
                      required
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                </div>

                {/* Row 3: Nationality and Currency */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='country'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Nationality *
                    </label>
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
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='currency'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Currency *
                    </label>
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                  <div className='w-full flex flex-col gap-2'>
                    <label
                      htmlFor='investmentType'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Investment Plan *
                    </label>
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

                  <div className='w-full flex flex-col gap-2 relative'>
                    <label
                      htmlFor='password'
                      className='font-semibold text-sm text-slate-300'
                    >
                      Password *
                    </label>
                    <TextInput
                      type={passwordVisible ? 'text' : 'password'}
                      id='password'
                      name='password'
                      placeholder='Enter a secure password'
                      className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                      required
                      dark
                      onChange={handleChange}
                      rightIcon={<AiOutlineEye />}
                      rightIconClick={() => setPasswordVisible(!passwordVisible)}
                      error={errors.password}
                    />
                  </div>
                </div>

                {/* Row 5: Terms and Conditions */}
                <div className='flex items-center gap-3 py-4 px-4 rounded-lg bg-slate-700/30 border border-slate-600/50'>
                  <input
                    id='termsAndConditions'
                    type='checkbox'
                    className='w-5 h-5 cursor-pointer accent-blue-500 flex-shrink-0'
                    checked={termsAndConditions}
                    onChange={() => {
                      setTermsAndConditions((prev) => !prev);
                    }}
                  />
                  <label htmlFor='termsAndConditions' className='text-sm text-slate-300 cursor-pointer'>
                    I agree to the <span className='text-blue-400 hover:text-blue-300'>Terms & Conditions</span>
                  </label>
                </div>

                {/* Row 6: Submit Button */}
                <Button type='submit' color="primary_2" loading={isLoading} block>
                  Create Account
                </Button>
              </form>

              {/* Divider */}
              <div className='my-6 flex items-center gap-4'>
                <div className='flex-1 h-px bg-slate-600/30'></div>
                <span className='text-slate-500 text-xs'>ALREADY HAVE AN ACCOUNT?</span>
                <div className='flex-1 h-px bg-slate-600/30'></div>
              </div>

              {/* Sign In Link */}
              <p className='text-slate-400 text-center text-sm'>
                <Link href='/auth/login' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors block mb-2'>
                  Sign In Now
                </Link>
                <span className='text-xs'>Access your existing account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
