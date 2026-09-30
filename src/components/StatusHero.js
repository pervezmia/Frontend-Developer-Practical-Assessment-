import { STEPS } from "@/data/orders";
import { TONES } from "@/lib/tones";

export default function StatusHero({ order, onContact, onReport }) {
  const t = TONES[order.tone];
  const a = order.alert ? TONES[order.alert.tone] : null;
  const { currentStep } = order;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Order {order.id}
          </p>
          <h2 className={`mt-1 text-xl font-semibold ${t.text}`}>{order.headline}</h2>
          <p className="mt-0.5 text-sm text-slate-600">{order.summary}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${t.bg} ${t.text}`}>
          {STEPS[currentStep].label}
        </span>
      </div>

      <div
        className="mt-4"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={currentStep + 1}
        aria-label={`Step ${currentStep + 1} of ${STEPS.length}: ${STEPS[currentStep].label}`}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={`h-1.5 rounded-full ${i <= currentStep ? t.solid : "bg-slate-200"}`}
            />
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5 text-[11px] leading-tight text-slate-500">
          {STEPS.map((s, i) => (
            <span key={s.label} className={i === currentStep ? `font-semibold ${t.text}` : ""}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className={`mt-4 rounded-xl border p-3 ${t.border} ${t.bg}`}>
        <p className="text-xs text-slate-600">{order.eta.label}</p>
        <p className={`text-sm font-semibold ${t.text}`}>{order.eta.value}</p>
        {order.eta.previous && (
          <p className="mt-0.5 text-xs text-slate-500 line-through">{order.eta.previous}</p>
        )}
      </div>

      {order.alert && (
        <div role="status" className={`mt-3 rounded-xl border p-3 ${a.border} ${a.bg}`}>
          <p className={`text-sm font-semibold ${a.text}`}>{order.alert.title}</p>
          <p className="mt-1 text-sm text-slate-700">{order.alert.message}</p>
          {order.alert.primary === "contact" && (
            <button
              type="button"
              onClick={onContact}
              className="mt-3 min-h-11 rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white hover:bg-amber-600"
            >
              Contact support
            </button>
          )}
          {order.alert.primary === "report" && (
            <button
              type="button"
              onClick={onReport}
              className="mt-3 min-h-11 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
            >
              Report a problem
            </button>
          )}
        </div>
      )}
    </section>
  );
}