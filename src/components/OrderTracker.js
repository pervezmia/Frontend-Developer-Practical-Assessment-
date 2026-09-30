"use client";

import { useCallback, useState } from "react";
import StatusHero from "./StatusHero";
import Timeline from "./Timeline";
import OrderDetails from "./OrderDetails";
import { ContactSheet, ReportSheet } from "./SupportSheets";

export default function OrderTracker({ order }) {
  const [sheet, setSheet] = useState(null); // "contact" | "report" | null
  const close = useCallback(() => setSheet(null), []);

  return (
    <div className="space-y-4">
      <StatusHero
        order={order}
        onContact={() => setSheet("contact")}
        onReport={() => setSheet("report")}
      />
      <Timeline order={order} />
      <OrderDetails order={order} />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSheet("contact")}
          className="min-h-11 rounded-xl border border-indigo-600 bg-white text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          Contact support
        </button>
        <button
          type="button"
          onClick={() => setSheet("report")}
          className="min-h-11 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Report an issue
        </button>
      </div>

      {sheet === "contact" && <ContactSheet order={order} onClose={close} />}
      {sheet === "report" && <ReportSheet order={order} onClose={close} />}
    </div>
  );
}