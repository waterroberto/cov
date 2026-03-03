import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Terms and Conditions</h1>
      
      <p className="mb-4">
        Welcome to CAP VENTURES! These terms and conditions outline the rules and regulations for the use of our platform.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
      <p className="mb-4">
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use CAP VENTURES if you do not agree to all of the terms stated.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">2. Investment Risks</h2>
      <p className="mb-4">
        Investments in agriculture, commodities, stocks, and energy carry risks. We do not guarantee returns on any investments made through our platform.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">3. User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Users must provide accurate and truthful information.</li>
        <li>Unauthorized access to other accounts is prohibited.</li>
        <li>Investors must comply with all applicable laws and regulations.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-6">4. Payment and Fees</h2>
      <p className="mb-4">
        Transaction fees may apply to certain investment activities. All payments must be processed through authorized channels.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">5. Account Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">6. Privacy Policy</h2>
      <p className="mb-4">
        Your personal data is protected under our privacy policy. We do not share user data with third parties without consent.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">7. Amendments</h2>
      <p className="mb-4">
        We may update these terms at any time. Continued use of our platform implies acceptance of the updated terms.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6">8. Contact Information</h2>
      <p className="mb-4">
        If you have any questions about these terms, please contact us at <span className="text-blue-500">support@capitalonlineventures.com</span>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
