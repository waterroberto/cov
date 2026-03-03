import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Privacy Policy</h1>
      <p className="mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        Welcome to CAP VENTURES. We value your privacy and are committed to
        protecting your personal data. This Privacy Policy explains how we
        collect, use, and safeguard your information when you use our website
        and services.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="mb-4">We may collect the following types of information:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal information (name, email, phone number, etc.).</li>
        <li>Financial data related to transactions on our platform.</li>
        <li>Usage data such as IP address, browser type, and access times.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p className="mb-4">We use your information for the following purposes:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and maintain our services.</li>
        <li>To process transactions and manage investments.</li>
        <li>To improve user experience and customer support.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Information Sharing</h2>
      <p className="mb-4">
        We do not sell or rent your personal data. However, we may share your
        information with:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Service providers assisting with operations.</li>
        <li>Legal authorities if required by law.</li>
        <li>Business partners for investment-related services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">4. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your
        information. However, no online system is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal data. You
        may also opt-out of marketing communications at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-6">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated effective date.
      </p>

      <h2 className="text-2xl font-semibold mt-6">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at <span className="font-semibold">support@capitalonlineventures.com</span>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
