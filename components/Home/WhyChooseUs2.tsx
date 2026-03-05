import customerSupport from "@/public/images/customer-support.png";
import hiddenImage from "@/public/images/hidden.png";
import clsx from "clsx";
import Image from "next/image";
import React, { useMemo } from "react";

export default function WhyChooseUs() {
  const whyChooseUs = useMemo(() => {
    return [
      {
        title: "40K+",
        subtitle: "Accounts created globally.",
        description: ` Join a Global Community of Over 40,000 Satisfied Customers Who Trust Us for Their Business and Personal Needs.`,
      },
      {
        title: "Zero Fees",
        subtitle: "No hidden fees.",
        description: `Enjoy investments with no fees. No Surprises, No Hidden Costs - Transparency is the Foundation of Our Commitment to You.`,
        image: hiddenImage,
      },
      {
        title: "24/7",
        subtitle: "Access to funds and customer support.",
        description: `Enjoy Round-the-Clock Access to Your Funds and Dedicated Customer Support Anytime, Anywhere.`,
        image: customerSupport,
      },
    ];
  }, []);

  return (
    <section className="p-4 sm:px-8 lg:px-16 xl:px-32 py-16 bg-gray-50 flex flex-col items-center justify-center">
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-xs p-2 px-4 inline-block border border-gray-400 rounded-full text-gray-600">
          Why choose us?
        </span>
        <p className="text-gray-800 font-bold text-4xl">
          Why Customers Us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-screen-lg">
        {whyChooseUs.map((why, index) => (
          <div
            key={why.title}
            className={clsx(
              "col-span-1 bg-white rounded-2xl p-6 border border-gray-100",
              index === 2 && "md:col-span-2",
            )}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="flex flex-col sm:flex-row items-end justify-between gap-8">
              {/* Content */}
              <div className="">
                <div className="mb-4">
                  <p className="text-primary font-bold text-4xl">{why.title}</p>
                  <p className="text-gray-700 font-bold">{why.subtitle}</p>
                </div>

                <div className="">
                  <p className="text-gray-500 font-light text-sm">
                    {why.description}
                  </p>
                </div>
              </div>

              {/* Image */}
              {why.image && (
                <Image 
                  src={why.image} 
                  width={200} 
                  height={200} 
                  alt={`${why.title} illustration`} 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
