"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API_ROUTES from "@/endpoints/routes";
import { toast } from "react-toastify";
import { makeRequest } from "@/api/request";

const formSchema = z.object({
  name: z.string().min(2, "Client name is too short"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().min(2, "Company name is too short").optional(),
  phone: z.string().min(8, "Enter a valid phone number"),
  projectType: z.string().min(2, "Project type required").optional(),
  status: z.enum(["Active", "Inactive", "Pending"]),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddClientModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.CLIENT.CREATE,
        method: "POST",
        data,
      });
      toast.success("🎉 New client added successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to create client.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6 shadow-lg max-h-screen overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-xl font-semibold text-white">
                  ➕ Add New Client
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Client Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      {...register("company")}
                      className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Type + Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Project Type
                    </label>
                    <input
                      {...register("projectType")}
                      placeholder="e.g., Website, Branding"
                      className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-[#985EFF] outline-none"
                  />
                  {errors.notes && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#985EFF] to-[#6D28D9] hover:opacity-90 text-white py-2 rounded-lg font-medium transition"
                >
                  Add Client
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddClientModal;
