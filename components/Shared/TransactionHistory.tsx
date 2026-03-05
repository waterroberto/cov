'use client';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { ITransaction, TableHeadersProps, TransactionType } from '@/interface';
import { formatCurrency, formatDate } from '@/utils/utils';
import clsx from 'clsx';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { HiArrowDownLeft, HiArrowUpRight } from 'react-icons/hi2';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import Button from '../Global/Button';
import Modal from '../Global/Modal';
import Table from './Table';

export default function TransactionHistory({
  data,
  processTransaction,
}: {
  data: TransactionType[];
  processTransaction?: (
    type: string,
    status: string,
    id: string,
    amount: number
  ) => void;
}) {
  const { userData } = useContext(UserDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] =
    useState<ITransaction | null>(null);

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setActiveTransaction(null);
  }

  const tableHeaders: TableHeadersProps[] = [
    {
      title: 'Transaction Type',
      field: 'type',
      body: (data: TransactionType) => {
        const isDeposit = data.type === 'deposit';
        return (
          <span
            className={clsx(
              'capitalize text-xs font-semibold py-2 px-3 rounded-lg inline-flex items-center gap-2 transition-colors',
              isDeposit
                ? 'bg-green-100 text-green-700 border border-green-200/50'
                : 'bg-orange-100 text-orange-700 border border-orange-200/50'
            )}
          >
            {isDeposit ? (
              <HiArrowDownLeft className='text-sm' />
            ) : (
              <HiArrowUpRight className='text-sm' />
            )}
            {data.type}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      field: 'amount',
      body: (data: TransactionType) => {
        return (
          <div className='font-semibold text-gray-200'>
            {data.currency}
            {data.amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      title: 'Status',
      field: 'status',
      body: (data: TransactionType) => {
        const isApproved = data.status === 'approved';
        const isPending = data.status === 'pending';
        const isDeclined = data.status === 'declined';

        return (
          <div className='flex items-center gap-2'>
            {isApproved && <FaCheckCircle className='text-green-500 text-sm' />}
            {isPending && <FaClock className='text-amber-500 text-sm' />}
            {isDeclined && <FaTimesCircle className='text-red-500 text-sm' />}
            <span
              className={clsx(
                'font-semibold text-xs uppercase',
                isApproved && 'text-green-600',
                isPending && 'text-amber-600',
                isDeclined && 'text-red-600'
              )}
            >
              {data.status}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Date',
      field: 'date',
      body: (data: TransactionType) => {
        return (
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <span className='text-gray-200 text-sm'>
              {moment(data?.date?.seconds * 1000).format('MMM Do YYYY')}
            </span>
            <Button
              size='small'
              variant='outlined'
              color='tertiary'
              rounded
              onClick={() => {
                openModal();
                setActiveTransaction(data);
              }}
              className='text-xs'
            >
              View Details
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {activeTransaction && modalOpen && (
        <Modal
          isOpen={modalOpen}
          title='Transaction Details'
          closeButton
          handleClose={closeModal}
        >
          {/* Transaction Type */}
          <div className='flex items-center justify-between py-4 px-4 rounded-lg bg-blue-50/50 border border-blue-100/50 mb-4'>
            <p className='text-gray-700 font-semibold text-sm'>Transaction Type</p>
            <span
              className={clsx(
                'capitalize text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-2',
                activeTransaction.type === 'deposit'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              )}
            >
              {activeTransaction.type === 'deposit' ? (
                <HiArrowDownLeft />
              ) : (
                <HiArrowUpRight />
              )}
              {activeTransaction.type}
            </span>
          </div>

          {/* Transaction ID */}
          <div className='flex items-center justify-between py-4 px-4 rounded-lg bg-gray-50/50 border border-gray-100/50 mb-4'>
            <p className='text-gray-700 font-semibold text-sm'>Transaction ID</p>
            <code className='text-xs font-mono text-gray-600 bg-white px-2 py-1 rounded border border-gray-200'>
              {activeTransaction._id}
            </code>
          </div>

          {/* Amount */}
          <div className='flex items-center justify-between py-4 px-4 rounded-lg bg-purple-50/50 border border-purple-100/50 mb-4'>
            <p className='text-gray-700 font-semibold text-sm'>Amount</p>
            <p className='text-lg md:text-xl font-bold text-purple-700'>
              {activeTransaction?.currency}
              {activeTransaction?.amount.toLocaleString()}
            </p>
          </div>

          {/* Status */}
          <div className='flex items-center justify-between py-4 px-4 rounded-lg bg-gray-50/50 border border-gray-100/50 mb-4'>
            <p className='text-gray-700 font-semibold text-sm'>Status</p>
            <div className='flex items-center gap-2'>
              {activeTransaction?.status === 'approved' && (
                <FaCheckCircle className='text-green-500' />
              )}
              {activeTransaction?.status === 'pending' && (
                <FaClock className='text-amber-500' />
              )}
              {activeTransaction?.status === 'declined' && (
                <FaTimesCircle className='text-red-500' />
              )}
              <span
                className={clsx(
                  'capitalize font-semibold text-sm',
                  activeTransaction?.status === 'approved' && 'text-green-700',
                  activeTransaction?.status === 'pending' && 'text-amber-700',
                  activeTransaction?.status === 'declined' && 'text-red-700'
                )}
              >
                {activeTransaction?.status}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className='flex items-center justify-between py-4 px-4 rounded-lg bg-blue-50/50 border border-blue-100/50 mb-6'>
            <p className='text-gray-700 font-semibold text-sm'>Date & Time</p>
            <p className='text-sm text-gray-700 font-medium'>
              {moment(activeTransaction.date.seconds * 1000).format(
                'MMM Do YYYY, h:mm a'
              )}
            </p>
          </div>

          {/* Proof of Payment */}
          {activeTransaction.type === 'deposit' && (activeTransaction as any).proofOfPayment && (
            <div className='flex flex-col py-4 px-4 rounded-lg bg-gray-50/50 border border-gray-100/50 mb-6'>
              <div className='flex items-center justify-between mb-4'>
                <p className='text-gray-700 font-semibold text-sm'>Proof of Payment</p>
                <a 
                  href={typeof (activeTransaction as any).proofOfPayment === 'string' ? (activeTransaction as any).proofOfPayment : URL.createObjectURL((activeTransaction as any).proofOfPayment as File)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                >
                  Open Full Image
                </a>
              </div>
              <div className='mt-2 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center p-2'>
                <img
                  src={typeof (activeTransaction as any).proofOfPayment === 'string' ? (activeTransaction as any).proofOfPayment : URL.createObjectURL((activeTransaction as any).proofOfPayment as File)}
                  alt="Proof of Payment"
                  className='max-w-full h-auto object-contain max-h-[300px] rounded-lg shadow-sm'
                />
              </div>
            </div>
          )}

          {/* Admin Actions */}
          {userData?.isAdmin && activeTransaction && (
            <div className='mt-8 pt-6 border-t border-gray-200/60'>
              <p className='text-gray-700 font-semibold text-sm mb-4'>Admin Actions</p>
              {activeTransaction.status !== 'pending' && (
                <p className='text-gray-600 text-sm italic'>No actions available for this transaction.</p>
              )}
              {activeTransaction.status === 'pending' && (
                <div className='flex gap-3 flex-wrap sm:flex-nowrap'>
                  <Button
                    color='success'
                    onClick={() => {
                      if (processTransaction) {
                        processTransaction(
                          activeTransaction.type,
                          'approved',
                          activeTransaction?._id,
                          activeTransaction?.amount
                        );
                        closeModal();
                      }
                    }}
                    className='flex-1'
                  >
                    ✓ Approve
                  </Button>
                  <Button
                    color='danger'
                    onClick={() => {
                      if (processTransaction) {
                        processTransaction(
                          activeTransaction.type,
                          'declined',
                          activeTransaction._id,
                          activeTransaction.amount
                        );
                        closeModal();
                      }
                    }}
                    className='flex-1'
                  >
                    ✕ Decline
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
      <Table headers={tableHeaders} data={data} />
    </div>
  );
}
