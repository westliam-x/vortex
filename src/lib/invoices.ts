/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = (pdfFonts as any).vfs;

import type { TDocumentDefinitions, Content, TableCell } from "pdfmake/interfaces";

//
// ---------- Types ----------
//
export type Currency = "NGN" | "USD";

export type LineItem = {
  description: string;
  quantity: number;
  rate: number;
};

export type CustomField = { label: string; value: string };

export type Invoice = {
  id: string;
  createdAt: number | string;
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

//
// ---------- Utilities ----------
//
export const STORAGE_KEY = "vortex_invoices";

export const genId = () => Math.random().toString(36).slice(2, 10);

export const formatMoney = (n: number, currency: Currency) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
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

// margin helper to satisfy TS tuple typing
const m = (l = 0, t = 0, r = 0, b = 0): [number, number, number, number] => [
  l,
  t,
  r,
  b,
];

//
// ---------- PDF Builders ----------
//
function buildItemsTable(invoice: Invoice): Content {
  const rows: TableCell[][] = [
    [
      { text: "Description", bold: true },
      { text: "Qty", bold: true, alignment: "center" },
      { text: "Rate", bold: true, alignment: "right" },
      { text: "Total", bold: true, alignment: "right" },
    ],
    ...invoice.items.map((it) => [
      it.description,
      { text: it.quantity.toString(), alignment: "center" },
      { text: formatMoney(it.rate, invoice.currency), alignment: "right" },
      {
        text: formatMoney(it.quantity * it.rate, invoice.currency),
        alignment: "right",
      },
    ]),
  ];

  return {
    table: {
      widths: ["*", "auto", "auto", "auto"],
      body: rows,
    },
    layout: "lightHorizontalLines",
    margin: m(0, 10, 0, 10),
  };
}

function buildTotalsTable(invoice: Invoice): Content {
  const totals = computeTotals(invoice);

  const rows: TableCell[][] = [
    [
      "Subtotal",
      { text: formatMoney(totals.sub, invoice.currency), alignment: "right" },
    ],
    [
      "Tax",
      { text: formatMoney(totals.tax, invoice.currency), alignment: "right" },
    ],
    [
      "Discount",
      {
        text: formatMoney(totals.discount, invoice.currency),
        alignment: "right",
      },
    ],
    [
      { text: "Total", bold: true },
      {
        text: formatMoney(totals.total, invoice.currency),
        bold: true,
        alignment: "right",
      },
    ],
  ];

  return {
    table: {
      widths: ["*", "auto"],
      body: rows,
    },
    layout: "noBorders",
    margin: m(0, 20, 0, 0),
  };
}

//
// ---------- Exported PDF Generator ----------
//
export async function downloadInvoicePDF(invoice: Invoice) {
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: m(40, 60, 40, 60),
    content: [
      { text: invoice.businessName, style: "header" },
      {
        text: `Invoice #${invoice.invoiceNumber || invoice.id}`,
        margin: m(0, 0, 0, 20),
      },

      {
        columns: [
          [
            { text: "Bill To:", bold: true },
            { text: invoice.clientName || "" },
            { text: invoice.clientEmail || "" },
            { text: invoice.clientPhone || "" },
          ],
          [
            { text: "From:", bold: true },
            { text: invoice.yourName },
            { text: invoice.yourEmail || "" },
            { text: invoice.yourPhone || "" },
          ],
        ],
        margin: m(0, 0, 0, 20),
      },

      buildItemsTable(invoice),
      buildTotalsTable(invoice),

      ...(invoice.notes
        ? [{ text: `Notes:\n${invoice.notes}`, margin: m(0, 20, 0, 0) }]
        : []),
      ...(invoice.terms
        ? [{ text: `Terms:\n${invoice.terms}`, margin: m(0, 10, 0, 0) }]
        : []),
    ],

    styles: {
      header: { fontSize: 18, bold: true, margin: m(0, 0, 0, 10) },
    },
    defaultStyle: { fontSize: 10 },
  };

  pdfMake.createPdf(docDefinition).download(`invoice-${invoice.id}.pdf`);
}
