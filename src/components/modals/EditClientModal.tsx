"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Client } from "@/types/client";
import { Button } from "@/components/ui";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Pending"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  onUpdate: (updatedClient: Client) => void;
}

const panelClass =
  "w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]";
const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/30";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--muted)]";

const EditClientModal = ({ isOpen, onClose, client, onUpdate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      notes: client.notes,
    },
  });

  const submitHandler = (data: FormData) => {
    onUpdate({ ...client, ...data });
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
                <Dialog.Title className="text-xl font-semibold text-[var(--text)]">Edit Client</Dialog.Title>
                <p className="mt-1 text-sm text-[var(--muted)]">Update contact and account information.</p>
              </div>
              <button onClick={onClose} className="rounded-md p-1 text-[var(--text-subtle)] hover:bg-[var(--surface2)] hover:text-[var(--text)]">
                <X size={20} />
              </button>
            </div>

              <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  {...register("name")}
                  className={inputClass}
                />
                {errors.name ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className={inputClass}
                />
                {errors.email ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.email.message}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    {...register("phone")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    {...register("company")}
                    className={inputClass}
                  />
                </div>
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

              <div>
                <label className={labelClass}>Notes</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Update Client</Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditClientModal;
