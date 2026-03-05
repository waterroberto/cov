'use client';
import Button from '@/components/Global/Button';
import Logo from '@/components/Global/Logo';
import Meta from '@/components/Global/Meta';
import { db, auth } from '@/config/firebase.config';
import { UserService } from '@/services/user';
import { onAuthStateChanged } from 'firebase/auth';
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiSolidImageAdd } from 'react-icons/bi';
import { GiPassport } from 'react-icons/gi';
import { HiIdentification } from 'react-icons/hi';
import { TbLicense } from 'react-icons/tb';

const documents = [
  {
    id: 'id',
    name: 'National ID',
    icon: <HiIdentification />,
  },
  {
    id: 'passport',
    name: 'Passport',
    icon: <GiPassport />,
  },
  {
    id: 'license',
    name: 'Driving License',
    icon: <TbLicense />,
  },
];


const generateKycEmail = (fullname: string) => `
<!DOCTYPE html>
<html>
<body>
<h2>KYC Verification In Progress</h2>
<p>Dear ${fullname},</p>

<p>Your KYC documents have been received and are currently under review.</p>

<p>Once verified, you will gain full access to your dashboard.</p>

<p>Thank you for your patience.</p>

<p>CapVentures Team</p>
</body>
</html>
`;

function KYCContent() {
  const router = useRouter();  
  const [activeDoc, setActiveDoc] = useState('passport');
  const [document1, setDocument1] = useState<File | null>(null);
  const [document2, setDocument2] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isRejected, setIsRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  console.log(data)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user)
      if (!user) {
        console.log("No user found")
        router.replace("/login")
      };

      const userRef = doc(db, "users", user?.uid!);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setData(data);
        setIsRejected(data.isRejected || false);
        setRejectionReason(data.reason || "");
      }
    });

    return () => unsubscribe();
  }, []);



