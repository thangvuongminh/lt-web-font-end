import { jwtDecode } from "jwt-decode";

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
