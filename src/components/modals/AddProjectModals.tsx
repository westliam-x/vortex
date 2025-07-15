"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { cn } from "@/lib";
const formSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must not exceed 100 characters")
    .regex(/^[\w\s\-&()]+$/, "Project name contains invalid characters"),

  description: z
    .string()
    .min(10, "Please provide a more detailed description")
    .max(500, "Description should not exceed 500 characters"),

  clientEmail: z
    .string()
    .min(5, "Email is too short")
    .email("Enter a valid email address"),

  deadline: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const now = new Date();
        const inputDate = new Date(val);
        return inputDate >= now;
      },
      { message: "Deadline must be today or a future date" }
    ),
});

type FormData = z.infer<typeof formSchema>;

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ isOpen, onClose }: AddProjectModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Project Data:", data);
    reset();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="w-full max-w-md rounded-xl bg-[#1E1E2E] border border-[#2F2F41] p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-lg font-semibold text-gray-100">
                  Add New Project
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600",
                      errors.name && "border-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    {...register("clientEmail")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600",
                      errors.clientEmail && "border-red-500"
                    )}
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.clientEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    {...register("deadline")}
                    className="w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    {...register("description")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600",
                      errors.description && "border-red-500"
                    )}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-cyan-700 hover:bg-cyan-800 transition text-white py-2 rounded-md"
                >
                  Create Project
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProjectModal;
