import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faGear,
  faCircleCheck,
  faCircle,
  faLock,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import LessonList from "./LessonList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddModuleSection from "./AddModuleSection";
const ContentPanel = () => {
  const { contentId } = useParams();
  const blocksObj =
    useSelector((state) => state.contentDetail.byId)[contentId] || [];
  const idUser = useSelector((state) => state.auth.id);
  const creatorId = useSelector(
    (state) => state.contentDetail.byId[contentId]?.creatorId,
  );
  let isAuthor = idUser === creatorId;
  const totalBlocks = Object.keys(blocksObj).length;
  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="bg-[#161b22]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sticky top-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Course Content</h2>
          <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
            24% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1.5 rounded-full mb-8">
          <div className="bg-purple-500 h-1.5 rounded-full w-[24%]"></div>
        </div>

        {/* Modules - có scroll */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {Object.entries(blocksObj)?.map(([key, value], index) => {
            return (
              <LessonList blocks={value} key={index} isAuthor={isAuthor} />
            );
          })}
        </div>
        {/* ── THÊM CHƯƠNG HỌC ── */}
        <AddModuleSection
          isAuthor={isAuthor}
          contentId={contentId}
          totalBlocks={totalBlocks} // ← dùng tổng số module hiện có
        />
      </div>
    </div>
  );
};
export default ContentPanel;
