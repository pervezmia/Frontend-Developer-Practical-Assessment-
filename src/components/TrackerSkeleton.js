export default function TrackerSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Loading order status">
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-14 w-full rounded-xl bg-slate-100" />
      </div>
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded bg-slate-200" />
              <div className="h-3 w-44 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-16 rounded-2xl border border-slate-200 bg-white" />
    </div>
  );
}