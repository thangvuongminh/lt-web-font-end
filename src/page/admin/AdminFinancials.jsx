import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faClock,
  faDroplet,
  faArrowTrendUp,
  faArrowTrendDown,
  faCheck,
  faCheckDouble,
  faXmark,
  faBan,
  faArrowUp,
  faArrowDown,
  faArrowDownWideShort,
  faFileExport,
  faRotateRight,
  faMagnifyingGlass,
  faTriangleExclamation,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faUser,
  faNoteSticky,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, getInitials } from "@/utils/systems/sysFuc";
const INITIAL_WITHDRAWALS = [
  {
    id: 1,
    userId: 101,
    amount: 12500000,
    bankAccountNumber: "0123456789",
    bankName: "Vietcombank",
    accountHolderName: "Elena Rodriguez",
    status: "PENDING",
    note: "Rút tiền hoa hồng tháng 10",
    adminNote: null,
    reviewedBy: null,
    reviewedAt: null,
    createdAt: 1778228117000000,
    updatedAt: 1778228117000000,
  },
  {
    id: 2,
    userId: 102,
    amount: 200000,
    bankAccountNumber: "123",
    bankName: "Vietinbank",
    accountHolderName: "Nguyen VAN A",
    status: "PENDING",
    note: "",
    adminNote: null,
    reviewedBy: null,
    reviewedAt: null,
    createdAt: 1778228117000000,
    updatedAt: 1778228117000000,
  },
  {
    id: 3,
    userId: 103,
    amount: 4150000,
    bankAccountNumber: "9876543210",
    bankName: "Techcombank",
    accountHolderName: "Sarah Jenkins",
    status: "PENDING",
    note: "Thanh toán khóa học",
    adminNote: null,
    reviewedBy: null,
    reviewedAt: null,
    createdAt: 1778141717000000,
    updatedAt: 1778141717000000,
  },
  {
    id: 4,
    userId: 104,
    amount: 2800000,
    bankAccountNumber: "5555666677",
    bankName: "BIDV",
    accountHolderName: "David Kim",
    status: "PENDING",
    note: "",
    adminNote: null,
    reviewedBy: null,
    reviewedAt: null,
    createdAt: 1778055317000000,
    updatedAt: 1778055317000000,
  },
];

const STATS = [
  {
    key: "commission",
    label: "Total Commission (50%)",
    value: "₫845,250,000",
    delta: "+12.5% this month",
    deltaType: "up",
    icon: faBuildingColumns,
    iconBg: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-300",
  },
  {
    key: "pending",
    label: "Pending Withdrawals",
    value: "₫124,400,000",
    delta: "-4.2% from last week",
    deltaType: "down",
    icon: faClock,
    iconBg: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-300",
  },
  {
    key: "liquidity",
    label: "Available Liquidity",
    value: "₫2,106,000,000",
    delta: "+8.1% overall",
    deltaType: "up",
    icon: faDroplet,
    iconBg: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "text-cyan-300",
  },
];

const REJECT_REASONS = [
  "Thông tin tài khoản ngân hàng không chính xác",
  "Số dư không đủ điều kiện rút",
  "Phát hiện hoạt động đáng ngờ",
  "Cần xác minh tài khoản trước",
  "Khác (nhập lý do bên dưới)",
];

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);

const statusBadge = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
    case "REJECTED":
      return "bg-rose-500/15 border-rose-500/40 text-rose-300";
    default:
      return "bg-amber-500/15 border-amber-500/40 text-amber-300";
  }
};

