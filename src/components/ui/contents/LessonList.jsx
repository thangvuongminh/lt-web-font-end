import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLock } from "@fortawesome/free-solid-svg-icons";
import LessonItem from "./LessonItem";

const LessonList = ({ blocks }) => {
  const [open, setOpen] = useState(false);
  const isLocked = !blocks?.isFree;

  const handleOnClick = () => {
    if (isLocked) return;
    setOpen(!open);
  };

  return (
    <div
      onClick={handleOnClick}
      className={`py-2 transition-all
        ${isLocked ? "text-gray-400 grayscale cursor-not-allowed" : "text-gray-500 hover:text-gray-300 cursor-pointer"}
      `}
    >
      <div className="flex items-center space-x-3">
        {isLocked && <FontAwesomeIcon icon={faLock} className="text-xs" />}

        <div
          className={`text-sm  flex justify-between items-center font-medium ${open ? "text-purple-400" : ""}`}
        >
          <span>
            Module {blocks?.position}: {blocks?.title}
          </span>
        </div>
        {!isLocked && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {open && !isLocked && (
        <div className="animate-modal-content mt-3 space-y-2 origin-top">
          {blocks?.children?.map((block, index) => (
            <LessonItem blockChildren={block} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonList;
