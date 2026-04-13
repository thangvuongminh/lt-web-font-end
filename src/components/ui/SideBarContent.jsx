import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  faSearch,
  faBell,
  faGear,
  faUserCircle,
  faThLarge,
  faLayerGroup,
  faCode,
  faDatabase,
  faPlug,
  faFileLines,
  faBookmark,
  faEye,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "@/components/ui/NavLink";
import { useEffect, useRef, useState } from "react";
import {
  COURSE_LEVELS,
  COURSE_STATUS,
} from "./../../utils/validation/constrant";
const SideBarContent = () => {
  const [openStatus, setOpenStatus] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [filterContent, setFilterContent] = useState({
    status: COURSE_STATUS[0],
    level: COURSE_LEVELS[0],
  });
  const dropDownStatus = useRef(null);
  const dropDownLevel = useRef(null);
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  useEffect(() => {
    const handleOnClick = (event) => {
      if (
        dropDownStatus.current &&
        !dropDownStatus.current.contains(event.target)
      ) {
        setOpenStatus(false);
      }
    };
    const handleOnClickLevel = (event) => {
      if (
        dropDownLevel.current &&
        !dropDownLevel.current.contains(event.target)
      ) {
        setOpenLevel(false);
      }
    };
    document.addEventListener("mousedown", handleOnClick);
    document.addEventListener("mousedown", handleOnClickLevel);
    return () => {
      document.removeEventListener("mousedown", setOpenLevel);
      document.removeEventListener("mousedown", handleOnClickLevel);
    };
  }, []);
  return (
    <aside className="md:w-64 w-full bg-[#131b2e] border-r border-white/5 md:p-6 px-10 pt-6 pb-10 flex flex-col md:fixed md:h-full text-[#908FA0] ">
      <div className="w-[60vw] md:w-full mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 lg:justify-start justify-center ">
            <span className="text-white font-bold text-lg tracking-tighter">
              StudyHard
            </span>
            <div className=" text-sky-500  rounded-lg text-[12px] bg-[#2FD9F4]/10 font-mono px-1.5 py-0.5">
              V 2.4.0
            </div>
          </div>
          <p className="mt-1 text-[0.75rem] text-center lg:text-left">
            Build your future
          </p>
        </div>
        <div className="mb-3"> Danh mục</div>
        <nav className="flex-1 space-y-3">
          {/* Danh mục */}
          <div className="flex items-center bg-[#0f172a] border border-white/10  py-1.5 rounded-full focus-within:border-sky-500/50 transition-all">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-500 text-xs mr-2 px-2"
            />
            <input
              className=" border-none focus:outline-none text-sm text-gray-300 w-40 placeholder:text-gray-600"
              placeholder="Search title and des..."
            />
          </div>

          {/* Giá cả */}
          <div className="mb-3">Giá cả</div>
          <div className="flex items-center gap-3 w-full">
            <input
              className=" border-none w-full focus:outline-none text-sm text-gray-300 placeholder:text-gray-600"
              placeholder="Min"
            />
            <input
              className=" border-none w-full focus:outline-none text-sm text-gray-300  placeholder:text-gray-600"
              placeholder="Max"
            />
          </div>
          {/* Trạng thái */}
          <div className="mb-3">Trạng thái</div>
          <div
            ref={dropDownStatus}
            onClick={() => setOpenStatus(!openStatus)}
            className="relative group  border text-sm flex justify-between items-center w-full px-5 py-1 mt-2 rounded border-[#908FA0]/40 cursor-pointer "
          >
            <span>{capitalize(filterContent.status)}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="animate-bounce  "
            />
            <ul
              className={`absolute left-0 top-full w-full z-50
                   transition-all duration-300 ease-out
                   ${openStatus ? "opacity-100 pointer-events-auto translate-y-0.5" : "-translate-y-2 opacity-0 pointer-events-none"}`}
            >
              {COURSE_STATUS.filter(
                (status_Detail) => status_Detail != filterContent.status,
              ).map((status_detail, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenStatus(false);
                      setFilterContent({
                        ...filterContent,
                        status: status_detail,
                      });
                    }}
                    className="px-5 py-1 block w-full    hover:bg-[#1e3a5f]  hover:text-[#7eb8f7]  bg-[#0f0f1a] text-white/50 border-b-[0.05px] border-[#2e3347]  cursor-pointer"
                  >
                    {capitalize(status_detail)}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Level */}
          <div className="mb-3">Level</div>
          <div
            ref={dropDownLevel}
            onClick={() => setOpenLevel(!openLevel)}
            className="relative group  border text-sm flex justify-between items-center w-full px-5 py-1 mt-2 rounded border-[#908FA0]/40 cursor-pointer "
          >
            <span>{capitalize(filterContent.level)}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="animate-bounce  "
            />
            <ul
              className={`absolute left-0 top-full w-full z-50
                   transition-all duration-300 ease-out
                   ${openLevel ? "opacity-100 pointer-events-auto translate-y-0.5" : "-translate-y-2 opacity-0 pointer-events-none"}`}
            >
              {COURSE_LEVELS.filter(
                (level_detail) => level_detail != filterContent.level,
              ).map((level_detail, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenLevel(false);
                      setFilterContent({
                        ...filterContent,
                        level: level_detail,
                      });
                    }}
                    className="px-5 py-1 block w-full    hover:bg-[#1e3a5f]  hover:text-[#7eb8f7]  bg-[#0f0f1a] text-white/50 border-b-[0.05px] border-[#2e3347]  cursor-pointer"
                  >
                    {capitalize(level_detail)}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Lượt xem  */}
          <div className="mb-3">View</div>
          <div className="flex items-center gap-3 w-full">
            <input
              className=" border-none w-full focus:outline-none text-sm text-gray-300 placeholder:text-gray-600"
              placeholder="Min"
            />
            <input
              className=" border-none w-full focus:outline-none text-sm text-gray-300  placeholder:text-gray-600"
              placeholder="Max"
            />
          </div>
        </nav>
      </div>
    </aside>
  );
};
export default SideBarContent;
