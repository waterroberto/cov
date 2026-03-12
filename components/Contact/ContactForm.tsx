import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail, MdLocationOn } from 'react-icons/md';

import Image from 'next/image';

const contactInfo = [
  {
    icon: <MdEmail className="text-2xl" />,
    title: 'Email Us',
    value: 'support@capitalonlineventures.com',
    desc: 'Our response time is typically within 24 hours.'
  },
  {
    icon: <MdLocationOn className="text-2xl" />,
    title: 'Our Office',
    value: 'HPQCH, 11 Wilson St, Montreal Canada.',
    desc: 'Visit us for in-person consultation.'
  },
];

const ContactForm = () => {
  return (
    <section className='py-20 px-6 md:px-12 lg:px-24 bg-white'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
        
        {/* Contact Info Sidebar - Now in the larger 7-column slot */}
        <div className='lg:col-span-7 space-y-10 order-1'>
          <div>
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>Contact Information</h3>
            <p className='text-gray-600 text-lg'>
              Choose the most convenient way to reach us. We're always ready to assist you.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {contactInfo.map((info) => (
              <div key={info.title} className='group flex items-start gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:shadow-md hover:border-blue-100'>
                <div className='flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                  {info.icon}
                </div>
                <div>
                  <h4 className='font-bold text-gray-900 text-lg mb-1'>{info.title}</h4>
                  <p className='text-blue-600 font-semibold mb-1'>{info.value}</p>
                  <p className='text-sm text-gray-500 font-medium'>{info.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Telegram QR Section - More prominent in the larger column */}
          <div className='p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 text-white shadow-2xl overflow-hidden relative'>
            <div className='absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full' />
            
            <div className='relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left'>
              <div className='flex-shrink-0 p-6 bg-white rounded-3xl shadow-xl'>
                <Image 
                  src="/assets/cov-tel.jpeg" 
                  alt="Telegram Support QR" 
                  width={340} 
                  height={340}
                  className="rounded-xl"
                />
              </div>
              <div className='flex-grow'>
                <h4 className='text-3xl font-bold mb-3'>Support Telegram</h4>
                <p className='text-blue-200 text-lg mb-8 leading-relaxed'>
                  Experience lightning-fast support. Scan this QR code to chat directly with our 24/7 expert team on Telegram.
                </p>
                <a 
                  href="https://t.me/cov_support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 shadow-xl'
                >
                  Start Live Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form - Now in the 5-column slot */}
        <div className='lg:col-span-5 bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 order-2'>
          <div className='mb-10'>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>Send a Message</h3>
            <p className='text-gray-500'>We'll get back to you shortly.</p>
          </div>
          
          <form className='flex flex-col gap-6'>
            <div className='space-y-2'>
              <label htmlFor='name' className='text-sm font-bold text-gray-700 ml-1'>Full Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='John Doe'
                className='w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-bold text-gray-700 ml-1'>Email Address</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='john@example.com'
                className='w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='phone' className='text-sm font-bold text-gray-700 ml-1'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='+1 (234) 567 89'
                className='w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='message' className='text-sm font-bold text-gray-700 ml-1'>Your Message</label>
              <textarea
                id='message'
                name='message'
                placeholder='How can we help?'
                className='w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-800 min-h-[150px] resize-none'
                required
              />
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                className='w-full p-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
