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
import {
  COURSE_LEVELS,
  COURSE_STATUS,
} from "./../../utils/validation/constrant";
import SideBarContent from "@/components/ui/SideBarContent";
import ContentBlocks from "@/components/ui/contents/ContentBlocks";
const products = [
  {
    id: 1,
    title: "Cốt lõi Micro-Frontends",
    price: "$149",
    author: "Alex Rivera",
    rating: 4.8,
    reviews: 120,
    views: "2.4K",
    likes: 642,
    category: "ADVANCED",
    sub: "MICROSERVICES",
  },
  {
    id: 2,
    title: "Bộ cân bằng tải hiệu suất cao",
    price: "Miễn phí",
    author: "Stefan Müller",
    rating: 5.0,
    reviews: 45,
    views: "5.1K",
    likes: "1.2K",
    category: "SYSTEM",
    sub: "RUST",
  },
  {
    id: 3,
    title: "Bộ công cụ suy luận Edge",
    price: "$79",
    author: "Chen Wei",
    rating: 4.2,
    reviews: 89,
    views: "1.8K",
    likes: 210,
    category: "AI/ML",
    sub: "PYTHON",
  },
  {
    id: 4,
    title: "Engine hướng sự kiện",
    price: "$199",
    author: "Jordan Smith",
    rating: 4.9,
    reviews: 312,
    views: "8.9K",
    likes: "2.4K",
    category: "BACKEND",
    sub: "GO",
  },
  {
    id: 5,
    title: "Bộ bảo mật K8s",
    price: "$55",
    author: "Sarah Connor",
    rating: 4.7,
    reviews: 64,
    views: "1.2K",
    likes: 450,
    category: "DEVOPS",
    sub: "IAC",
  },
  {
    id: 6,
    title: "Mẫu bảo vệ xác thực (Auth-Guard)",
    price: "Miễn phí",
    author: "Marcus Aurelius",
    rating: 5.0,
    reviews: 15,
    views: "3.7K",
    likes: 912,
    category: "SNIPPETS",
    sub: "UTILITIES",
  },
];
const filterContent = {
  status: null,
};
const ContentPage = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  return (
    <div>
      <SideBarContent />
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
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 md:mt-20">
              <ContentBlocks />
              <ContentBlocks />
              <ContentBlocks />
              <ContentBlocks />
              <ContentBlocks />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContentPage;
