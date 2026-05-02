const LessonList = ({ title, time, completed, active }) => {
  return (
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
};
export default LessonList;
