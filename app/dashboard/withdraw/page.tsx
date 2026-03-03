'use client';
import { DrawerDialogDemo } from '@/components/chad/DrawerDialogue';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import Meta from '@/components/Global/Meta';
import TextInput from '@/components/Global/TextInput';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { IWITHDRAWAL } from '@/interface';
import { UserService } from '@/services/user';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { ImFilesEmpty } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';

type WithdrawalAssetType = 'withdraw';

const PAYMENT_METHODS = {
  bank: { label: 'Bank Transfer', icon: '🏦', color: 'from-blue-500 to-blue-600' },
  skrill: { label: 'Skrill', icon: '💳', color: 'from-purple-500 to-purple-600' },
  paypal: { label: 'PayPal', icon: '🅿️', color: 'from-blue-600 to-blue-700' },
  binance: { label: 'Binance', icon: '₿', color: 'from-yellow-500 to-yellow-600' },
  cashapp: { label: 'Cash App', icon: '$', color: 'from-green-500 to-green-600' },
  bitcoin: { label: 'Bitcoin', icon: '₿', color: 'from-orange-500 to-orange-600' },
};

function Withdraw() {
  const { userData } = useContext(UserDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [email, setEmail] = useState('');
  const [binanceId, setBinanceId] = useState('');
  const [bitcoin, setBitcoin] = useState('');
  const [cashapp, setCashapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateFormInputs = () => amount.trim().length > 0 && +amount > 0 && paymentMethod.trim().length > 0;

  const placeWithdrawal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateFormInputs() || !userData) {
      toast.error('Please provide valid details');
      return;
    }

    if (+amount > userData.wallet.withdraw) {
      toast.error('Insufficient withdrawal balance');
      return;
    }

    try {
      setIsLoading(true);
      toast.loading('Processing withdrawal...');

      const data: IWITHDRAWAL = {
        _id: uuidv4(),
        userId: userData._id,
        status: 'pending',
        type: 'withdraw',
        amount: +amount,
        paymentMethod,
        asset: 'withdraw',
        date: Timestamp.now(),
        bankName,
        accountNumber,
        accountHolder,
        email,
        binanceId,
        bitcoin,
        cashapp,
        currency: userData.currency,
      };

      await UserService.sendWithdrawalRequest(userData._id, data);
      
      const userRef = doc(db, 'users', userData._id);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const currentWallet = userSnap.data().wallet;
        await updateDoc(userRef, {
          wallet: { ...currentWallet, withdraw: currentWallet.withdraw - +amount },
        });
      }

      toast.dismiss();
      toast.success('Withdrawal request submitted!');

      // await UserService.sendEmail({
      //   subject: 'Withdrawal Request Received (Pending Approval)',
      //   to: userData.email,
      //   from: 'no-reply@capitalonlineventures.com',
      //   html: `<!DOCTYPE html><html><body><div style="font-family:Arial;max-width:600px;margin:auto;"><img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" style="max-width:150px;margin:20px auto;display:block;"><h2 style="text-align:center;color:#222;">Withdrawal Request Received</h2><p>Dear ${userData.fullname},</p><p>Your withdrawal request of ${userData.currency}${(+amount).toLocaleString()} has been received.</p><div style="background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Amount:</strong> ${userData.currency}${(+amount).toLocaleString()}</p><p><strong>Method:</strong> ${PAYMENT_METHODS[paymentMethod as keyof typeof PAYMENT_METHODS]?.label || paymentMethod}</p><p><strong>Status:</strong> Pending Approval</p><p><strong>Date:</strong> ${moment().format('MMM Do YYYY, h:mm a')}</p></div><p>We will process this within 24-48 hours.</p><p style="color:#888;font-size:12px;margin-top:30px;">Best regards, CAP VENTURES Team</p></div></body></html>`,
      // });

      setModalOpen(false);
      setAmount('');
      setPaymentMethod('bank');
      setBankName('');
      setAccountNumber('');
      setAccountHolder('');
      setEmail('');
      setBinanceId('');
      setBitcoin('');
      setCashapp('');
    } catch (error) {
      toast.dismiss();
      toast.error('Error processing withdrawal');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) return null;

  return (
    <>
      <Meta title='Withdraw - CAP VENTURES' />
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
                  <h1 className='text-4xl font-bold text-gray-900 mb-2'>Withdraw Funds</h1>
                  <p className='text-gray-600'>Request your earnings and profits</p>
                </div>
                <Logo width={80} height={80} />
              </div>
            </div>

            {/* Balance Card */}
            <div className='rounded-3xl bg-white shadow-lg border border-gray-200 p-8 mb-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Available to Withdraw</p>
                  <p className='text-3xl font-bold text-green-600'>{userData.currency}{userData.wallet.withdraw.toLocaleString()}</p>
                </div>
                <div className='rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Total Withdrawals</p>
                  <p className='text-3xl font-bold text-blue-600'>{userData.withdrawals?.length || 0}</p>
                </div>
                <div className='rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 border border-amber-200/50'>
                  <p className='text-gray-700 text-sm mb-2 font-medium'>Processing Time</p>
                  <p className='text-3xl font-bold text-amber-600'>24-48h</p>
                </div>
              </div>
            </div>

            {/* Withdrawal Button */}
            <div className='mb-8'>
              <Button
                type='button'
                onClick={() => setModalOpen(true)}
                color='primary_2'
                block
                className='h-14 text-lg font-semibold'
              >
                + Request Withdrawal
              </Button>
            </div>

            {/* Recent Withdrawals */}
            {userData?.withdrawals && userData.withdrawals.length > 0 ? (
              <TransactionHistory data={userData.withdrawals} />
            ) : (
              <div className='rounded-3xl bg-white border border-gray-200 shadow-lg p-12 text-center'>
                <ImFilesEmpty className='text-6xl text-gray-300 mx-auto mb-4 opacity-75' />
                <p className='text-gray-500 font-medium'>No withdrawals yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Withdrawal Modal */}
        <DrawerDialogDemo
          isOpen={modalOpen}
          title='Request Withdrawal'
          handleOpenDrawerDialog={() => setModalOpen(false)}
          theme='light'
          Component={
            <form onSubmit={placeWithdrawal} className='space-y-6 flex flex-col pb-6'>
              {/* Payment Method Selection */}
              <div className='flex flex-col gap-3'>
                <label className='font-semibold text-gray-900'>Payment Method</label>
                <div className='grid grid-cols-2 gap-3'>
                  {Object.entries(PAYMENT_METHODS).map(([key, value]) => (
                    <button
                      key={key}
                      type='button'
                      onClick={() => setPaymentMethod(key)}
                      className={`p-3 rounded-2xl font-medium transition-all duration-200 text-sm border-2 ${
                        paymentMethod === key
                          ? `bg-gradient-to-r ${value.color} text-white shadow-lg border-transparent`
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <span className='text-lg'>{value.icon}</span> {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-900'>Withdrawal Amount</label>
                <TextInput
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Max: ${userData?.currency}${userData?.wallet.withdraw.toLocaleString()}`}
                  className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                />
              </div>

              {/* Account Holder */}
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-900'>Account Holder Name</label>
                <TextInput
                  type='text'
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder='Full name'
                  className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                  required
                />
              </div>

              {/* Conditional Fields */}
              {paymentMethod === 'bank' && (
                <>
                  <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-900'>Bank Name</label>
                    <TextInput
                      type='text'
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder='Bank name'
                      className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-900'>Account Number</label>
                    <TextInput
                      type='text'
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder='Account number'
                      className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                      required
                    />
                  </div>
                </>
              )}

              {paymentMethod !== 'bank' && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-gray-900'>Email Address</label>
                  <TextInput
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                    required
                  />
                </div>
              )}

              {paymentMethod === 'cashapp' && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-gray-900'>Cash App Tag</label>
                  <TextInput
                    type='text'
                    value={cashapp}
                    onChange={(e) => setCashapp(e.target.value)}
                    placeholder='$cashtag'
                    className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                    required
                  />
                </div>
              )}

              {paymentMethod === 'bitcoin' && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-gray-900'>Bitcoin Address</label>
                  <TextInput
                    type='text'
                    value={bitcoin}
                    onChange={(e) => setBitcoin(e.target.value)}
                    placeholder='1A1z7agoat...'
                    className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                    required
                  />
                </div>
              )}

              {paymentMethod === 'binance' && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-gray-900'>Binance ID</label>
                  <TextInput
                    type='text'
                    value={binanceId}
                    onChange={(e) => setBinanceId(e.target.value)}
                    placeholder='Your Binance ID'
                    className='px-4 py-3 outline-none border-2 border-gray-300 w-full rounded-2xl text-gray-900 bg-white placeholder-gray-400 focus:border-blue-500 focus:shadow-md'
                    required
                  />
                </div>
              )}

              {/* Info Alert */}
              <div className='rounded-2xl bg-blue-50 border-2 border-blue-200 p-4'>
                <p className='text-blue-900 text-sm font-medium'>
                  ℹ️ Withdrawals are processed within 24-48 hours. You'll receive an email confirmation.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 w-full'>
                <Button type='submit' loading={isLoading} color='primary_2' block className='w-full'>
                  Confirm Withdrawal
                </Button>
                <Button type='button' color='danger' onClick={() => setModalOpen(false)} block className='w-full'>
                  Cancel
                </Button>
              </div>
            </form>
          }
        />
      </div>
    </>
  );
}

export default Withdraw;
