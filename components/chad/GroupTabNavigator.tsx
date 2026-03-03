"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";

interface GroupTabNavigatorProps {
  options: { value: string; label: string }[];
  currentValue: string;
  onValueChange?: (val: string) => void;
}

export default function GroupTabNavigator({
  options,
  onValueChange,
  currentValue,
}: GroupTabNavigatorProps) {
  const [val, setVal] = useState(currentValue);

  const changeSelection = useCallback(() => {
    if (val !== currentValue && onValueChange) onValueChange(val);
  }, [currentValue, onValueChange, val]);

  useEffect(() => {
    changeSelection();
  }, [changeSelection]);

  if (!options || !options.length) return null;

  return (
    <div className="p-2 px-4 rounded-lg bg-[#F6F6F6] flex items-center flex-wrap gap-2 w-fit">
      {options.map(({ label, value }) => (
        <button
          type="button"
          key={value}
          onClick={() =>
            value.toLowerCase() !== val.toLowerCase() &&
            setVal(value.toLowerCase())
          }
          className={cn(
            "py-1.5 px-4 rounded-lg capitalize cursor-pointer text-sm font-medium",
            currentValue.toLowerCase() === value.toLowerCase()
              ? "shadow-sm bg-white text-gray-1"
              : "text-gray-3"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
