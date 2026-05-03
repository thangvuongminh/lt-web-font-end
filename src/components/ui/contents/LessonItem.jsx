import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setBlockActive } from "@/store/blockActiveSlice";

const LessonItem = ({ blockChildren }) => {
  const { title, duration, isFree, id, type } = blockChildren;
  const isLocked = isFree === 0 || isFree === false;
  const dispatch = useDispatch();
  const activeId = useSelector((state) => state.blockActive.idBlock);
  const active = activeId === id;
  const handleClick = () => {
    if (isLocked) return;
    dispatch(
      setBlockActive({
        type: type,
        textContent: title,
        blockActive: id,
      }),
    );
  };
  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-3 rounded-xl transition origin-top animate-modal-content
        ${active ? "bg-purple-500/10 border border-purple-500/30" : ""}
        ${isLocked ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-white/5 cursor-pointer"}
      `}
    >
      <div className="mr-3 flex items-center justify-center w-4">
        {isLocked ? (
          <FontAwesomeIcon
            icon={faLock}
            className="text-gray-600 text-[10px]"
          />
        ) : active ? (
          <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            className="text-gray-700 text-[8px]"
          />
        )}
      </div>

      <div className="flex-1">
        <p
          className={`text-xs font-medium ${active ? "text-white" : "text-gray-400"}`}
        >
          {title || "Untitled Lesson"}
        </p>
        <p className="text-[10px] text-gray-600 mt-0.5 tracking-wide flex items-center">
          <span className="mr-1">🕒</span> {duration || "Update"}
        </p>
      </div>
    </div>
  );
};

export default LessonItem;
