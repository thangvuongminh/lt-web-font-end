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
import { useEffect, useMemo, useRef, useState } from "react";
import { COURSE_LEVELS, COURSE_STATUS } from "@utils/constraints";
import { useForm } from "react-hook-form";
import { useFetchContents } from "@/hooks/useFetchContents";
import { useFetchAllCategory } from "@/hooks/useFetchAllCategory";
import { capitalize } from "@/utils/systems/sysFuc";
import AppDropdown from "./AppDropdown";
const SideBarContent = ({ setContents, setIsLoading }) => {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      keyword: null,
      minPrice: null,
      maxPrice: null,
      minViewCount: null,
      maxViewCount: null,
    },
  });
  const watchedFields = watch([
    "keyword",
    "minPrice",
    "maxPrice",
    "minViewCount",
    "maxViewCount",
  ]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const { data } = useFetchAllCategory();
  const categorys = useMemo(() => {
    const res = data?.map((category) => category.name) || [];
    return ["Tất cả", ...res];
  }, [data]);
  const [filterContent, setFilterContent] = useState({
    category: categorys[0],
    level: COURSE_LEVELS[0],
  });
  const memoizedData = useMemo(() => {
    const [keyword, minPrice, maxPrice, minViewCount, maxViewCount] =
      watchedFields;
    let data = {};

    const raw = { keyword, minPrice, maxPrice, minViewCount, maxViewCount };
    Object.entries(raw).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        data[key] = value;
      }
    });
    if (filterContent.level !== COURSE_LEVELS[0]) {
      data.level = filterContent.level;
    }
    if (filterContent.category !== categorys[0]) {
      data.categoryName = filterContent.category;
    }

    return data;
  }, [...watchedFields, filterContent]);
  const { mutateAsync, isLoading } = useFetchContents();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await mutateAsync({ contentSearch: memoizedData });
        setContents(response.data?.data?.content);
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    const handler = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(handler); // Xóa timeout nếu user gõ tiếp
  }, [memoizedData]);
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
              {...register("keyword")}
              className=" border-none focus:outline-none text-sm text-gray-300 w-40 placeholder:text-gray-600"
              placeholder="Search title and des..."
            />
          </div>

          {/* Giá cả */}
          <div className="mb-3">Giá cả</div>
          <div className="flex items-center gap-3 w-full">
            <input
              {...register("minPrice", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              type="number"
              className=" border-none w-full focus:outline-none text-sm text-gray-300 placeholder:text-gray-600"
              placeholder="Min"
            />
            <input
              {...register("maxPrice", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              type="number"
              className=" border-none w-full focus:outline-none text-sm text-gray-300  placeholder:text-gray-600"
              placeholder="Max"
            />
          </div>
          {
            <AppDropdown
              title={"Category"}
              nameDropDown={"category"}
              openDropdown={openCategory}
              setOpenDropDown={setOpenCategory}
              data={categorys}
              currentValue={filterContent.category}
              action={(item) =>
                setFilterContent({
                  ...filterContent,
                  category: item,
                })
              }
            />
          }
          {/* Level */}
          {
            <AppDropdown
              title={"Level"}
              nameDropDown={"level"}
              openDropdown={openLevel}
              setOpenDropDown={setOpenLevel}
              data={COURSE_LEVELS}
              currentValue={filterContent.level}
              action={(item) =>
                setFilterContent({
                  ...filterContent,
                  level: item,
                })
              }
            />
          }
          {/* Lượt xem  */}
          <div className="mb-3">View</div>
          <div className="flex items-center gap-3 w-full">
            <input
              {...register("minViewCount", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              className=" border-none w-full focus:outline-none text-sm text-gray-300 placeholder:text-gray-600"
              placeholder="Min"
            />
            <input
              {...register("maxViewCount", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
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
