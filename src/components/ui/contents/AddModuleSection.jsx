import useCreateBlock from "@/hooks/useCreateBlock";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";

const AddModuleSection = ({ isAuthor, contentId, totalBlocks }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { mutate: createBlock, isPending } = useCreateBlock(contentId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", isFree: false },
  });

  const isFree = watch("isFree");

  const onSubmit = (data) => {
    createBlock(
      { title: data.title, isFree: data.isFree, position: totalBlocks + 1 },
      {
        onSuccess: () => {
          reset();
          setIsAdding(false);
        },
        onError: (err) => console.error("Lỗi tạo module:", err),
      },
    );
  };

  if (!isAuthor) return null;

  return (
    <div className="mt-2">
      {isAdding ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 px-3 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5"
        >
          {/* Title + actions */}
          <div className="flex items-center gap-2">
            <input
              autoFocus
              {...register("title", { required: true })}
              placeholder="Tên chương học..."
              className={`flex-1 bg-white/5 border rounded-lg px-2.5 py-1 text-xs text-white placeholder-gray-600 focus:outline-none transition
                ${errors.title ? "border-red-500/40" : "border-white/10 focus:border-purple-500/50"}`}
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-400 transition shrink-0 disabled:opacity-50"
            >
              {isPending ? "..." : "✓"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-500 transition shrink-0 disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          {/* isFree toggle */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <FontAwesomeIcon
                icon={isFree ? faLockOpen : faLock}
                className={`text-[9px] ${isFree ? "text-green-400" : "text-gray-600"}`}
              />
              <span className="text-[10px] text-gray-500">
                {isFree ? "Miễn phí" : "Trả phí"}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("isFree")}
              />
              <div className="w-7 h-4 bg-white/10 peer-checked:bg-green-500/60 rounded-full transition-all duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-3 after:h-3 after:transition-all peer-checked:after:translate-x-3" />
            </label>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 text-gray-600 hover:text-purple-400 text-[10px] font-medium transition-all duration-200 group/add"
        >
          <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-current text-[8px]">
            +
          </span>
          Thêm chương học
        </button>
      )}
    </div>
  );
};

export default AddModuleSection;
