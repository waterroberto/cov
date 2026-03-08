"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Payment Procedures",
      content: [
        "1.1. Client shall fund his trading account within 90 calendar days from the date of its opening in an amount not less than define terms for the type of account (minimum initial deposit).",
        "1.2. The Company has the right to close/cancel an account with the balance less than 1 cent (one-hundredth of a US dollar), if the above account balance existed for more than 90 calendar days.",
        "1.3. Client may request withdrawal of funds from his trading account in the amount not used to cover the margin, but not more than current balance. , provided that all positions of the Client are closed, all sums due to the Company have been paid.",
        "1.4. Client places a funds withdrawal order using the Company website’s interface. Company is not responsible for any third party access to the Client personal information and withdrawal orders. Once an order has been received, the withdrawal amount may be deducted from the Client’s trading account.",
        "1.5. In some cases, and considering that third parties, i.e., payment service providers, are involved in funds transfer, e.g., payment institutions, banks, card processing schemes etc., fund transfer may take up to five banking days after receiving a Client’s order. The security service of the company has the right to hold the order up to 10 business days, previously having notified the Client.",
        "1.6. The Client will be given the Company’s banking details to transfer funds to his trading account via the Company’s website, or may place an account funding order in electronic (placed using the Company website’s interface) or written form.",
        "1.7. When funding his account, the Client shall use the Company’s current banking or electronic wallet details, received at the Company’s website only and effective on the payment date. Current banking details mean details received within 24 (twenty four) hours prior to payment. The Company cannot be held responsible for the funds which the Client transferred using banking details different from current, and does not offer investigation and refund of Client’s payment and cannot credit these funds to Client’s trading balance. Trading deposit funding orders may be issued, and current banking details may be received in the appropriate section of trader’s web entry on the payment day.",
        "1.8. The Client agrees to pay Deposit/withdrawal fees, i.e.,to pay any banking or money transfer fees associated with any transfer, settlement or movement of funds or assets on the Client’s behalf.",
        "1.9. When the trading account balance is funded using online payment systems, Client may order withdrawal only to the same payment system which he has used to fund his trading account in the corresponding currency or it's equivalent. Trading profit may be withdrawn to any of the payment systems (up to a Client’s wish).",
        "1.10. When the trading account balance is funded using direct bank transfer, funds will be credited within 1 working day (after the transfer was actually credited to Company account). The minimum funding amount is 5000 (EUR or USD). Clients who fund their account using direct bank transfer may order withdrawal only to the account from which the payment was done. An upfront bank transfer fee 50 USD will be applied (for international bank transfer).",
        "1.11. Company reserves the right to reject a request for withdrawal in case of an explicit intention to exchange customer funds from one payment system to another.",
        "1.12. Account balance funding using a third person credit card is prohibited.",
        "1.13. If case of funding by using Visa/Mastercard, withdrawals can be done via bank transfer, or by using a specially issued Master card, sent to client by ordered mail.",
      ],
    },
    {
      title: "2. Customer and Company Responsibilities",
      content: [
        "2.1. Client is notified and agrees that the Company cannot be held liable for Client’s actions or inactions during conversion operations. Responsibility for trading account monitoring is the Client’s duty.",
        "2.2. Company reserves the right to amend this Agreement notifying the Client about it at least 2 business days prior to the effective date of these amendments. Posting the relevant information on the main page of the www.Capital Online Venture Trade.com website for the period of at least 3 days is also considered as notification. The Client undertakes to consult and review regularly the www.Capital Online Venture Trade.com website to be timely informed about any changes in respect of this Agreement and the Services in particular.",
        "2.3. All rights and obligations of the Company and the Client represent a long-term commitment, which remains in force up until the Company receives a Client’s notice of termination of this Agreement or closing his trading account.",
        "2.4. Company cannot be held responsible for non-fulfilment of any obligations involving quality of online communication of information to the Client terminal or use of information, software, and interfaces of websites which do not belong to the Company.",
        "2.5. Client realizes that any market recommendations and information communicated to the Client by the Company, its representatives, or third parties do not constitute as an offer to make operation/transaction.",
        "2.6. Client realizes that:",
        "a) any payments which Client makes using the banking details received earlier than 24 hours prior to the payment execution time or not at the appropriate sections of the Company website, which differ from the Company’s current banking details do not entail the Company’s liability or obligations concerning investigation, refund or credit of this payment to the Client’s trading balance.",
        "b) any actions committed by the Client or third parties (by Client’s fault or with Client’s participation), which destabilize the Company’s business or performance of the Company’s services, equipment, or software may result in the Company’s refusal (on the basis of private law) of servicing the Client’s current trading account and cancellation of all trading orders, with full refund of the remaining deposit. Company must notify the Client about the reasons for the above decision. Company also may reject such Client’s new registration in the future.",
        "2.7. Persons under 18 years or under the age of majority, which is legally allowed to participate in financial trading, can not use the services of the Website.",
        "2.8. The Client declares and guarantees that:",
        "- he is sane, - his age is minimum 18 years old,",
        "- information which Client provided to the Company is true and correct,",
        "- he shall notify the Company about any and all changes in this information within one day after the change took place,",
        "- the e-mail address used by the Client is not in use by anyone else. Any and all notices, requests, complaints, and information received from this address are considered as sent by the Client.",
        "2.9. Company may request from Client a confirmation of accuracy of the personal account data for a due diligence and in the event of a withdrawal request. Company may request a notarized copy of the Client’s ID and the document proving his place of residence. Inability to provide requested documents may result in the Company’s refusal (on the basis of private law) of servicing the Client’s current trading account and cancellation of all trading orders, with full refund of the remaining deposit. Company must notify the Client about the reasons for the above decision. Company also may reject such Client’s new registration in the future.",
        "2.10. Client agrees to provide all documents and notices, notarize documents, and take all other actions which the Company may request in accordance with the Anti Money Laundering Policy",
        "2.11. In case of double registration of the same Client, the Company has the right to cancel duplicated registrations, cancel opened positions and withdrawal requests. All duplicated accounts will be frozen for investigation purposes.",
      ],
    },
    {
      title: "3. Customer risk notice",
      content: [
        "3.1. Client understands that the risk of suffering trading losses may be quite significant. Client should analyze his financial capabilities before engaging in trading operations.",
        "3.2. Client realizes that he may completely lose his all initial funds and any additional funds used when trading on the market.",
        "3.3. Client agrees that the company cannot be held responsible for Client’s losses caused, directly or indirectly, by the government restrictions, restrictions of foreign exchange or market rules, suspension of trading, military operations, or other conditions usually called the ‘force majeure circumstances’ which lie beyond the company’s control.",
        "3.4. Client was informed about additional risks associated with the specifics of functioning of e-trade systems and the problems of Internet communication nodes.",
        "3.5. Client bears full responsibility for the risks associated with the storage of trading account access data, and must ensure that third parties cannot access the trade terminals. Client’s losses and risks associated with the restoration of access to the trading account imposes no obligations on the Company, other than to provide new access data to the Client after identification procedure.",
      ],
    },
    {
      title: "4. Terms of transactions",
      content: [
        "4.1. Trade is executed at prices offered to the Client, which are shown in the window of Clients’ trading terminal.",
        "4.2. Company may decline the Clients’ request to open a new position, if the balance on his trading account is not sufficient to place a minimal trade.",
        "4.3. Company may suspend its operations or revise client’s trades for the following reasons: failures on part of Internet access providers, failures in information flows, hacker attacks, and other illegal actions against the Company’s servers and equipment, force majeure circumstances, and suspension of trading on financial markets which concerns financial instruments used by the Company.",
        "4.4. Company may revise (change) an executed trade upon discovery of software malfunction within 5 trading sessions after malfunction was discovered. In this case, Client will be provided by a market prices history from at least 2 independent quotes sources.",
        "4.5. The Company has the right to cancel Clients’ trading orders and reject service provision, if fraud attempts were done in order to make profit using particularities of trading conditions and trading equipment, including registrations in Capital Online Venture Trade affiliate programs with a purpose of getting an extra profit from trading activity, where trading account holder and affiliate account holder is the same person, or trading account and affiliate account is operated by the same person.",
        "4.6. Under certain trading conditions, the Client should note that it may be impossible to execute an Order at their requested price. In such cases the Company reserves the right to execute the Order at the first available price. Such instances may occur during times of high market volatility and price fluctuations e.g. when the price of an asset rises or falls in one trading session to such an extent that, under the rules of the relevant exchange, trading is suspended or restricted.In the event that the Company is unable to proceed with an Order in relation to price or size or any reason, the Order will be executed at the first available price or not executed at all. In addition, please note, that the Company is entitled, at any time and at its discretion, without giving any notice or explanation to the Client, to decline or refuse to transmit or arrange for the execution of any Order or request of the Client in circumstances explained in the Terms & Conditions.The Company does not accept any orders outside of the market hours of the relevant underlying financial instrument.",
      ],
    },
    {
      title: "5. Disputes, complaints and inquiries",
      content: [
        "5.1. The parties will try to settle all disputes by negotiation. The Company may accept Client’s complaints for review, if these complaints were expressed in writing and received within three calendar days after the dispute occurrence date.",
        "5.2. Client’s inquiries will be considered as official and treated, if these inquiries were placed and received by the Company via the Company’s website interface, by e-mail sent to the addresses of the Company’s corresponding services, or by regular mail. Inquiries placed using online communication programs, such as Skype or similar, cannot be considered as official.",
        "5.3. The Company will review Client’s complaints within ten business days after receiving from the Client all necessary and sufficient information which concerns this complaint.",
        "5.4. In the event of disagreements concerning Client’s operations or the state of his trading account, the parties will review the protocols of Client’s operations using Company’s data.",
        "5.5. If the Client will breach any of the above paragraphs, the Company reserves the right to restrict the Client access to its services and make a refund of the Client’s available deposit. Termination of service and refund of the deposit will come into effect upon expiration of 5 banking days after the Client was sent a notice by e-mail provided at the time of registration of trading account.",
        "5.6. In case of failure to reach an agreement through negotiations and correspondence within 3 (three) months from the date of the initiation of a dispute its further consideration will be directed towards the justifiability in accordance with the laws of the Republic of Seychelles.",
      ],
    },
    {
      title: "6. Know your customer",
      content: [
        "6.1. The Company has the right to request the customer to confirm his identity and information provided upon registration. At any time Client can be asked to provide an electronic copy, certified copy or notarized copy of a passport (at the discretion of the Company).",
        "6.2. If the Client has not received a request to provide the documents, the procedure of enhanced verification is not mandatory, but the Client can voluntarily send a copy of the passport or other proof of identity.",
        "6.3. In the case customer registration data (name, address or telephone number) have changed, the customer shall immediately notify the Company’s customer service asking to change the data.",
        "6.4. All withdrawal requests should be processed to the same account, from where trading deposit was initially transferred.",
        "6.5. Customer acknowledges that the registration data, referred to him for opening an account can be used by the Company in the fight against money laundering.",
        "6.6. Customer is responsible for the authenticity of submitted documents (copies) and recognizes the right of the Company, in case of doubt about their authenticity, to contact authorities of the issuer of the document to verify its authenticity and if it detects a falsification of the document, Company has the right to place an account on hold and conduct an investigation.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D1F] text-gray-200 py-28 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Terms & Conditions for Capital Online Venture Trade. Please read these terms carefully before using our services.
        </p>
      </motion.div>

      {/* Intro Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl mx-auto mb-12 bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl"
      >
        <p className="text-gray-300 leading-relaxed italic">
          The Website and Content may be available in multiple languages. The English version is the original version and the only one binding on Capital Online Venture Trade; it shall prevail on any other version in case of discrepancy. Capital Online Venture Trade shall not be responsible for any erroneous, inadequate, or misleading translations from the original version into other languages. Capital Online Venture Trade as the Company, offers access to its web page and use related services by any individual or corporate entity (hereinafter referred to as the Client) according to the procedure and on the terms and conditions described in this Agreement. The Agreement becomes effective as of the date when the Client opened a trading account and transferred funds to the Company’s account(s) to ensure minimum trading deposit.
        </p>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
          >
            <div className="bg-gray-900/30 hover:bg-gray-900/50 transition-colors duration-300 p-8 rounded-2xl border border-white/5 group-hover:border-white/10 shadow-xl">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <span className="mr-4 h-8 w-1 bg-blue-500 rounded-full" />
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((para, pIndex) => (
                  <p key={pIndex} className="text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto mt-20 text-center border-t border-white/5 pt-10"
      >
        <p className="text-gray-500 text-sm mb-4">
          Capital Online Venture Trade © {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
            Return to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
