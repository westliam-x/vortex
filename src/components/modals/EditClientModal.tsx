"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Client } from "@/types/client";

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
          <Dialog.Panel className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-[var(--text)]">
                Edit Client
              </Dialog.Title>
              <button onClick={onClose} className="text-[var(--text-subtle)] hover:text-[var(--text)]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Name</label>
                <input
                  {...register("name")}
                  className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                />
                {errors.name ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                />
                {errors.email ? (
                  <p className="text-xs text-[var(--error)] mt-1">{errors.email.message}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Phone</label>
                  <input
                    {...register("phone")}
                    className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Company</label>
                  <input
                    {...register("company")}
                    className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Notes</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent-strong)] hover:bg-[var(--accent)] transition text-[#041017] py-2 rounded-md"
              >
                Update Client
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditClientModal;
