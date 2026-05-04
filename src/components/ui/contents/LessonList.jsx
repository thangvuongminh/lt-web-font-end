import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLock,
  faPen,
  faTrash,
  faCheck,
  faXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import LessonItem from "./LessonItem";
import LessonItemForm from "./LessonItemForm";
import { useParams } from "react-router-dom";
import useUpdateBlock from "@/hooks/useUpdateBlock";
import useDeleteBlock from "@/hooks/useDeleteBlock";

const LessonList = ({ blocks, isAuthor }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { contentId } = useParams();
  const isLocked = !blocks?.isFree;
  const totalChildren = blocks?.children?.length || 0;

  const { mutate: updateBlock, isPending } = useUpdateBlock(contentId);
  const { mutate: deleteBlock, isPending: isDeleting } =
    useDeleteBlock(contentId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: blocks?.title || "" },
  });

  const handleOnClick = () => {
    if (isEditing) return;
    if (isLocked && !isAuthor) return;
    setOpen(!open);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    reset({ title: blocks?.title || "" });
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    updateBlock(
      { blockId: blocks?.id, title: data.title },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteBlock({ blockId: blocks?.id });
  };

  return (
    <div className="group/module">
      {/* ── MODULE HEADER ── */}
      <div
        onClick={handleOnClick}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
          ${isLocked && !isAuthor ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white/[0.03]"}
        `}
      >
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full transition-all duration-300
          ${open ? "bg-purple-500 opacity-100" : "bg-transparent opacity-0"}`}
        />

        <div className="w-4 flex items-center justify-center shrink-0">
          {isLocked && !isAuthor ? (
            <FontAwesomeIcon
              icon={faLock}
              className="text-[10px] text-gray-600"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-[10px] text-gray-600 transition-transform duration-300 ${open ? "rotate-180 text-purple-400" : ""}`}
            />
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center gap-2"
          >
            <input
              autoFocus
              {...register("title", { required: true })}
              className={`flex-1 bg-white/5 border rounded-lg px-2.5 py-1 text-xs text-white placeholder-gray-600 focus:outline-none transition
                ${errors.title ? "border-red-500/40" : "border-white/10 focus:border-purple-500/50"}`}
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-400 transition shrink-0 disabled:opacity-50"
            >
              {isPending ? (
                <span className="text-[9px]">...</span>
              ) : (
                <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-500 transition shrink-0 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faXmark} className="text-[9px]" />
            </button>
          </form>
        ) : (
          <>
            <span
              className={`flex-1 text-xs font-semibold tracking-wide transition-colors duration-200
              ${isLocked && !isAuthor ? "text-gray-600" : open ? "text-purple-300" : "text-gray-400 group-hover/module:text-gray-300"}`}
            >
              <span className="text-gray-600 font-normal mr-1.5">
                {String(blocks?.position).padStart(2, "0")}.
              </span>
              {blocks?.title}
            </span>

            {isAuthor && (
              <div
                className="flex items-center gap-1 opacity-0 group-hover/module:opacity-100 transition-opacity duration-150 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleEditClick}
                  className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-purple-500/15 text-gray-600 hover:text-purple-400 transition"
                >
                  <FontAwesomeIcon icon={faPen} className="text-[8px]" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-red-500/15 text-gray-600 hover:text-red-400 transition disabled:opacity-50"
                >
                  <FontAwesomeIcon
                    icon={isDeleting ? faSpinner : faTrash}
                    spin={isDeleting}
                    className="text-[8px]"
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CHILDREN ── */}
      {open && (
        <div className="mt-1 ml-7 space-y-0.5 border-l border-white/[0.04] pl-3 animate-modal-content origin-top">
          {blocks?.children?.map((block, index) => (
            <LessonItem
              key={block.id ?? index}
              blockChildren={block}
              isAuthor={isAuthor}
              parentBlockId={blocks?.id}
              totalChildren={totalChildren}
            />
          ))}

          {isAuthor &&
            (isAdding ? (
              <LessonItemForm
                contentId={contentId}
                parentBlockId={blocks?.id}
                totalChildren={totalChildren}
                onSuccess={() => setIsAdding(false)}
                onCancel={() => setIsAdding(false)}
              />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdding(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-lg border border-dashed border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 text-gray-600 hover:text-purple-400 text-[10px] font-medium transition-all duration-200 group/add"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-current text-[8px] group-hover/add:bg-purple-500/10 transition">
                  +
                </span>
                Thêm bài học
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LessonList;
