import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import UserRow from "./UserRow";
import UserTableSkeleton from "./UserTableSkeleton";
import { SORT_OPTIONS } from "@/utils/constraints/admin/constraints";

const UserTable = ({
  users,
  loading,
  sortKey,
  onSortChange,
  openMenuId,
  onToggleMenu,
  onEdit,
  onDelete,
}) => {
  const handleHeaderSort = (field) => {
    const current = SORT_OPTIONS.find((s) => s.key === sortKey);
    if (current?.field === field) {
      const newDir = current.dir === "asc" ? "desc" : "asc";
      const next = SORT_OPTIONS.find(
        (s) => s.field === field && s.dir === newDir,
      );
      if (next) onSortChange(next.key);
    } else {
      const next = SORT_OPTIONS.find(
        (s) => s.field === field && s.dir === "desc",
      );
      if (next) onSortChange(next.key);
    }
  };

  const getSortIcon = (field) => {
    const current = SORT_OPTIONS.find((s) => s.key === sortKey);
    if (!current || current.field !== field) return faSort;
    return current.dir === "asc" ? faSortUp : faSortDown;
  };

  return (
    <>
      {/* Head */}
      <div className="grid grid-cols-12 px-6 py-3.5 bg-[#0f1422] border-b border-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <div className="col-span-4">
          <button
            type="button"
            onClick={() => handleHeaderSort("email")}
            className="inline-flex items-center gap-2 hover:text-purple-300 transition"
          >
            Name / Email
            <FontAwesomeIcon icon={getSortIcon("email")} className="w-3 h-3" />
          </button>
        </div>
        <div className="col-span-3">Roles</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2">
          <button
            type="button"
            onClick={() => handleHeaderSort("createdAt")}
            className="inline-flex items-center gap-2 hover:text-purple-300 transition"
          >
            Joined Date
            <FontAwesomeIcon
              icon={getSortIcon("createdAt")}
              className="w-3 h-3"
            />
          </button>
        </div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-slate-800/60">
        {loading ? (
          <UserTableSkeleton rows={5} />
        ) : users.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-slate-400">
              No users match your filters.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search or role filter.
            </p>
          </div>
        ) : (
          users.map((u, idx) => {
            const rowKey = u.id ?? u.email ?? idx;
            return (
              <UserRow
                key={rowKey}
                user={u}
                isMenuOpen={openMenuId === rowKey}
                onToggleMenu={() =>
                  onToggleMenu(openMenuId === rowKey ? null : rowKey)
                }
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default UserTable;
