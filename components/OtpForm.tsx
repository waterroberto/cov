"use client"

import React, { useState } from 'react'
import { InputOTPDemo } from '@/components/chad/Otp'
import Button from '@/components/Global/Button'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { UserService } from '@/services/user'
import { useRouter } from 'next/navigation';
import {Suspense} from "react";

export default function OtpForm() { 
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  const fullname = searchParams.get("fullname");
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second cooldown
  const router = useRouter();
  


  const verifyOTP = async () => {
    if(otp.length > 6) return toast.error("otp field incomplete")
    setLoading(true);
    console.log(userId)

    const res = await fetch("/api/otp", {
      method: "POST",
      body: JSON.stringify({ userId, enteredOTP: otp }),
    });

    const data = await res.json();
    setLoading(false);

    const template = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Welcome to HMAgrivest Investment</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; z-index: 1; }
              .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
              .logo { text-align: center; margin-bottom: 20px; }
              .logo img { max-width: 150px; }
              .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
              .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
              .highlight { font-weight: bold; color: #28a745; }
              .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
              .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              
              <!-- LOGO SECTION -->
              <div class="logo">
                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
              </div>

              <h2 class="heading">Welcome to HMAgrivest !</h2>

              <p class="text">Dear <span class="highlight">${fullname}</span>,</p>
              
              <p class="text">Welcome to HMAgrivest! Your account has been successfully created, and we're thrilled to have you on board. Our platform empowers users with seamless access to a wide range of commodities and agricultural stocks, helping you make informed investment decisions. Get ready to explore exciting opportunities in the agricultural sector.</p>


              <p class="text">To get started, log in to your account and explore the investment opportunities available to you.</p>

              <!-- CALL TO ACTION BUTTON -->
              <div style="text-align: center; color: #fff;">
                <a href="https://capitalonlineventures.com/auth/login" class="btn">Login to Your Account</a>
              </div>

              <hr />

              <p class="footer">
                Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
              </p>
              <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
            </div>
          </body>
        </html>
        `
        
        if (res.ok) {
          toast.success("OTP verified successfully!");
          console.log(page)
        //   if(page === "changepassword") {
        //     localStorage.setItem('userId', userId as string)
        //     router.replace(`/auth/reset-password/new`)
        //     return
        //   }
        // await UserService.sendEmail({
        //   to: email,
        //   subject: "Registration Sucessfull - (Welcome to HMAgrivest)",
        //   html: template
        // })
      router.replace(`/auth/kyc?userId=${userId}&fullname=${fullname}&email=${encodeURIComponent(email || '')}`)
    } else {
      toast.error(data.error)
    }
  };


  

  const resendOTP = async () => {
    try {
      
      setResendDisabled(true);
      
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
      
      const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP for HMAgrivest</title>
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
                    <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo" />
                    <h2>HMAgrivest OTP Verification</h2>
                  </div>
    
                  <div class="message">
                    <p>Dear ${fullname},</p>
    
                    <p>
                      Thank you for registering with HMAgrivest! We are excited to have you on board. Please use the one-time passcode (OTP) below to verify your account:
                    </p>
    
                    <div class="otp">
                      ${generatedOtp}
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
                      The HMAgrivest Team
                    </p>
                    <p>
                      <a href="https://www.capitalonlineventures.com">www.capitalonlineventures.com</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
    `

    const res = await fetch("/api/resend-otp", {
      method: "POST",
      body: JSON.stringify({ userId, otp: generatedOtp }),
    });

    const data = await res.json();
    
    
   data.success === true && await UserService.sendEmail({
      to: email,
      subject: "Otp Verification",
      html: template
    
    })
    toast.success(data.success ? "New OTP sent to your email!" : data.error);
    
    if (res.ok) {
      setTimeLeft(30); // Reset cooldown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    } catch (error) {
      console.log(error)
      
    }
  };
  
  const handleValueChange = (value:string) => {
    setOtp(value)

  }
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
        
        {/* Floating elements */}
        <div className='absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
        
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
        <div className='w-full max-w-md rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
          <div className='mb-8 text-center'>
            <p className='text-white font-bold text-3xl mb-2'>Verify Email</p>
            <p className='text-slate-400 text-sm'>
              We sent an OTP to <br />
              <span className='text-blue-400 font-medium'>{email}</span>
            </p>
          </div>

          <form className='gap-6 w-full flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-4 w-full'>
              <label className='font-semibold text-sm text-slate-300 text-center'>
                Enter OTP Code
              </label>
              <div className='flex justify-center'>
                <InputOTPDemo maxLength={6} onChange={handleValueChange} />
              </div>

              <p className='text-slate-400 text-center text-sm mt-4'>
                Didn't receive a code?{' '}
                <span 
                  className={`${
                    resendDisabled 
                      ? 'text-slate-500 pointer-events-none' 
                      : 'text-blue-400 hover:text-blue-300 cursor-pointer font-semibold'
                  } transition-colors`}
                  onClick={resendOTP}
                >
                  {resendDisabled ? `Resend in ${timeLeft}s` : 'Resend OTP'}
                </span>
              </p>
            </div>

            <Button 
              onClick={verifyOTP}
              color='primary_2'
              block
              loading={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
