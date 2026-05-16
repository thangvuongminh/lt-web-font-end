import React, { useEffect, useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faChevronDown,
  faPenToSquare,
  faTrash,
  faUser,
  faPhone,
  faPlusCircle,
  faEnvelope,
  faUsers,
  faCheck,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllUser } from "@/hooks/useGetAllUser";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCreateUser } from "@/hooks/useCreateUser";

import notificationAntd from "@/utils/notifications/notificationAntd";
import {
  ROLE_FILTERS,
  ROLE_STYLES,
  SORT_OPTIONS,
} from "@/utils/constraints/admin/constraints";
import { formatDate, getInitials, sortRoles } from "@/utils/systems/sysFuc";
import UserFormModal from "@/components/ui/Admin/UserFormModal";
import ConfirmDeleteModal from "@/components/ui/Admin/ConfirmDeleteModal";

const getAvatarGradient = (email = "") => {
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-red-500",
    "from-indigo-500 to-purple-500",
  ];
  if (!email) return gradients[0];
  const code = email.toLowerCase().charCodeAt(0) || 0;
  return gradients[code % gradients.length];
};

const AdminUserManagement = () => {
  // Quản lý State của Form Bộ lọc và Phím Sort
  const { register, control, setValue } = useForm({
    defaultValues: { search: "", activeRole: "ALL", sortKey: "createdAt_desc" },
  });

  const search = useWatch({ control, name: "search" });
  const activeRole = useWatch({ control, name: "activeRole" });
  const sortKey = useWatch({ control, name: "sortKey" });
  const searchDebounced = useDebounce(search, 300);

  // State đóng mở menu Sort riêng biệt và Modals
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [formModal, setFormModal] = useState({ open: false, user: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null });

  // Kiểm tra quyền Admin
  const roles = useSelector((state) => state.auth.roles) || [];
  const isAdmin = roles.includes("ADMIN");

  // Các hàm gọi API
  const {
    mutate: fetchUsers,
    data: userResponse,
    isPending: isFetching,
    isLoading,
  } = useGetAllUser();
  const loading = isFetching ?? isLoading;

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const isSubmitting = isUpdating || isCreating;

  const refreshData = () => {
    fetchUsers({
      data: [],
      page: { numberPage: 1, size: 9999, sortBy: "createdAt,desc" },
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Đóng dropdown sort khi click ra ngoài
  useEffect(() => {
    if (!sortMenuOpen) return;
    const handler = () => setSortMenuOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [sortMenuOpen]);

  // LOGIC LỌC VÀ SẮP XẾP DỮ LIỆU Ở FRONTEND
  const processedUsers = useMemo(() => {
    const dataObj = userResponse?.data?.data || {};
    let list = dataObj?.content || [];

    // 1. Lọc theo từ khóa tìm kiếm (Email hoặc Tên)
    if (searchDebounced) {
      const keyword = searchDebounced.toLowerCase();
      list = list.filter(
        (user) =>
          user.email?.toLowerCase().includes(keyword) ||
          user.fullName?.toLowerCase().includes(keyword),
      );
    }

    // 2. Lọc theo Role tab đang chọn
    if (activeRole && activeRole !== "ALL") {
      list = list.filter(
        (user) =>
          Array.isArray(user.userRole) && user.userRole.includes(activeRole),
      );
    }
    const currentSort = SORT_OPTIONS.find((s) => s.key === sortKey);
    if (currentSort) {
      const { field, dir } = currentSort;
      list.sort((a, b) => {
        const valA = String(a[field] || "").toLowerCase();
        const valB = String(b[field] || "").toLowerCase();

        if (valA < valB) return dir === "asc" ? -1 : 1;
        if (valA > valB) return dir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [userResponse, searchDebounced, activeRole, sortKey]);

  const handleOpenCreate = () => setFormModal({ open: true, user: null });
  const handleOpenEdit = (user) => setFormModal({ open: true, user });
  const handleOpenDelete = (user) => setDeleteModal({ open: true, user });

  const handleSubmitForm = (data) => {
    const isEdit = Boolean(data.id);
    const mutationFn = isEdit ? updateUser : createUser;
    const payload = isEdit ? { userId: data.id, data } : data;
    mutationFn(payload, {
      onSuccess: () => {
        notificationAntd(
          "success",
          isEdit ? "Update success" : "Create success",
          isEdit ? "User has been updated" : "User has been created",
        );
        setFormModal({ open: false, user: null });
        refreshData();
      },
      onError: () => notificationAntd("error", "Failed", "Please try again"),
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.user?.id) return;
    deleteUser(deleteModal.user.id, {
      onSuccess: () => {
        notificationAntd("success", "Deleted", "User has been deleted");
        setDeleteModal({ open: false, user: null });
        refreshData();
      },
      onError: () =>
        notificationAntd("error", "Delete failed", "Please try again"),
    });
  };

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.key === sortKey)?.label || "Sắp xếp";

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 w-full text-slate-100">
      {/* ===== Top Header ===== */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
            User Management
          </h1>
          <p className="text-xs text-slate-400 mt-1 ml-4">
            Danh sách hiển thị:{" "}
            <span className="text-purple-400 font-semibold">
              {processedUsers.length}
            </span>{" "}
            người dùng
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
          Add New User
        </button>
      </div>

      {/* ===== Tìm kiếm bên trái + Cụm Sort tách riêng ở bên phải ===== */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-3 flex-wrap"
      >
        {/* Ô Tìm Kiếm */}
        <div className="relative flex-1 min-w-[260px] group">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-purple-400 transition"
          />
          <input
            type="text"
            {...register("search")}
            placeholder="Search by name or email..."
            className="w-full bg-[#111827]/80 backdrop-blur border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 hover:border-slate-700 transition"
          />
        </div>

        {/* Nút Chọn Kiểu Sắp Xếp Nằm Riêng Biệt */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setSortMenuOpen((v) => !v)}
            className="inline-flex items-center gap-2 bg-[#111827]/80 backdrop-blur border border-slate-800 hover:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs transition min-w-[180px] justify-between h-full"
          >
            <span className="inline-flex items-center gap-1.5">
              <FontAwesomeIcon
                icon={faArrowDownWideShort}
                className="w-3 h-3 text-purple-400"
              />
              <span className="text-slate-500">Sort:</span>
              <span className="text-white font-medium">{currentSortLabel}</span>
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-2.5 h-2.5 text-slate-500 transition-transform ${sortMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {sortMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-20 w-52 bg-[#1a2235] border border-slate-700 rounded-xl shadow-2xl p-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => {
                    setValue("sortKey", opt.key);
                    setSortMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition rounded-lg ${
                    sortKey === opt.key
                      ? "bg-purple-600/20 text-purple-300 font-medium"
                      : "text-slate-200 hover:bg-slate-700/60"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortKey === opt.key && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-2.5 h-2.5 text-purple-400"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* ===== Bộ lọc các nút Roles ===== */}
      <div className="flex flex-wrap gap-1.5">
        {ROLE_FILTERS.map((role) => {
          const active = activeRole === role.key;
          if (!isAdmin && role.key === "ADMIN") return null;
          return (
            <button
              key={role.key}
              type="button"
              onClick={() => setValue("activeRole", role.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all ${active ? "bg-purple-600 border-purple-500 text-white shadow-sm" : "bg-[#111827]/60 border-slate-800 text-slate-400 hover:border-slate-700"}`}
            >
              <FontAwesomeIcon icon={role.icon} className="w-2.5 h-2.5" />
              {role.label}
            </button>
          );
        })}
      </div>

      {/* ===== Khung Table chính ===== */}
      <div className="bg-[#111827] border border-slate-800/80 rounded-xl shadow-xl relative">
        {/* Tiêu đề cột trơn sạch sẽ, không chứa nút sort hỗn độn nữa */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3.5 bg-gradient-to-r from-[#0f1422] to-[#0d1220] border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 rounded-t-xl">
          <div className="col-span-4">Name / Email</div>
          <div className="col-span-2">Roles</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-2">Joined Date</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>

        {/* Thân Table đổ dữ liệu */}
        <div className="divide-y divide-slate-800/50">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 animate-pulse"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-800 rounded w-1/3" />
                    <div className="h-2 bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="h-4 bg-slate-800 rounded w-16" />
                </div>
                <div className="col-span-2">
                  <div className="h-3 bg-slate-800 rounded w-20" />
                </div>
                <div className="col-span-2">
                  <div className="h-3 bg-slate-800 rounded w-16" />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <div className="w-7 h-7 rounded bg-slate-800" />
                  <div className="w-7 h-7 rounded bg-slate-800" />
                </div>
              </div>
            ))
          ) : processedUsers.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-800 flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-5 h-5 text-slate-600"
                />
              </div>
              <p className="text-xs font-medium text-slate-400">
                No users found
              </p>
            </div>
          ) : (
            processedUsers.map((u, idx) => {
              const rowKey = u.id ?? u.email ?? idx;
              const sortedRoles = sortRoles(u.userRole);
              const phoneDisplay = u.phoneNumber;
              const isLastRow = idx === processedUsers.length - 1;

              return (
                <div
                  key={rowKey}
                  className={`grid grid-cols-12 gap-4 items-center px-5 py-3.5 hover:bg-slate-800/10 transition group ${isLastRow ? "rounded-b-xl" : ""}`}
                >
                  {/* Cột Tên + Email */}
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.email}
                        className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-800"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarGradient(u.email)} flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm`}
                      >
                        {getInitials(u.fullName || u.email)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-white truncate">
                        {u.fullName || (
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u)}
                            className="text-slate-500 italic font-normal hover:text-purple-400 transition text-[11px]"
                          >
                            (Chưa cập nhật)
                          </button>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="w-2 h-2 shrink-0 opacity-70"
                        />
                        <span className="truncate">{u.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cột Roles */}
                  <div className="col-span-2 flex flex-wrap gap-1">
                    {sortedRoles.length === 0 ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800/40 text-slate-500 border border-slate-800">
                        No role
                      </span>
                    ) : (
                      sortedRoles.map((r) => {
                        const style = ROLE_STYLES[r] || {
                          cls: "bg-slate-800 text-slate-400 border-slate-700",
                          icon: faUser,
                        };
                        return (
                          <span
                            key={r}
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase border ${style.cls}`}
                          >
                            <FontAwesomeIcon
                              icon={style.icon}
                              className="w-2 h-2"
                            />{" "}
                            {r}
                          </span>
                        );
                      })
                    )}
                  </div>

                  {/* Cột Số điện thoại */}
                  <div className="col-span-2 min-w-0">
                    {phoneDisplay ? (
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 min-w-0">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="w-2.5 h-2.5 text-slate-600 shrink-0"
                        />
                        <span className="truncate tabular-nums">
                          {phoneDisplay}
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(u)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition"
                      >
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="w-2.5 h-2.5"
                        />{" "}
                        Cập nhật
                      </button>
                    )}
                  </div>

                  {/* Cột Ngày tham gia */}
                  <div className="col-span-2 text-xs text-slate-400 tabular-nums">
                    {formatDate(u.createdAt)}
                  </div>

                  {/* Cột Nút Actions hiện thẳng ngoài dòng */}
                  <div
                    className="col-span-2 flex justify-end items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(u)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition duration-150"
                      title="Sửa"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="w-3.5 h-3.5"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDelete(u)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition duration-150"
                      title="Xóa"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modals */}
      <UserFormModal
        open={formModal.open}
        user={formModal.user}
        onClose={() => setFormModal({ open: false, user: null })}
        onSubmit={handleSubmitForm}
        isSubmitting={isSubmitting}
      />
      <ConfirmDeleteModal
        open={deleteModal.open}
        user={deleteModal.user}
        onClose={() => setDeleteModal({ open: false, user: null })}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminUserManagement;
