'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Meta from '@/components/Global/Meta';
import { db } from '@/config/firebase.config';
// import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { UserService } from '@/services/user';
import emailjs from '@emailjs/browser';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidImageAdd } from 'react-icons/bi';
import { GiPassport } from 'react-icons/gi';
import { HiIdentification } from 'react-icons/hi';
import { IoDocumentSharp } from 'react-icons/io5';
import { TbLicense } from 'react-icons/tb';

const documents = [
  {
    id: 'id',
    name: 'National ID',
    icon: <HiIdentification />,
  },
  {
    id: 'passport',
    name: 'passport',
    icon: <GiPassport />,
  },
  {
    id: 'license',
    name: 'Driving License',
    icon: <TbLicense />,
  },
];

export default function AccountUpgrade() {
  const router = useRouter();
  const [activeDoc, setActiveDoc] = useState('passport');
  const [document1, setDocument1] = useState<File | null>(null);
  const [document2, setDocument2] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(UserDataContext);

  // const uploadKycDocuments = async () => {
  //   if (document1 && document2) {
  //     if (userData?._id) {
  //       setIsLoading(true);

  //       try {
  //       try {
  //         const uploadPromises = [document1, document2].map((document, index) => 
  //           UserService.getUrlFromFileUpload(
  //             'kycDocuments',
  //             userData._id,
  //             `${new Date().getTime()}_${index}`,
  //             document
  //           )
  //         );

  //         const kyc_documents = await Promise.all(uploadPromises);
  //         const userRef = doc(db, 'users', userData?._id);

  //         await updateDoc(userRef, {
  //           kyc_documents,
  //           kyc_submitted: true,
  //           kyc_approved: false,
  //           kyc_pending: true,
  //         });

  //         await emailjs.send(
  //           'service_ce42cqj',
  //           'template_wuswlfh',
  //           {
  //             subject: 'Afribiz Trade Investment - KYC Submission',
  //             receiver: `${userData.fullname}`,
  //             message1: 'Your KYC documentation has been received and is under review by our support team.',
  //             message2: 'Please await our response and tend patience as your documents undergo verification.',
  //             receiver_email: userData.email,
  //           },
  //           'y8lxRpg3Vc36vRzy-ODHc'
  //         );

  //         toast.success('Kyc documents uploaded successfully.');
  //         setIsLoading(false);
  //         setDocument1(null);
  //         setDocument2(null);
  //       } catch (error) {
  //         setIsLoading(true);
  //         toast.error('Error! Cannot upload documents');

  //         console.log(error);
  //       }
  //     }
  //   } else {
  //     if (!document1) {
  //       toast.error('Please upload front of document');
  //     }
  //     if (!document2) {
  //       toast.error('Please upload back of document');
  //     }
  //   }
  // };



  return (
    <div></div>
    // <>
    //   <Meta
    //     title='Afribiz Trade Investment - KYC Verification - Online Bank'
    //     description='Afribiz Trade Investment | KYC Verification'
    //   />
    //   <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
    //     {/* Animated background elements */}
    //     <div className='absolute inset-0 overflow-hidden'>
    //       <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'></div>
          
    //       {/* Floating elements */}
    //       <div className='absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
    //       <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
          
    //       {/* Grid pattern */}
    //       <div className='absolute inset-0 opacity-10'>
    //         <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
    //           <defs>
    //             <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
    //               <path d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='0.5'/>
    //             </pattern>
    //           </defs>
    //           <rect width='100%' height='100%' fill='url(#grid)' />
    //         </svg>
    //       </div>
    //     </div>

    //     <div className='relative z-10 min-h-screen p-4 md:p-8'>
    //       <div className='max-w-4xl mx-auto'>
    //         {!userData?.kyc_submitted && (
    //           <div className='space-y-6'>
    //             {/* Header Card */}
    //             <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
    //               <div className='text-center mb-6'>
    //                 <p className='text-white font-bold text-3xl mb-3'>Identity Verification (KYC)</p>
    //                 <p className='text-slate-300 text-base'>
    //                   Verify your identity by uploading any of the documents below. Documents are subject to review by our agents.
    //                 </p>
    //               </div>

    //               {/* Document Type Selection */}
    //               <div className='flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap'>
    //                 {documents.map((doc) => (
    //                   <button
    //                     type='button'
    //                     key={doc.id}
    //                     onClick={() => setActiveDoc(doc.id)}
    //                     className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
    //                       activeDoc === doc.id
    //                         ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
    //                         : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:border-slate-600'
    //                     }`}
    //                   >
    //                     <span className='text-lg'>{doc.icon}</span>
    //                     {doc.name}
    //                   </button>
    //                 ))}
    //               </div>
    //             </div>

    //             {/* Document Upload Card */}
    //             <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-8'>
    //               <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
    //                 {/* Front Side */}
    //                 <div>
    //                   <label className='block text-white font-semibold mb-4 text-lg'>Front</label>
    //                   <label
    //                     htmlFor='documentFront'
    //                     className='min-h-[280px] border-2 border-dashed border-slate-600/50 hover:border-blue-400/50 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-slate-700/30'
    //                   >
    //                     {document1 ? (
    //                       <Image
    //                         alt={document1?.name}
    //                         className='max-h-64 max-w-full rounded-lg object-contain'
    //                         width={200}
    //                         height={200}
    //                         src={URL.createObjectURL(document1)}
    //                       />
    //                     ) : (
    //                       <>
    //                         <BiSolidImageAdd className='text-5xl text-blue-400' />
    //                         <div className='text-center'>
    //                           <p className='text-slate-300 font-medium'>Click to upload</p>
    //                           <p className='text-slate-500 text-sm'>or drag and drop</p>
    //                         </div>
    //                       </>
    //                     )}
    //                   </label>
    //                   <input
    //                     type='file'
    //                     id='documentFront'
    //                     onChange={(e) => {
    //                       if (e.target.files) setDocument1(e.target?.files[0]);
    //                     }}
    //                     accept='.jpg, .jpeg, .png'
    //                     className='opacity-0'
    //                   />
    //                 </div>

    //                 {/* Back Side */}
    //                 <div>
    //                   <label className='block text-white font-semibold mb-4 text-lg'>Back</label>
    //                   <label
    //                     htmlFor='documentBack'
    //                     className='min-h-[280px] border-2 border-dashed border-slate-600/50 hover:border-blue-400/50 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-slate-700/30'
    //                   >
    //                     {document2 ? (
    //                       <Image
    //                         alt={document2?.name}
    //                         className='max-h-64 max-w-full rounded-lg object-contain'
    //                         width={200}
    //                         height={200}
    //                         src={URL.createObjectURL(document2)}
    //                       />
    //                     ) : (
    //                       <>
    //                         <BiSolidImageAdd className='text-5xl text-purple-400' />
    //                         <div className='text-center'>
    //                           <p className='text-slate-300 font-medium'>Click to upload</p>
    //                           <p className='text-slate-500 text-sm'>or drag and drop</p>
    //                         </div>
    //                       </>
    //                     )}
    //                   </label>
    //                   <input
    //                     type='file'
    //                     id='documentBack'
    //                     onChange={(e) => {
    //                       if (e.target.files) setDocument2(e.target?.files[0]);
    //                     }}
    //                     accept='.jpg, .jpeg, .png'
    //                     className='opacity-0'
    //                   />
    //                 </div>
    //               </div>

    //               {/* Upload Button */}
    //               <div className='mt-8'>
    //                 <Button
    //                   type='button'
    //                   onClick={uploadKycDocuments}
    //                   disabled={isLoading}
    //                   loading={isLoading}
    //                   color='primary_2'
    //                   block
    //                 >
    //                   {isLoading ? 'Uploading Documents...' : 'Upload & Submit'}
    //                 </Button>
    //               </div>

    //               {/* Info Note */}
    //               <div className='mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30'>
    //                 <p className='text-blue-300 text-sm'>
    //                   📋 Make sure both front and back of your document are clear and fully visible. Processing usually takes 24-48 hours.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Pending KYC Verification */}
    //         {userData?.kyc_submitted && userData?.kyc_pending && (
    //           <div className='rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 shadow-2xl p-12'>
    //             <div className='flex flex-col items-center justify-center gap-6 text-center'>
    //               <div className='w-20 h-20 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center animate-pulse'>
    //                 <IoDocumentSharp className='text-5xl text-yellow-400' />
    //               </div>
    //               <div>
    //                 <p className='text-3xl font-bold text-white mb-3'>KYC Verification In Progress</p>
    //                 <p className='text-slate-300 text-lg'>
    //                   Your documents are being reviewed by our team. This usually takes 24-48 hours.
    //                 </p>
    //               </div>
    //               <div className='w-full max-w-xs h-2 bg-slate-700/50 rounded-full overflow-hidden mt-4'>
    //                 <div className='h-full bg-gradient-to-r from-yellow-500 to-yellow-400 w-2/3 animate-pulse'></div>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* KYC Approved */}
    //         {userData?.kyc_submitted &&
    //           userData?.kyc_approved &&
    //           !userData?.kyc_pending && (
    //           <div className='rounded-2xl bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl p-12'>
    //             <div className='flex flex-col items-center justify-center gap-6 text-center'>
    //               <div className='w-20 h-20 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center'>
    //                 <IoDocumentSharp className='text-5xl text-green-400' />
    //               </div>
    //               <div>
    //                 <p className='text-3xl font-bold text-green-300 mb-3'>KYC Approved ✓</p>
    //                 <p className='text-green-200 text-lg'>
    //                   Your identity has been verified successfully. You can now access all features.
    //                 </p>
    //               </div>
    //               <Button
    //                 type='button'
    //                 color='primary_2'
    //                 onClick={() => router.replace('/dashboard')}
    //               >
    //                 Go to Dashboard
    //               </Button>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}