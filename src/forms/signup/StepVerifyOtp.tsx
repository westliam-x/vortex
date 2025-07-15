"use client";

import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";

const StepVerifyOTP = ({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ otp: string }>();

  const onSubmit = (data: { otp: string }) => {
    if (data.otp === "123456") onVerified();
    // else show toast or error state
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#1E1E2E] border border-[#2F2F41] rounded-2xl shadow-lg p-8">
      <div className="text-center mb-6">
        <ShieldCheck className="mx-auto text-cyan-400 mb-2" size={24} />
        <h2 className="text-xl font-bold text-cyan-300">Verify Your Email</h2>
        <p className="text-sm text-gray-400">
          We sent a one-time code to <span className="text-gray-100 font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-1">OTP Code</label>
          <input
            {...register("otp", { required: "OTP is required" })}
            placeholder="e.g. 123456"
            className="w-full px-4 py-3 rounded-md bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          {errors.otp && (
            <p className="text-xs text-red-400 mt-1">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-medium transition"
        >
          Verify & Continue →
        </button>
      </form>
    </div>
  );
};

export default StepVerifyOTP;
