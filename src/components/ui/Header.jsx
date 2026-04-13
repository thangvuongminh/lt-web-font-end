import React, { useState } from "react"; // Thêm useState
import logo from "@images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faSignOutAlt,
  faBars,
  faTimes,
  faWallet,
  faSignInAlt,
  faUserPlus,
  faFolderOpen,
  faHistory,
} from "@fortawesome/free-solid-svg-icons"; // Thêm icon đóng/mở
import { NavLink } from "./NavLink";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authenticateSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="  w-full sticky top-0 z-50 bg-[#050b18]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* --- Logo Area --- */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/">
            <img
              src={logo}
              alt="StudyHard Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="hidden sm:block text-white font-bold tracking-tighter text-xl">
            STUDY<span className="text-sky-500">HARD</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <NavLink>Community</NavLink>
          <NavLink linkChildren={"/content"}>Content</NavLink>
          <NavLink>Forum</NavLink>
          <NavLink>Resources</NavLink>
        </div>

        {/* --- Action Area (Search & Account) --- */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center bg-[#0f172a] border border-white/10 px-4 py-1.5 rounded-full focus-within:border-sky-500/50 transition-all">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 text-xs mr-2"
            />
            <input
              className="bg-transparent border-none focus:outline-none text-sm text-gray-300 w-40 placeholder:text-gray-600"
              placeholder="Search patterns..."
            />
          </div>

          <div className="relative group">
            {/* Icon User chính */}
            <div className="text-gray-400 hover:text-white cursor-pointer transition-colors p-2">
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2 text-sm text-gray-200">
                {/* Nhóm Đăng nhập / Đăng ký */}
                {!isAuthenticate && (
                  <div className="flex flex-col gap-3 px-4 py-4 border-b border-gray-700">
                    <Link
                      to={"/account/login"}
                      className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                      Đăng nhập
                    </Link>

                    <Link
                      to={"/account/register"}
                      className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                      Đăng ký
                    </Link>
                  </div>
                )}
                {isAuthenticate && (
                  <div className="flex flex-col">
                    <Link
                      to={"/payment"}
                      className="px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faWallet}
                        className="text-yellow-500 w-5"
                      />
                      <span>Nạp tiền</span>
                    </Link>

                    <a
                      href="#noi-dung"
                      className="px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="text-blue-400 w-5"
                      />
                      <span>Nội dung của tôi</span>
                    </a>

                    <a
                      href="#lich-su"
                      className="px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faHistory}
                        className="text-green-400 w-5"
                      />
                      <span>Lịch sử giao dịch</span>
                    </a>

                    <div
                      onClick={() => {
                        dispatch(logout());
                        setTimeout(() => {
                          navigate("/", { replace: true });
                        }, 400);
                      }}
                      className="cursor-pointer px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors border-t border-gray-700 mt-1"
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="text-red-500 w-5"
                      />
                      <span className="text-red-400 hover:text-red-300 ">
                        Đăng xuất
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="md:hidden text-white cursor-pointer p-1"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#050b18] border-b border-white/5 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <NavLink>Community</NavLink>
          <NavLink linkChildren={"/content"}>Content</NavLink>
          <NavLink>Forum</NavLink>
          <NavLink>Resources</NavLink>

          <div className="flex lg:hidden items-center bg-[#0f172a] border border-white/10 px-4 py-2 rounded-lg mt-2">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 text-xs mr-2"
            />
            <input
              className="bg-transparent border-none focus:outline-none text-sm text-gray-300 w-full"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
