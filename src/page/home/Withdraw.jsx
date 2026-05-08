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
} from "@fortawesome/free-solid-svg-icons";
import useGetWallet from "@/hooks/useGetWallet";
import { usePostWithDrawal } from "@/hooks/usePostWithDrawal";
import { formatCurrency } from "./../../utils/systems/sysFuc";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { useSearchParams } from "react-router-dom";
import { useGetWithdrawalRequests } from "@/hooks/useGetWithdrawalRequests";

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
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  APPROVED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

const Withdraw = () => {
  const { data: walletResponse, isLoading } = useGetWallet();
  const [availableBalance, setAvailableBalance] = useState(
    walletResponse?.data?.data.balanceInVnd || 0,
  );
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const { data: pageWithdraw } = useGetWithdrawalRequests(page);
  const payoutHistory = pageWithdraw?.data?.data?.content || [];

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
      onError: () => {
        notificationAntd(
          "error",
          "Withdrawal failed",
          "Withdrawal failed. Please try again later.",
        );
      },
    });
  };

  useEffect(() => {
    if (walletResponse) {
      setAvailableBalance(walletResponse?.data?.data.balanceInVnd || 0);
    }
  }, [walletResponse]);

  return (
    <div className="min-h-screen bg-[#0b101a] text-white p-6 md:p-10 font-sans">
      {/* Header */}
      <div className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Withdrawal & Payouts
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Manage your earnings and request transfers.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* CỘT TRÁI */}
        <div className="xl:col-span-1 flex flex-col gap-8">
          {/* Card Số dư */}
          <div className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
            <div className="flex items-center gap-2 text-gray-300 font-medium mb-3 text-sm">
              <FontAwesomeIcon icon={faWallet} className="text-gray-400" />
              Available Balance
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              {isLoading ? "Loading..." : `${formatCurrency(availableBalance)}`}
            </div>
          </div>

          {/* Form Rút tiền */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20"
          >
            <h2 className="text-xl font-semibold mb-6">Request Withdrawal</h2>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Withdrawal Amount (*)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 font-semibold">
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
                  className={`w-full bg-[#0a0f18] border ${
                    errors.amount ? "border-red-500/50" : "border-gray-700/50"
                  } rounded-xl py-3 pl-10 pr-16 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all`}
                  placeholder="0"
                />
                <span className="absolute right-4 text-gray-400 text-sm font-medium">
                  VND
                </span>
              </div>
              {errors.amount ? (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.amount.message}
                </p>
              ) : (
                watchAmount &&
                !isNaN(watchAmount) &&
                Number(watchAmount) > 0 && (
                  <p className="text-green-400 text-xs mt-1.5 font-medium">
                    Thực nhận: {calculatedPayout.toLocaleString("vi-VN")} VND
                    (Đã trừ 50% phí)
                  </p>
                )
              )}
            </div>

            {/* Bank Name */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Bank Name (*)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <FontAwesomeIcon icon={faBuildingColumns} />
                </span>
                <input
                  type="text"
                  {...register("bank_name", {
                    required: "Bank Name is required",
                  })}
                  className={`w-full bg-[#0a0f18] border ${
                    errors.bank_name
                      ? "border-red-500/50"
                      : "border-gray-700/50"
                  } rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all`}
                  placeholder="e.g. Vietcombank"
                />
              </div>
              {errors.bank_name && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.bank_name.message}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Bank Account Number (*)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <FontAwesomeIcon icon={faHashtag} />
                </span>
                <input
                  type="text"
                  {...register("bank_account_number", {
                    required: "Account Number is required",
                  })}
                  className={`w-full bg-[#0a0f18] border ${
                    errors.bank_account_number
                      ? "border-red-500/50"
                      : "border-gray-700/50"
                  } rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all`}
                  placeholder="1234567890"
                />
              </div>
              {errors.bank_account_number && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.bank_account_number.message}
                </p>
              )}
            </div>

            {/* Holder Name */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Account Holder Name (*)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  {...register("account_holder_name", {
                    required: "Holder Name is required",
                  })}
                  className={`w-full bg-[#0a0f18] border ${
                    errors.account_holder_name
                      ? "border-red-500/50"
                      : "border-gray-700/50"
                  } rounded-xl py-3 pl-10 pr-4 text-white uppercase focus:outline-none focus:border-purple-500/50 transition-all`}
                  placeholder="NGUYEN VAN A"
                />
              </div>
              {errors.account_holder_name && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.account_holder_name.message}
                </p>
              )}
            </div>

            {/* Note */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Note (Optional)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 top-3 text-gray-400">
                  <FontAwesomeIcon icon={faPen} />
                </span>
                <textarea
                  {...register("note")}
                  className="w-full bg-[#0a0f18] border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none h-24"
                  placeholder="Additional notes..."
                ></textarea>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4 flex items-start gap-3 mb-6">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-red-400 mt-0.5"
              />
              <p className="text-xs text-red-300 leading-relaxed">
                A 50% withdrawal fee applies to all payouts. This is an
                administrative platform fee.
              </p>
            </div>

            {/* Calculated Payout */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-5 mb-6">
              <span className="text-gray-400 text-sm font-medium">
                Calculated Payout
              </span>
              <span className="text-xl font-bold text-green-400">
                {calculatedPayout.toLocaleString("vi-VN")} VND
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
            >
              Request Withdrawal
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: Lịch sử */}
        <div className="xl:col-span-2">
          <div className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20 h-full">
            <h2 className="text-xl font-semibold mb-6">Payout History</h2>

            <div className="flex flex-col gap-4">
              {payoutHistory.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No payout history found.
                </div>
              ) : (
                payoutHistory.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0d1424] border border-white/5 rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-all"
                  >
                    {/* Row 1: Amount + Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">
                        {Number(item.amount).toLocaleString("vi-VN")} VND
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          statusConfig[item.status] || statusConfig.PENDING
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[8px]"
                        />
                        {item.status}
                      </span>
                    </div>

                    {/* Row 2: Bank info */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FontAwesomeIcon
                        icon={faBuildingColumns}
                        className="text-gray-600"
                      />
                      <span className="text-gray-300 font-medium">
                        {item.bankName}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span>{item.bankAccountNumber}</span>
                      <span className="text-gray-600">•</span>
                      <span className="uppercase">
                        {item.accountHolderName}
                      </span>
                    </div>

                    {/* Row 3: Dates */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        Created:{" "}
                        <span className="text-gray-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </span>
                      {item.reviewedAt && (
                        <span>
                          Reviewed:{" "}
                          <span className="text-gray-400">
                            {formatDate(item.reviewedAt)}
                          </span>
                        </span>
                      )}
                      {item.reviewedBy && (
                        <span>
                          By:{" "}
                          <span className="text-gray-400">
                            {item.reviewedBy}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Row 4: Note + Admin Response */}
                    {(item.note || item.adminNote) && (
                      <div className="border-t border-gray-800 pt-3 flex flex-col gap-1.5">
                        {item.note && (
                          <p className="text-xs text-gray-500">
                            Note:{" "}
                            <span className="text-gray-400">{item.note}</span>
                          </p>
                        )}
                        {item.adminNote && (
                          <p className="text-xs text-gray-500">
                            Admin response:{" "}
                            <span className="text-yellow-400">
                              {item.adminNote}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
