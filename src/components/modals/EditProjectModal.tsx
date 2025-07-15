"use client";

import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Project } from "@/types/project";
import { Client } from "@/types/client";

const formSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().optional(),
  clientId: z.string().min(1, "Client is required"),
  deadline: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Pending", "In Progress", "Completed", "Archived"]),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (updatedData: Partial<Project>) => void;
  clients?: Client[]; // optional if you want to render client dropdown
}

const EditProjectModal = ({
  isOpen,
  onClose,
  project,
  onSubmit,
  clients = [],
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...project,
      deadline: project.deadline
        ? new Date(project.deadline).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    reset({
      ...project,
      deadline: project.deadline
        ? new Date(project.deadline).toISOString().split("T")[0]
        : "",
    });
  }, [project, reset]);

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-cyan-300">
                Edit Project
              </Dialog.Title>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Title</label>
                <input
                  {...register("title")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Client</label>
                <select
                  {...register("clientId")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                >
                  <option value="">Select client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="text-xs text-red-400 mt-1">{errors.clientId.message}</p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Deadline</label>
                <input
                  type="date"
                  {...register("deadline")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Priority</label>
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

              {/* Status */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-700 hover:bg-cyan-800 transition text-white py-2 rounded-md"
              >
                Update Project
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProjectModal;
