import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUsers,
  faFileLines,
  faGear,
  faRightFromBracket,
  faPlus,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authenticateSlice";
import { useLogout } from "@/hooks/useLogout";
const NAV_ITEMS = [
  { key: "dash-board", label: "Dashboard", icon: faGauge },
  { key: "manage-user", label: "Users", icon: faUsers },
  { key: "content", label: "Content", icon: faFileLines },
  { key: "financial", label: "Financial", icon: faGear },
];
const SidebarAdmin = () => {
  const match = useMatch("/admin/:subpage");
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(match?.params?.subpage);
  const { mutate } = useLogout();
  return (
    <aside className="w-64 shrink-0 bg-[#111827] border-r border-slate-800/60 flex flex-col">
      {/* Logo / Profile */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/20">
          AP
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Admin Portal</div>
          <div className="text-[11px] text-slate-400">System Administrator</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = activeNav === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveNav(item.key);
                navigate(`./${item.key}`);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                    ${
                      active
                        ? "bg-purple-600/90 text-white shadow-md shadow-purple-600/20"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                    }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Log out */}
      <div
        className="p-3 border-t border-slate-800/60"
        onClick={() => {
          mutate();
        }}
      >
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
export default SidebarAdmin;
