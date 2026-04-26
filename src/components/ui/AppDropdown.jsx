import { useEffect, useRef } from "react";
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
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "@/utils/systems/sysFuc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AppDropdown = ({
  nameDropDown,
  openDropdown,
  setOpenDropDown,
  title,
  data,
  currentValue,
  action,
}) => {
  const dropDownRef = useRef();
  useEffect(() => {
    const handleOnClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current?.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener(nameDropDown, handleOnClick);
    return () => {
      document.removeEventListener(nameDropDown, handleOnClick);
    };
  }, []);
  return (
    <div className="flex flex-col">
      {" "}
      <div className="mb-1">{title}</div>
      <div
        ref={dropDownRef}
        onClick={() => setOpenDropDown(!openDropdown)}
        className="relative group  border text-sm flex justify-between items-center w-full px-5 py-1 mt-2 rounded border-[#908FA0]/40 cursor-pointer "
      >
        <span>{capitalize(currentValue)}</span>
        <FontAwesomeIcon icon={faChevronDown} className="animate-bounce  " />
        <ul
          className={`absolute left-0 top-full w-full z-50
                   transition-all duration-300 ease-out
                   ${openDropdown ? "opacity-100 pointer-events-auto translate-y-0.5" : "-translate-y-2 opacity-0 pointer-events-none"}`}
        >
          {data
            ?.filter((data_detail) => data_detail != currentValue)
            .map((data_detail, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropDown(false);
                    action(data_detail);
                  }}
                  className="px-5 py-1 block w-full    hover:bg-[#1e3a5f]  hover:text-[#7eb8f7]  bg-[#0f0f1a] text-white/50 border-b-[0.05px] border-[#2e3347]  cursor-pointer"
                >
                  {capitalize(data_detail)}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default AppDropdown;
