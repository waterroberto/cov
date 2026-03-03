'use client';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
// import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
// import InvestmentPlans from '@/components/InvestmentPlans';
import TraderLevel from '@/components/Shared/TraderLevel';
// import TradingHistory from '@/components/Shared/TradingHistory';
import UserDataContext from '@/context/UserDataContext';
// import { InvestmentType } from '@/interface';
// import { investment_plans } from '@/static';
// import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import React, { useContext } from 'react';
import { TbChartCandle } from 'react-icons/tb';
import CapitalAndProfit from './components/CapitalAndProfit';
import Button from '@/components/Global/Button';
import TradingViewCommoditiesMarket from '@/components/Dashboard/Widgets/TradingViewCommoditiesMarket';



export default function TradingPage() {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      <TradingViewTicker />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <TraderLevel />
          <div className='my-8 flex flex-col items-center justify-center gap-2 text-neutral'>
            <span className='text-sm font-medium '>Investment Return</span>
            <p className='text-3xl font-bold'>
              {userData?.currency}
              {userData?.wallet.investment.toLocaleString()}
            </p>
          </div>

          <CapitalAndProfit />
          <Link href='/dashboard/trading/signal'>
            <Card>
              <div className='flex items-center flex-col justify-center gap-2'>
                <TbChartCandle className='text-5xl text-[#32E9DD]' />
                <p className='text-xl text-white'>Signal Trading</p>
              </div>
            </Card>
          </Link>
            <Card>
              <div className='flex items-center justify-center gap-2'>
                <div className=' gap-2 flex flex-col items-start'>
                <p className='text-xl text-primary'>Verify Account</p>
                <p className="text-primary text-sm">{`Once verified, you'll have access to advanced features, ensuring a secure experience.`}</p>
                </div>
                <Link href={`/dashboard/kyc`}>
                  <Button>Learn More</Button>
                </Link>
              </div>
            </Card>
        </Card>
        <div className=''>
          {/* <Card> */}
            <TradingViewCommoditiesMarket tab='commodities' />
          {/* </Card> */}
        </div>
      </div>
      {/* <div className='my-8'>
        <p className='mb-4 text-xl font-semibold text-white'>
          Investment Plans
        </p>

        <InvestmentPlans authenticated={true} />
      </div> */}
      {/* Investment History */}
      {/* <Card>
        <p className='mb-4 text-xl font-semibold text-gray-700'>
          My Investments
        </p>
        <TradingHistory data={investments} />
      </Card> */}
    </>
  );
}
