'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import poultryAbout from '@/assets/hm-poultry.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiChicken, GiBigEgg, GiFactory } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why invest in poultry farming?",
    subTitle: "Poultry products like eggs and meat are daily essentials with constant global demand. This ensures a reliable and steady revenue stream that is highly resistant to economic downturns."
  },
  {
    title: "How does Capital Online Ventures manage poultry farms?",
    subTitle: "We utilize automated climate-controlled facilities, precision feeding systems, and strict biosecurity protocols. This expert management minimizes mortality rates and maximizes production efficiency."
  },
  {
    title: "What are the key products in this investment?",
    subTitle: "Returns are generated from the sale of day-old chicks, table eggs, and broiler meat. We operate across the entire value chain to capture maximum profit margins for our investors."
  },
  {
    title: "How do you ensure food safety and animal welfare?",
    subTitle: "Our farms comply with international health and safety standards. Regular veterinary inspections and high-quality organic feed ensure healthy livestock and premium quality products."
  },
];

const features = [
  {
    icon: <GiBigEgg />,
    title: "Daily Cash Flow",
    description: "Benefit from the fast turnaround time in poultry cycles, providing more frequent profit distributions compared to traditional crop farming."
  },
  {
    icon: <BsShieldCheck />,
    title: "Biosecurity Focus",
    description: "Our high-tech facilities are designed to protect against diseases, ensuring a stable and secure environment for your agricultural investment."
  },
  {
    icon: <BsGraphUp />,
    title: "Scalable Growth",
    description: "Poultry farming is highly scalable. We continuously expand our operations to meet the growing global demand for high-quality protein."
  }
];

export default function PoultryPage() {
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
                Accelerate Growth with <span className="text-blue-600">Poultry</span> Investment
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Poultry farming is one of the most dynamic and efficient sectors in modern agriculture. At Capital Online Ventures, we leverage cutting-edge technology to deliver sustainable profits from this high-demand market.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Essential Demand", desc: "Stable income from products that remain daily necessities across all economic cycles." },
                  { title: "Advanced Automation", desc: "We use AI-monitored feeding and climate systems to ensure optimal growth and minimal waste." },
                  { title: "Transparent Value Chain", desc: "Follow your investment from hatchery to market with our detailed performance monitoring." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                      <GiChicken size={14} />
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
                src={poultryAbout}
                alt="Poultry Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Poultry?"
        subtitle="Enjoy the stability and fast returns of one of the world's most essential agricultural industries."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Poultry <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Get the answers you need to start investing in professional poultry operations.
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