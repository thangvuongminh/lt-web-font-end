import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
  faPhone,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, roleIcon, sortRoles } from "@/utils/systems/sysFuc";
import { roleBadgeStyle } from "@/utils/constraints/admin/constraints";
const UserRow = ({ user, isMenuOpen, onToggleMenu, onEdit, onDelete }) => {
  const sortedRoles = sortRoles(user.userRole);
  const phoneDisplay = user.phoneNumber;

  return (
    <div className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-800/30 transition group">
      {/* Avatar + name + email */}
      <div className="col-span-4 flex items-center gap-3 min-w-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName || user.email}
            className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-slate-700/50"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/30 via-slate-600 to-slate-700 flex items-center justify-center text-xs font-semibold text-slate-100 shrink-0 ring-2 ring-slate-700/50">
            {user.fullName || user.email}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {user.fullName || (
              <button
                type="button"
                onClick={() => onEdit(user)}
                className="text-slate-500 italic font-normal hover:text-purple-300 transition"
              >
                (Chưa cập nhật)
              </button>
            )}
          </div>
          <div className="text-xs text-slate-400 truncate">{user.email}</div>
        </div>
      </div>

      {/* Roles */}
      <div className="col-span-3 flex flex-wrap gap-1.5">
        {sortedRoles.length === 0 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/60 text-slate-500 border border-slate-700/60">
            No role
          </span>
        ) : (
          sortedRoles.map((r) => (
            <span
              key={r}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${roleBadgeStyle(
                r,
              )}`}
            >
              <FontAwesomeIcon icon={roleIcon(r)} className="w-2.5 h-2.5" />
              {r}
            </span>
          ))
        )}
      </div>

      {/* Phone */}
      <div className="col-span-2">
        {phoneDisplay ? (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <FontAwesomeIcon
              icon={faPhone}
              className="w-3 h-3 text-slate-500"
            />
            <span className="truncate">{phoneDisplay}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="w-3 h-3" />
            Cập nhật
          </button>
        )}
      </div>

      {/* Joined date */}
      <div className="col-span-2 text-sm text-slate-300">
        {formatDate(user.createdAt)}
      </div>

      {/* Actions */}
      <div
        className="col-span-1 flex justify-end relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onToggleMenu}
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-700/60 hover:text-white opacity-70 group-hover:opacity-100 transition"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-9 z-10 w-36 bg-[#1a2235] border border-slate-700 rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <button
              type="button"
              onClick={() => onEdit(user)}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-700/60 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(user)}
              className="w-full text-left px-3 py-2 text-sm text-rose-400 hover:bg-slate-700/60 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRow;
