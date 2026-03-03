import { investment_plans } from '@/static';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';
import { useState } from "react";
import { DrawerDialogDemo } from './chad/DrawerDialogue';
import Modal from './Global/Modal';
import TextInput from './Global/TextInput';
import toast from 'react-hot-toast';

export default function InvestmentPlans({
  authenticated = false,
}: {
  authenticated?: boolean;
}) {
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [plan, setPlan] = useState<any | null>(null)
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
          className='p-6 rounded-xl bg-primary border border-blue-100 text-gray-50'
          data-aos='fade-up'
        >
          <p className='font-semibold capitalize text-xl mb-1'>
            {investment.name}
          </p>
          <p className='font-semibold capitalize text-sm mb-8'>
            Start your journey with the entry-level Invest & Earn.
          </p>

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
          <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Interest:</span>
            <span>
              <span className='text-neutral'>{investment.interest} </span>
            </span>
          </div>

          {/* <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Duration:</span>
            <span>
              <span className='text-neutral'>{investment.duration} </span>
              days
            </span>
          </div> */}

          <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Deposit Return:</span>
            <span>
              <span className='text-neutral'>Yes </span>
            </span>
          </div>

          <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Profit Percentage:</span>
            <span>
              <span className='text-neutral'>{investment.percentage}%</span>
            </span>
          </div>

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
      ))}
    </div>
    </>
  );
}
