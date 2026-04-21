import Header from "@/components/ui/Header";
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

import SideBarContent from "@/components/ui/SideBarContent";
import ContentBlocks from "@/components/ui/contents/ContentBlocks";
import { useFetchContents } from "@/hooks/useFetchContents";
import Loading from "@/components/ui/Loading";
const filterContent = {
  keyword: null,
  minPrice: null,
  maxPrice: null,
  minViewCount: null,
  maxViewCount: null,
  level: null,
};
const page = {
  page: 0,
  size: 15,
  sort: "createdAt",
  direction: "desc",
};
const ContentPage = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useFetchContents();
  return (
    <div>
      <SideBarContent setContents={setContents} setIsLoading={setIsLoading} />
      <section className="w-full bg-[#0b1326] min-h-screen  text-studyhard">
        <div className="w-full md:pl-64">
          <div className=" p-8">
            <div className="lg:flex  items-center justify-between ">
              <div>
                <h1 className="text-white text-4xl font-medium tracking-tighter mb-2 text-center lg:text-left">
                  Marketplace <span className="text-rainbow">Library</span>
                </h1>
                <p className="text-center lg:text-left">
                  Explore 1,284 elite architecture patterns and code snippets.
                </p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <span className="mr-4 font-medium">SORT BY</span>
                <button className="bg-[#6B7280] text-white px-4 py-2 rounded">
                  New Release
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>
            </div>
            {/* content */}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-8 md:mt-20">
                {contents?.map((content) => {
                  return <ContentBlocks key={content.id} data={content} />;
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContentPage;
