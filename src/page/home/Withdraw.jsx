import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faInfoCircle,
  faCircle,
  faBuildingColumns,
  faUser,
  faHashtag,
  faPen,
  faArrowUpRightFromSquare,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import useGetWallet from "@/hooks/useGetWallet";
import { usePostWithDrawal } from "@/hooks/usePostWithDrawal";
import { formatCurrency } from "./../../utils/systems/sysFuc";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { useSearchParams } from "react-router-dom";
import { useGetWithdrawalRequests } from "@/hooks/useGetWithdrawalRequests";
import Pagination from "@/components/ui/Pagination";

const formatDate = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusConfig = {
  PENDING: {
    classes: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    dot: "text-amber-400",
    label: "Pending",
  },
  APPROVED: {
    classes: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    dot: "text-emerald-400",
    label: "Approved",
  },
  REJECTED: {
    classes: "bg-rose-500/10 text-rose-300 border-rose-400/30",
    dot: "text-rose-400",
    label: "Rejected",
  },
};

const Withdraw = () => {
  const { data: walletResponse, isLoading } = useGetWallet();
  const [availableBalance, setAvailableBalance] = useState(
    walletResponse?.data?.data.balanceInVnd || 0,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const { data: pageWithdraw } = useGetWithdrawalRequests(page);
  const payoutHistory = pageWithdraw?.data?.data?.content || [];
  const pagination = pageWithdraw?.data?.data;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      bank_name: "",
      bank_account_number: "",
      account_holder_name: "",
      note: "",
    },
  });

  const watchAmount = watch("amount");
  const feePercentage = 0.5;
  const calculatedPayout =
    watchAmount && !isNaN(watchAmount)
      ? Math.floor(Number(watchAmount) * (1 - feePercentage))
      : 0;

  const { mutate } = usePostWithDrawal();

  const onSubmit = (data) => {
    const dataDto = {
      bankAccountNumber: data.bank_account_number,
      bankName: data.bank_name,
      amount: data.amount,
      accountHolderName: data.account_holder_name,
      note: data.note,
    };
    mutate(dataDto, {
      onSuccess: () => {
        setAvailableBalance(availableBalance - watchAmount);
        notificationAntd(
          "success",
          "Invoice withdrawal created successfully",
          "Invoice withdrawal created successfully. We will transfer the money once the admin approves it.",
        );
      },
      onError: (err) => {
        const res =
          err.response?.data?.message ||
          "Withdrawal failed. Please try again later.";
        notificationAntd("error", "Withdrawal failed", res);
      },
    });
  };

  useEffect(() => {
    if (walletResponse) {
      setAvailableBalance(walletResponse?.data?.data.balanceInVnd || 0);
    }
  }, [walletResponse]);

  // Reusable input className
  const inputBaseClass =
    "w-full bg-[#0a0f1c]/60 backdrop-blur-sm border rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 focus:bg-[#0a0f1c] transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#070b14] text-white font-sans relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-sky-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative p-6 md:p-10">
        {/* Header */}
        <div className="mb-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-indigo-300/80 font-medium">
              Finance Center
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
            Withdrawal & Payouts
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl">
            Manage your earnings and request secure transfers to your bank
            account.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            {/* Balance Card - Premium hero card */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-transparent rounded-2xl opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-[#1a1f3a] via-[#13182b] to-[#0d1120] border border-white/10 rounded-2xl p-7 overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/15 rounded-full blur-3xl" />

                {/* Geometric pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faWallet}
                          className="text-indigo-300 text-sm"
                        />
                      </div>
                      <span className="text-gray-300 font-medium text-sm">
                        Available Balance
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2 py-1 rounded-full font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200">
                      {isLoading ? (
                        <span className="text-gray-500 text-2xl">
                          Loading...
                        </span>
                      ) : (
                        formatCurrency(availableBalance)
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-emerald-400/80 text-xs"
                    />
                    <p className="text-xs text-gray-500">
                      Funds secured & ready for withdrawal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Withdrawal Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#0e1322]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-7 shadow-2xl shadow-black/30"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">
                  Request Withdrawal
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your bank details below
                </p>
              </div>

              {/* Amount */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Withdrawal Amount <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-indigo-300 font-bold text-base z-10">
                    ₫
                  </span>
                  <input
                    type="number"
                    {...register("amount", {
                      required: "Amount is required",
                      min: {
                        value: 10000,
                        message: "Minimum amount is 10,000 VND",
                      },
                      max: {
                        value: availableBalance,
                        message: "Exceeds available balance",
                      },
                    })}
                    className={`${inputBaseClass} pr-16 font-semibold text-base ${
                      errors.amount
                        ? "border-rose-500/50"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    placeholder="0"
                  />
                  <span className="absolute right-4 text-gray-500 text-xs font-bold tracking-wider">
                    VND
                  </span>
                </div>
                {errors.amount ? (
                  <p className="text-rose-400 text-xs mt-2 flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-[10px]"
                    />
                    {errors.amount.message}
                  </p>
                ) : (
                  watchAmount &&
                  !isNaN(watchAmount) &&
                  Number(watchAmount) > 0 && (
                    <div className="mt-2 px-3 py-2 bg-emerald-500/5 border border-emerald-400/20 rounded-lg">
                      <p className="text-emerald-300 text-xs font-medium flex items-center justify-between">
                        <span>Bạn sẽ nhận được</span>
                        <span className="font-bold tabular-nums">
                          {calculatedPayout.toLocaleString("vi-VN")} VND
                        </span>
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Bank Name */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Bank Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500">
                    <FontAwesomeIcon icon={faBuildingColumns} />
                  </span>
                  <input
                    type="text"
                    {...register("bank_name", {
                      required: "Bank Name is required",
                    })}
                    className={`${inputBaseClass} ${
                      errors.bank_name
                        ? "border-rose-500/50"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    placeholder="e.g. Vietcombank"
                  />
                </div>
                {errors.bank_name && (
                  <p className="text-rose-400 text-xs mt-1.5">
                    {errors.bank_name.message}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Account Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500">
                    <FontAwesomeIcon icon={faHashtag} />
                  </span>
                  <input
                    type="text"
                    {...register("bank_account_number", {
                      required: "Account Number is required",
                    })}
                    className={`${inputBaseClass} font-mono tracking-wider ${
                      errors.bank_account_number
                        ? "border-rose-500/50"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    placeholder="1234567890"
                  />
                </div>
                {errors.bank_account_number && (
                  <p className="text-rose-400 text-xs mt-1.5">
                    {errors.bank_account_number.message}
                  </p>
                )}
              </div>

              {/* Holder Name */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Account Holder Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    {...register("account_holder_name", {
                      required: "Holder Name is required",
                    })}
                    className={`${inputBaseClass} uppercase tracking-wide ${
                      errors.account_holder_name
                        ? "border-rose-500/50"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    placeholder="NGUYEN VAN A"
                  />
                </div>
                {errors.account_holder_name && (
                  <p className="text-rose-400 text-xs mt-1.5">
                    {errors.account_holder_name.message}
                  </p>
                )}
              </div>

              {/* Note */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                  Note{" "}
                  <span className="text-gray-600 normal-case tracking-normal font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  <textarea
                    {...register("note")}
                    className="w-full bg-[#0a0f1c]/60 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none h-24"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              {/* Warning - Premium style */}
              <div className="relative bg-gradient-to-br from-amber-950/30 to-rose-950/20 border border-amber-500/20 rounded-xl p-4 mb-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-rose-400" />
                <div className="flex items-start gap-3 pl-2">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-amber-400 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-semibold text-amber-300 mb-1">
                      Platform Fee Notice
                    </p>
                    <p className="text-xs text-amber-200/70 leading-relaxed">
                      A 50% withdrawal fee applies to all payouts as an
                      administrative platform fee.
                    </p>
                  </div>
                </div>
              </div>

              {/* Calculated Payout - Highlighted */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-400/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-bold mb-1">
                      You Will Receive
                    </p>
                    <p className="text-xs text-gray-500">After platform fee</p>
                  </div>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 tabular-nums">
                    {calculatedPayout.toLocaleString("vi-VN")}
                    <span className="text-sm text-emerald-400/60 ml-1">
                      VND
                    </span>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-[position:100%_0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-500 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-500/30 active:scale-[0.98]"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Request Withdrawal
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </span>
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: History */}
          <div className="xl:col-span-2">
            <div className="bg-[#0e1322]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-7 shadow-2xl shadow-black/30 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Payout History
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Your withdrawal records
                  </p>
                </div>
                {payoutHistory.length > 0 && (
                  <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    {payoutHistory.length} record
                    {payoutHistory.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {payoutHistory.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faWallet}
                        className="text-gray-600 text-xl"
                      />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">
                      No payouts yet
                    </p>
                    <p className="text-gray-600 text-xs">
                      Your withdrawal history will appear here
                    </p>
                  </div>
                ) : (
                  payoutHistory.map((item, index) => {
                    const status =
                      statusConfig[item.status] || statusConfig.PENDING;
                    return (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-br from-[#0d1220] to-[#0a0f1c] border border-white/5 rounded-xl p-5 hover:border-indigo-400/20 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                      >
                        {/* Status indicator bar */}
                        <div
                          className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${
                            item.status === "APPROVED"
                              ? "bg-emerald-400"
                              : item.status === "REJECTED"
                                ? "bg-rose-400"
                                : "bg-amber-400"
                          } opacity-60 group-hover:opacity-100 transition-opacity`}
                        />

                        <div className="pl-2 flex flex-col gap-3">
                          {/* Row 1: Amount + Status */}
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-white tabular-nums tracking-tight">
                                {Number(item.amount).toLocaleString("vi-VN")}
                              </span>
                              <span className="text-xs text-gray-500 font-semibold">
                                VND
                              </span>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${status.classes}`}
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                className={`text-[6px] ${status.dot} animate-pulse`}
                              />
                              {status.label}
                            </span>
                          </div>

                          {/* Row 2: Bank info */}
                          <div className="flex items-center gap-2 flex-wrap text-sm">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg">
                              <FontAwesomeIcon
                                icon={faBuildingColumns}
                                className="text-indigo-300 text-xs"
                              />
                              <span className="text-gray-200 font-semibold text-xs">
                                {item.bankName}
                              </span>
                            </div>
                            <span className="text-gray-500 text-xs font-mono">
                              {item.bankAccountNumber}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 uppercase text-xs tracking-wide">
                              {item.accountHolderName}
                            </span>
                          </div>

                          {/* Row 3: Dates */}
                          <div className="flex items-center gap-x-5 gap-y-1 flex-wrap text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-600">Created</span>
                              <span className="text-gray-300 font-medium">
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                            {item.reviewedAt && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-600">Reviewed</span>
                                <span className="text-gray-300 font-medium">
                                  {formatDate(item.reviewedAt)}
                                </span>
                              </div>
                            )}
                            {item.reviewedBy && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-600">By</span>
                                <span className="text-indigo-300 font-medium">
                                  {item.reviewedBy}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Row 4: Note + Admin Response */}
                          {(item.note || item.adminNote) && (
                            <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                              {item.note && (
                                <div className="flex gap-2 items-start">
                                  <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold mt-0.5 shrink-0">
                                    Note
                                  </span>
                                  <p className="text-xs text-gray-400 leading-relaxed">
                                    {item.note}
                                  </p>
                                </div>
                              )}
                              {item.adminNote && (
                                <div className="flex gap-2 items-start">
                                  <span className="text-[10px] uppercase tracking-wider text-amber-500/80 font-bold mt-0.5 shrink-0">
                                    Admin
                                  </span>
                                  <p className="text-xs text-amber-300/90 leading-relaxed">
                                    {item.adminNote}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <Pagination
                sizePage={pagination?.totalPages}
                pageOnRecode={5}
                currentPage={page}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
