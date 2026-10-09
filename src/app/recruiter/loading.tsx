// src/app/recruiter/loading.tsx
export default function RecruiterLoading() {
  const metricPlaceholders = ["metric-1", "metric-2", "metric-3", "metric-4"];
  const rowPlaceholders = ["row-1", "row-2", "row-3", "row-4", "row-5"];

  return (
    <div className="space-y-8 pb-12 animate-pulse">
      {/* Top Banner Actions Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-zinc-200 rounded-lg" />
          <div className="h-3.5 w-72 bg-zinc-100 rounded-md" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-28 bg-zinc-200 rounded-xl" />
          <div className="h-9 w-36 bg-zinc-200 rounded-xl" />
        </div>
      </div>

      {/* Metric Cards Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricPlaceholders.map((id) => (
          <div
            key={id}
            className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-24 bg-zinc-200 rounded" />
              <div className="h-3 w-12 bg-zinc-100 rounded" />
            </div>
            <div className="h-7 w-16 bg-zinc-200 rounded-md" />
            <div className="h-3 w-32 bg-zinc-100 rounded" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-40 bg-zinc-200 rounded" />
            <div className="h-3 w-56 bg-zinc-100 rounded" />
          </div>
          <div className="h-4 w-20 bg-zinc-100 rounded" />
        </div>

        <div className="divide-y divide-zinc-100 p-2">
          {rowPlaceholders.map((id) => (
            <div key={id} className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/3 bg-zinc-200 rounded" />
                <div className="h-3 w-1/2 bg-zinc-100 rounded" />
              </div>
              <div className="h-4 w-16 bg-zinc-100 rounded hidden md:block" />
              <div className="h-4 w-16 bg-zinc-100 rounded hidden md:block" />
              <div className="flex items-center gap-2">
                <div className="h-7 w-16 bg-zinc-200 rounded-lg" />
                <div className="h-7 w-20 bg-zinc-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}