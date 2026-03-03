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
        <InputOTPGroup className=" gap-2">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot   
            key={index} 
            index={index} 
            className="w-14 h-14 text-2xl border-2 border-gray-300 rounded-lg text-center"

            />
            
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
