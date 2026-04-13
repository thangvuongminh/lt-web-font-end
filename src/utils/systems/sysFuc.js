import { jwtDecode } from "jwt-decode";

export const getFieldRole = (token) => {
  try {
    const decode = jwtDecode(token);
    let roles = [];
    Object.values(decode.roles).map((role) => roles.push(role));
    return decode.roles;
  } catch (err) {
    return null;
  }
};
