import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faLock,
  faPen,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setBlockActive } from "@/store/blockActiveSlice";
import LessonItemForm from "./LessonItemForm";
import useDeleteBlock from "@/hooks/useDeleteBlock";

const LessonItem = ({
  blockChildren,
  isAuthor,
  parentBlockId,
  totalChildren,
}) => {
  const { title, duration, isFree, id, type, contentId, textContent } =
    blockChildren;
  const isLocked = isFree === 0 || isFree === false;

  const dispatch = useDispatch();
  const activeId = useSelector((state) => state.blockActive.idBlock);
  const active = activeId === id;

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteBlock, isPending: isDeleting } =
    useDeleteBlock(contentId);

  const handleClick = () => {
    if (isEditing) return;
    if (isLocked && !isAuthor) return;
    dispatch(setBlockActive({ type, title, blockActive: id, contentId }));
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteBlock({ blockId: id });
  };

  if (isEditing) {
    return (
      <LessonItemForm
        blockId={id}
        defaultValues={{ title, type, textContent, isFree }}
        contentId={contentId}
        parentBlockId={parentBlockId}
        totalChildren={totalChildren}
        onSuccess={() => setIsEditing(false)}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center p-3 rounded-xl transition origin-top animate-modal-content
        ${active ? "bg-purple-500/10 border border-purple-500/30" : ""}
        ${isLocked && !isAuthor ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-white/5 cursor-pointer"}
      `}
    >
      <div className="mr-3 flex items-center justify-center w-4">
        {isLocked && !isAuthor ? (
          <FontAwesomeIcon
            icon={faLock}
            className="text-gray-600 text-[10px]"
          />
        ) : active ? (
          <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
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

      {isAuthor && (
        <div
          className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEditClick}
            title="Chỉnh sửa"
            className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 hover:bg-purple-500/20 hover:text-purple-400 text-gray-500 transition"
          >
            <FontAwesomeIcon icon={faPen} className="text-[9px]" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            title="Xóa"
            className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-500 transition disabled:opacity-50"
          >
            <FontAwesomeIcon
              icon={isDeleting ? faSpinner : faTrash}
              spin={isDeleting}
              className="text-[9px]"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonItem;
