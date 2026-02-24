"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API_ROUTES from "@/endpoints/routes";
import { toast } from "react-toastify";
import { makeRequest } from "@/api/request";
import { Button } from "@/components/ui";

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

const panelClass =
  "w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-h-screen overflow-y-auto";
const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/30";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--muted)]";

const AddClientModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async (data: FormData) => {
    try {
      await makeRequest({
        url: API_ROUTES.CLIENT.CREATE,
        method: "POST",
        data,
      });
      toast.success("Client added successfully.");
      reset();
      onClose();
    } catch {
      toast.error("Failed to create client.");
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
            <Dialog.Panel className={panelClass}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Dialog.Title className="text-xl font-semibold text-[var(--text)]">Add New Client</Dialog.Title>
                  <p className="mt-1 text-sm text-[var(--muted)]">Create a client profile and contact details.</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md p-1 text-[var(--text-subtle)] transition hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                <div>
                  <label className={labelClass}>Client Name</label>
                  <input
                    {...register("name")}
                    className={inputClass}
                  />
                  {errors.name ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.name.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClass}
                  />
                  {errors.email ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      {...register("company")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone ? (
                      <p className="text-xs text-[var(--error)] mt-1">{errors.phone.message}</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Project Type</label>
                    <input
                      {...register("projectType")}
                      placeholder="e.g., Website, Branding"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      {...register("status")}
                      className={inputClass}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Notes</label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    className={inputClass}
                  />
                  {errors.notes ? (
                    <p className="text-xs text-[var(--error)] mt-1">{errors.notes.message}</p>
                  ) : null}
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Client</Button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddClientModal;
