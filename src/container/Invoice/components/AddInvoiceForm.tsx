"use client";
import { useForm, useFieldArray, type DefaultValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, Invoice, genId, formatMoney, downloadInvoicePDF } from "@/lib/invoices";
import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import { getProfile } from "@/services/profileServices";
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

// Simple tooltip component
function Tooltip({ text }: { text: string }) {
  return (
    <div className="relative group inline-">
      <Info size={14} className="ml-1 text-gray-400 cursor-pointer" />
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover: w-max bg-black/80 text-xs text-gray-200 px-2 py-1 rounded-md shadow-lg z-10">
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
    resolver: zodResolver(
      formSchema
    ) as unknown as import("react-hook-form").Resolver<FormData, unknown>,
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
  const total = useMemo(
    () => Math.max(0, sub + tax - discount),
    [sub, tax, discount]
  );

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<{
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);

        // ✅ prefill form with profile once loaded
        reset((prev) => ({
          ...prev,
          yourName: response?.name,
          yourEmail: response?.email,
          yourPhone: response?.phone,
        }));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [reset]);

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
        taxPercent: Number.isNaN(Number(data.taxPercent))
          ? 0
          : Number(data.taxPercent),
        discount: Number.isNaN(Number(data.discount))
          ? 0
          : Number(data.discount),
        notes: data.notes || undefined,
        terms: data.terms || undefined,
        customFields: data.customFields?.filter((f) => f.label && f.value),
      };

      // Call parent
      // onCreate(invoice);

      await downloadInvoicePDF(
        invoice,
        `invoice_${invoice.invoiceNumber || invoice.id}.pdf`
      );

      toast.success("Invoice created & downloaded 🎉");
      reset();
    } catch (err) {
      console.error("Profile failed to submit", err);
    } finally {
      setLoading(false);
      console.log("Profile failed to submit");
      toast.error("Failed to create invoice ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log("Validation errors:", err);

        toast.error("Please fix the highlighted errors ⚠️");
      })}
      className="space-y-6"
    >
      {/* Currency */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-300 flex items-center">
          Currency <Tooltip text="Select the currency for this invoice" />
        </label>
        <div className="flex bg-[#141421] rounded-md border border-gray-700 overflow-hidden">
          {(["NGN", "USD"] as Currency[]).map((c) => (
            <label
              key={c}
              className={`px-3 py-1 text-sm cursor-pointer ${
                currency === c ? "bg-[#985EFF] text-white" : "text-gray-300"
              }`}
            >
              <input
                {...register("currency")}
                type="radio"
                value={c}
                className="hidden"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Business & Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Business (Bill To){" "}
            <Tooltip text="Who you’re billing (e.g. company name)" />
          </label>
          <input
            {...register("businessName")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
          {errors.businessName && (
            <p className="text-xs text-red-400 mt-1">
              {String(errors.businessName.message)}
            </p>
          )}
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Invoice # <Tooltip text="Optional unique number for tracking" />
          </label>
          <input
            {...register("invoiceNumber")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Issue Date <Tooltip text="When this invoice is created" />
          </label>
          <input
            type="date"
            {...register("issueDate")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Due Date <Tooltip text="The deadline for payment" />
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
      </div>

      {/* Client Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Client Name <Tooltip text="Full name of the client being billed" />
          </label>
          <input
            {...register("clientName")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Client Email <Tooltip text="Client’s email for invoice delivery" />
          </label>
          <input
            type="email"
            {...register("clientEmail")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Client Phone <Tooltip text="Optional phone number for contact" />
          </label>
          <input
            {...register("clientPhone")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
      </div>

      {/* Items */}
      <div>
        <label className=" text-sm text-gray-300 mb-2 flex items-center">
          Items{" "}
          <Tooltip text="List products or services with quantity & rate" />
        </label>
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3"
          >
            <input
              placeholder="Description"
              {...register(`items.${i}.description` as const)}
              className="md:col-span-6 px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
            />
            <input
              type="number"
              min={1}
              step={1}
              placeholder="Qty"
              {...register(`items.${i}.quantity` as const)}
              className="md:col-span-3 px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Rate"
              {...register(`items.${i}.rate` as const)}
              className="md:col-span-3 px-2 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-full bg-[#3a1020] text-red-200 border border-red-800/40 rounded px-2 py-2"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() =>
                  append({ description: "", quantity: 1, rate: 0 })
                }
                className="w-full bg-[#147f18] text-red-200 border border-green-800/40 rounded px-2 py-2"
              >
                ADD
              </button>
            </div>
          </div>
        ))}
        {errors.items && (
          <p className="text-xs text-red-400 mt-1">
            {String(errors.items.message)}
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Tax % <Tooltip text="Percentage tax to apply on subtotal" />
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            {...register("taxPercent")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Discount ({currency}){" "}
            <Tooltip text="Fixed discount in selected currency" />
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("discount")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div className="md:col-span-2 text-right">
          <p className="text-sm text-gray-300">
            Subtotal: {formatMoney(sub, currency)}
          </p>
          <p className="text-sm text-gray-300">
            Tax: {formatMoney(tax, currency)}
          </p>
          <p className="text-lg text-white font-semibold mt-1">
            Total: {formatMoney(total, currency)}
          </p>
        </div>
      </div>

      {/* Notes / Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Notes <Tooltip text="Optional message for the client" />
          </label>
          <textarea
            rows={3}
            {...register("notes")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
        <div>
          <label className=" text-sm text-gray-300 mb-1 flex items-center">
            Terms <Tooltip text="Payment terms or conditions" />
          </label>
          <textarea
            rows={3}
            {...register("terms")}
            className="w-full px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#985EFF] hover:bg-[#8851e4] transition text-white py-2 rounded-md cursor-pointer"
      >
        {loading ? "Loading..." : "Create & Download"}
      </button>
    </form>
  );
}
