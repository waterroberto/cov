import ContactForm from '@/components/Contact/ContactForm';
import ContactHeader from '@/components/Contact/ContactHeader';

import Footer from '@/components/Footer';
import Meta from '@/components/Global/Meta';
import Navbar from '@/components/Navbar';
import React from 'react';

const contact = () => {
  return (
    <>
      <Meta />
      <Navbar />
      <ContactHeader />
      <ContactForm />

      <Footer />
    </>
  );
};

export default contact;