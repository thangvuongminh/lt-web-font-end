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
const ModuleItem = ({ title, subtitle }) => (
  <div className="flex justify-between items-center text-gray-500 hover:text-gray-300 cursor-pointer">
    <div className="text-sm">
      <p className="text-[10px] uppercase tracking-wider">{title}</p>
      <p className="font-medium">{subtitle}</p>
    </div>
    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
  </div>
);
const ContentPanel = () => {
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

        {/* Modules */}
        <div className="space-y-4">
          <ModuleItem title="Module 1" subtitle="Foundation Principles" />
          <ModuleItem title="Module 2" subtitle="Typography & Grid Systems" />

          {/* Active Module */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-purple-400 text-sm font-medium">
              <span>Module 3: Advanced Components</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            </div>

            <div className="space-y-1 mt-3">
              <LessonItem
                title="1. The Anatomy of a Button"
                time="08:15"
                completed
              />
              <LessonItem
                title="2. Input States & Validation"
                time="11:30"
                completed
              />
              <LessonItem title="3. Complex Tables" time="15:40" completed />
              <LessonItem
                title="4. Building Glassmorphic UI Systems"
                time="12:45"
                active
              />
              <LessonItem title="5. Advanced Animations" time="22:10" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-gray-600 grayscale">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faLock} />
              <div className="text-sm">
                <p>Module 4</p>
                <p className="text-xs">Design Handoff Strategies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentPanel;
