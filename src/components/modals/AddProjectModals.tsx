// components/modals/CreateProjectModal.tsx
"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { z } from "zod";
import { Client } from "@/types/client";

const formSchema = z.object({
  title: z.string().min(2, "Project title is too short"),
  description: z.string().optional(),
  clientId: z.string().min(1, "Select a client"),
  deadline: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  clients: Client[];
}

const AddProjectModal = ({ isOpen, onClose, onSubmit, clients }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-white">
                Create New Project
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
                {errors.title && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Client
                </label>
                <select
                  {...register("clientId")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                >
                  <option value="">Select a client</option>
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.company || "No company"})
                    </option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.clientId.message}
                  </p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Deadline
                </label>
                <input
                  {...register("deadline")}
                  type="date"
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#985EFF] hover:bg-[#985EFF] transition text-white py-2 rounded-md"
              >
                Create Project
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProjectModal;
