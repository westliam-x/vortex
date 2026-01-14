"use client";

import { makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
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

const InviteUserModal = ({ isOpen, onClose }: InviteUserModalProps) => {
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

  useEffect(() => {
    const load = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };

    load();
  }, []);

  const userType = watch("type");

  const handleFormSubmit = async (data: InviteFormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.USERS.INVITE,
        method: "POST",
        data,
      });
      toast.success("Invite sent successfully");
      reset({ type: "Client" });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invite failed");
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
            <DialogPanel className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-lg font-semibold text-[var(--text)]">
                  Invite a user
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-[var(--text-subtle)] hover:text-[var(--text)]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Invite as
                  </label>
                  <select
                    {...register("type")}
                    className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  >
                    <option value="Client">Client</option>
                    <option value="Team">Team Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  />
                  {errors.name ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.name.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  />
                  {errors.email ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.email.message}</p>
                  ) : null}
                </div>

                {userType === "Client" ? (
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">
                      Assign to Project
                    </label>
                    <select
                      {...register("projectId")}
                      className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                    >
                      <option value="">Select project</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.title}
                        </option>
                      ))}
                    </select>
                    {"projectId" in errors && errors.projectId?.message ? (
                      <p className="text-xs text-[var(--error)] mt-1">
                        {errors.projectId.message}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {userType === "Team" ? (
                  <>
                    <div>
                      <label className="block text-sm text-[var(--text-muted)] mb-1">
                        Select Role
                      </label>
                      <select
                        {...register("role")}
                        className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                      >
                        <option value="">Select role</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {"role" in errors && errors.role?.message ? (
                        <p className="text-xs text-[var(--error)] mt-1">
                          {errors.role.message}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--text-muted)] mb-1">
                        Assign to Projects
                      </label>
                      <select
                        {...register("projectIds")}
                        multiple
                        className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                      >
                        {projects.map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            {proj.title}
                          </option>
                        ))}
                      </select>
                      {"projectIds" in errors && errors.projectIds?.message ? (
                        <p className="text-xs text-[var(--error)] mt-1">
                          {errors.projectIds.message}
                        </p>
                      ) : null}
                    </div>
                  </>
                ) : null}

                <button
                  type="submit"
                  className="w-full mt-4 bg-[var(--accent-strong)] hover:bg-[var(--accent)] transition text-[#041017] py-2 rounded-md"
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
