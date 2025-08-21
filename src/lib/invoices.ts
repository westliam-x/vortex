"use client";
import html2canvas, { type Options as Html2CanvasOptions } from "html2canvas";
import { jsPDF } from "jspdf";

export type Currency = "NGN" | "USD";

export type LineItem = {
  description: string;
  quantity: number;
  rate: number;
};

export type CustomField = { label: string; value: string };

export type Invoice = {
  id: string;
  createdAt: number;
  currency: Currency;
  businessName: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;

  yourName: string; // freelancer
  yourEmail?: string;
  yourPhone?: string;
  yourAddress?: string;

  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;

  items: LineItem[];
  taxPercent?: number;
  discount?: number;
  notes?: string;
  terms?: string;
  customFields?: CustomField[];
};

export const STORAGE_KEY = "vortex_invoices";

export const genId = () => Math.random().toString(36).slice(2, 10);

export const formatMoney = (n: number, currency: Currency) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format(isNaN(n) ? 0 : n);

export const getInvoices = (): Invoice[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
};

export const saveInvoices = (invoices: Invoice[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const computeTotals = (invoice: Invoice) => {
  const sub = invoice.items.reduce((s, it) => s + it.quantity * it.rate, 0);
  const tax = invoice.taxPercent ? (sub * invoice.taxPercent) / 100 : 0;
  const discount = invoice.discount || 0;
  const total = Math.max(0, sub + tax - discount);
  return { sub, tax, discount, total };
};

export async function downloadInvoicePDF(
  container: HTMLElement,
  filename: string
) {
    
  const hadId = !!container.id;
  const TEMP_ID = container.id || "invoice-print-root";
  if (!hadId) container.id = TEMP_ID;

  
  const render = async (
    extraOpts: Partial<Html2CanvasOptions> = {}
  ): Promise<HTMLCanvasElement> => {
    const baseOpts: Partial<Html2CanvasOptions> = {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 794,
      onclone: (clonedDoc: Document) => {
        clonedDoc
          .querySelectorAll('link[rel="stylesheet"], style')
          .forEach((n) => n.parentNode?.removeChild(n));
        const root = clonedDoc.getElementById(TEMP_ID) as HTMLElement | null;
        if (!root) return;

        
        const style = clonedDoc.createElement("style");
        style.textContent = `
          #${TEMP_ID} { background:#fff !important; color:#000 !important; font-family: Inter, Arial, Helvetica, sans-serif !important; }
          #${TEMP_ID} * { background:transparent !important; color:#000 !important; border-color:#000 !important; box-shadow:none !important; }
          #${TEMP_ID} table { border-collapse:collapse !important; width:100% !important; }
          #${TEMP_ID} th, #${TEMP_ID} td { border-top:1px solid #ddd !important; padding:8px 6px !important; }
        `;
        clonedDoc.head.appendChild(style);

        
        const apply = (el: HTMLElement) => {
          el.style.setProperty("color", "#000", "important");
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("background-color", "transparent", "important");
          el.style.setProperty("border-color", "#000", "important");
          el.style.setProperty("box-shadow", "none", "important");
        };
        apply(root);
        root.querySelectorAll("*").forEach((el) => {
          if (el instanceof HTMLElement) apply(el);
        });
      },
    };

    const opts: Partial<Html2CanvasOptions> = { ...baseOpts, ...extraOpts };
    return html2canvas(container, opts);
  };

  let canvas: HTMLCanvasElement | null = null;
  try {
    canvas = await render(); // primary attempt
  } catch {
    // Fallback: try with foreignObjectRendering enabled
    canvas = await render({ foreignObjectRendering: true });
  } finally {
    if (!hadId) container.removeAttribute("id");
  }

  if (!canvas) throw new Error("Failed to render invoice to canvas");

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let offset = 0;
  while (offset < imgHeight) {
    pdf.addImage(
      imgData,
      "PNG",
      0,
      -offset,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    offset += pageHeight;
    if (offset < imgHeight) pdf.addPage();
  }

  pdf.save(filename);
}
