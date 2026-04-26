import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHexagon,
  faBookOpen,
  faPlusCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
const NavItem = ({ icon, label, active }) => {
  return (
    <li
      className={`group flex items-center gap-3.5 rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-300 cursor-pointer 
        ${
          active
            ? "bg-[#2A2B3A] text-white" // Nền tím đậm và chữ trắng cho active state
            : "text-[#B9BBBE] hover:bg-[#1A1B2A] hover:text-white" // Màu chữ xám mặc định, nền tối khi hover
        }`}
    >
      {/* Cần ép icon sang màu tím đậm khi active */}
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
    </li>
  );
};
const SideBarCreator = () => {
  const [activeItem, setActiveItem] = useState("Create New Course");
  const menuItems = [
    { label: "My Courses", icon: faBookOpen },
    { label: "Create New Course", icon: faPlusCircle },
    { label: "Analytics", icon: faChartBar },
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
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <div key={item.label} onClick={() => setActiveItem(item.label)}>
              <NavItem
                icon={item.icon}
                label={item.label}
                active={item.label === activeItem}
              />
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default SideBarCreator;
