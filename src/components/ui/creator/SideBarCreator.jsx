import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHexagon,
  faBookOpen,
  faPlusCircle,
  faBook,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Link, useLocation } from "react-router-dom";
const NavItem = ({ icon, label, active, link }) => {
  return (
    <Link
      to={link}
      className={`group flex items-center gap-3.5 rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-300 cursor-pointer 
        ${
          active
            ? "bg-[#2A2B3A] text-white"
            : "text-[#B9BBBE] hover:bg-[#1A1B2A] hover:text-white"
        }`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`w-5 h-5 text-xl ${active ? "text-[#975BFE]" : "text-[#7B7E84]"}`} // Icon xám/tím tương ứng
      />

      {/* Chữ */}
      <span className="flex-1 text-base tracking-wide font-normal">
        {label}
      </span>

      {/* Viền tím dọc bên trái khi active (Giống Udemy style) */}
      {active && (
        <div className="absolute left-0 h-8 w-[3px] rounded-r-full bg-[#975BFE]" />
      )}
    </Link>
  );
};
const SideBarCreator = () => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState("Create New Course");
  const menuItems = [
    { label: "My Courses", icon: faBookOpen, link: null },
    {
      label: "Create New Course",
      icon: faPlusCircle,
      link: "/content/create",
    },
    { label: "Block content", icon: faBook, link: "/content/management" },
    { label: "Analytics", icon: faChartBar, link: null },
  ];
  return (
    // Wrapper Sidebar - Nền tối chính
    <div className="md:w-64 w-full bg-[#131b2e] border-r border-white/5 md:p-6 px-10 pt-6 pb-10 flex flex-col md:fixed md:h-full text-[#908FA0] ">
      {/* 1. Header (Logo & Brand Name) */}
      <div className="mb-14 flex items-center gap-3.5 pl-1.5">
        <FontAwesomeIcon
          icon={faHexagon}
          className="w-10 h-10 text-xl text-[#7119FC]" // Logo màu tím đậm
        />
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-[#975BFE]">
            EduCore
          </span>
          <span className="text-sm font-light text-[#7B7E84]">
            Instructor Portal
          </span>
        </div>
      </div>

      {/* 2. Menu Section */}
      <nav className="flex-1">
        <div className="space-y-1.5">
          {menuItems.map((item) => (
            <div key={item.label}>
              <NavItem
                icon={item.icon}
                label={item.label}
                active={item.link === pathname}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
export default SideBarCreator;
