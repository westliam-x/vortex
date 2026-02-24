"use client";

import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Project } from "@/types/project";
import { Client } from "@/types/client";
import { getId } from "@/lib/ids";
import { Button } from "@/components/ui";

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
  clients?: Client[];
}

const panelClass =
  "w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]";
const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/30";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--muted)]";

const EditProjectModal = ({ isOpen, onClose, project, onSubmit, clients = [] }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      clientId: getId(project.clientId) ?? "",
      deadline: project.deadline ? new Date(project.deadline).toISOString().split("T")[0] : "",
      priority: project.priority,
      status: project.status,
    },
  });

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description,
      clientId: getId(project.clientId) ?? "",
      deadline: project.deadline ? new Date(project.deadline).toISOString().split("T")[0] : "",
      priority: project.priority,
      status: project.status,
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
          <Dialog.Panel className={panelClass}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Dialog.Title className="text-xl font-semibold text-[var(--text)]">Edit Project</Dialog.Title>
                <p className="mt-1 text-sm text-[var(--muted)]">Adjust delivery details and project metadata.</p>
              </div>
              <button onClick={onClose} className="rounded-md p-1 text-[var(--text-subtle)] hover:bg-[var(--surface2)] hover:text-[var(--text)]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  {...register("title")}
                  className={inputClass}
                />
                {errors.title ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.title.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Client</label>
                <select
                  {...register("clientId")}
                  className={inputClass}
                >
                  <option value="">Select client</option>
                  {clients.map((c) => {
                    const clientId = getId(c);
                    if (!clientId) return null;
                    return (
                      <option key={clientId} value={clientId}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>
                {errors.clientId ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.clientId.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass}>Deadline</label>
                <input
                  type="date"
                  {...register("deadline")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Priority</label>
                <select
                  {...register("priority")}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select
                  {...register("status")}
                  className={inputClass}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Update Project</Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProjectModal;
