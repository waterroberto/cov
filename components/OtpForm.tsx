"use client"
import React, { useState, useEffect } from 'react'
import { InputOTPDemo } from '@/components/chad/Otp'
import Button from '@/components/Global/Button'
import toast from 'react-hot-toast'
import { UserService } from '@/services/user'
import { useRouter } from 'next/navigation'
import { auth } from '@/config/firebase.config'

export default function OtpForm() { 
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30-second cooldown
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u)
      } else {
        toast.error("You must be logged in to verify OTP")
        router.replace("/auth/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  const verifyOTP = async () => {
    if (!user) return toast.error("User not found")
    if (otp.length !== 6) return toast.error("OTP field incomplete")

    setLoading(true)
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        body: JSON.stringify({ userId: user.uid, enteredOTP: otp }),
      })

      const data = await res.json()
      setLoading(false)

      if (res.ok) {
        toast.success("OTP verified successfully!")
        router.replace("/auth/kyc") // Redirect to KYC
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const resendOTP = async () => {
    if (!user) return toast.error("User not found")
    try {
      setResendDisabled(true)

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()

      const res = await fetch("/api/resend-otp", {
        method: "POST",
        body: JSON.stringify({ userId: user.uid, otp: generatedOtp }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("New OTP sent to your email!")
        await UserService.sendEmail({
          to: user.email!,
          subject: "OTP Verification",
          html: `<p>Your OTP code is: <strong>${generatedOtp}</strong></p>`
        })

        setTimeLeft(30)
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setResendDisabled(false)
            }
            return prev - 1
          })
        }, 1000)
      } else {
        toast.error(data.error)
        setResendDisabled(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to resend OTP")
      setResendDisabled(false)
    }
  }

  const handleValueChange = (value: string) => {
    setOtp(value)
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
        <div className='absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
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

      {/* OTP Form */}
      <div className='relative z-10 min-h-screen p-4 flex flex-col items-center justify-center'>
        <div className='w-full max-w-md rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
          <div className='mb-8 text-center'>
            <p className='text-white font-bold text-3xl mb-2'>Verify Email</p>
            <p className='text-slate-400 text-sm'>
              We sent an OTP to <br />
              <span className='text-blue-400 font-medium'>{user?.email}</span>
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
                Didn&apos;t receive a code?{' '}
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