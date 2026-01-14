"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { z } from "zod";
import { Client } from "@/types/client";
import { makeRequest } from "@/api/request";
import { toast } from "react-toastify";
import API_ROUTES from "@/endpoints/routes";

const formSchema = z
  .object({
    title: z.string().min(2, "Project title is too short"),
    description: z.string().optional(),
    type: z.enum(["Paid", "Free"]),
    clientId: z.string().optional(),
    budget: z.string().optional(),
    deadline: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "Paid") {
        return data.clientId && data.budget;
      }
      return true;
    },
    {
      message: "Client and budget are required for paid projects",
      path: ["clientId"],
    }
  );

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ isOpen, onClose }: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "Free" },
  });

  const projectType = watch("type");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await makeRequest<{ clients: Client[] }>({
          url: API_ROUTES.CLIENT.LIST,
        });
        setClients(response.clients);
      } catch {
        toast.error("Unable to load clients");
      }
    };

    if (isOpen) fetchClients();
  }, [isOpen]);

  const submitHandler = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.PROJECT.CREATE,
        method: "POST",
        data,
      });
      toast.success("Project created successfully.");
      reset();
      onClose();
    } catch {
      toast.error("Failed to create project.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
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
            <Dialog.Panel className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-lg max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-xl font-semibold text-[var(--text)]">
                  Create New Project
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-[var(--text-subtle)] hover:text-[var(--text)] transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Title</label>
                  <input
                    {...register("title")}
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                  />
                  {errors.title ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.title.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Description</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Project Type</label>
                  <select
                    {...register("type")}
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {projectType === "Paid" ? (
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Client</label>
                    <select
                      {...register("clientId")}
                      className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                    >
                      <option value="">Select a client</option>
                      {clients.map((client) => (
                        <option key={client._id} value={client._id}>
                          {client.name} ({client.company || "No company"})
                        </option>
                      ))}
                    </select>
                    {errors.clientId ? (
                      <p className="text-xs text-[var(--error)] mt-1">{errors.clientId.message}</p>
                    ) : null}
                  </div>
                ) : null}

                {projectType === "Paid" ? (
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Budget</label>
                    <input
                      {...register("budget")}
                      type="number"
                      className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Deadline</label>
                  <input
                    {...register("deadline")}
                    type="date"
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Priority</label>
                  <select
                    {...register("priority")}
                    className="w-full px-3 py-2 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-md focus:ring-2 focus:ring-[var(--accent)]/40 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--accent-strong)] hover:bg-[var(--accent)] text-[#041017] py-2 rounded-lg font-medium transition"
                >
                  Create Project
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProjectModal;
