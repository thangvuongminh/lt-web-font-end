export const NavLink = ({ children, linkChildren = "#" }) => (
  <a
    href={linkChildren}
    className="relative text-[#908fa0] hover:text-white transition-all duration-300 font-medium group text-sm"
  >
    {children}
    {/* Line hiệu ứng dưới chân khi hover */}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
  </a>
);
