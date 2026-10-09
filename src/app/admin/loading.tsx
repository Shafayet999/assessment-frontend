// src/app/admin/loading.tsx
export default function AdminLoading() {
  const statPlaceholders = ["stat-1", "stat-2", "stat-3", "stat-4"];
  const listPlaceholders = ["list-1", "list-2", "list-3", "list-4", "list-5", "list-6"];

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto p-6 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-52 bg-zinc-200 rounded-lg" />
          <div className="h-3.5 w-80 bg-zinc-100 rounded-md" />
        </div>
        <div className="h-9 w-32 bg-zinc-200 rounded-xl" />
      </div>

      {/* KPI Stats Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statPlaceholders.map((id) => (
          <div
            key={id}
            className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm space-y-3"
          >
            <div className="h-3.5 w-28 bg-zinc-200 rounded" />
            <div className="h-8 w-20 bg-zinc-300 rounded-md" />
            <div className="h-3 w-36 bg-zinc-100 rounded" />
          </div>
        ))}
      </div>

      {/* Management / Data Grid Skeleton */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="h-4 w-36 bg-zinc-200 rounded" />
          <div className="h-8 w-48 bg-zinc-100 rounded-xl" />
        </div>

        <div className="space-y-3 pt-2">
          {listPlaceholders.map((id) => (
            <div
              key={id}
              className="h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-between px-4"
            >
              <div className="h-3.5 w-40 bg-zinc-200 rounded" />
              <div className="h-3.5 w-24 bg-zinc-100 rounded" />
              <div className="h-6 w-16 bg-zinc-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}