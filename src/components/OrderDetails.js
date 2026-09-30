"use client";

import { useState } from "react";

const fmt = (n) => `৳${n.toLocaleString("en-US")}`;

export default function OrderDetails({ order }) {
  const [open, setOpen] = useState(false);
  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = order.items.reduce((sum, i) => sum + i.qty, 0);
  const total = subtotal + order.deliveryFee;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((i) => (
            <span
              key={i.id}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white bg-slate-100 text-lg"
            >
              {i.emoji}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {count} items · {fmt(total)}
          </p>
          <p className="text-xs text-slate-500">{open ? "Hide" : "View"} order details</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="space-y-4 border-t border-slate-100 p-4">
          <ul className="space-y-3">
            {order.items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl">
                  {i.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{i.name}</p>
                  <p className="text-xs text-slate-500">
                    {i.variant} · Qty {i.qty}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-800">{fmt(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>

          <dl className="space-y-1 border-t border-slate-100 pt-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <dt>Subtotal</dt>
              <dd>{fmt(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-slate-600">
              <dt>Delivery fee</dt>
              <dd>{fmt(order.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between font-semibold text-slate-900">
              <dt>Total</dt>
              <dd>{fmt(total)}</dd>
            </div>
          </dl>

          <div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Delivery address</p>
              <p className="text-slate-800">{order.address.name}</p>
              <p className="text-slate-600">{order.address.line}</p>
              <p className="text-slate-600">{order.address.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-500">Courier</p>
                <p className="text-slate-800">{order.courier ?? "Being assigned"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tracking ID</p>
                <p className="text-slate-800">{order.trackingId ?? "Not available yet"}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Placed on {order.placedOn}</p>
          </div>
        </div>
      )}
    </section>
  );
}