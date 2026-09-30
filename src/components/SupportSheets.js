"use client";

import { useState } from "react";
import Sheet from "./Sheet";

const REASONS = [
  "Marked delivered, but I didn't receive it",
  "Package is damaged",
  "Wrong or missing items",
  "Delivery is very late",
  "Something else",
];

export function ContactSheet({ order, onClose }) {
  return (
    <Sheet title="Contact support" onClose={onClose}>
      <p className="text-sm text-slate-600">
        Mention order <span className="font-semibold text-slate-900">{order.id}</span> and our team
        will find it right away. Support is available 9 AM – 9 PM, every day.
      </p>
      <div className="mt-4 space-y-3">
        <a
          href="tel:+8809612345678"
          className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          <span>📞 Call us</span>
          <span className="text-slate-500">+880 9612-345678</span>
        </a>
        <a
          href={`mailto:support@example.com?subject=Help with order ${order.id}`}
          className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          <span>✉️ Email us</span>
          <span className="text-slate-500">support@example.com</span>
        </a>
      </div>
    </Sheet>
  );
}

export function ReportSheet({ order, onClose }) {
  const [reason, setReason] = useState(order.currentStep === 3 ? REASONS[0] : "");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (reason) setSent(true);
  };

  return (
    <Sheet title="Report a delivery issue" onClose={onClose}>
      {sent ? (
        <div className="py-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
            ✓
          </div>
          <p className="mt-3 text-base font-semibold text-slate-900">Report submitted</p>
          <p className="mt-1 text-sm text-slate-600">
            Reference RPT-{order.id.slice(-6)}. Our team will get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 min-h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-700">What went wrong?</legend>
            <div className="space-y-2">
              {REASONS.map((r) => (
                <label
                  key={r}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 text-sm ${
                    reason === r
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-indigo-600"
                  />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm font-medium text-slate-700">
            Additional details (optional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. The courier never called and the gate guard hasn't seen a parcel."
              className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal text-slate-800 focus:border-indigo-600 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={!reason}
            className="min-h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit report
          </button>
        </form>
      )}
    </Sheet>
  );
}