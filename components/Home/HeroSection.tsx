"use client";

import heroSlide1 from "@/public/images/hero-image-1.png";
import heroVector from "@/public/images/vector.svg";

import blur2 from "@/public/images/blur-2.png";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { BsStar } from "react-icons/bs";
import Button from "../Global/Button";


export default function HeroSection() {
  const phrases = [
    "24/7 Smart Investments",
    "Limitless Market Opportunities",
    "40,000 Satisfied Customers",
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setAnimate(false);
      }, 800); // match animation duration
    }, 4000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <header className="p-4 sm:px-8 lg:px-16 xl:px-24 pt-40 pb-0 max-h-[95vh] overflow-hidden mb-8 bg-linear-to-tl from-gray-950 to-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl p-6 pt-16 sm:p-12 !pb-0 bg-linear-to-tr from-gray-950 to-gray-700 2xl:max-w-7xl mx-auto mb-8">
        <div data-aos="fade-left">
          <div className="mb-4 text-xs p-2 px-4 border border-white rounded-full text-white flex items-center gap-2 w-fit">
            <BsStar className="" /> 40K Accounts Created Globally
          </div>
          <h1
            className={`mt-3 transition-all duration-500 ease-in-out text-white [font-style:normal] font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[56px] ${animate ? "-translate-y-full opacity-0 blur-sm" : "translate-y-0 opacity-100 blur-0"}`}
          >
            {phrases?.[index]}
          </h1>
          <p className="sm:text-lg text-gray-100 my-4 font-light">
             Access Global Markets, Trade Forex,
            Commodities, and Stocks with Ease, and Watch Your Investments Grow
            with Confidence!
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Link href="/auth/register">
              <Button size="large" className="text-dark">
                Create Account
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="large"
                variant="outlined"
                className="text-white outline-white! border-white"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-xl mx-auto relative">
          <Image
            src={heroSlide1}
            alt="Hero image - woman smiling and holding credit card"
            width={500}
            height={500}
            className="block mx-auto relative z-[2]"
            data-aos="fade-right"
          />

          <Image
            src={heroVector}
            alt="Hero vector "
            width={500}
            height={500}
            className="absolute bottom-0 right-1/2 translate-x-1/2"
          />
        </div>
      </div>
      <div className="animate-pulse z-[-1] absolute top-0 left-16">
        <Image
          src={blur2}
          alt="Hero background blur"
          width={500}
          height={500}
          className=" opacity-40"
        />
      </div>
      
    </header>
  );
}
