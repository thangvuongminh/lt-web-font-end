import { ROLE_FILTERS } from "@/utils/constraints/admin/constraints";
import React from "react";

const UserFilterPills = ({ activeRole, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-5">
    {ROLE_FILTERS.map((role) => {
      const active = activeRole === role.key;
      return (
        <button
          key={role.key}
          type="button"
          onClick={() => onChange(role.key)}
          className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all
            ${
              active
                ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-600/30"
                : "bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
        >
          {role.label}
        </button>
      );
    })}
  </div>
);

export default UserFilterPills;
