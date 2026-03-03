'use client';
import React from 'react';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  subtitle?: string;
}

export default function DashboardStatCard({
  title,
  value,
  icon,
  gradientFrom,
  gradientTo,
  borderColor,
  subtitle,
}: DashboardStatCardProps) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} p-6 border ${borderColor}`}>
      <div className='flex items-start justify-between mb-3'>
        <p className='text-gray-700 text-sm font-medium'>{title}</p>
        <span className='text-2xl'>{icon}</span>
      </div>
      <p className='text-3xl font-bold text-gray-900 mb-2'>{value}</p>
      {subtitle && <p className='text-gray-600 text-xs'>{subtitle}</p>}
    </div>
  );
}
