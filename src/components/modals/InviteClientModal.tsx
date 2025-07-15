"use client";

import { cn } from "@/lib";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Mock project data (replace with actual from store/api)
const projectOptions = [
  { id: "p1", name: "Ayinke Website" },
  { id: "p2", name: "Spark Website" },
  { id: "p3", name: "Skyboard Project" },
];

interface InviteClientProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Client name is required"),
  email: z
    .string()
    .min(3, "Email must be valid")
    .max(100, "Email must not exceed 100 characters")
    .email("Please enter a valid email address"),
  projectId: z.string().min(1, "Please select a project"),
});

type FormData = z.infer<typeof formSchema>;

const InviteClientModal = ({ isOpen, onClose }: InviteClientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Invite Data:", data);
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
                  Invite Client
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
                    Client Name
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
                    {...register("email")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Select Project
                  </label>
                  <select
                    {...register("projectId")}
                    defaultValue=""
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600",
                      errors.projectId && "border-red-500"
                    )}
                  >
                    <option value="" disabled>
                      -- Choose a project --
                    </option>
                    {projectOptions.map((proj) => (
                      <option key={proj.id} value={proj.id}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.projectId.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-cyan-700 hover:bg-cyan-800 transition text-white py-2 rounded-md"
                >
                  Send Invite
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InviteClientModal;
