'use client';

import InvestmentPlans from "@/components/InvestmentPlans";


export default function Plan () {
  return (
    <div>
      <div>
        <p className=" text-2xl text-primary">Pricing Table</p>
        <p className=" text-lg">Choose your pricing plan and start enjoying our service</p>
      </div>

      <div className='my-8'>
        <p className='mb-4 text-xl font-semibold text-white'>
          Investment Plans
        </p>

        <InvestmentPlans  authenticated={true} />
      </div>
    </div>
  )

}