import {
  faUserShield,
  faUser,
  faUserGear,
  faUserPen, // Thêm icon cho CREATOR
} from "@fortawesome/free-solid-svg-icons";

export const ROLE_FILTERS = [
  { key: "ALL", label: "All Roles" },
  { key: "ADMIN", label: "Admin" },
  { key: "MODERATOR", label: "Moderator" },
  { key: "CREATOR", label: "Creator" }, // Thêm filter
  { key: "CONSUMER", label: "Consumer" },
];

export const roleBadgeStyle = (role) =>
  ROLE_STYLES[role]?.cls ||
  "bg-slate-700/60 text-slate-400 border border-slate-600/40";

export const ROLE_OPTIONS = ["ADMIN", "MODERATOR", "CREATOR", "CONSUMER"]; // Thêm option

export const SORT_OPTIONS = [
  { key: "createdAt_desc", label: "Mới nhất", field: "createdAt", dir: "desc" },
  { key: "createdAt_asc", label: "Cũ nhất", field: "createdAt", dir: "asc" },
  { key: "email_asc", label: "Email (A → Z)", field: "email", dir: "asc" },
  { key: "email_desc", label: "Email (Z → A)", field: "email", dir: "desc" },
];

export const ROLE_STYLES = {
  ADMIN: {
    cls: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
    icon: faUserShield,
  },
  MODERATOR: {
    cls: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    icon: faUserGear,
  },
  CREATOR: {
    // Style màu xanh ngọc cho CREATOR
    cls: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    icon: faUserPen,
  },
  CONSUMER: {
    cls: "bg-slate-700/60 text-slate-300 border border-slate-600/40",
    icon: faUser,
  },
};

// Cập nhật lại thứ tự ưu tiên (CREATOR nằm giữa MODERATOR và CONSUMER)
export const ROLE_PRIORITY = {
  ADMIN: 0,
  MODERATOR: 1,
  CREATOR: 2,
  CONSUMER: 3,
};

export const PAGE_SIZE = 10;
