'use client'

import useVideoThumbnail from "@/hooks/useVideoThumbnail";
import { useRef, useState } from "react";
import StarRating from "./StarRating";

export default function TestimonialCard({ testimonial, index }: any) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<any>(null);
  const thumbnail = useVideoThumbnail(testimonial.video);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const handleVideoClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        aspectRatio: "9/14",
        cursor: "pointer",
        transform: hovered && !playing ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
        boxShadow: hovered
          ? "0 28px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)"
          : "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
        animationDelay: `${index * 120}ms`,
        animationFillMode: "both",
      }}
      className="card-entrance max-h-96 w-full"
    >
      {/* ── Thumbnail / Video background ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: thumbnail
          ? `url(${thumbnail}) center/cover no-repeat`
          : `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
        transition: "opacity 0.3s ease",
      }} />

      {/* ── Actual video (shown when playing) ── */}
      <video
        ref={videoRef}
        src={testimonial.video}
        onClick={handleVideoClick}
        onEnded={() => setPlaying(false)}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 2,
        }}
        playsInline
      />

      {/* ── Dark gradient overlay ── */}
      {!playing && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
        }} />
      )}

      {/* ── Play button ── */}
      {!playing && (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute", inset: 0, zIndex: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
          }}
        >
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* ── Quote chip ── */}
      {!playing && (
        <div style={{
          position: "absolute", top: "16px", left: "16px", right: "16px",
          zIndex: 4,
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "10px 14px",
          }}>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.82rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.5,
              margin: 0,
            }}>
              {`"${testimonial.quote}"`}
            </p>
          </div>
        </div>
      )}

      {/* ── Identity footer ── */}
      {!playing && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 4, padding: "20px 18px",
        }}>
          <StarRating />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, fontSize: "0.95rem",
            color: "#fff", margin: "8px 0 2px",
          }}>
            {testimonial.name}
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem", color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em", textTransform: "uppercase",
            margin: 0,
          }}>
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      )}
    </div>
  );
}
