import React from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const contactInfo = [
  // {
  //   icon: <BsFillTelephoneFill />,
  //   title: 'Call Us',
  //   value: '+1 234 576 8910',
  // },
  {
    icon: <MdEmail />,
    title: 'Send an Email',
    value: 'support@capitalonlineventures.com',
  },
  {
    icon: <MdLocationOn />,
    title: 'Our Office',
    value: 'HPQCH, 11 Wilson St, Montreal Canada.',
  },
];

const ContactForm = () => {
  return (
    <section className='p-8 py-16 md:px-16 xl:px-32 bg-gray-50 grid grid-cols-3 gap-4'>
      <div className='col-span-3 md:col-span-1'>
        <p className='text-2xl font-extrabold text-gray-800 sm:text-3xl lg:text-4xl'>
          Get in touch
        </p>
        <p className='text-gray-700 md:text-lg mt-4'>
          Get in touch via mail, call and direct address.
        </p>

        <div className='mt-8'>
          {contactInfo.map((info) => (
            <div key={info.title} className='my-6 flex items-center gap-4'>
              <span
                className={`h-12 w-12 flex items-center justify-center text-xl rounded-full text-primary bg-blue-100`}
              >
                {info.icon}
              </span>
              <div>
                <p className='text-lg font-bold text-gray-800'>{info.title}:</p>
                <p className='text-sm font-medium'>{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-3 md:col-span-2 bg-white shadow-md rounded-md p-6 mt-8 md:-mt-32'>
        <form className='grid grid-cols-1 gap-6 py-4 lg:grid-cols-2'>
          <div className='w-full col-span-1'>
            <label
              htmlFor='name'
              className='mb-2 font-semibold text-sm text-gray-700'
            >
              Your name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Your Name'
              className='p-4 outline-none border border-gray-100 w-full rounded-md text-gray-700 bg-gray-50'
              required
            />
          </div>
          <div className='w-full col-span-1'>
            <label
              htmlFor='email'
              className='mb-2 font-semibold text-sm text-gray-700'
            >
              Your Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Your Email'
              className='p-4 outline-none border border-gray-100 w-full rounded-md text-gray-700 bg-gray-50'
              required
            />
          </div>
          <div className='w-full col-span-1'>
            <label
              htmlFor='phone'
              className='mb-2 font-semibold text-sm text-gray-700'
            >
              Phone Number
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              placeholder='Phone Number'
              className='p-4 outline-none border border-gray-100 w-full rounded-md text-gray-700 bg-gray-50'
              required
            />
          </div>
          <div className='w-full col-span-1'>
            <label
              htmlFor='subject'
              className='mb-2 font-semibold text-sm text-gray-700'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              placeholder='Subject'
              className='p-4 outline-none border border-gray-100 w-full rounded-md text-gray-700 bg-gray-50'
              required
            />
          </div>
          <div className='w-full col-span-1 lg:col-span-2'>
            <label
              htmlFor='message'
              className='mb-2 font-semibold text-sm text-gray-700'
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              placeholder='Type message here...'
              className='p-4 outline-none border border-gray-100 w-full rounded-md text-gray-700 min-h-[200px] resize-none bg-gray-50'
              required
            />
          </div>

          <button
            type='submit'
            className='btn bg-primary text-center mt-4 py-4 text-white hover:bg-secondary'
          >
            Submit Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
