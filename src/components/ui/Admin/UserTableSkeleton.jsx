import React from "react";

const UserTableSkeleton = ({ rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-12 items-center px-6 py-4 animate-pulse"
      >
        <div className="col-span-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700/60" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-700/60 rounded w-1/3" />
            <div className="h-3 bg-slate-800/80 rounded w-2/3" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="h-5 bg-slate-700/60 rounded w-20" />
        </div>
        <div className="col-span-2">
          <div className="h-3 bg-slate-700/60 rounded w-24" />
        </div>
        <div className="col-span-2">
          <div className="h-3 bg-slate-700/60 rounded w-24" />
        </div>
        <div className="col-span-1 flex justify-end">
          <div className="w-8 h-8 rounded-md bg-slate-700/60" />
        </div>
      </div>
    ))}
  </>
);

export default UserTableSkeleton;
