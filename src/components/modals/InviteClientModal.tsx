"use client";

import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { cn } from "@/lib";
import { fetchProjects } from "@/services/projectServices";
import { Project } from "@/types/project";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const roles = ["Admin", "Developer", "Designer", "Marketer"];

// Schema setup
const baseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  type: z.enum(["Client", "Team"]),
});

const extendedSchema = z.discriminatedUnion("type", [
  baseSchema.extend({
    type: z.literal("Client"),
    projectId: z.string().min(1, "Please select a project"),
  }),
  baseSchema.extend({
    type: z.literal("Team"),
    role: z.string().min(1, "Please select a role"),
    projectIds: z.array(z.string()).min(1, "Assign at least one project"),
  }),
]);

type InviteFormData = z.infer<typeof extendedSchema>;

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InviteFormData) => void;
}

const InviteUserModal = ({
  isOpen,
  onClose,
  onSubmit,
}: InviteUserModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(extendedSchema),
    defaultValues: { type: "Client" },
  });
  
const [projects, setProjects] = useState<Project[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        toast.error("Failed to fetch projects.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  const userType = watch("type");

  const handleFormSubmit = async (data: InviteFormData) => {
    try {
      const response = await makeRequest({
        url: API_ROUTES.USERS.INVITE,
        method: "POST",
        data,
      });
      toast.success("Invite sent successfully");
      reset({ type: "Client" });
      onClose();
    } catch (err) {
      console.error("Invite error:", err);
      toast.error(err instanceof Error ? err.message : "Invite failed");
      toast.error("Invite failed");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild as={Fragment}>
            <DialogPanel className="w-full max-w-md bg-[#1E1E2E] border border-[#2F2F41] p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-lg font-semibold text-gray-100">
                  Invite a User
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Invite as
                  </label>
                  <select
                    {...register("type")}
                    className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
                  >
                    <option value="Client">Client</option>
                    <option value="Team">Team Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700",
                      errors.name && "border-red-500"
                    )}
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
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {userType === "Client" && (
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Assign to Project
                    </label>
                    <select
                      {...register("projectId")}
                      className={cn(
                        "w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700",
                        "projectId" in errors && "border-red-500"
                      )}
                    >
                      <option value="">-- Select Project --</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.title}
                        </option>
                      ))}
                    </select>
                    {"projectId" in errors && errors.projectId?.message && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.projectId.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Team Role & Project Assignments */}
                {userType === "Team" && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">
                        Select Role
                      </label>
                      <select
                        {...register("role")}
                        className={cn(
                          "w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700",
                          "role" in errors && "border-red-500"
                        )}
                      >
                        <option value="">-- Select Role --</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {"role" in errors && errors.role?.message && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">
                        Assign to Projects
                      </label>
                      <select
                        {...register("projectIds")}
                        multiple
                        className={cn(
                          "w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700",
                          "projectIds" in errors && "border-red-500"
                        )}
                      >
                        {projects.map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            {proj.title}
                          </option>
                        ))}
                      </select>
                      {"projectIds" in errors && errors.projectIds?.message && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.projectIds.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#985EFF] hover:bg-[#985EFF] transition text-white py-2 rounded-md"
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

export default InviteUserModal;
