"use client";
import { useForm, useFieldArray, type DefaultValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, Invoice, genId, formatMoney, downloadInvoicePDF } from "@/lib/invoices";
import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import { useProfile } from "@/hooks/auth/useProfile";
import { useInvoices } from "@/hooks/invoices/useInvoices";
import { toast } from "react-toastify";

const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().min(1),
  rate: z.coerce.number().min(0),
});
const customFieldSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const formSchema = z.object({
  currency: z.enum(["NGN", "USD"]),
  businessName: z.string().min(2),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional().or(z.literal("")),
  clientPhone: z.string().optional(),
  yourName: z.string().min(2).optional(),
  yourEmail: z.string().email().optional().or(z.literal("")),
  yourPhone: z.string().optional(),
  invoiceNumber: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  items: z.array(itemSchema).min(1),
  taxPercent: z.coerce.number().min(0).max(100).optional().or(z.nan()),
  discount: z.coerce.number().min(0).optional().or(z.nan()),
  notes: z.string().optional(),
  terms: z.string().optional(),
  customFields: z.array(customFieldSchema).optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: DefaultValues<FormData> = {
  currency: "NGN",
  businessName: "",
  items: [{ description: "", quantity: 1, rate: 0 }],
  customFields: [],
  issueDate: new Date().toISOString().slice(0, 10),
};

function Tooltip({ text }: { text: string }) {
  return (
    <div className="relative group inline-flex">
      <Info size={14} className="ml-1 text-[var(--text-subtle)] cursor-pointer" />
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block w-max bg-black/80 text-xs text-gray-200 px-2 py-1 rounded-md shadow-lg z-10">
        {text}
      </span>
    </div>
  );
}

export default function AddInvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as unknown as import("react-hook-form").Resolver<FormData, unknown>,
    defaultValues,
  });

  const { fields, remove, append } = useFieldArray({ control, name: "items" });

  const currency = watch("currency");
  const items = watch("items");
  const taxPercent = Number(watch("taxPercent") || 0);
  const discount = Number(watch("discount") || 0);

  const sub = useMemo(
    () =>
      items.reduce(
        (s, it) => s + (Number(it.quantity) || 0) * (Number(it.rate) || 0),
        0
      ),
    [items]
  );
  const tax = useMemo(() => (sub * taxPercent) / 100, [sub, taxPercent]);
  const total = useMemo(() => Math.max(0, sub + tax - discount), [sub, tax, discount]);

  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();
  const { create } = useInvoices({ autoFetch: false });

  useEffect(() => {
    if (!profile) return;
    reset((prev) => ({
      ...prev,
      yourName: profile.name,
      yourEmail: profile.email,
      yourPhone: profile.phone,
    }));
  }, [profile, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const invoice: Invoice = {
        id: genId(),
        createdAt: Date.now(),
        currency: data.currency,
        businessName: data.businessName,
        clientName: data.clientName || undefined,
        clientEmail: data.clientEmail || undefined,
        clientPhone: data.clientPhone || undefined,
        yourName: profile?.name ?? "",
        yourEmail: profile?.email || undefined,
        yourPhone: profile?.phone || undefined,
        invoiceNumber: data.invoiceNumber || undefined,
        issueDate: data.issueDate || undefined,
        dueDate: data.dueDate || undefined,
        items: data.items,
        taxPercent: Number.isNaN(Number(data.taxPercent)) ? 0 : Number(data.taxPercent),
        discount: Number.isNaN(Number(data.discount)) ? 0 : Number(data.discount),
        notes: data.notes || undefined,
        terms: data.terms || undefined,
        customFields: data.customFields?.filter((f) => f.label && f.value),
      };

      await create(invoice);
      await downloadInvoicePDF(invoice);
      toast.success("Invoice created and downloaded.");
      reset();
    } catch {
      toast.error("Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        toast.error("Please fix the highlighted errors.");
      })}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <label className="text-sm text-[var(--text-muted)] flex items-center">
          Currency <Tooltip text="Select the currency for this invoice" />
        </label>
        <div className="flex bg-[var(--surface-2)] rounded-md border border-[var(--border)] overflow-hidden">
          {(["NGN", "USD"] as Currency[]).map((c) => (
            <label
              key={c}
              className={`px-3 py-1 text-sm cursor-pointer ${
                currency === c ? "bg-[var(--accent-strong)] text-[#041017]" : "text-[var(--text-muted)]"
              }`}
            >
              <input {...register("currency")} type="radio" value={c} className="hidden" />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Business (Bill To) <Tooltip text="Who you are billing" />
          </label>
          <input
            {...register("businessName")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
          {errors.businessName ? (
            <p className="text-xs text-[var(--error)] mt-1">{String(errors.businessName.message)}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Invoice # <Tooltip text="Optional unique number for tracking" />
          </label>
          <input
            {...register("invoiceNumber")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Issue Date <Tooltip text="When this invoice is created" />
          </label>
          <input
            type="date"
            {...register("issueDate")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Due Date <Tooltip text="The deadline for payment" />
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Client Name <Tooltip text="Full name of the client being billed" />
          </label>
          <input
            {...register("clientName")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Client Email <Tooltip text="Client email for invoice delivery" />
          </label>
          <input
            type="email"
            {...register("clientEmail")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Client Phone <Tooltip text="Optional phone number for contact" />
          </label>
          <input
            {...register("clientPhone")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-[var(--text-muted)] mb-2 flex items-center">
          Items <Tooltip text="List products or services with quantity and rate" />
        </label>
        {fields.map((f, i) => (
          <div key={f.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
            <input
              placeholder="Description"
              {...register(`items.${i}.description` as const)}
              className="md:col-span-6 px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
            />
            <input
              type="number"
              min={1}
              step={1}
              placeholder="Qty"
              {...register(`items.${i}.quantity` as const)}
              className="md:col-span-2 px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Rate"
              {...register(`items.${i}.rate` as const)}
              className="md:col-span-2 px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-full bg-[rgba(239,68,68,0.12)] text-[var(--error)] border border-[var(--error)]/40 rounded px-2 py-2"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => append({ description: "", quantity: 1, rate: 0 })}
                className="w-full bg-[rgba(34,197,94,0.12)] text-[var(--success)] border border-[var(--success)]/40 rounded px-2 py-2"
              >
                Add
              </button>
            </div>
          </div>
        ))}
        {errors.items ? (
          <p className="text-xs text-[var(--error)] mt-1">{String(errors.items.message)}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Tax % <Tooltip text="Percentage tax to apply on subtotal" />
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            {...register("taxPercent")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Discount ({currency}) <Tooltip text="Fixed discount in selected currency" />
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("discount")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div className="md:col-span-2 text-right">
          <p className="text-sm text-[var(--text-muted)]">
            Subtotal: {formatMoney(sub, currency)}
          </p>
          <p className="text-sm text-[var(--text-muted)]">Tax: {formatMoney(tax, currency)}</p>
          <p className="text-lg text-[var(--text)] font-semibold mt-1">
            Total: {formatMoney(total, currency)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Notes <Tooltip text="Optional message for the client" />
          </label>
          <textarea
            rows={3}
            {...register("notes")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--text-muted)] mb-1 flex items-center">
            Terms <Tooltip text="Payment terms or conditions" />
          </label>
          <textarea
            rows={3}
            {...register("terms")}
            className="w-full px-3 py-2 rounded-md bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--accent-strong)] hover:bg-[var(--accent)] transition text-[#041017] py-2 rounded-md cursor-pointer"
      >
        {loading ? "Creating..." : "Create & Download"}
      </button>
    </form>
  );
}
