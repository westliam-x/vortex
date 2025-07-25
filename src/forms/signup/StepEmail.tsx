"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Sparkles } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  purpose: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const StepEmail = ({
  initialEmail,
  onNext,
}: {
  initialEmail: string;
  onNext: (email: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: initialEmail },
  });


  const onSubmit = (data: FormData) => {
    onNext(data.email);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#090909] border border-[#2F2F41] rounded-2xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2 text-white">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Let&apos;s get started</h2>
        <p className="text-sm text-gray-400">Enter your email to begin setting up your Vortex workspace.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 pr-10 rounded-md bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring--[#985EFF]"
            />
            <Mail className="absolute right-3 top-3 text-gray-500" size={18} />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Purpose Input */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">What will you use Vortex for?</label>
          <input
            {...register("purpose")}
            placeholder="e.g. Client collaboration, tracking dev progress..."
            className="w-full px-4 py-3 rounded-md bg-[#141421] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring--[#985EFF]"
          />
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full cursor-pointer py-3 rounded-lg bg-[#985EFF] hover:bg-[#985EFF] text-white text-base font-medium transition"
        >
          Continue →
        </button>
          <p className="text-sm text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white hover:underline hover:text-white"
          >
            Sign in here
          </a>
        </p>
      </form>
    </div>
  );
};

export default StepEmail;
