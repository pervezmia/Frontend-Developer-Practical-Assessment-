import { STEPS } from "@/data/orders";
import { TONES } from "@/lib/tones";

export default function Timeline({ order }) {
  const t = TONES[order.tone];
  const showAlertIcon = order.tone === "danger" || order.tone === "warning";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Delivery timeline</h3>
      <ol className="mt-4">
        {STEPS.map((step, i) => {
          const state =
            i < order.currentStep ? "done" : i === order.currentStep ? "current" : "upcoming";
          const isLast = i === STEPS.length - 1;
          const time = order.times[i];
          const description =
            isLast && order.tone === "danger"
              ? "The courier marked this package as delivered."
              : step.description;

          return (
            <li
              key={step.label}
              aria-current={state === "current" ? "step" : undefined}
              className="relative flex gap-3 pb-6 last:pb-0"
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-[13px] top-7 w-0.5 ${
                    i < order.currentStep ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              )}

              {state === "done" && (
                <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
                  ✓
                </span>
              )}
              {state === "current" && (
                <span
                  className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ${t.solid} ${t.ring}`}
                >
                  {showAlertIcon ? "!" : <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
              )}
              {state === "upcoming" && (
                <span className="z-10 h-7 w-7 shrink-0 rounded-full border-2 border-slate-300 bg-white" />
              )}

              <div className="min-w-0">
                <p
                  className={`text-sm ${
                    state === "upcoming" ? "text-slate-500" : "font-semibold text-slate-900"
                  }`}
                >
                  {step.label}
                </p>
                <p className={`text-xs ${state === "upcoming" ? "text-slate-500" : "text-slate-600"}`}>
                  {description}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{time ?? "Pending"}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}