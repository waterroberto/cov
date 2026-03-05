'use client';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import TextInput from '@/components/Global/TextInput';
import { auth, db } from '@/config/firebase.config';
import { UserService } from '@/services/user';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import * as Yup from 'yup';


const schema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Password'),
});

const LoginPage = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log(res);
        if (res.user) {
          const ref = doc(db, 'users', res.user.uid);

          const apiRes = await getDoc(ref);
          const data = apiRes.data();

          const otp = Math.floor(100000 + Math.random() * 900000).toString()

          if (data) {
            if(!data?.emailVerified) {

             await updateDoc(ref, {
              isOtpCreatedAt: serverTimestamp(),
              otpNumber: otp,
              isRequestedOTP: true,
             })


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

              console.log(data)
              await UserService.sendEmail({
                to: data.email,
                subject: "Otp Verification",
                html: template
              })


            router.push(`/auth/otp`)
            return
            }
            if(data.kyc_pending === true && data.kyc_submitted === true) {
              toast.error("Your KYC is under review")
              // router.replace("/auth/kyc") 
              return
            }
            toast.success('Welcome to CAP VENTURES');
            if (data.isAdmin) {
              router.replace('/admin');
            } else {
              router.replace('/dashboard');
            }

          }
        }
      } catch (error) {
        toast.error('Error! Invalid email or password.');

        console.log(error);
      }
    },
  });

  const { handleChange, handleSubmit, errors } = formik;

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
        
        {/* Floating elements */}
        <div className='absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl'></div>

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
                Grow Your <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Wealth</span> with CAP VENTURES
              </h1>
              <p className='text-slate-300 text-lg mb-8'>
                Smart investment strategies tailored for your financial goals. Start building your portfolio today.
              </p>
            </div>

            {/* Benefits */}
            <div className='space-y-4'>
              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Real-time Analytics</h3>
                  <p className='text-slate-400 text-sm'>Track your investments with advanced charts and insights</p>
                </div>
              </div>

              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>Secure & Trusted</h3>
                  <p className='text-slate-400 text-sm'>Bank-level security for your financial data</p>
                </div>
              </div>

              <div className='flex items-start space-x-4 group'>
                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M13 7H7v6h6V7z' />
                    <path fillRule='evenodd' d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a2 2 0 01-2-2v-1H4a1 1 0 110-2h1v-2H4a1 1 0 110-2h1V9H4a1 1 0 110-2h1V5a2 2 0 012-2h1V2z' clipRule='evenodd' />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-white'>24/7 Support</h3>
                  <p className='text-slate-400 text-sm'>Get help anytime with our dedicated support team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className='w-full max-w-md mx-auto lg:mx-0'>
            <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
              <div className='flex justify-center mb-8'>
                <Link href='/' className='hover:opacity-80 transition-opacity'>
                  <Logo width={120} height={120} />
                </Link>
              </div>

              <div className='mb-8 text-center'>
                <p className='text-white font-bold text-2xl mb-2'>Welcome Back</p>
                <p className='text-slate-400 text-sm'>
                  Sign in to access your investment portfolio
                </p>
              </div>

              <form className='gap-8 py-4 w-full flex flex-col' onSubmit={handleSubmit}>
                {/* Email Field */}
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

                {/* Password Field */}
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
                    placeholder='Enter your password'
                    className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                    required
                    onChange={handleChange}
                    rightIcon={<AiOutlineEye />}
                    dark
                    rightIconClick={() => setPasswordVisible(!passwordVisible)}
                    error={errors.password}
                  />
                </div>

                {/* Sign In Button */}
                <Button 
                  color="primary_2" 
                  type='submit' 
                  loading={formik.isSubmitting} 
                  block
                >
                  Sign In
                </Button>
              </form>

              {/* Forgot Password Link */}
              <p className='mt-6 text-slate-400 text-center text-sm'>
                <Link href='/auth/reset-password' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                  Forgot your password?
                </Link>
              </p>

              {/* Divider */}
              <div className='my-6 flex items-center gap-4'>
                <div className='flex-1 h-px bg-slate-600/30'></div>
                <span className='text-slate-500 text-xs'>NEW TO CAP VENTURES?</span>
                <div className='flex-1 h-px bg-slate-600/30'></div>
              </div>

              {/* Sign Up Link */}
              <p className='text-slate-400 text-center text-sm'>
                <Link href='/auth/register' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors block mb-2'>
                  Create Account Now
                </Link>
                <span className='text-xs'>Start investing with CAP VENTURES today</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
