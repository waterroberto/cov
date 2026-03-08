import Footer from '@/components/Footer'
import Meta from '@/components/Global/Meta'
import Navbar from '@/components/Navbar'
import TermsAndConditions from '@/components/TermsandCondition'
import React from 'react'

export default function TermsCondition() {
  return (
    <>
      <Meta />
      <Navbar />
      <main>
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  )
}
