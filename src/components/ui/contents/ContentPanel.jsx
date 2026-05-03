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
const LessonItem = ({ title, time, completed, active }) => (
  <div
    className={`flex items-center p-3 rounded-xl transition ${active ? "bg-purple-500/10 border border-purple-500/30" : "hover:bg-white/5"}`}
  >
    <div className="mr-3">
      {completed ? (
        <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-500" />
      ) : active ? (
        <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
        </div>
      ) : (
        <FontAwesomeIcon icon={faCircle} className="text-gray-700 text-xs" />
      )}
    </div>
    <div className="flex-1">
      <p className={`text-xs ${active ? "text-white" : "text-gray-400"}`}>
        {title}
      </p>
      <p className="text-[10px] text-gray-600 mt-0.5 tracking-wide">
        <span className="mr-1">🕒</span> {time}
      </p>
    </div>
  </div>
);
const ContentPanel = () => {
  const { contentId } = useParams();
  const blocksObj =
    useSelector((state) => state.contentDetail.byId)[contentId] || [];
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
            return <LessonList blocks={value} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default ContentPanel;
