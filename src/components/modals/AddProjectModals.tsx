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
import API_ROUTES from "@/endpoints/routes"; // Optional, if you're using centralized routes

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
      message: "Client and amount are required for paid projects",
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
    defaultValues: {
      type: "Free",
    },
  });

  const projectType = watch("type");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await makeRequest<{ clients: Client[] }>({
          url: API_ROUTES.CLIENT.LIST,
        });
        setClients(response.clients);
      } catch (error) {
        console.error("Failed to load clients:", error);
        toast.error("Unable to load clients");
      }
    };

    if (isOpen) {
      fetchClients();
    }
  }, [isOpen]);

  const submitHandler = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.PROJECT.CREATE,
        method: "POST",
        data,
      });
      toast.success("Project created!");
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project.");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-lg bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-white">
                Create New Project
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white cursor-pointer"
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

              {/* Type */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Project Type
                </label>
                <select
                  {...register("type")}
                  className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                >
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Client (only for Paid) */}
              {projectType === "Paid" && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Client
                  </label>
                  <select
                    {...register("clientId")}
                    className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                  >
                    <option value="">Select a client</option>
                    {Array.isArray(clients) &&
                      clients.map((client) => (
                        <option key={client?._id} value={client?._id}>
                          {client?.name} ({client?.company || "No company"})
                        </option>
                      ))}
                  </select>
                  {errors.clientId && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.clientId.message}
                    </p>
                  )}
                </div>
              )}

              {/* Budget (only for Paid) */}
              {projectType === "Paid" && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Budget
                  </label>
                  <input
                    {...register("budget")}
                    type="number"
                    className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                  />
                  {errors.budget && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              )}

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

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#985EFF] hover:bg-[#8851e4] transition text-white py-2 rounded-md"
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