const uploadKycDocuments = async () => {
  if (!document1 || !document2) {
    if (!document1) toast.error("Please upload front of document");
    if (!document2) toast.error("Please upload back of document");
    return;
  }

  if (!auth.currentUser) {
    toast.error("You must be logged in");
    return;
  }

  try {
    setIsLoading(true);

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    const kyc_documents: string[] = [];

    for (const file of [document1, document2]) {
      const url = await UserService.getUrlFromFileUpload(
        "kycDocuments",
        userId,
        Date.now().toString(), // FIXED
        file
      );

      kyc_documents.push(url);
    }

    await updateDoc(userRef, {
      kyc_documents,
      kyc_submitted: true,
      kyc_pending: true,
      kyc_approved: false,
      isRejected: false,
      reason: "",
    });

    if (data) {
      await UserService.sendEmail({
        to: data.email,
        subject: "KYC Verification In Progress",
        html: generateKycEmail(data.fullname),
      });
    }

    toast.success("KYC documents uploaded successfully!");

    setTimeout(() => {
      router.replace("/auth/login");
    }, 1500);

  } catch (error) {
    console.error(error);
    toast.error("Error uploading documents");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className='w-full max-w-3xl'>
      {/* Header */}
      <div className='mb-8 flex justify-center'>
        <Link href='/' className='hover:opacity-80 transition-opacity'>
          <Logo width={100} height={100} />
        </Link>
      </div>

      {/* Main Card */}
      <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8 md:p-10'>
        {/* Rejection Status Alert */}
        {isRejected && (
          <div className='mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30'>
            <div className='flex gap-3'>
              <div className='flex-shrink-0'>
                <svg className='w-6 h-6 text-red-400 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-red-300 font-semibold mb-1'>KYC Verification Rejected</p>
                <p className='text-red-200 text-sm mb-3'>
                  {rejectionReason || 'Your KYC documents did not meet our verification requirements. Please review the feedback and resubmit.'}
                </p>
                <p className='text-red-300 text-xs font-medium'>
                  ⚠️ Please correct the issues and resubmit your documents below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Info Section */}
        {data && (
        <div className='mb-8 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-0'>
            <div>
              <p className='text-slate-400 text-sm'>Verifying Account</p>
              <p className='text-white font-semibold'>{data.fullname || 'User'}</p>
              <p className='text-slate-400 text-sm mt-1'>{data.email || ''}</p>
            </div>
            <div className='text-right'>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  isRejected
                    ? 'bg-red-500/20 text-red-300'
                    : !data?.kyc_submitted
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}
              >
                {isRejected
                  ? 'Resubmit Required'
                  : !data?.kyc_submitted
                  ? 'Verification Required'
                  : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>
        )}
        {/* Header Section */}
        <div className='text-center mb-8'>
          <p className='text-white font-bold text-3xl md:text-4xl mb-3'>
            {isRejected ? 'Resubmit Identity Verification' : 'Identity Verification'}
          </p>
          <p className='text-slate-300 text-base md:text-lg'>
            {isRejected 
              ? 'Please resubmit your documents addressing the feedback above. Our team will review them shortly.'
              : 'Complete your KYC verification to unlock full access to investment features. Documents are reviewed by our team.'}
          </p>
        </div>

        {/* Document Type Selection */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap mb-10'>
          {documents.map((doc) => (
            <button
              type='button'
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeDoc === doc.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:border-slate-600'
              }`}
            >
              <span className='text-lg'>{doc.icon}</span>
              {doc.name}
            </button>
          ))}
        </div>

        {/* Document Upload Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10'>
          {/* Front Side */}
          <div>
            <label className='block text-white font-semibold mb-4 text-lg'>
              Front Side
            </label>
            <label
              htmlFor='documentFront'
              className='min-h-[280px] border-2 border-dashed border-slate-600/50 hover:border-blue-400/50 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-slate-700/30'
            >
              {document1 ? (
                <Image
                  alt='Front document'
                  className='max-h-64 max-w-full rounded-lg object-contain'
                  width={200}
                  height={200}
                  src={URL.createObjectURL(document1)}
                />
              ) : (
                <>
                  <BiSolidImageAdd className='text-5xl text-blue-400' />
                  <div className='text-center'>
                    <p className='text-slate-300 font-medium'>Click to upload</p>
                    <p className='text-slate-500 text-sm'>PNG, JPG up to 10MB</p>
                  </div>
                </>
              )}
            </label>
            <input
              type='file'
              id='documentFront'
              onChange={(e) => {
                if (e.target.files) setDocument1(e.target?.files[0]);
              }}
              accept='.jpg, .jpeg, .png'
              className='opacity-0'
            />
          </div>

          {/* Back Side */}
          <div>
            <label className='block text-white font-semibold mb-4 text-lg'>
              Back Side
            </label>
            <label
              htmlFor='documentBack'
              className='min-h-[280px] border-2 border-dashed border-slate-600/50 hover:border-purple-400/50 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-slate-700/30'
            >
              {document2 ? (
                <Image
                  alt='Back document'
                  className='max-h-64 max-w-full rounded-lg object-contain'
                  width={200}
                  height={200}
                  src={URL.createObjectURL(document2)}
                />
              ) : (
                <>
                  <BiSolidImageAdd className='text-5xl text-purple-400' />
                  <div className='text-center'>
                    <p className='text-slate-300 font-medium'>Click to upload</p>
                    <p className='text-slate-500 text-sm'>PNG, JPG up to 10MB</p>
                  </div>
                </>
              )}
            </label>
            <input
              type='file'
              id='documentBack'
              onChange={(e) => {
                if (e.target.files) setDocument2(e.target?.files[0]);
              }}
              accept='.jpg, .jpeg, .png'
              className='opacity-0'
            />
          </div>
        </div>
        

        {/* Requirements Info */}
        <div className='mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30'>
          <div className='flex gap-3'>
            <div className='flex-shrink-0'>
              <svg className='w-5 h-5 text-blue-400 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z' clipRule='evenodd' />
              </svg>
            </div>
            <div>
              <p className='text-blue-300 text-sm'>
                <span className='font-semibold'>Requirements:</span> Ensure both sides are clear, fully visible, and not expired. Processing typically takes 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type='button'
          onClick={uploadKycDocuments}
          disabled={isLoading || !document1 || !document2}
          loading={isLoading}
          color='primary_2'
          block
        >
          {isLoading ? 'Uploading Documents...' : 'Submit & Verify'}
        </Button>

        {/* Info Note */}
        <div className='mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30'>
          <div className='flex gap-3'>
            <div className='flex-shrink-0'>
              <svg className='w-5 h-5 text-yellow-400 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
            </div>
            <div>
              <p className='text-yellow-300 text-sm'>
                <span className='font-semibold'>KYC verification is mandatory</span> to unlock your account. {isRejected ? 'Your previous submission was rejected. Please resubmit corrected documents.' : 'You will not be able to access your dashboard until this is completed.'} Processing typically takes 24-48 hours after submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthKYC() {
  return (
    <>
      <Meta
        title='KYC Verification - CAP VENTURES'
        description='Complete your KYC verification to unlock all investment features'
      />
      <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>

          {/* Floating elements */}
          <div className='absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>

          {/* Grid pattern */}
          <div className='absolute inset-0 opacity-10'>
            <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern
                  id='grid'
                  width='40'
                  height='40'
                  patternUnits='userSpaceOnUse'
                >
                  <path d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='0.5' />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#grid)' />
            </svg>
          </div>
        </div>

        <div className='relative z-10 min-h-screen p-4 md:p-8 flex flex-col items-center justify-center'>
          <Suspense fallback={
            <div className='flex flex-col items-center gap-4'>
              <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
              <p className='text-slate-400 animate-pulse'>Loading verification profile...</p>
            </div>
          }>
            <KYCContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}
