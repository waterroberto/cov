import React from 'react';

export default function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`my-4 rounded-2xl border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  );
}
