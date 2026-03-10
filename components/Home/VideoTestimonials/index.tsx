'use client'

import { BsStar } from "react-icons/bs";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Sa Chen",
    role: "Product Designer",
    company: "Singapore",
    quote: "Completely transformed my side hustle.",
    video: '/videos/testimonies/1.mp4',
    thumbnail: null,
  },
  {
    id: 2,
    name: "Barbara Williams",
    role: "IT Expert",
    company: "USA",
    quote: "The best investment we made this year.",
    video: '/videos/testimonies/2.mp4',
    thumbnail: null,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Founder",
    company: "USA",
    quote: "I can't imagine working without it now.",
    video: '/videos/testimonies/3.mp4',
    thumbnail: null,
  },
  {
    id: 4,
    name: "Samantha Parker",
    role: "Student",
    company: "Canada",
    quote: "Best way to step up your side hustle in few simple steps.",
    video: '/videos/testimonies/4.mp4',
    thumbnail: null,
  },
  {
    id: 5,
    name: "Bridget Sal",
    role: "Cashier",
    company: "UK",
    quote: "Amazing trading strategy, easy platform to use.",
    video: '/videos/testimonies/5.mp4',
    thumbnail: null,
  },
  {
    id: 6,
    name: "Noah Graham",
    role: "Gym Coach",
    company: "US",
    quote: "Thank you for the profits, is all I can say. I have been looking for a platform like this for a long time.",
    video: '/videos/testimonies/6.mp4',
    thumbnail: null,
  },
];

export default function VideoTestimonials() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500&display=swap');

        .card-entrance {
          animation: riseIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        .testimonials-section * { box-sizing: border-box; }
      `}</style>

      <section
        className="testimonials-section"
        style={{
          background: "linear-gradient(160deg, #222 0%, #0f0f0f 60%, #111 100%)",
          padding: "100px 24px",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          borderRadius: "50%", top: "-100px", left: "-150px",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          borderRadius: "50%", bottom: "-80px", right: "-100px",
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <div  className="relative mb-8 flex flex-col items-center justify-center text-center">
               <span className="mb-4 text-xs p-2 px-4 flex items-center justify-center gap-2 border border-yellow-500 rounded-full text-dark w-fit text-yellow-500">
                          <BsStar /> Trusted by thousands of customers
                        </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, color: "#f5f5f0",
            lineHeight: 1.15, margin: "0 auto 20px",
            maxWidth: "560px",
          }}>
            Real stories from real customers
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: "400px", margin: "0 auto",
            lineHeight: 1.7,
          }}
className="text-gray-200"
          >
            Don&apos;t take our word for it — hear directly from the teams who use it every day.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative", zIndex: 1,
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}