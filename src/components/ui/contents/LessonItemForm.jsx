import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faLink,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import useCreateBlock from "@/hooks/useCreateBlock";

/**
 * Props:
 * - defaultValues?  : { title, type, textContent, isFree }
 * - contentId       : Long
 * - parentBlockId   : Long
 * - totalChildren   : number
 * - onSuccess()     : callback sau khi lưu thành công
 * - onCancel()      : callback khi hủy
 */
const LessonItemForm = ({
  defaultValues,
  contentId,
  parentBlockId,
  totalChildren = 0,
  onSuccess,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      type: defaultValues?.type || "CONTENT_BLOCK",
      textContent: defaultValues?.textContent || "",
      isFree: defaultValues?.isFree ?? false,
    },
  });

  const { mutate: createBlock, isPending } = useCreateBlock(contentId);

  const onSubmit = (data) => {
    createBlock(
      {
        title: data.title,
        type: data.type,
        textContent: data.textContent || null,
        isFree: data.isFree,
        parentBlockId,
        position: totalChildren + 1,
      },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 p-3 rounded-xl border border-purple-500/40 bg-purple-500/5 animate-modal-content origin-top transition"
    >
      {/* Title */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          Tiêu đề
        </label>
        <input
          autoFocus
          placeholder="Nhập tiêu đề..."
          {...register("title", { required: "Tiêu đề không được để trống" })}
          className={`w-full bg-white/5 border rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none transition
            ${
              errors.title
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-purple-500/60"
            }`}
        />
        {errors.title && (
          <p className="text-[9px] text-red-400 mt-0.5">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* textContent */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          Nội dung
        </label>
        <textarea
          rows={3}
          placeholder="Nhập nội dung..."
          {...register("textContent")}
          className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none transition resize-none"
        />
      </div>

      {/* Type selector */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          Loại block
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2">
              {["LINK_BLOCK", "CONTENT_BLOCK"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => field.onChange(t)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-semibold border transition
                    ${
                      field.value === t
                        ? "bg-purple-500/20 border-purple-500/60 text-purple-300"
                        : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={t === "LINK_BLOCK" ? faLink : faFileLines}
                    className="text-[9px]"
                  />
                  {t === "LINK_BLOCK" ? "Link Block" : "Content Block"}
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* isFree toggle */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          Miễn phí
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            {...register("isFree")}
          />
          <div className="w-7 h-4 bg-white/10 peer-checked:bg-purple-500/60 rounded-full transition-all duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-3 after:h-3 after:transition-all peer-checked:after:translate-x-3" />
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-[10px] font-semibold transition disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
          {isPending ? "Đang lưu..." : "Lưu"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-[10px] font-semibold transition disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[9px]" />
          Hủy
        </button>
      </div>
    </form>
  );
};

export default LessonItemForm;
