"use client";

import { useEffect, useRef, useState } from "react";
import { SCENARIOS } from "@/data/orders";
import OrderTracker from "@/components/OrderTracker";
import TrackerSkeleton from "@/components/TrackerSkeleton";

export default function Home() {
  const [activeKey, setActiveKey] = useState(SCENARIOS[0].key);
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer.current);
  }, []);

  const select = (key) => {
    if (key === activeKey) return;
    clearTimeout(timer.current);
    setActiveKey(key);
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), 700);
  };

  const active = SCENARIOS.find((s) => s.key === activeKey);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-slate-50">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3">
          <h1 className="text-base font-semibold text-slate-900">Track your order</h1>
        </header>

        <div className="space-y-4 p-4">
          <div>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Preview state
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {SCENARIOS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => select(s.key)}
                  aria-pressed={s.key === activeKey}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
                    s.key === activeKey
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <TrackerSkeleton />
          ) : (
            <OrderTracker key={active.key} order={active.order} />
          )}
        </div>
      </div>
    </main>
  );
}