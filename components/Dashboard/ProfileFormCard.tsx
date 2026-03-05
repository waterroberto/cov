'use client';
import React from 'react';

interface ProfileFormCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProfileFormCard({
  children,
  className = '',
}: ProfileFormCardProps) {
  return (
    <div className={`rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
