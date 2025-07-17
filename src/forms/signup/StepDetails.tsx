"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";

const schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .regex(/^\+?[0-9\s\-]+$/, "Invalid phone number"),
    country: z.string().min(2, "Country is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/i, "Password must contain a letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const StepDetails = ({
  email,
  initialData,
  onBack,
}: {
  email: string;
  initialData: Partial<FormData>;
  onBack: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const formData = {
      email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phone,
      country: data.country,
    };

    try {
      await makeRequest({
        url: API_ROUTES.AUTH.REGISTER,
        method: "POST",
        data: formData,
      });
      toast.success("Account created! Redirecting...");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#090909] border border-[#2F2F41] p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <UserPlus className="mx-auto text-white mb-2" size={24} />
        <h2 className="text-xl font-bold text-white">Complete Your Details</h2>
        <p className="text-sm text-gray-400">
          Let&apos;s personalize your Vortex account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="e.g. John"
              className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
            />
            {errors.firstName && (
              <p className="text-xs text-red-400 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="e.g. Doe"
              className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone")}
            placeholder="e.g. +2348123456789"
            className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Country</label>
          <input
            {...register("country")}
            placeholder="e.g. Nigeria"
            className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
          />
          {errors.country && (
            <p className="text-xs text-red-400 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Create a password"
            className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
          />
          {errors.password && (
            <p className="text-xs text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Re-enter password"
            className="w-full px-3 py-2 rounded-md bg-[#141421] border border-gray-700 text-white focus:ring-2 focus:ring--[#985EFF]"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 cursor-pointer rounded-lg bg-[#985EFF] hover:bg-[#985EFF] text-white font-medium transition"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 mt-3 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-white transition"
        >
          ← Back
        </button>
      </form>
    </div>
  );
};

export default StepDetails;
