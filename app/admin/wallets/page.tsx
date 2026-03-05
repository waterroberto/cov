/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Button from '@/components/Global/Button'
import Card from '@/components/Global/Card'
import { db } from '@/config/firebase.config'
import clsx from 'clsx'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ICRYPTOADDRESS {
      btc: string
      eth: string
      usdt: string
}
function Wallets() {
    const [changeWalletAddressStatus, setChangeWalletAddressStatus] = useState(false);
  const [walletUpdated, setWalletUpdated] = useState(false);

  const formik = useFormik({
    initialValues: {
      btc: "",
      eth: "",
      usdt: ''
    },
    onSubmit(values) {
      console.log(values)
      updateWalletAddresses(values)
  },
  })

    useEffect(() => {
    const fetchWallets = async () => {
      const walletRef = doc(db, 'wallets', 'crypto');
      onSnapshot(walletRef, (snap) => {
        if (snap.exists()) {
         const  data = snap.data() as ICRYPTOADDRESS
          formik.setFieldValue('btc', data.btc);
          formik.setFieldValue('eth', data.eth);
          formik.setFieldValue('usdt', data.usdt);
        }
      });
    };

    fetchWallets();
  }, []);



  const updateWalletAddresses = async (values:ICRYPTOADDRESS ) => {
    toast.success('Setting new wallets...');

    const docRef = doc(db, 'wallets', 'crypto');

    try {
      await updateDoc(docRef, { ...values });
      toast.dismiss();

      toast.success('Successfully updated.');

      setChangeWalletAddressStatus(false);
    } catch (error) {
      console.log(error);
      toast.error('Error! Please contact developer.');
    }
  };


  return (
    <div className='min-h-screen text-white space-y-8'>
      <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
        <div className='border-b border-white/10 pb-6 mb-8'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2'>System Wallet Addresses</h2>
          <p className='text-sm text-gray-400'>Update the official wallet addresses used for receiving deposits globally.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='w-full'>
                <label
                  htmlFor='btc'
                  className='block mb-2 font-medium text-xs uppercase tracking-wider text-gray-400'
                >
                  Bitcoin (BTC)
                </label>
                <input
                  type='text'
                  id='btc'
                  name="btc"
                  placeholder='Wallet Address'
                  className='p-4 outline-none border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all w-full rounded-xl text-white bg-black/20 text-sm font-mono placeholder:text-gray-600'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.btc}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='eth'
                  className='block mb-2 font-medium text-xs uppercase tracking-wider text-gray-400'
                >
                  Ethereum (ETH)
                </label>
                <input
                  type='text'
                  id='eth'
                  name="eth"
                  placeholder='Wallet Address'
                  className='p-4 outline-none border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all w-full rounded-xl text-white bg-black/20 text-sm font-mono placeholder:text-gray-600'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.eth}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='usdt'
                  className='block mb-2 font-medium text-xs uppercase tracking-wider text-gray-400'
                >
                  USDT (TRC20)
                </label>
                <input
                  type='text'
                  id='usdt'
                  name="usdt"
                  placeholder='Wallet Address'
                  className='p-4 outline-none border border-white/10 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all w-full rounded-xl text-white bg-black/20 text-sm font-mono placeholder:text-gray-600'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.usdt}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
            </div>

            <div className='flex justify-end gap-4 border-t border-white/10 pt-8 mt-8'>
              <Button
                type='button'
                onClick={() => {
                  if (changeWalletAddressStatus)
                    setChangeWalletAddressStatus(false);
                  else setChangeWalletAddressStatus(true);
                }}
                className={clsx(
                  'transition-all font-semibold rounded-lg', 
                  changeWalletAddressStatus ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-white/10 text-white hover:bg-white/20'
                )}
              >
                {changeWalletAddressStatus ? 'Cancel Edit' : 'Edit Addresses'}
              </Button>
              {walletUpdated && changeWalletAddressStatus && (
                <Button
                  color='primary'
                  type='submit'
                  className='shadow-lg shadow-blue-500/20 px-8'
                >
                  Save Changes
                </Button>
              )}
            </div>        
          </form>
      </Card>
    </div>
  )
}

export default Wallets