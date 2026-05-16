import { time } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ROLE_STYLES } from "../constraints/admin/constraints";

export const getFieldRole = (token) => {
  try {
    const decode = jwtDecode(token);
    let roles = [];
    Object.values(decode.roles).map((role) => roles.push(role));
    return [decode.roles, decode.userId];
  } catch (err) {
    return null;
  }
};
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const formatCurrency = (amount, currency = "VND", locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
export const formatYoutubeLink = (url) => {
  if (!url) return "";
  const afterV = url.split("v=")[1];

  if (!afterV) return url;
  const videoId = afterV.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
};
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const roleIcon = (role) => ROLE_STYLES[role]?.icon || faUser;
export const buildUserFilters = ({ search, role }) => {
  const filters = [];
  if (search?.trim()) {
    filters.push({
      field: "email",
      operator: "LIKE",
      value: search.trim(),
    });
  }

  if (role && role !== "ALL") {
    filters.push({
      field: "userRole",
      operator: "IN",
      value: role,
    });
  }

  return filters;
};
const ROLE_PRIORITY = {
  ADMIN: 0,
  MODERATOR: 1,
  CONSUMER: 2,
};
export const sortRoles = (roles = []) =>
  [...roles].sort(
    (a, b) => (ROLE_PRIORITY[a] ?? 99) - (ROLE_PRIORITY[b] ?? 99),
  );
export const getInitials = (str = "") => {
  if (!str) return "?";
  const base = str.includes("@") ? str.split("@")[0] : str;
  const parts = base.split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
