'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import { db } from '@/config/firebase.config';
import clsx from 'clsx';
import { addDoc, collection, onSnapshot, Timestamp } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CODE {
  _id?: string;
  code: string;
  used: boolean;
  date: Date | Timestamp;
}

const WithdrawalCode = () => {
  const [codes, setCodes] = useState<CODE[] | []>([]);
  let isMounted = useRef(true);

  useEffect(() => {
    const ref = collection(db, 'withdrawalCode');

    const unsubscribe = onSnapshot(ref, (snap) => {
      const CODES: CODE[] = [];
      snap.forEach((doc) => {
        const data = { ...doc.data(), _id: String(doc.id) } as CODE;
        CODES.push(data);
      });

      setCodes(CODES);
    });

    return () => unsubscribe();
  }, []);

  const generateNewCode = async () => {
    const collectionRef = collection(db, 'withdrawalCode');

    const randomNumber = Math.floor(Math.random() * 999999 + 9999);

    const newCode = {
      code: randomNumber.toString(),
      date: new Date(),
      used: false,
    };

    try {
      toast.loading('Generating new code...');

      await addDoc(collectionRef, newCode);

      toast.dismiss();
      toast.success('Code generated.');
    } catch (error) {
      console.log(error);
      toast.error('Error generating code');
    }
  };

  const sortedCodes = useMemo(() => {
    return codes?.sort((a, b) => {
      return a.used === b.used ? 0 : a.used ? 1 : -1;
    });
  }, [codes]);

  return (
    <div className='min-h-screen text-white'>
      <div className='mt-8 max-w-7xl mx-auto'>
        <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2'>Withdrawal Codes</h2>
            <p className='text-sm text-gray-400 mt-1'>Generate and manage withdrawal codes for users.</p>
          </div>
          <Button type='button' onClick={generateNewCode} className='shadow-lg shadow-blue-500/20'>
            Generate New Code
          </Button>
        </Card>

          {codes && codes.length > 0 && sortedCodes ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {sortedCodes.map((code) => (
                <Card key={code.code} className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors group flex flex-col justify-between h-full'>
                  <div>
                    <span
                      className={clsx(
                        'inline-block text-[10px] font-bold tracking-wider uppercase p-1.5 px-3 rounded-md',
                        code.used ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      )}
                    >
                      {code.used ? 'Used' : 'Not Used'}
                    </span>
                    <p className='text-2xl font-mono font-bold tracking-widest my-6 text-white text-center shadow-sm'> {code.code} </p>
                  </div>

                  <div className='flex justify-center mt-auto w-full'>
                    <Button
                      size='small'
                      onClick={() => {
                        window.navigator.clipboard
                          .writeText(code.code)
                          .then(() => toast.success('Copied!'));
                      }}
                      variant='outlined'
                      className='w-full border-white/20 text-white hover:bg-white/10 group-hover:border-blue-500/50 transition-all text-xs font-semibold'
                      block
                    >
                      Copy Code
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
              <p className='text-2xl font-light p-12 text-center text-gray-400'> No withdrawal codes available </p>
            </Card>
          )}
      </div>
    </div>
  );
};

export default WithdrawalCode;
