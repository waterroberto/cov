'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Loader from '@/components/Global/Loader';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import { TransactionType, UserDataType, Wallet } from '@/interface';
import { UserService } from '@/services/user';
import { plans } from '@/static/currencies';
import { dateTemplate, formatDate } from '@/utils/utils';
import emailjs from '@emailjs/browser';
import {
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { PlaneTakeoff, User2 } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState,useMemo } from 'react';
import toast from 'react-hot-toast';
import { CiCalendarDate, CiLock, CiMail, CiUser } from 'react-icons/ci';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { SlPhone } from 'react-icons/sl';

const UserDetails = () => {
  const router = useRouter();
  const params = useParams();

  const [amount, setAmount] = useState('');
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [modal5Open, setModal5Open] = useState(false);
  const [modal6Open, setModal6Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceType, setBalanceType] = useState('deposit');
  const [markets, setMarkets] = useState<any>(plans)
  const [plan, setPlan] = useState("")

  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setIsLoading(true);
    let unsub = () => {};
    if (params.user_id) {
      try {
        const ref = doc(db, 'users', params.user_id as string);
        unsub = onSnapshot(ref, (doc) => {
          setUserData(doc.data() as UserDataType);
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error('Error fetching user data');
      }

      return () => {
        unsub();
      };
    }
  }, [params.user_id]);


    useEffect(() => {
      const fetchMarket = async () => {
        const markets = await UserService.fetchMarkets()
        if(markets){
          setMarkets(markets)
        }
      }
      // UserService.updateMarkets([...plans.map((p) => ({plan: p.plan, id: crypto.randomUUID()}))])
      fetchMarket()
    }, [])


  const transactions = useMemo(() => {
    const deposits = userData?.deposits ?? []
    const withdrawals = userData?.withdrawals ?? userData?.widthdrawals ?? []

    return [...deposits, ...withdrawals]

  }, [userData?.deposits, userData?.withdrawals, userData?.widthdrawals])  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: '',
      type: 'deposit',
      amount: +amount,
      method: 'bank',
      date: Timestamp.now(),
      status: 'approved',
      currency: userData?.currency ?? '$',
    };

    if (+amount > 0) {
      if (userData) {
        toast.loading('Setting balance...');

        const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);
        const user = (await getDoc(ref)).data() as UserDataType;
        const balanceTypes: Wallet =  {
          bonus: 0,
          deposit: 0,
          withdraw: 0,
          referral: 0,
          profit: 0,
          investment: 0
        }
        console.log(user.wallet, "wallet")
        // const userWallet = user?.wallet ? user?.wallet : balanceTypes
        const userWallet = (user?.wallet || balanceTypes);

        console.log(userWallet)
        // const previousBalance = user.wallet ? user?.wallet[balanceType] : balanceTypes[balanceType]
        const previousBalance = user?.wallet?.[balanceType] ?? balanceTypes[balanceType];

        console.log(previousBalance)
        // const isFaultyBalance = Number.isNaN(previousBalance) ? +amount : previousBalance + +amount
        const isFaultyBalance = isNaN(previousBalance) ? Number(amount) : Number(previousBalance) + Number(amount);

        await updateDoc(ref, {
          wallet: {
            ...userWallet,
            [balanceType]: isFaultyBalance,
          },
        })
          .then(() => {
            if(balanceType !== "deposit")  {
            toast.dismiss();
            toast.success(`Account top up succesfully.`);
            setModalOpen(false);
            return
            }
            UserService.sendDepositRequest(userData?._id ? userData?._id : userData?.id, data as any, "admin").then(
              async() => {
                toast.dismiss();
                toast.success(`Account top up succesfully.`);

               await UserService.sendEmail({
                  subject: "HMAgrivest Investment - Transaction Notification",
                  to: userData.email,
                  from: "no-reply@capitalonlineventures.com",
                  html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Transaction Alert - HMAgrivest Investment</title>
                      <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                        .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                        .logo { text-align: center; margin-bottom: 20px; }
                        .logo img { max-width: 150px; }
                        .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                        .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                        .highlight { font-weight: bold; color: #28a745; }
                        .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                        .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                        .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        
                        <!-- LOGO SECTION -->
                        <div class="logo">
                          <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                        </div>

                        <h2 class="heading">Transaction Alert</h2>

                        <p class="text">Dear <span class="highlight">${userData.fullname}</span>,</p>
                        
                        <p class="text">This is to inform you that a transaction has occurred on your account with HMAgrivest Investment.</p>
                        
                        <!-- TRANSACTION DETAILS BOX -->
                        <div class="transaction-box">
                          <p><strong>Account Name:</strong> ${userData.fullname}</p>
                          <p><strong>Transaction Type:</strong> <span class="highlight">CREDIT ALERT</span></p>
                          <p><strong>Transaction Amount:</strong> ${userData.currency} ${(+amount).toLocaleString()}</p>
                          <p><strong>Current Balance:</strong> ${userData.currency} ${(
                        previousBalance + +amount
                      ).toLocaleString()}</p>
                          <p><strong>Date:</strong> ${moment().format(
                        'MMM Do YYYY, h:mm a'
                      )}</p>
                        </div>

                        <p class="text">You can log in to your account to view more details.</p>

                        <!-- CALL TO ACTION BUTTON -->
                        <div style="text-align: center;">
                          <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                        </div>

                        <hr />
                        
                        <p class="footer">
                          Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                        </p>
                        <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                      </div>
                    </body>
                    </html>


                    
                  `
                })

              }
            );
            toast.dismiss();
            toast.success(`Account top up succesfully.`);
            setModalOpen(false);
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });
      }

      setAmount('');
    } else toast.error('Amount must be more than 0.00');
  };

  const handleSetWithdrawLimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (+amount > 0) {
      if (userData) {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);

        await updateDoc(ref, {
          withdrawLimit: +amount,
        })
          .then(() => {
            toast.dismiss();
            toast.success(`Succesful.`);
            setModal4Open(false);

            setAmount('');
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });

        setAmount('');
      }
    } else toast.error('Amount must be more than 0.00');
  };

  const handleUpdateUserPlan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (plan) {
      if (userData) {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);

        await updateDoc(ref, {
          selectedPlan: plan,
        })
          .then(() => {
            toast.dismiss();
            toast.success(`Succesful.`);
            setModal6Open(false);

            setAmount('');
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });

        setAmount('');
      }
    } else toast.error('plan cannot be empty');
  };

  const handleClick = async () => {
    try {
      toast.loading('Deleting user...');
      const res = await fetch('/api/firebase-admin', {
        method: 'POST',
        body: JSON.stringify({ uid: userData?._id ? userData?._id : userData?.id }),
      });

      toast.dismiss();
      toast.success('User deleted successfully');
      router.replace('/admin');
    } catch (error) {
      toast.success('Error deleting user');
      console.error('Error fetching data:', error);
    }
  };

  const handleProcessKyc = async (status: boolean) => {
    if (userData) {
      toast.loading('Loading...');

      const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);

      const _name = userData?.fullName ? userData?.fullName : userData?.firstName + " " + userData?.lastName ;
      await updateDoc(ref, {
        kyc_approved: status,
        kyc_pending: false,
        isVerified: status,
      })
        .then(async() => {
          if(status === true){
               await UserService.sendEmail({
                  subject: "HMAgrivest Investment - KYC Verification",
                  to: userData.email,
                  // from: "no-reply@capitalonlineventures.com",
                  html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>KYC Verification Successful ${status}</title>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          padding: 20px;
                          margin: 0;
                        }
                        .container {
                          background-color: #ffffff;
                          padding: 30px;
                          border-radius: 8px;
                          width: 90%;
                          max-width: 600px;
                          margin: auto;
                          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                          text-align: center;
                        }
                        .logo img {
                          max-width: 150px;
                        }
                        .banner {
                          background-color: #28a745;
                          color: white;
                          padding: 15px;
                          font-size: 22px;
                          font-weight: bold;
                          border-radius: 8px 8px 0 0;
                        }
                        .content {
                          padding: 20px;
                          text-align: left;
                        }
                        .content h2 {
                          color: #222;
                          font-size: 24px;
                        }
                        .text {
                          font-size: 16px;
                          color: #444;
                          line-height: 1.6;
                          margin-bottom: 15px;
                        }
                        .highlight {
                          font-weight: bold;
                          color: #28a745;
                        }
                        .cta-btn {
                          display: inline-block;
                          background-color: #007bff;
                          color: #fff;
                          padding: 12px 20px;
                          text-decoration: none;
                          border-radius: 5px;
                          font-size: 16px;
                          font-weight: bold;
                          margin-top: 15px;
                        }
                        .cta-btn:hover {
                          background-color: #0056b3;
                        }
                        .footer {
                          font-size: 14px;
                          color: #888;
                          margin-top: 20px;
                          text-align: center;
                          border-top: 1px solid #ddd;
                          padding-top: 15px;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        
                        <!-- BANNER -->
                        <div class="banner">
                          🎉 Congratulations! Your KYC is Approved
                        </div>

                        <!-- LOGO SECTION -->
                        <div class="logo">
                          <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                        </div>

                        <!-- CONTENT SECTION -->
                        <div class="content">
                          <h2>Welcome, ${userData.fullname}!</h2>
                          <p class="text">We are pleased to inform you that your <strong>KYC verification</strong> has been successfully approved! ✅</p>
                          <p class="text">This means you now have full access to all the features and benefits of <span class="highlight">HMAgrivest Investment</span>. You can now securely invest in various financial opportunities with confidence.</p>
                          <p class="text">Start exploring our platform today and make the most of your investment journey.</p>

                          <div style="text-align: center;">
                            <a href="https://capitalonlineventures.com/dashboard" class="cta-btn">Access Your Account</a>
                          </div>
                        </div>

                        <!-- FOOTER -->
                        <p class="footer">
                          If you have any questions or need assistance, please do not hesitate to contact our support  team. Thank you for understanding and cooperation.
                          <br><br>  
                          Best regards,  
                          <br>  
                          <strong>The HMAgrivest Team</strong>  
                        </p>

                      </div>
                    </body>
                    </html>

                    
                  `
                })
              }else {
              await UserService.sendEmail({
                  subject: "HMAgrivest Investment - KYC Verification",
                  to: userData.email,
                  // from: "no-reply@capitalonlineventures.com",
                  html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>KYC Verification Status</title>
                    <style>
                      body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                      .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                      .logo { text-align: center; margin-bottom: 20px; }
                      .logo img { max-width: 150px; }
                      .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                      .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                      .highlight { font-weight: bold; color: #28a745; }
                      .error { font-weight: bold; color: #d9534f; }
                      .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                      .btn { background-color: #007bff; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                      .btn-danger { background-color: #d9534f; }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      
                      <!-- LOGO SECTION -->
                      <div class="logo">
                        <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                      </div>

                      <!-- REJECTED MESSAGE -->
                      <div id="rejected-message" style="display: none;">
                        <h2 class="heading error">❌ KYC Verification Unsuccessful</h2>
                        <p class="text">Dear <span class="highlight">${userData.fullname}</span>,</p>
                        <p class="text">Thank you for submitting your KYC documents. Unfortunately, after a thorough review, we were unable to verify your information.</p>
                        <p class="text">Please ensure:</p>
                        <ul class="text">
                          <li>Your documents are clear and valid.</li>
                          <li>Your details match your registered information.</li>
                          <li>Any requested additional documents are submitted.</li>
                        </ul>
                        <p class="text">For assistance, please contact our <a href="mailto:support@capitalonlineventures.com">support team</a>.</p>

                      </div>

                      <hr />

                      <p class="footer">Best regards,<br />The HMAgrivest Team</p>
                    </div>
                  </body>
                  </html>
                  `
                })

           }
 
          toast.dismiss();
          toast.success(`Succesful.`);
        })
        .catch((err) => {
          toast.error('Error performing this action');
          console.log(err);
        });
    }
  };

  const debitUserAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: '',
      type: 'withdraw',
      amount: +amount,
      status: 'approved',
      method: '',
      asset: '',
      date: Timestamp.now(),
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      currency: userData?.currency ?? '$',
    };

    if (+amount > 0) {
      if (userData) {
        toast.loading('Debiting account...');

        

        const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);
        const user = (await getDoc(ref)).data() as UserDataType;
        const balanceTypes: Wallet =  {
          bonus: 0,
          deposit: 0,
          withdraw: 0,
          referral: 0,
          profit: 0,
          investment: 0
        }
        console.log(user.wallet, "wallet")
        // const userWallet = user?.wallet ? user?.wallet : balanceTypes
        const userWallet = (user?.wallet || balanceTypes);

        console.log(userWallet)
        // const previousBalance = user.wallet ? user?.wallet[balanceType] : balanceTypes[balanceType]
        const previousBalance = user?.wallet?.[balanceType] ?? balanceTypes[balanceType];

        console.log(previousBalance)
        // const isFaultyBalance = Number.isNaN(previousBalance) ? +amount : previousBalance + +amount
        const isFaultyBalance = isNaN(previousBalance) ? Number(amount) : Number(previousBalance) - Number(amount);
        // before

        await updateDoc(ref, {
          wallet: {
            ...userWallet,
            [balanceType]: isFaultyBalance,
          },
        })
          .then(() => {
            if(balanceType !== "withdraw") {
              toast.dismiss();
              toast.success(`Account debited succesfully.`);
              setModal5Open(false);
             return
            }
            UserService.sendWithdrawalRequest(userData?._id ? userData?._id : userData?.id, data as any).then(
              async() => {
                toast.dismiss();
                toast.success(`Account debited succesfully.`);
                setModal5Open(false);
                await UserService.sendEmail({
                  subject: "HMAgrivest Investment - Transaction Notification",
                  to: userData.email,
                  from: "no-reply@capitalonlineventures.com",
                  html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Transaction Alert - HMAgrivest Investment</title>
                      <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                        .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                        .logo { text-align: center; margin-bottom: 20px; }
                        .logo img { max-width: 150px; }
                        .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                        .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                        .highlight { font-weight: bold; color: #28a745; }
                        .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                        .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                        .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        
                        <!-- LOGO SECTION -->
                        <div class="logo">
                          <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                        </div>

                        <h2 class="heading">Transaction Alert</h2>

                        <p class="text">Dear <span class="highlight">${userData.fullname}</span>,</p>
                        
                        <p class="text">This is to inform you that a transaction has occurred on your account with HMAgrivest Investment.</p>
                        
                        <!-- TRANSACTION DETAILS BOX -->
                        <div class="transaction-box">
                          <p><strong>Account Name:</strong> ${userData.fullname}</p>
                          <p><strong>Transaction Type:</strong> <span class="highlight">DEBIT ALERT</span></p>
                          <p><strong>Transaction Amount:</strong> ${userData.currency} ${(+amount).toLocaleString()}</p>
                          <p><strong>Current Balance:</strong> ${userData.currency} ${(
                        previousBalance - +amount
                      ).toLocaleString()}</p>
                          <p><strong>Date:</strong> ${moment().format(
                        'MMM Do YYYY, h:mm a'
                      )}</p>
                        </div>

                        <p class="text">You can log in to your account to view more details.</p>

                        <!-- CALL TO ACTION BUTTON -->
                        <div style="text-align: center;">
                          <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                        </div>

                        <hr />
                        
                        <p class="footer">
                          Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                        </p>
                        <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                      </div>
                    </body>
                    </html>


                    
                  `
                })
              }
            );
            toast.dismiss();
            toast.success(`Account debited succesfully.`);
            setModal5Open(false);
        })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });
      }

      setAmount('');
    } else toast.error('Amount must be more than 0.00');
  };

  const setUserBlockedStatus = async () => {
    if (userData) {
      try {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id ? userData?._id : userData?.id);
        const data = (await getDoc(ref)).data();

        const isBlocked = data?.isBlocked ?? false;

        console.log('Blocked: ', isBlocked);

        await updateDoc(ref, {
          isBlocked: !isBlocked,
        }).then(() => {
          toast.dismiss();
          toast.success('Completed.');
        });
      } catch (error) {
        toast.error('Something went wrong.');
      }
    }
  };

  const processTransaction = async (
    type: string,
    status: string,
    id: string,
    amount: number
  ) => {
    const collectionType =
      type === 'deposit' ? 'depositRequests' : 'withdrawalRequests';

    if (userData) {
      toast.loading('Updating transaction...');

      const ref = doc(db, collectionType, id);

      const userRef = doc(db, 'users', userData?._id ? userData?._id : userData?.id);

      await getDoc(ref)
        .then(() => {
          getDoc(userRef)
            .then((res) => {
              if (res.exists() && res.data()) {
                const index = type === 'deposit' ? 'deposits' : 'withdrawals';

                const trxns = res?.data()[index];
                const userWallet = res?.data().wallet
                const filtered = trxns.filter(
                  (trx: TransactionType) => trx._id !== id
                );

                const current = trxns.find(
                  (trx: TransactionType) => trx._id === id
                );
                const updated = { ...current, status };

                const docRef = doc(db, collectionType, id);

                toast.dismiss();
                toast.success('Successful');
                let updatedBalance
                if(status === "approved" && index === "deposits") {
                  const oldDepositBalnce = userWallet.deposit
                  updatedBalance = oldDepositBalnce + +amount
                  userWallet.deposit = updatedBalance
                }else if(status === "decline" && index === "withdrawals") {
                  const oldWithdrawalBalance = userWallet.withdraw
                  updatedBalance  = oldWithdrawalBalance + +amount
                  userWallet.withdraw = updatedBalance
                }
                console.log(userWallet, "after update")

                updateDoc(userRef, {
                  [index]: [...filtered, updated],
                  wallet: {...userWallet}
                  
                  
                  // depositBalance:
                  //   status === 'declined'
                  //     ? res.data().depositBalance + amount
                  //     : res.data().depositBalance,
                })
                  .then(() => {
                    updateDoc(docRef, {
                      status,
                    })
                      .then(() => {
                        toast.dismiss();
                        toast.success('Successful');

                        if (status === 'approved') {
                          if (type === 'deposit') {
                            UserService.sendEmail({
                              subject: 'Deposit Request Approved',
                              to: userData.email,
                              from: 'no-reply@capitalonlineventures.com',
                              html: `                             
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>Transaction Alert - HMAgrivest Investment</title>
                                <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                                  .logo { text-align: center; margin-bottom: 20px; }
                                  .logo img { max-width: 150px; }
                                  .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                                  .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                                  .highlight { font-weight: bold; color: #28a745; }
                                  .status-h {font-weight: bold; color: #ff6900;}
                                  .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                                  .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                                  .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                                </style>
                                </head>
                                <body>
                                <div class="container">
                                
                                <!-- LOGO SECTION -->
                                <div class="logo">
                                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                                </div>
                                
                                <h2 class="heading">Transaction Alert</h2>
                                
                                <p class="text">Dear <span class="highlight">${userData?.fullname}</span>,</p>
                                
                                
                                <!-- TRANSACTION DETAILS BOX -->
                                <div class="transaction-box">
                                  <p>Your deposit request has been approved. Your account has been credited with ${userData.currency} ${amount.toLocaleString()}</p>
                                  </div>
                                  <p class="text">You can log in to your account to view more details.</p>

                                  <!-- CALL TO ACTION BUTTON -->
                                  <div style="text-align: center;">
                                    <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                                  </div>

                                  <hr />
                                  
                                  <p class="footer">
                                    Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                                  </p>
                                  <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                                </div>
                              </body>
                              </html>

                              `,
                            });
                          } else {
                            UserService.sendEmail({
                              subject: 'Withdrawal Request Approved',
                              to: userData.email,
                              from: 'no-reply@capitalonlineventures.com',
                              html: `
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>Transaction Alert - HMAgrivest Investment</title>
                                <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                                .logo { text-align: center; margin-bottom: 20px; }
                                .logo img { max-width: 150px; }
                                .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                                .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                                .highlight { font-weight: bold; color: #28a745; }
                                  .status-h {font-weight: bold; color: #ff6900;}
                                  .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                                  .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                                  .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                                </style>
                                </head>
                                <body>
                                <div class="container">
                                
                                <!-- LOGO SECTION -->
                                <div class="logo">
                                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                                </div>
                                
                                <h2 class="heading">Transaction Alert</h2>
                                
                                <p class="text">Dear <span class="highlight">${userData?.fullname}</span>,</p>
                                
                                
                                <!-- TRANSACTION DETAILS BOX -->
                                <div class="transaction-box">
                                  <p>Your withdrawal request has been approved. Your account has been debited with ${userData.currency} ${amount.toLocaleString()}</p>
                                  </div>
                                  <p class="text">You can log in to your account to view more details.</p>

                                  <!-- CALL TO ACTION BUTTON -->
                                  <div style="text-align: center;">
                                    <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                                  </div>

                                  <hr />
                                  
                                  <p class="footer">
                                    Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                                  </p>
                                  <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                                </div>
                              </body>
                              </html>

                              
                              `,
                            });
                          } 
                        }else {
                          if (type === 'deposit') {
                            UserService.sendEmail({
                              subject: 'Deposit Request Declined',
                              to: userData.email,
                              from: 'no-reply@capitalonlineventures.com',
                              html: `
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>Transaction Alert - HMAgrivest Investment</title>
                                <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                                .logo { text-align: center; margin-bottom: 20px; }
                                  .logo img { max-width: 150px; }
                                  .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                                  .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                                  .highlight { font-weight: bold; color: #28a745; }
                                  .status-h {font-weight: bold; color: #ff6900;}
                                  .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                                  .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                                  .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                                </style>
                                </head>
                                <body>
                                <div class="container">
                                
                                <!-- LOGO SECTION -->
                                <div class="logo">
                                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                                </div>
                                
                                <h2 class="heading">Transaction Alert</h2>
                                
                                <p class="text">Dear <span class="highlight">${userData?.fullname}</span>,</p>
                                
                                
                                <!-- TRANSACTION DETAILS BOX -->
                                <div class="transaction-box">
                                  <p>Your deposit request has been declined. Your account has not been credited with ${userData.currency} ${amount.toLocaleString()}</p>
                                  </div>
                                  <p class="text">You can log in to your account to view more details.</p>

                                  <!-- CALL TO ACTION BUTTON -->
                                  <div style="text-align: center;">
                                    <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                                  </div>

                                  <hr />
                                  
                                  <p class="footer">
                                    Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                                  </p>
                                  <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                                </div>
                              </body>
                              </html>

                              
                              `,
                            });
                          } else {
                            UserService.sendEmail({
                              subject: 'Withdrawal Request Declined',
                              to: userData.email,
                              from: 'no-reply@capitalonlineventures.com',
                              html: `
                              <!DOCTYPE html>
                              <html>
                              <head>
                                <title>Transaction Alert - HMAgrivest Investment</title>
                                <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: left; width: 90%; max-width: 600px; margin: auto; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                                .logo { text-align: center; margin-bottom: 20px; }
                                  .logo img { max-width: 150px; }
                                  .heading { color: #222; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                                  .text { font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 15px; }
                                  .highlight { font-weight: bold; color: #28a745; }
                                  .status-h {font-weight: bold; color: #ff6900;}
                                  .transaction-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                                  .footer { font-size: 14px; color: #888; margin-top: 20px; text-align: center; }
                                  .btn { background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-size: 16px; }
                                  </style>
                                  </head>
                                <body>
                                <div class="container">
                                
                                <!-- LOGO SECTION -->
                                <div class="logo">
                                <img src="https://res.cloudinary.com/dyubkqdp2/image/upload/c_thumb,w_200,g_face/v1742335124/Group_23_nruyhs.png" alt="HMAgrivest Logo">
                                </div>
                                
                                <h2 class="heading">Transaction Alert</h2>
                                
                                <p class="text">Dear <span class="highlight">${userData?.fullname}</span>,</p>
                                
                                
                                <!-- TRANSACTION DETAILS BOX -->
                                <div class="transaction-box">
                                  <p>Your withdrawal request has been declined. Your account has not been debited with ${userData.currency} ${amount.toLocaleString()}</p>
                                  </div>
                                  <p class="text">You can log in to your account to view more details.</p>

                                  <!-- CALL TO ACTION BUTTON -->
                                  <div style="text-align: center;">
                                    <a href="https://capitalonlineventures.com/dashboard" class="btn">View Account</a>
                                  </div>

                                  <hr />
                                  
                                  <p class="footer">
                                    Need assistance? <a href="mailto:support@capitalonlineventures.com">Contact Support</a>
                                  </p>
                                  <p class="footer">Best regards, <br /> The HMAgrivest Team</p>
                                </div>
                              </body>
                              </html>

                              
                              `,
                            });
                          }
                        }

                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => {
              toast.dismiss();
              toast.error('Error processing action. Contact developer');
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className='min-h-screen'>
        {isLoading && !userData && (
          <div className='mt-8'>
            <Card>
              <Loader />
            </Card>
          </div>
        )}
        {!isLoading && !userData && (
          <div className='mt-8 text-neutral'>
            <Card>
              <p className='text-3xl text-neutral'>Cannot fetch details</p>
            </Card>
          </div>
        )}
        {/* 1 */}
        {!isLoading && userData && (
          <>
            <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
              <p className='mb-8 font-bold text-lg text-white'>ACCOUNT DETAILS</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 my-4 text-gray-400'>
                <div className='p-6 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-2xl'>
                  <p className='text-blue-400 uppercase text-xs font-semibold mb-2 tracking-wider'>
                    Capital
                  </p>
                  <p className='text-white font-bold text-3xl'>
                    {userData?.currency ? userData.currency :  '$'}
                    {userData?.wallet ? userData?.wallet?.deposit?.toLocaleString() : (userData?.deps?.toLocaleStting() ?? 0) }
                  </p>
                </div>
                <div className='p-6 bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20 rounded-2xl'>
                  <p className='text-green-400 uppercase text-xs font-semibold mb-2 tracking-wider'>
                    Profit
                  </p>
                  <p className='text-white font-bold text-3xl'>
                    <span>
                      {userData?.currency  ? userData.currency : '$'}
                    </span>
                    {userData?.wallet ? userData?.wallet?.profit?.toLocaleString() : (userData?.balance?.toLocaleString() ?? 0)}
                  </p>
                </div>
                <div className='p-6 bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-2xl'>
                  <p className='text-purple-400 uppercase text-xs font-semibold mb-2 tracking-wider'>
                    Withdrawable Balance
                  </p>
                  <p className='text-white font-bold text-3xl'>
                    {userData?.currency ? userData.currency : '$'}
                    {userData?.wallet ? userData?.wallet?.withdraw?.toLocaleString() :  (userData?.withdraw?.toLocaleString() ?? 0)}
                  </p>
                </div>
                {/* <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Trading Percentage
                  </p>
                  <p className='text-gray-800 font-bold text-2xl'>
                    {userData?.tradingPercentage ?? 0}%
                  </p>
                </div> */}
                {/* <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Withdrawal Limit
                  </p>
                  <p className='text-gray-800 font-bold text-2xl'>
                    {userData?.currency &&
                      userData?.withdrawLimit &&
                      userData?.currency}

                    {userData?.withdrawLimit
                      ? userData?.withdrawLimit?.toLocaleString()
                      : 'Not set'}
                  </p>
                </div> */}
              </div>
              {/* Credit or Debit Account */}
              <div className='grid grid-cols-2 gap-4 mt-12'>
                <Button
                  color='success'
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  block
                >
                  Credit
                </Button>
                <Button
                  color='danger'
                  onClick={() => setModal5Open(true)}
                  block
                >
                  Debit
                </Button>
              </div>
            </Card>
            <div className='grid grid-cols-1 xl:grid-cols-6 gap-6'>
              {/* Column 1 */}
              <div className='xl:col-span-2 text-white'>
                <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
                    {/* User Country*/}
                    {userData?.country && (
                      <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                        <div className='h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl text-blue-400'>
                          <CiLock />
                        </div>
                        <div className='flex-1'>
                          <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>Country</p>
                          <p className='text-white font-bold text-sm'>
                            {userData?.country}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* User Id */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl text-purple-400'>
                        <CiUser />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>User ID</p>
                        <p className='text-white font-bold text-sm'>
                          {userData?._id ? userData?._id : userData?.id || userData?.id}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl text-green-400'>
                        <RiUserReceived2Fill />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>Email Verified</p>
                        <p className={`${ !userData?.emailVerified ? ' text-red-400' : ' text-green-400' } font-bold text-sm`}>
                          {userData?.emailVerified ? "Verified" : "Not Verified" }
                        </p>
                      </div>
                    </div>
                    {/* User Email */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center text-2xl text-amber-400'>
                        <CiMail />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'> Email</p>
                        <p className='text-white font-bold text-sm'>
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                    {/* Password */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-rose-500/20 rounded-full flex items-center justify-center text-2xl text-rose-400'>
                        <CiLock />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>Password</p>
                        <p className='text-white font-bold text-sm'>
                          {userData?.password || userData?.access}
                        </p>
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-cyan-500/20 rounded-full flex items-center justify-center text-2xl text-cyan-400'>
                        <SlPhone />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>Phone Number</p>
                        <p className='text-white font-bold text-sm'>
                          {userData?.phone ?? 'Nil'}
                        </p>
                      </div>
                    </div>
                    {/* Full Name */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-2xl text-indigo-400'>
                        <User2 />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>
                          Full Name
                        </p>
                        <p className='text-white font-bold text-sm'>
                          {userData?.fullname}
                        </p>
                      </div>


                    </div>
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-teal-500/20 rounded-full flex items-center justify-center text-2xl text-teal-400'>
                        <PlaneTakeoff />
                      </div>
  

                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>
                          Plan 
                        </p>
                        <p className='text-white font-bold text-sm'>
                          {userData?.selectedPlan}
                        </p>
                      </div>
                    </div>
                    {/* Date Joined */}
                    <div className='flex items-center gap-4 mt-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5'>
                      <div className='h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-2xl text-emerald-400'>
                        <CiCalendarDate />
                      </div>
                      <div className='flex-1'>
                        <p className='text-gray-400 font-medium text-xs uppercase tracking-wider'>Date Joined</p>
                        <p className='text-white font-bold text-sm'>
                          { userData?.timeStamp ? dateTemplate(userData?.timeStamp) : dateTemplate(userData?.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/*  */}
                    <div className='mt-8'>
                      <Button
                        block
                        onClick={setUserBlockedStatus}
                        color={userData.isBlocked ? 'dark' : 'secondary'}
                      >
                        {userData?.isBlocked
                          ? 'Activate User'
                          : 'Dectivate User'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Column 2 */}
              <div className='xl:col-span-4'>
                <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-xl'>
                  <div className='grid sm:grid-cols-2 items-center gap-4 mb-8'>
                    <Button
                      color='secondary'
                      onClick={() => setModal4Open(true)}
                    >
                      Set Withdrawal Limit
                    </Button>
                    <Button color='dark' onClick={() => setModal6Open(true)}>
                      Update Plan
                      {/* Set Trading Percentage */}
                    </Button>
                  </div>
                  <TransactionHistory
                    data={
                      [
                        ...transactions
                      ] as TransactionType[]
                    }
                    processTransaction={processTransaction}
                  />
                </Card>
                <div className='my-4'></div>
              </div>
            </div>
          </>
        )}
        {/* 2 */}
        {!isLoading && userData && (
          <>
            <Modal
              title={`TOP UP ACCOUNT`}
              isOpen={modalOpen}
              handleClose={handleClose}
            >
              <form onSubmit={handleSubmit}>
                <div className='w-full col-span-1 mb-4 text-gray-700'>
                  <label
                    htmlFor='balanceType'
                    className='block text-sm text-gray-700 mb-2'
                  >
                    Select Wallet to Fund*
                  </label>
                  <select
                    id='balanceType'
                    required
                    value={balanceType}
                    onChange={(e) => setBalanceType(e.target.value)}
                    className=' w-full p-3 rounded-xl outline outline-gray-300'
                  >
                    <option className=' text-gray-950' value='deposit'>Capital</option>
                    <option className=' text-gray-950' value='profit'>Profit</option>
                    {/* <option className=' text-gray-950' value='bonus'>Bonus</option> */}
                    {/* <option className=' text-gray-950' value='investment'>Investment</option> */}
                    <option className=' text-gray-950' value='withdraw'>withdraw</option>
                  </select>
                </div>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='block text-sm text-gray-700 mb-2'
                  >
                    Input New Balance*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Input New Balance'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button type='submit' rounded variant='outlined'  block>
                  Set Balance
                </Button>
              </form>
            </Modal>

            <Card>
              {!userData?.documents?.ID &&
                !userData?.documents?.passport &&
                !userData?.kyc_documents && (
                  <p className='text-gray-700 font-light text-3xl text-center p-8'>
                    No Documents
                  </p>
                )}
              <div className='items-center mx-auto'>
                {userData?.documents?.passport && (
                  <div className='col-span-6 md:col-span-4 lg:col-span-3 w-full'>
                    <div className='my-4 px-2'>
                      <p className='mb-4 text-xl font-bold'>Selfie</p>
                      <Image
                        alt='Passport photograph'
                        src={userData?.documents?.passport}
                        width={500}
                        height={500}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}
                {userData.kyc_documents && (
                  <div>
                    <p className='text-lg font-extrabold mb-8 text-gray-700'>
                      KYC Documents
                    </p>
                    <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 mx-auto max-w-4xl'>
                      {userData.kyc_documents.map((document: string) => (
                        <Image
                          key={document}
                          src={document}
                          alt={userData.id}
                          className='w-full'
                          width={200}
                          height={200}
                        />
                      ))}
                    </div>
                    {/*  */}
                    {!userData?.kyc_approved && (
                      <div className='mt-8 grid items-center grid-cols-2 gap-8 max-w-md mx-auto'>
                        <Button
                          color='success'
                          onClick={() => handleProcessKyc(true)}
                          block
                        >
                          Approve
                        </Button>
                        <Button
                          color='danger'
                          onClick={() => handleProcessKyc(false)}
                          block
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <div className='grid sm:grid-cols-2 gap-4'>
                <Button
                  block
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete this account? This action cannot be undone.'
                      )
                    )
                      handleClick();
                    else return;
                  }}
                >
                  Delete User
                </Button>
              </div>
            </Card>

            {/*  */}
            <Modal
              title={`Set withdrawal limit`}
              isOpen={modal4Open}
              handleClose={() => setModal4Open(false)}
            >
              <form onSubmit={handleSetWithdrawLimit}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='text-sm text-gray-700 mb-2 block'
                  >
                    Input Withdrawal Limit*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Withdrawal Limit'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button type='submit'>Submit</Button>
              </form>
            </Modal>
            {/* update user market plan */}
            <Modal
              title={`Update User Current Market plan`}
              isOpen={modal6Open}
              handleClose={() => setModal6Open(false)}
            >
              <form onSubmit={handleUpdateUserPlan}>
                <div className='w-full col-span-1 mb-4 flex flex-col'>
                  <label
                    htmlFor='plan'
                    className='text-sm text-gray-700 mb-2'
                  >
                    Update client Plan*
                  </label>
                  <select name='plan' onChange={(e) => setPlan(e.target.value) }  id='plan' className=' p-3 rounded-xl'>
                    {markets.map((p:any) => (
                      <option value={p.plan} key={p.id}>
                        {p.plan}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type='submit'>Submit</Button>
              </form>
            </Modal>
            {/*add new market plan  */}
            {/* <Modal
              title={`Set New Market Plan`}
              isOpen={modal7Open}
              handleClose={() => setModal7Open(false)}
            >
              <form onSubmit={handleNewMarket}>
                <div className='w-full col-span-1 mb-4 flex flex-col'>
                  <label
                    htmlFor='plan'
                    className='text-sm text-gray-50 mb-2'
                  >
                    Set new Market Plan*
                  </label>
                  <select name='plan' onChange={(e) => setPlan(e.target.value) }  id='plan' className=' p-3 rounded-xl'>
                    {markets.map((p:any) => (
                      <option value={p.plan} key={p.id}>
                        {p.plan}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type='submit'>Add New Market</Button>
              </form>
            </Modal> */}
            {/* update Balance */}
            <Modal
              title={`Debit User Account`}
              isOpen={modal5Open}
              handleClose={() => setModal5Open(false)}
            >
              <form onSubmit={debitUserAccount}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='balanceType'
                    className='block text-sm text-gray-700 mb-2'
                  >
                    Choose Wallet to Debit*
                  </label>
                  <select
                    id='balanceType'
                    required
                    value={balanceType}
                    onChange={(e) => setBalanceType(e.target.value)}
                    className=' w-full p-3 rounded-xl outline outline-gray-300'
                  >
                    <option className=' text-gray-950' value='deposit'>Capital</option>
                    <option className=' text-gray-950' value='profit'>Profit</option>
                    {/* <option className=' text-gray-950' value='bonus'>Bonus</option> */}
                    {/* <option className=' text-gray-950' value='investment'>Investment</option> */}
                    <option className=' text-gray-950' value='withdraw'>withdraw</option>
                  </select>
                </div>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='text-sm text-gray-700 mb-2'
                  >
                    Amount*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Amount'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button type='submit' rounded block color='dark'>
                  Proceed
                </Button>
              </form>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default UserDetails;
