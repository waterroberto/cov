'use client';
import Button from '@/components/Global/Button';
import Meta from '@/components/Global/Meta';
import { auth, db } from '@/config/firebase.config';

import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { UserDataType } from '@/interface';
import { UserService } from '@/services/user';
import Logo from '@/components/Global/Logo';


const ForgotPassword = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);

  const [formdata, setFormdata] = useState({ email: '' });

  const { email } = formdata;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  async function getUserByEmail(email: string) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs)

    if (querySnapshot.empty) {
      console.log("No user found");
      return null;
    }

    // Extract user data
    const userData = querySnapshot.docs.map(doc => ({...doc.data() }))[0];
    console.log("User found:", userData);
    return userData as UserDataType;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

  const loginHandler = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(email)
    const user = await getUserByEmail(email)
    console.log(user)
    if(!user) {
      setIsLoading(false)
      return toast.error("user not found ")
      
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const ref = doc(db, 'users', user._id);
    
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
                      <p>Dear ${user?.fullname},</p>

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
        to: user.email,
        subject: "Otp Verification",
        html: template
      }).then(() => {

        toast.success('An Otp to reset your password has been sent');
        router.push(`/auth/otp?userId=${user._id}&fullname=${user.fullname}&email=${encodeURIComponent(user.email)}&page=changepassword`)
        setIsLoading(false);
      }).catch((err) => {
        console.log(err)
        setIsLoading(false);
      })



    // await sendPasswordResetEmail(auth, email)
    // .then((d) => {
    //     console.log(d)

    //     // setTimeout(() => {
    //     //   router.push('login');
    //     // }, 2000);
    //   })
    //   .catch((error) => {
    //     toast.success('A link to reset your password has been sent and would be received if the email is registered on this platform');
    //     // setTimeout(() => {
    //     //   router.push('login');
    //     // }, 2000);
    //     console.log(error);
    //   });
  };

  return (
    <>
      <Meta title='Forgot Password | CAP VENTURES Investment' />
      <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
          
          {/* Floating elements */}
          <div className='absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
          
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

        <div className='relative z-10 min-h-screen p-4 flex flex-col items-center justify-center'>
          <Link href='/' className='mb-8'>
            <Logo width={120} height={120} />
          </Link>

          <div className='w-full max-w-md rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
            <div className='mb-8'>
              <p className='text-white font-bold text-3xl mb-2'>Reset Password</p>
              <p className='text-slate-400 text-sm'>
                Enter your email to receive an otp code
              </p>
            </div>

            <form className='gap-6 w-full flex flex-col' onSubmit={loginHandler}>
              <div className='w-full flex flex-col gap-2'>
                <label
                  htmlFor='email'
                  className='font-semibold text-sm text-slate-300'
                >
                  Email Address *
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='your@email.com'
                  className='px-4 py-3 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200'
                  required
                  value={email}
                  onChange={inputChangeHandler}
                />
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                color='primary_2'
                block
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </Button>
            </form>

            {/* Back to login link */}
            <p className='mt-6 text-slate-400 text-center text-sm'>
              Remember your password?{' '}
              <Link href='/auth/login' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
