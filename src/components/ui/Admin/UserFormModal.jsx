import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ROLE_OPTIONS } from "@/utils/constraints/admin/constraints";

const UserFormModal = ({ open, user, onClose, onSubmit, isSubmitting }) => {
  const isEdit = Boolean(user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      userRole: [],
    },
  });

  // Lấy thông tin quyền của người DÙNG ĐANG ĐĂNG NHẬP từ redux
  const currentRoles = useSelector((state) => state.auth.roles) || [];
  const isCurrentAdmin = currentRoles.includes("ADMIN");
  const isCurrentModerator = currentRoles.includes("MODERATOR");

  // Xử lý lọc danh sách Role hiển thị theo đúng yêu cầu phân quyền
  const allowedRoles = useMemo(() => {
    return ROLE_OPTIONS.filter((role) => {
      if (isCurrentAdmin) {
        // Admin không được thêm Admin khác, chỉ được thêm Moderator và các quyền thấp hơn
        return role !== "ADMIN";
      }
      if (isCurrentModerator) {
        // Moderator thì tuyệt đối không được thêm Admin và Moderator
        return role !== "ADMIN" && role !== "MODERATOR";
      }
      return true;
    });
  }, [isCurrentAdmin, isCurrentModerator]);

  // Khi mở modal hoặc đổi user → reset form
  useEffect(() => {
    if (open) {
      reset({
        email: user?.email || "",
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        userRole: user?.userRole || [],
      });
    }
  }, [open, user, reset]);

  if (!open) return null;

  const submit = (data) => {
    onSubmit({ ...data, id: user?.id });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-md mx-4 shadow-2xl animate-in zoom-in-95 fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isEdit ? "Edit User" : "Create New User"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEdit
                ? "Update user information and roles."
                : "Fill in details to create a new user."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(submit)} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              disabled={isEdit}
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition disabled:opacity-60"
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9+\s-]*$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition"
              placeholder="0901 234 567"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-rose-400 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Roles
            </label>
            <Controller
              control={control}
              name="userRole"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {/* Map qua mảng allowedRoles đã lọc quyền thay vì ROLE_OPTIONS gốc */}
                  {allowedRoles.map((role) => {
                    const checked = field.value?.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          const next = checked
                            ? field.value.filter((r) => r !== role)
                            : [...(field.value || []), role];
                          field.onChange(next);
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all
                          ${
                            checked
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-transparent border-slate-700 text-slate-300 hover:border-slate-500"
                          }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-purple-600/25 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="w-3.5 h-3.5 animate-spin"
                />
              )}
              {isEdit ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
