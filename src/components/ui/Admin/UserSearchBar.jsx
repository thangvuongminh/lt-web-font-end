import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowDownWideShort,
  faChevronDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { SORT_OPTIONS } from "@/utils/constraints/admin/constraints";
const UserSearchBar = ({
  register,
  sortKey,
  setSortKey,
  sortMenuOpen,
  setSortMenuOpen,
}) => {
  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortKey)?.label || "Sắp xếp";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 group">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition"
        />
        <input
          type="text"
          {...register("search")}
          placeholder="Search users by email..."
          className="w-full bg-[#111827] border border-slate-800/80 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition"
        />
      </div>

      {/* Sort dropdown */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setSortMenuOpen((v) => !v)}
          className="h-full inline-flex items-center gap-2 bg-[#111827] border border-slate-800/80 hover:border-purple-500/40 rounded-xl px-4 py-3 text-sm transition min-w-[220px] justify-between"
        >
          <span className="inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon={faArrowDownWideShort}
              className="w-3.5 h-3.5 text-purple-400"
            />
            <span className="text-slate-400">Sắp xếp:</span>
            <span className="text-white font-medium">{currentSortLabel}</span>
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-3 h-3 text-slate-500 transition-transform ${
              sortMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {sortMenuOpen && (
          <div className="absolute right-0 top-full mt-2 z-20 w-56 bg-[#1a2235] border border-slate-700/80 rounded-xl shadow-2xl shadow-black/40 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {SORT_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => {
                  setSortKey(opt.key);
                  setSortMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition rounded-md mx-1
                  ${
                    sortKey === opt.key
                      ? "bg-purple-600/20 text-purple-300"
                      : "text-slate-200 hover:bg-slate-700/60"
                  }`}
              >
                <span>{opt.label}</span>
                {sortKey === opt.key && (
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="w-1.5 h-1.5 text-purple-400"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default UserSearchBar;
