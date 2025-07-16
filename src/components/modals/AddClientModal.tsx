"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  const onSubmit = (data: FormData) => {
    console.log("Adding client:", data);
    reset();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-white">
                Add New Client
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Client Name
                </label>
                <input
                  {...register("name")}
                  className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md focus:ring-2 focus:ring--[#985EFF]"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              {/* Company and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    {...register("company")}
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Project Type and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Project Type
                  </label>
                  <input
                    {...register("projectType")}
                    placeholder="e.g., Website, Branding"
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                  {errors.status && <p className="text-xs text-red-400 mt-1">{errors.status.message}</p>}
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
                  className="w-full px-3 py-2 bg-[#141421] border border-gray-700 text-white rounded-md"
                />
                {errors.notes && <p className="text-xs text-red-400 mt-1">{errors.notes.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#985EFF] hover:bg-[#985EFF] text-white py-2 rounded-md font-medium transition"
              >
                Add Client
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddClientModal;
