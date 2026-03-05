import React, { useMemo } from "react";

import loanIcon from "@/public/assets/icons/borrow.svg";
import insuranceIcon from "@/public/assets/icons/insure.svg";
import savingsIcon from "@/public/assets/icons/save.svg";
import transactionIcon from "@/public/assets/icons/transaction.svg";
import clsx from "clsx";
import Link from "next/link";
import { BsArrowRight, BsStar } from "react-icons/bs";
import Button from "../Global/Button";

export default function PlatformFeatures() {
  const features = useMemo(() => {
    return [
      {
        icon: transactionIcon.src,
        title: "Instant Transfer",
        description:
          "Cutting-edge tools ensuring your funds reach their destination in no time.",
      },
      {
        icon: loanIcon.src,
        title: "Investment Programmes",
        description:
          "Multiple investment opportunities, starting as low as $100.",
      },
      {
        icon: savingsIcon.src,
        title: "International Payments",
        description: "Send money across borders with ease and confidence.",
      },
      {
        icon: insuranceIcon.src,
        title: "Platform Security",
        description:
          "Investments are secured by our robust insurance policies.",
      },
    ];
  }, []);

  return (
    <section className="p-4 sm:px-8 lg:px-16 xl:px-32 py-16 bg-white">
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-xs p-2 px-4 flex items-center justify-center gap-2 border border-dark rounded-full text-dark">
          <BsStar /> Benefit from a complete range of products
        </span>
        <p className="text-gray-800 font-bold text-4xl">
          Exclusive offers designed for you
        </p>
      </div>
      <div
        data-aos={"fade-right"}
        className="border border-gray-300 rounded-2xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-gray-200"
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={clsx(
              "flex items flex-col items-center justify-center gap-4 p-8 mx-auto w-full",
            )}
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
          >
            {/*  */}
            <img src={feature.icon} width={100} height={100} />
            <p className="text-xl font-semibold text-gray-700 text-center">
              {feature.title}
            </p>
            <p className="text-sm font-light text-gray-500 text-center">
              {feature.description}
            </p>
            <Link href="/register">
              <Button variant="text" className="underline text-secondary">
                Create account <BsArrowRight />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
