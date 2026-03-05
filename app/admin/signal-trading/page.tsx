'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import { UserService } from '@/services/user';
import generateUniqueCode from '@/utils/generateCode';
import clsx from 'clsx';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

type CodeType = 'win' | 'loss';

export interface MARKET {
  id?: string | number
  plan: string
}

const SignalTrading = () => {
  const [markets, setMarkets] = useState<MARKET[] | []>([]);
  const [codeType, setCodeType] = useState<CodeType>('win');
  const [market, setPercent] = useState('');
  const [timer, setTimer] = useState(5000);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ref = doc(db, 'markets', 'id');

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const MARKETS: MARKET[] = data.markets || []; // Ensure it's an array
        setMarkets(MARKETS);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  const validateInputs = () => {
    return (
      market.trim().length > 0
    );
  };

  const generateNewCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {


      const newMarket = {
        plan: market,
        id: crypto.randomUUID()
      };

      console.log(newMarket);

      try {
        toast.loading('Generating new market...');

        await UserService.updateMarket(newMarket);

        toast.dismiss();
        toast.success('Market generated.');
      } catch (error) {
        console.log(error);
        toast.error('Error generating market');
      }

      closeModal();
    } else {
      toast.error('One or more inputs are invalid.');
    }
  };


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className='text-white space-y-8'>
      <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2'>Market Plans</h2>
          <p className='text-gray-400 text-sm'>Manage and add available trading markets.</p>
        </div>

        <Button type='button' onClick={openModal} className='mt-4 md:mt-0 shadow-lg shadow-blue-500/20'>
          Add new Market
        </Button>
      </Card>

      {markets && markets.length > 0  ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {markets.map((code) => (
              <Card key={code.id} className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors group'>
                <div className='text-sm my-6'>
                  <div className='flex items-center gap-8 justify-between my-1'>
                    <p className='font-semibold text-gray-400 uppercase tracking-wider text-xs'>Market</p>
                    <p className='font-bold text-xl text-white'> {code.plan} </p>
                  </div>
                </div>

                <div className='flex justify-end mt-4'>
                  <Button
                    size='small'
                    onClick={() => {
                      window.navigator.clipboard
                        .writeText(code.plan)
                        .then(() => toast.success('Copied!'));
                    }}
                    variant='outlined'
                    className='border-white/20 text-white hover:bg-white/10 group-hover:border-blue-500/50 transition-all'
                  >
                    Copy
                  </Button>
                </div>
              </Card>
          ))}
        </div>
      ) : (
        <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
          <p className='text-2xl font-light p-12 text-center text-gray-400'>No Markets Available</p>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        handleClose={closeModal}
        title='Add Market'
      >
        <form onSubmit={generateNewCode}>
          {/* <div className='mb-4'>
            <label
              htmlFor='codeType'
              className='block text-sm text-gray-600 mb-2'
            >
              Select Code Type*
            </label>
            <select
              id='codeType'
              required
              value={codeType}
              onChange={(e) => setCodeType(e.target.value as CodeType)}
            >
              <option value='win'>Win</option>
              <option value='loss'>Loss</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='timer' className='block text-sm text-gray-600 mb-2'>
              Trading Duration*
            </label>
            <select
              id='timer'
              required
              value={timer}
              onChange={(e) => setTimer(+e.target.value)}
            >
              <option value={5000}>5 secs</option>
              <option value={10000}>10 secs</option>
              <option value={15000}>15 secs</option>
              <option value={20000}>20 secs</option>
            </select>
          </div> */}
          <div className='mb-4'>
            <label
              htmlFor='market'
              className='block text-sm text-gray-600 mb-2'
            >
              Add Market*
            </label>
            <TextInput
              type='text'
              id='market'
              placeholder='Add market'
              value={market}
              onChange={(e) => setPercent(e.target.value)}
              error={+market <= 0 ? 'Market field is required' : ''}
            />
          </div>


          <Button color='dark' rounded block type='submit'>
            Add Market
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default SignalTrading;
