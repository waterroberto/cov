'use client';

import React from 'react';

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  error?: string | string[];
  required?: boolean;
  disabled?: boolean;
}

export default function Select({
  id,
  name,
  value,
  onChange,
  placeholder = 'Select an option',
  options,
  error,
  required = false,
  disabled = false,
}: SelectProps) {
  return (
    <div className='w-full'>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className='px-4 py-3 pr-10 outline-none border border-slate-600 w-full rounded-lg text-white bg-slate-700/50 focus:border-blue-500 focus:bg-slate-700 transition-all duration-200 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23999999' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className='text-red-400 text-xs font-medium mt-2 ml-0 block'>{error}</span>}
    </div>
  );
}
