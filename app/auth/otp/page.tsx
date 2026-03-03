"use client"

import OtpForm from '@/components/OtpForm';
import React, { useState } from 'react'

import {Suspense} from "react";

export default function Otppage() { 

  return (
    <Suspense fallback={<>Loading.....</>}>
      <OtpForm />
    </Suspense>
  )
}
