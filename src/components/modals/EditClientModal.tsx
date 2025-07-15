/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@/types/client";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Pending"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  onUpdate: (updatedClient: Client) => void;
}

const EditClientModal = ({ isOpen, onClose, client, onUpdate }: EditClientModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: client,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    onUpdate({ ...client, ...data });
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-cyan-300">Edit Client</Dialog.Title>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name</label>
                <input {...register("name")} className="form-input" />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input {...register("email")} className="form-input" />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone</label>
                <input {...register("phone")} className="form-input" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Company</label>
                <input {...register("company")} className="form-input" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select {...register("status")} className="form-input">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Notes</label>
                <textarea {...register("notes")} rows={3} className="form-input" />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditClientModal;
