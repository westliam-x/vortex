"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import { toast } from "react-toastify";
import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";

const schema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phone: z.string().optional(),
    country: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const StepDetails = ({
  email,
  initialData,
  onBack,
}: {
  email: string;
  initialData: FormData;
  onBack: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.AUTH.REGISTER,
        method: "POST",
        data: {
          email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          country: data.country,
          password: data.password,
        },
      });
      toast.success("Account created.");
    } catch {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
        <div className="relative h-2 bg-[var(--surface-2)] mb-6 rounded-full">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: "100%", backgroundColor: "var(--accent)" }}
          />
        </div>

        <div className="text-center">
          <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
            <User size={18} style={{ color: "var(--accent)" }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Workspace details</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Finish setting up your account. We will create your workspace automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">First name</label>
              <input
                {...register("firstName")}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border ${
                  errors.firstName ? "border-[var(--error)]" : "border-[var(--border)]"
                } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
              />
              {errors.firstName ? (
                <p className="text-xs text-[var(--error)] mt-1">{errors.firstName.message}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Last name</label>
              <input
                {...register("lastName")}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border ${
                  errors.lastName ? "border-[var(--error)]" : "border-[var(--border)]"
                } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
              />
              {errors.lastName ? (
                <p className="text-xs text-[var(--error)] mt-1">{errors.lastName.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Phone</label>
              <input
                {...register("phone")}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Country</label>
              <input
                {...register("country")}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border ${
                  errors.password ? "border-[var(--error)]" : "border-[var(--border)]"
                } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
              />
              {errors.password ? (
                <p className="text-xs text-[var(--error)] mt-1">{errors.password.message}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Confirm password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border ${
                  errors.confirmPassword ? "border-[var(--error)]" : "border-[var(--border)]"
                } text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40`}
              />
              {errors.confirmPassword ? (
                <p className="text-xs text-[var(--error)] mt-1">{errors.confirmPassword.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-strong)] px-4 py-3 font-semibold text-[#041017] transition hover:bg-[var(--accent)] disabled:opacity-60"
            >
              Create workspace
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StepDetails;
