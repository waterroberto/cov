'use client';
import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import livestockAbout from '@/assets/hm-livestokc-hero.jpg';
import MarketFeatures from "@/components/Market/MarketFeatures";
import { GiCow, GiSheep, GiPig } from 'react-icons/gi';
import { BsShieldCheck, BsGraphUp, BsGlobe } from 'react-icons/bs';
import { motion } from 'framer-motion';

const faqItems = [
  {
    title: "Why should I invest in livestock through Capital Online Ventures?",
    subTitle: "Livestock investment provides a tangible asset that serves as a powerful shield against inflation. Global demand for protein continues to rise, ensuring long-term profitability and sustainable growth."
  },
  {
    title: "How does livestock investment generate returns?",
    subTitle: "Returns are generated through the biological growth of animals, the sale of livestock products (meat, dairy, wool), and efficient farm management that optimizes yields and market timing."
  },
  {
    title: "How do you manage risks in livestock farming?",
    subTitle: "We implement world-class veterinary care, balanced nutrition programs, and comprehensive insurance coverage. Our facilities use advanced monitoring systems to ensure the health and safety of the animals."
  },
  {
    title: "What is the minimum investment required?",
    subTitle: "We offer flexible entry points to suit different investor profiles. Whether you're interested in individual animal ownership or large-scale farm participation, we have a plan for you."
  },
];

const features = [
  {
    icon: <GiCow />,
    title: "Expert Management",
    description: "Your investment is handled by seasoned agricultural professionals who use data-driven techniques to maximize animal health and productivity."
  },
  {
    icon: <BsShieldCheck />,
    title: "Risk Mitigation",
    description: "Benefit from advanced biosecurity measures and comprehensive insurance policies designed to protect your capital from unforeseen events."
  },
  {
    icon: <BsGraphUp />,
    title: "Stable Returns",
    description: "Capitalize on the consistent global demand for high-quality livestock products, providing a reliable stream of long-term wealth."
  }
];

export default function LivestockPage() {
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
                Unlock Profits in <span className="text-blue-600">Livestock</span> Investment
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Livestock investment offers a unique opportunity to build sustainable wealth while contributing to global food security. At Capital Online Ventures, we bridge the gap between investors and high-quality agricultural operations.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Inflation Hedge", desc: "Tangible assets like cattle and sheep historically retain value during economic uncertainty." },
                  { title: "Sustainable Growth", desc: "Our farms utilize eco-friendly practices to ensure long-term environmental and financial viability." },
                  { title: "Transparent Reporting", desc: "Stay informed with regular updates and detailed performance metrics on your agricultural holdings." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
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
                src={livestockAbout}
                alt="Livestock Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Component */}
      <MarketFeatures 
        title="Why Invest in Livestock?"
        subtitle="Discover the benefits of adding real-world agricultural assets to your diversified investment portfolio."
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Livestock <span className="text-blue-600">FAQ</span></h2>
            <p className="text-lg text-gray-600 font-medium">
              Find the clarity you need to start your journey in agricultural investment.
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