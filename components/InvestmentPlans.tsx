'use client'

import { investment_plans } from '@/static';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DrawerDialogDemo } from './chad/DrawerDialogue';
import Button from './Global/Button';
import Modal from './Global/Modal';
import TextInput from './Global/TextInput';

export default function InvestmentPlans({
  authenticated = false,
}: {
  authenticated?: boolean;
}) {
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [value, setValue] = useState("")


  return (
    <>
    <Modal  title='Upgrade Investment Plan' handleClose={() => setIsOpenDialog(false)} isOpen={isOpenDialog}>
      <div className=' text-gray-50'>
        <h2>Send A Message To Our Support Agent</h2>
        
        <form className=' my-2.5'>
          <TextInput 
            dark
            value={value}
            placeholder='select a plan'
          />
        </form>

        <div className=' flex flex-col gap-4 my-3'>
          <Button size='large'>Send</Button>
          <p>Please, Our Customer Care Service are at your service</p>
          </div>
      </div>
    </Modal>
      {/* <DrawerDialogDemo isOpen={isOpenDialog} handleOpenDrawerDialog={setIsOpenDialog} title="Upgrade Plan"  /> */}

    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {investment_plans.map((investment) => (
        <div
          key={investment.name}
          className='rounded-xl bg-primary text-gray-50 border border-primary'
          data-aos='fade-up'
        >
          <div className="p-6">
          <p className='font-semibold capitalize text-xl mb-1'>
            {investment.name}
          </p>
          <p className='font-semibold capitalize text-sm'>
            Start your journey with the entry-level Invest & Earn.
          </p>
          </div>

          {/* <div className='grid grid-cols-2 gap-4 my-4'>
            <div>
              <p className='text-xs'>Min</p>
              <p className='text-xl font-bold text-neutral'>
                ${investment.min_amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className='text-xs'>Max</p>
              <p className='text-xl font-bold text-neutral'>
                ${investment.max_amount.toLocaleString()}
              </p>
            </div>
          </div> */}
          <div className="flex flex-col gap-4 items-center justify-center bg-white mb-4 p-6 text-gray-600">
          <div className='text-sm'>
            {investment.interest} Interest earned
          </div>
          <div className='text-sm'>
            Deposit Return
          </div>
          <div className='text-sm'>
            {investment.percentage}% profit percentage
          </div>

          {/* <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Duration:</span>
            <span>
              <span className='text-neutral'>{investment.duration} </span>
              days
            </span>
          </div> */}
          </div>

          <div className="px-6 pb-6">
          {authenticated ? (
            <Button onClick={() => {
               toast.success("contact support for upgrade of account at support@capitalonlineventures.com")
            }} variant='outlined' block>choose this plan</Button>
          ) : (
            <Link href='/auth/register'>
              <Button block>Choose plan</Button>
            </Link>
          )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
