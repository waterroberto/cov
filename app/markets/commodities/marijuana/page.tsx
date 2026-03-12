'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import marijuanaAbout from '@/assets/hm-harvesting-marijuana.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiMedicalDrip, GiMicroscope } from 'react-icons/gi';
import { FaCannabis } from 'react-icons/fa';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why invest in the cannabis industry?",
    subTitle: "The global cannabis market is undergoing a historic shift as legalization spreads for both medical and adult use. This creates massive opportunities in cultivation, biotechnology, and retail distribution."
  },
  {
    title: "What are the key sectors within the marijuana market?",
    subTitle: "Investment opportunities span from agricultural cultivation and production to pharmaceutical research (cannabinoid-based medicine) and specialized retail platforms."
  },
  {
    title: "How does Capital Online Ventures manage the risks in this sector?",
    subTitle: "We focus on highly regulated companies with strong balance sheets and established operations. Our expert analysts monitor local and international legislative changes to protect and grow your capital."
  },
  {
    title: "What is the long-term outlook for cannabis investments?",
    subTitle: "As social acceptance grows and medical research unlocks new applications, the cannabis industry is projected to become a major global commodity market with significant long-term growth potential."
  },
];

const features = [
  {
    icon: <GiMedicalDrip />,
    title: "Biotech Innovation",
    description: "Capitalize on the cutting edge of pharmaceutical research as new medical applications for cannabinoids are discovered and patented."
  },
  {
    icon: <FaCannabis />,
    title: "Expanding Legalization",
    description: "Benefit from the 'Green Wave' as more jurisdictions around the world move towards legal, regulated cannabis markets."
  },
  {
    icon: <BsGraphUp />,
    title: "High Growth Potential",
    description: "Invest in one of the fastest-growing consumer and medical sectors of the decade with professional-grade analysis and tools."
  }
];

export default function MarijuanaPage() {
  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                Seize the Potential of the <span className="text-emerald-600">Cannabis Renaissance</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                The cannabis industry is transforming from a fringe market into a multi-billion dollar global powerhouse. At Capital Online Ventures, we provide the expertise to navigate this high-potential landscape with confidence.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Global Expansion", desc: "Access international markets where legalization is opening new frontiers for trade and investment." },
                  { title: "Pharmaceutical Advancements", desc: "Invest in the future of medicine through companies at the forefront of cannabinoid science." },
                  { title: "Scaled Operations", desc: "We focus on institutional-grade producers with the scale and technology to dominate the market." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                      <GiMicroscope size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image 
                src={marijuanaAbout}
                alt="Cannabis Harvesting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Cannabis?"
        subtitle="Uncover the opportunities in an emerging industry that is redefining medicine and consumer products."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Cannabis <span className="text-emerald-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Understand the regulatory and economic factors driving this unique asset class.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <AccordionDemo data={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}