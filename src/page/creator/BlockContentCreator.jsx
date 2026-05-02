import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPlus,
  faPlayCircle,
  faFileAlt,
  faChevronDown,
  faTrash,
  faInfoCircle,
  faLink,
  faLayerGroup,
  faTag,
  faCoins,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { COURSE_STATUS } from "@/utils/constraints";
import { useFetchAllCart } from "@/hooks/useFetchAllCart";
import { capitalize } from "@/utils/systems/sysFuc";
import { data } from "react-router-dom";
import { useFetchAllContent } from "@/hooks/creator/useFetchAllContent";
import Loading from "@/components/ui/Loading";
import ContentBlocks from "@/components/ui/contents/ContentBlocks";
const BlockContentCreator = () => {
  const [label, setLabel] = useState(COURSE_STATUS[0]);
  const { data, isLoading } = useFetchAllContent();
  const allContents = useMemo(() => {
    const res =
      data?.data.data
        .filter((detail) => {
          return detail.status == label;
        })
        .map((detail) => ({
          ...detail,
          categoryName: detail.category.name,
        })) || [];

    return res;
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#1C1D1F] w-full text-white min-h-screen flex flex-col md:pl-64">
      <div className="p-6">
        <div className="flex  items-start  gap-5 flex-col lg:flex-row lg:items-start">
          {COURSE_STATUS.map((course, inx) => {
            return (
              <div
                key={inx}
                onClick={() => setLabel(course)}
                className={`relative text-studyhard hover:text-white transition-all duration-300 font-medium group text-sm p-2 ${course == label ? "bg-studyhard/30 rounded" : ""}`}
              >
                {capitalize(course)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </div>
            );
          })}
        </div>
        <div className="h-[0.5px] bg-studyhard/40 w-full"></div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-8 md:mt-20  ">
          {allContents?.map((content_details, idx) => {
            return <ContentBlocks data={content_details} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default BlockContentCreator;
