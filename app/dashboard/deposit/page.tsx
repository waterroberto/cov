'use client';
import { DrawerDialogDemo } from '@/components/chad/DrawerDialogue';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import Meta from '@/components/Global/Meta';
import TextInput from '@/components/Global/TextInput';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { IDeposit } from '@/interface';
import { UserService } from '@/services/user';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { useFormik } from 'formik';
import moment from 'moment';
import Image from 'next/image';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { ImFilesEmpty } from 'react-icons/im';
import * as Yup from 'yup';

type CryptoAdress = { btc: string; eth: string; usdt: string };
interface IFORMDATA { amount: string; asset: string; proofOfPayment: string }

const initialValues: IFORMDATA = { amount: '', asset: '', proofOfPayment: '' };
const schema = Yup.object({ amount: Yup.string().required().label('Amount'), asset: Yup.string().required().label('Asset'), proofOfPayment: Yup.object() });

function Deposit() {
  const [modal, setModal] = useState(false);
  const { userData } = useContext(UserDataContext);
  const [document1, setDocument1] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoAdresses, setCryptoAddresses] = useState<CryptoAdress>({ btc: '', eth: '', usdt: '' });

  useEffect(() => {
    const walletRef = doc(db, 'wallets', 'crypto');
    onSnapshot(walletRef, (snap) => {
      if (snap.exists()) setCryptoAddresses(snap.data() as CryptoAdress);
    });
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => createNewDeposit(values),
  });

  const createNewDeposit = async (values: IFORMDATA) => {
    if (!document1) return toast.error('Please upload proof of payment');
    
    const body: IDeposit = {
      amount: +values.amount,
      asset: values.asset,
      proofOfPayment: document1 as any,
      userId: userData!._id,
      status: 'pending',
      type: 'deposit',
      currency: userData!.currency,
      date: Timestamp.now(),
      _id: '',
    } as IDeposit;

    try {
      setIsLoading(true);
      if (userData) {
        await UserService.sendDepositRequest(userData._id, body);
        toast.success('Deposit placed successfully!');
        // await UserService.sendEmail({
        //   subject: 'Deposit Received (Pending Approval)',
        //   to: userData.email,
        //   from: 'no-reply@capitalonlineventures.com',
        //   html: `<!DOCTYPE html><html><body><div style="font-family:Arial;max-width:600px;margin:auto;"><img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" style="max-width:150px;margin:20px auto;display:block;"><h2 style="text-align:center;color:#222;">Deposit Received</h2><p>Dear ${userData.fullname},</p><p>Your deposit of ${userData.currency}${(+values.amount).toLocaleString()} has been received and is pending approval.</p><div style="background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Amount:</strong> ${userData.currency}${(+values.amount).toLocaleString()}</p><p><strong>Asset:</strong> ${values.asset.toUpperCase()}</p><p><strong>Status:</strong> Pending</p><p><strong>Date:</strong> ${moment().format('MMM Do YYYY, h:mm a')}</p></div><p>We will notify you once this is processed.</p><p style="color:#888;font-size:12px;margin-top:30px;">Best regards, CAP VENTURES Team</p></div></body></html>`,
        // });
        setModal(false);
        formik.resetForm();
        setDocument1(null);
      }
    } catch (error) {
      toast.error('Error placing deposit');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) return null;

  return (
    <>
      <Meta title='Deposit - CAP VENTURES' />
      <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden'>
        {/* Animated background */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-300/5 via-transparent to-purple-300/5' />
          <div className='absolute top-20 left-10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl animate-pulse' />
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse' />
          <div className='absolute inset-0 opacity-5'>
            <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
              <defs><pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'><path d='M 40 0 L 0 0 0 40' fill='none' stroke='gray' strokeWidth='0.5' /></pattern></defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
            </svg>
          </div>
        </div>

        <div className='relative z-10 p-4 md:p-8'>
          <div className='max-w-6xl mx-auto'>
            {/* Header */}
            <div className='mb-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h1 className='text-4xl font-bold text-gray-900 mb-2'>Deposit Funds</h1>
                  <p className='text-gray-600'>Add funds to your investment account</p>
                </div>
                <Logo width={80} height={80} />
              </div>
            </div>

            {/* Balance Card */}
            <div className='rounded-3xl bg-white shadow-lg border border-gray-200 p-8 mb-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Available to Deposit</p>
                  <p className='text-gray-900 text-3xl font-bold'>{userData.currency}{userData.wallet.deposit.toLocaleString()}</p>
                </div>
                <div className='rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Total Deposits</p>
                  <p className='text-gray-900 text-3xl font-bold'>{userData.deposits?.length || 0}</p>
                </div>
                <div className='rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 border border-amber-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Pending Amount</p>
                  <p className='text-gray-900 text-3xl font-bold'>{userData.currency}0</p>
                </div>
              </div>
            </div>

            {/* Deposit Methods */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              {/* Crypto */}
              <button
                onClick={() => setModal(true)}
                className='group rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300 p-8'
              >
                <div className='flex items-center justify-between mb-0'>
                  <div>
                    <h3 className='text-gray-900 font-bold text-xl mb-2'>Deposit via Crypto</h3>
                    <p className='text-gray-600 text-sm mb-4'>Bitcoin, Ethereum, USDT</p>
                    <div className='flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-medium'>
                      <span>Start Deposit</span>
                      <svg className='w-4 h-4 transform group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </div>
                  </div>
                  <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all flex-shrink-0'>
                    ₿
                  </div>
                </div>
              </button>

              {/* Bank */}
              <button
                onClick={() => toast.success('Contact support@capitalonlineventures.com for bank deposit')}
                className='group rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-purple-400/50 transition-all duration-300 p-8'
              >
                <div className='flex items-center justify-between mb-0'>
                  <div>
                    <h3 className='text-gray-900 font-bold text-xl mb-2'>Deposit via Bank</h3>
                    <p className='text-gray-600 text-sm mb-4'>Local bank transfer</p>
                    <div className='flex items-center gap-2 text-purple-600 group-hover:text-purple-700 font-medium'>
                      <span>Contact Support</span>
                      <svg className='w-4 h-4 transform group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </div>
                  </div>
                  <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all flex-shrink-0'>
                    🏦
                  </div>
                </div>
              </button>
            </div>

            {/* Recent Deposits */}
            {userData?.deposits && userData.deposits.length > 0 ? (
              <TransactionHistory data={userData.deposits} />
            ) : (
              <div className='rounded-3xl bg-white border border-gray-200 shadow-lg p-12 text-center'>
                <ImFilesEmpty className='text-6xl text-gray-300 mx-auto mb-4 opacity-75' />
                <p className='text-gray-500 font-medium'>No deposits yet. Make your first deposit to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Deposit Modal */}
        <DrawerDialogDemo
          isOpen={modal}
          title='Deposit Cryptocurrency'
          handleOpenDrawerDialog={() => {
            setDocument1(null);
            formik.resetForm();
            setModal(false);
          }}
          theme='light'
          Component={
            <form onSubmit={formik.handleSubmit} className='space-y-6 flex flex-col pb-6'>
              {/* Asset Selection */}
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-900'>Select Cryptocurrency</label>
                <div className='grid grid-cols-3 gap-3'>
                  {['btc', 'eth', 'usdt'].map((key) => (
                    <button
                      key={key}
                      type='button'
                      onClick={() => formik.setFieldValue('asset', key)}
                      className={`p-4 rounded-2xl font-medium transition-all duration-200 flex flex-col items-center gap-2 border-2 ${
                        formik.values.asset === key
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-900'>Amount</label>
                <TextInput
                  type='number'
                  name='amount'
                  id='amount'
                  placeholder={`Enter amount in ${userData?.currency}`}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                  error={formik.errors.amount}
                />
              </div>

              {/* Wallet Address */}
              {formik.values.asset && (
                <div className='rounded-2xl bg-gray-50 border-2 border-gray-300 p-4'>
                  <p className='text-gray-900 text-sm mb-3 font-semibold'>Send to this address:</p>
                  <div className='bg-white p-3 rounded-xl border-2 border-gray-200 mb-3 break-all'>
                    <p className='text-gray-900 text-sm font-mono'>{cryptoAdresses[formik.values.asset as keyof CryptoAdress]}</p>
                  </div>
                  <Button
                    type='button'
                    color='primary_2'
                    size='small'
                    onClick={() => {
                      navigator.clipboard.writeText(cryptoAdresses[formik.values.asset as keyof CryptoAdress]);
                      toast.success('Address copied!');
                    }}
                    className='w-full'
                  >
                    <FaCopy className='mr-2' /> Copy Address
                  </Button>
                </div>
              )}

              {/* Upload Proof */}
              {formik.values.asset && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-gray-900'>Proof of Payment</label>
                  {document1 && (
                    <Image
                      alt='proof'
                      src={URL.createObjectURL(document1)}
                      width={200}
                      height={200}
                      className='rounded-2xl max-h-48 w-full object-cover border-2 border-gray-200'
                    />
                  )}
                  <TextInput
                    type='file'
                    name='proofOfPayment'
                    id='proofOfPayment'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) setDocument1(e.target.files[0]);
                    }}
                    className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                  />
                </div>
              )}

              <Button type='submit' loading={isLoading} color='primary_2' block className='w-full'>
                Complete Deposit
              </Button>
            </form>
          }
        />
      </div>
    </>
  );
}

export default Deposit;

