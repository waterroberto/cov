'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import manganeseAbout from '@/assets/hm-maganease.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiGears, GiBatteryPack, GiDrill } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why invest in manganese?",
    subTitle: "Manganese is a critical component in steel production and is becoming increasingly vital for the manufacturing of high-capacity batteries used in electric vehicles and renewable energy storage."
  },
  {
    title: "What drives the global demand for manganese?",
    subTitle: "The primary driver is the global steel industry, but the rapid expansion of the EV market and the transition to green energy are creating significant new growth opportunities for manganese investors."
  },
  {
    title: "How does Capital Online Ventures provide access to manganese?",
    subTitle: "We offer diverse investment vehicles, including equity in leading mining operations and commodity-linked assets, allowing you to benefit from the strategic importance of this essential metal."
  },
  {
    title: "What are the risks associated with manganese investment?",
    subTitle: "Like all industrial metals, manganese can be affected by changes in global manufacturing activity and supply chain developments. We provide expert analysis to help you navigate these market dynamics."
  },
];

const features = [
  {
    icon: <GiBatteryPack />,
    title: "Eco-Energy Vitality",
    description: "Manganese is a key ingredient in the next generation of battery technology, driving the global transition to sustainable energy."
  },
  {
    icon: <GiGears />,
    title: "Industrial Backbone",
    description: "As an essential element in steel production, manganese demand is tightly linked to global infrastructure and industrial growth."
  },
  {
    icon: <BsGraphUp />,
    title: "Strategic Growth",
    description: "Capitalize on the increasing scarcity and strategic value of high-grade manganese as industrial requirements evolve."
  }
];

export default function ManganesePage() {
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
                Manganese: Powering <span className="text-blue-600">Global Innovation</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                From the foundations of our cities to the batteries in our pockets, manganese is an unsung hero of modern industry. At Capital Online Ventures, we offer you a front-row seat to its growing strategic importance.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Essential for Steel", desc: "No modern infrastructure exists without manganese, ensuring a baseline of constant industrial demand." },
                  { title: "Electric Revolution", desc: "A critical material for EV batteries, positioning manganese at the heart of the future energy landscape." },
                  { title: "Market Resilience", desc: "Diversify your commodity portfolio with a metal that has unique and irreplaceable industrial applications." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mt-1">
                      <GiDrill size={14} />
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
                src={manganeseAbout}
                alt="Manganese Mining"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Manganese?"
        subtitle="Explore the dual role of manganese as both a traditional industrial pillar and a future energy catalyst."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Manganese <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Understand the technical and market factors that make manganese a strategic asset.
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