// ===== Component =====
export default function AdminFinancials() {
  // Giả lập admin đang đăng nhập
  const CURRENT_ADMIN = "admin@portal.com";

  const [withdrawals, setWithdrawals] = useState(INITIAL_WITHDRAWALS);
  const [selected, setSelected] = useState(new Set());
  const [statusTab, setStatusTab] = useState("PENDING");
  const [expandedId, setExpandedId] = useState(null); // dòng nào đang mở chi tiết

  // Modal Reject
  const [rejectModal, setRejectModal] = useState({
    open: false,
    targetIds: [],
    reasonIdx: 0,
    customReason: "",
  });

  // Modal Approve (cho phép nhập adminNote tùy chọn)
  const [approveModal, setApproveModal] = useState({
    open: false,
    targetIds: [],
    adminNote: "",
  });

  // ===== Cập nhật trạng thái =====
  const updateStatus = (ids, newStatus, adminNote) => {
    const now = Date.now() * 1000; // giả lập micro-seconds như backend
    setWithdrawals((prev) =>
      prev.map((w) =>
        ids.includes(w.id)
          ? {
              ...w,
              status: newStatus,
              adminNote: adminNote || w.adminNote,
              reviewedBy: CURRENT_ADMIN,
              reviewedAt: now,
              updatedAt: now,
            }
          : w,
      ),
    );
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  };

  // ===== Approve =====
  const openApprove = (ids) => {
    if (ids.length === 0) return;
    setApproveModal({ open: true, targetIds: ids, adminNote: "" });
  };
  const confirmApprove = () => {
    updateStatus(
      approveModal.targetIds,
      "APPROVED",
      approveModal.adminNote.trim() || null,
    );
    setApproveModal({ open: false, targetIds: [], adminNote: "" });
  };
  const cancelApprove = () =>
    setApproveModal({ open: false, targetIds: [], adminNote: "" });

  // ===== Reject =====
  const openReject = (ids) => {
    if (ids.length === 0) return;
    setRejectModal({
      open: true,
      targetIds: ids,
      reasonIdx: 0,
      customReason: "",
    });
  };
  const confirmReject = () => {
    const isCustom = rejectModal.reasonIdx === REJECT_REASONS.length - 1;
    const reason = isCustom
      ? rejectModal.customReason.trim()
      : REJECT_REASONS[rejectModal.reasonIdx];

    if (!reason) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }
    updateStatus(rejectModal.targetIds, "REJECTED", reason);
    setRejectModal({
      open: false,
      targetIds: [],
      reasonIdx: 0,
      customReason: "",
    });
  };
  const cancelReject = () =>
    setRejectModal({
      open: false,
      targetIds: [],
      reasonIdx: 0,
      customReason: "",
    });

  // ===== Select =====
  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ===== Data hiển thị =====
  const visibleList = useMemo(
    () => withdrawals.filter((w) => w.status === statusTab),
    [withdrawals, statusTab],
  );

  const counts = useMemo(
    () => ({
      PENDING: withdrawals.filter((w) => w.status === "PENDING").length,
      APPROVED: withdrawals.filter((w) => w.status === "APPROVED").length,
      REJECTED: withdrawals.filter((w) => w.status === "REJECTED").length,
    }),
    [withdrawals],
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const isPendingTab = statusTab === "PENDING";

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans">
      <div className="px-7 py-7">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Withdrawal Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Duyệt / từ chối yêu cầu rút tiền của người dùng
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {STATS.map((s) => (
            <div
              key={s.key}
              className="relative overflow-hidden bg-[#111827] border border-slate-800/60 rounded-xl p-5 hover:border-slate-700 transition group"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.iconBg} blur-2xl opacity-60 group-hover:opacity-100 transition`}
              />
              <div className="relative flex items-start justify-between mb-3">
                <div className="text-xs font-medium text-slate-400">
                  {s.label}
                </div>
                <div
                  className={`w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center ${s.iconColor}`}
                >
                  <FontAwesomeIcon icon={s.icon} className="w-4 h-4" />
                </div>
              </div>
              <div className="relative text-2xl font-bold text-white tracking-tight mb-2">
                {s.value}
              </div>
              <div
                className={`relative inline-flex items-center gap-1.5 text-xs font-medium ${s.deltaType === "up" ? "text-emerald-400" : "text-rose-400"}`}
              >
                <FontAwesomeIcon
                  icon={
                    s.deltaType === "up" ? faArrowTrendUp : faArrowTrendDown
                  }
                  className="w-3 h-3"
                />
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Withdrawal Queue */}
        <div className="bg-[#111827] border border-slate-800/60 rounded-xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">
                Withdrawal Requests
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {visibleList.length} yêu cầu
                {selected.size > 0 && (
                  <span className="ml-2 text-purple-400">
                    • {selected.size} đã chọn
                  </span>
                )}
              </p>
            </div>

            {isPendingTab && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openReject([...selected])}
                  disabled={selected.size === 0}
                  className="inline-flex items-center gap-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-rose-200 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  <FontAwesomeIcon icon={faBan} className="w-3.5 h-3.5" />
                  Batch Reject
                </button>
                <button
                  onClick={() => openApprove([...selected])}
                  disabled={selected.size === 0}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md shadow-purple-600/20 disabled:shadow-none transition"
                >
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className="w-3.5 h-3.5"
                  />
                  Batch Approve
                </button>
              </div>
            )}
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 px-6 pt-3 border-b border-slate-800/60">
            {[
              {
                key: "PENDING",
                label: "Pending",
                badge: "bg-amber-500/20 text-amber-300",
              },
              {
                key: "APPROVED",
                label: "Approved",
                badge: "bg-emerald-500/20 text-emerald-300",
              },
              {
                key: "REJECTED",
                label: "Rejected",
                badge: "bg-rose-500/20 text-rose-300",
              },
            ].map((tab) => {
              const active = statusTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setStatusTab(tab.key);
                    setSelected(new Set());
                    setExpandedId(null);
                  }}
                  className={`relative px-4 py-2.5 text-sm font-medium transition
                    ${active ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  <span className="inline-flex items-center gap-2">
                    {tab.label}
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                      ${active ? tab.badge : "bg-slate-800 text-slate-400"}`}
                    >
                      {counts[tab.key]}
                    </span>
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-t" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f1422] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isPendingTab && <th className="px-4 py-3 w-10"></th>}
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Số tiền</th>
                  <th className="px-4 py-3 text-left">Ngân hàng</th>
                  <th className="px-4 py-3 text-left">Ngày tạo</th>
                  <th className="px-6 py-3 text-right">
                    {isPendingTab ? "Thao tác" : "Trạng thái"}
                  </th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {visibleList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={isPendingTab ? 7 : 6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="w-8 h-8 text-slate-700 mb-2"
                      />
                      <div>Không có yêu cầu nào ở trạng thái này.</div>
                    </td>
                  </tr>
                ) : (
                  visibleList.map((w) => {
                    const isSelected = selected.has(w.id);
                    const isExpanded = expandedId === w.id;
                    return (
                      <React.Fragment key={w.id}>
                        <tr
                          className={`transition ${isSelected ? "bg-purple-500/5" : "hover:bg-slate-800/30"}`}
                        >
                          {isPendingTab && (
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => toggleRow(w.id)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition
                                  ${isSelected ? "bg-purple-500 border-purple-500" : "border-slate-600 hover:border-slate-400"}`}
                              >
                                {isSelected && (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="w-2.5 h-2.5 text-white"
                                  />
                                )}
                              </button>
                            </td>
                          )}

                          {/* User */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-semibold text-slate-200 ring-2 ring-slate-700/40">
                                {getInitials(w.accountHolderName)}
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {w.accountHolderName}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  User #{w.userId}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-4 font-semibold text-white tabular-nums">
                            {formatVND(w.amount)}
                          </td>

                          {/* Bank */}
                          <td className="px-4 py-4">
                            <div className="text-slate-200 text-sm">
                              {w.bankName}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {w.bankAccountNumber}
                            </div>
                          </td>

                          {/* Created date */}
                          <td className="px-4 py-4 text-slate-400 text-xs">
                            {formatDate(w.createdAt)}
                          </td>

                          {/* Actions / Status */}
                          <td className="px-6 py-4 text-right">
                            {isPendingTab ? (
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => openReject([w.id])}
                                  className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-200 hover:text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                                >
                                  <FontAwesomeIcon
                                    icon={faXmark}
                                    className="w-3 h-3"
                                  />
                                  Từ chối
                                </button>
                                <button
                                  onClick={() => openApprove([w.id])}
                                  className="inline-flex items-center gap-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="w-3 h-3"
                                  />
                                  Duyệt
                                </button>
                              </div>
                            ) : (
                              <span
                                className={`inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1.5 rounded-md ${statusBadge(w.status)}`}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    w.status === "APPROVED" ? faCheck : faBan
                                  }
                                  className="w-3 h-3"
                                />
                                {w.status}
                              </span>
                            )}
                          </td>

                          {/* Expand button */}
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() =>
                                setExpandedId(isExpanded ? null : w.id)
                              }
                              className="w-7 h-7 rounded-md text-slate-400 hover:bg-slate-700/60 hover:text-white flex items-center justify-center transition"
                              title="Xem chi tiết"
                            >
                              <FontAwesomeIcon
                                icon={isExpanded ? faChevronUp : faChevronDown}
                                className="w-3 h-3"
                              />
                            </button>
                          </td>
                        </tr>

                        {/* Chi tiết - khi expanded */}
                        {isExpanded && (
                          <tr className="bg-[#0f1422]/60">
                            <td
                              colSpan={isPendingTab ? 7 : 6}
                              className="px-6 py-5"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Cột trái: Thông tin */}
                                <div className="space-y-3">
                                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <FontAwesomeIcon
                                      icon={faCircleInfo}
                                      className="w-3 h-3"
                                    />
                                    Thông tin yêu cầu
                                  </div>

                                  <Field
                                    label="Mã giao dịch"
                                    value={`#${w.id}`}
                                    mono
                                  />
                                  <Field
                                    label="Tên chủ TK"
                                    value={w.accountHolderName}
                                  />
                                  <Field
                                    label="Số tài khoản"
                                    value={w.bankAccountNumber}
                                    mono
                                    onCopy={() =>
                                      copyToClipboard(w.bankAccountNumber)
                                    }
                                  />
                                  <Field label="Ngân hàng" value={w.bankName} />
                                  <Field
                                    label="Số tiền yêu cầu"
                                    value={formatVND(w.amount)}
                                    highlight
                                  />
                                </div>

                                {/* Cột phải: Ghi chú + lịch sử duyệt */}
                                <div className="space-y-3">
                                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <FontAwesomeIcon
                                      icon={faNoteSticky}
                                      className="w-3 h-3"
                                    />
                                    Ghi chú & lịch sử
                                  </div>

                                  {/* User note */}
                                  <div>
                                    <div className="text-[11px] text-slate-500 mb-1">
                                      Ghi chú của user
                                    </div>
                                    <div className="bg-[#111827] border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-300 min-h-[40px]">
                                      {w.note?.trim() ? (
                                        w.note
                                      ) : (
                                        <span className="text-slate-600 italic">
                                          Không có ghi chú
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Admin note */}
                                  <div>
                                    <div className="text-[11px] text-slate-500 mb-1">
                                      Ghi chú của admin
                                    </div>
                                    <div
                                      className={`border rounded-md px-3 py-2 text-sm min-h-[40px]
                                      ${
                                        w.adminNote
                                          ? w.status === "REJECTED"
                                            ? "bg-rose-500/5 border-rose-500/30 text-rose-200"
                                            : "bg-emerald-500/5 border-emerald-500/30 text-emerald-200"
                                          : "bg-[#111827] border-slate-800 text-slate-600 italic"
                                      }`}
                                    >
                                      {w.adminNote || "Chưa có ghi chú"}
                                    </div>
                                  </div>

                                  {/* Reviewed info */}
                                  {(w.reviewedBy || w.reviewedAt) && (
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                                      <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon
                                          icon={faUser}
                                          className="w-2.5 h-2.5"
                                        />
                                        {w.reviewedBy || "-"}
                                      </span>
                                      <span>{formatDate(w.reviewedAt)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== MODAL: APPROVE ===== */}
      {approveModal.open && (
        <Modal onClose={cancelApprove}>
          <div className="px-6 py-5 border-b border-slate-800 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                Duyệt{" "}
                {approveModal.targetIds.length > 1
                  ? `${approveModal.targetIds.length} yêu cầu`
                  : "yêu cầu này"}
                ?
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Số tiền sẽ được chuyển đến tài khoản ngân hàng đã đăng ký.
              </p>
            </div>
          </div>

          <div className="px-6 py-5">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
              Ghi chú nội bộ (tùy chọn)
            </label>
            <textarea
              value={approveModal.adminNote}
              onChange={(e) =>
                setApproveModal((s) => ({ ...s, adminNote: e.target.value }))
              }
              placeholder="Vd: Đã xác minh thông tin tài khoản..."
              rows={3}
              className="w-full bg-[#0f1422] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition resize-none"
            />
          </div>

          <div className="px-6 py-4 bg-[#0f1422] border-t border-slate-800 flex justify-end gap-2">
            <button
              onClick={cancelApprove}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              onClick={confirmApprove}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium rounded-lg shadow-md shadow-emerald-600/30 transition"
            >
              <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" />
              Xác nhận duyệt
            </button>
          </div>
        </Modal>
      )}

      {/* ===== MODAL: REJECT ===== */}
      {rejectModal.open && (
        <Modal onClose={cancelReject}>
          <div className="px-6 py-5 border-b border-slate-800 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="w-5 h-5"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                Từ chối{" "}
                {rejectModal.targetIds.length > 1
                  ? `${rejectModal.targetIds.length} yêu cầu`
                  : "yêu cầu này"}
                ?
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Lý do từ chối sẽ được gửi đến user. Hành động này không thể hoàn
                tác.
              </p>
            </div>
          </div>

          <div className="px-6 py-5 space-y-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400">
              Lý do từ chối <span className="text-rose-400">*</span>
            </label>
            <div className="space-y-2">
              {REJECT_REASONS.map((reason, idx) => {
                const checked = rejectModal.reasonIdx === idx;
                return (
                  <button
                    key={reason}
                    onClick={() =>
                      setRejectModal((s) => ({ ...s, reasonIdx: idx }))
                    }
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-sm transition
                      ${
                        checked
                          ? "bg-rose-500/10 border-rose-500/50 text-white"
                          : "bg-[#0f1422] border-slate-800 text-slate-300 hover:border-slate-600"
                      }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                      ${checked ? "border-rose-400" : "border-slate-600"}`}
                    >
                      {checked && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      )}
                    </span>
                    {reason}
                  </button>
                );
              })}
            </div>

            {rejectModal.reasonIdx === REJECT_REASONS.length - 1 && (
              <textarea
                value={rejectModal.customReason}
                onChange={(e) =>
                  setRejectModal((s) => ({
                    ...s,
                    customReason: e.target.value,
                  }))
                }
                placeholder="Nhập lý do cụ thể..."
                rows={3}
                autoFocus
                className="w-full bg-[#0f1422] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/20 transition resize-none"
              />
            )}
          </div>

          <div className="px-6 py-4 bg-[#0f1422] border-t border-slate-800 flex justify-end gap-2">
            <button
              onClick={cancelReject}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              onClick={confirmReject}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-medium rounded-lg shadow-md shadow-rose-600/30 transition"
            >
              <FontAwesomeIcon icon={faBan} className="w-3.5 h-3.5" />
              Xác nhận từ chối
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ===== Sub-components =====
function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#111827] border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, mono = false, highlight = false, onCopy }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-slate-500 shrink-0">{label}</div>
      <div className="flex items-center gap-2 min-w-0">
        <div
          className={`text-sm truncate ${
            highlight ? "text-purple-300 font-semibold" : "text-slate-200"
          } ${mono ? "font-mono" : ""}`}
        >
          {value}
        </div>
        {onCopy && (
          <button
            onClick={onCopy}
            className="w-6 h-6 rounded text-slate-500 hover:text-white hover:bg-slate-700/60 flex items-center justify-center transition shrink-0"
            title="Copy"
          >
            <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
