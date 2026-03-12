'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import retirementAbout from '@/assets/retirement-plan-hero-2.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { BsShieldCheck, BsGraphUp, BsHouseDoor } from 'react-icons/bs';
import { FaFingerprint, FaHandsHelping, FaRegLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why should I start planning for retirement early?",
    subTitle: "Starting early allows you to take advantage of compound interest, meaning your investments have more time to grow. The sooner you start, the less you need to invest each month to reach your retirement goals."
  },
  {
    title: "How much should I save for retirement?",
    subTitle: "A general rule is to save at least 15% of your income annually. However, the exact amount depends on factors like your expected lifestyle, inflation, and retirement age. Our experts can help you calculate your specific needs."
  },
  {
    title: "What investment options are best for retirement?",
    subTitle: "We offer a diverse range of options including traditional and Roth IRAs, index funds, and customized stock portfolios. Diversifying your portfolio ensures a balance between risk and long-term growth."
  },
  {
    title: "How do I protect my retirement savings from inflation?",
    subTitle: "Investing in tangible assets, real estate, and equity-based funds can help. We provide strategies to ensure your purchasing power remains strong throughout your retirement years."
  },
];

const features = [
  {
    icon: <FaFingerprint />,
    title: "Personalized Strategy",
    description: "Every retirement journey is unique. We craft bespoke investment plans tailored to your specific financial goals and risk tolerance."
  },
  {
    icon: <FaHandsHelping />,
    title: "Expert Guidance",
    description: "Benefit from the wisdom of seasoned financial advisors who help you navigate market complexities and stay on track."
  },
  {
    icon: <FaRegLightbulb />,
    title: "Smart Diversification",
    description: "We optimize your portfolio across various asset classes to maximize returns while minimizing potential downsides."
  }
];

export default function RetirementPage() {
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
                Secure Your <span className="text-blue-600">Future</span> with Confidence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Retirement planning is about more than just saving—{"it's"} about ensuring your lifelong hard work translates into a secure and fulfilling future. At Capital Online Ventures, we provide the path to financial freedom.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Lifelong Income", desc: "Develop a plan that provides a steady, reliable stream of income for as long as you need it." },
                  { title: "Risk Management", desc: "Protect your hard-earned savings from market volatility and economic uncertainty." },
                  { title: "Legacy Planning", desc: "Ensure your wealth is preserved and passed on according to your wishes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <BsShieldCheck size={14} />
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
                src={retirementAbout}
                alt="Retirement Planning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Plan with Us?"
        subtitle="Experience a holistic approach to retirement that prioritizes your peace of mind and long-term security."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Retirement <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Find the answers to your most pressing questions about securing your financial future.
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