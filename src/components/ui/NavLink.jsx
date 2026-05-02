import { Link } from "react-router-dom";

export const MyNavLink = ({ children, linkChildren = "#" }) => (
  <Link
    to={linkChildren}
    className="relative text-studyhard hover:text-white transition-all duration-300 font-medium group text-sm"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);
