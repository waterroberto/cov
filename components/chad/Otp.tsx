import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";

interface InputOTPDemoProps {
  maxLength: number;
  onChange?: (value: string) => void; // Callback function to get OTP value
  onValidate?: (isValid: boolean) => void; // Optional validation callback

}

export function InputOTPDemo({ maxLength, onChange, onValidate }: InputOTPDemoProps) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("")

 const handleChange = (value: string) => {
    // Only allow numbers (optional)
    if (!/^\d*$/.test(value)) {
      setError("Only numeric values are allowed");
      return;
    }

    setOtp(value);
    setError(""); // Clear error on valid input

    if (onChange) {
      onChange(value);
    }

    // Validation: Check if OTP is fully entered
    const isValid = value.length === maxLength;
    if (onValidate) {
      onValidate(isValid);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP maxLength={maxLength} value={otp} onChange={handleChange}>
        <InputOTPGroup className="gap-1 sm:gap-2">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot   
              key={index} 
              index={index} 
              className="w-10 h-10 sm:w-14 sm:h-14 text-lg sm:text-2xl border-2 border-slate-600 bg-slate-800/50 text-white rounded-lg text-center transition-all duration-300 focus:border-blue-500 outline-none"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
