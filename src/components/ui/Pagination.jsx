import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faShieldAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
const Pagination = ({
  sizePage,
  pageOnRecode,
  currentPage,
  setSearchParams,
}) => {
  const totalPage = Math.ceil(sizePage / pageOnRecode);
  const pageAppear = useMemo(() => {
    let allButtonPage = [];
    allButtonPage.push(1);
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPage - 1, currentPage + 2);
    if (start > 2) {
      allButtonPage.push("...");
    }
    for (let i = start; i <= end; i++) {
      allButtonPage.push(i);
    }
    if (end < totalPage - 1) {
      allButtonPage.push("...");
    }
    if (totalPage > 1) {
      allButtonPage.push(totalPage);
    }
    return allButtonPage;
  }, [currentPage, totalPage]);
  return (
    <div className="flex items-center justify-between pt-6">
      <div className="flex items-center space-x-2">
        {currentPage != 1 && (
          <button
            onClick={() => setSearchParams({ page: currentPage - 1 })}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xs" />
          </button>
        )}
        <div className="flex items-center bg-slate-900/50 border border-slate-800 rounded-xl p-1">
          {pageAppear.map((index) => (
            <button
              key={index}
              onClick={() => setSearchParams({ page: index })}
              className={`px-4 py-2 cursor-pointer rounded-lg ${currentPage == index ? "bg-indigo-600" : ""} text-white text-[10px] font-black tracking-widest`}
            >
              {index}
            </button>
          ))}
        </div>
        {currentPage < totalPage && (
          <button
            onClick={() => setSearchParams({ page: currentPage + 1 })}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Pagination;
