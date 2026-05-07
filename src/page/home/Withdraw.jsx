import React from "react";
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
// Thay đổi đường dẫn import này cho đúng với vị trí file hook của bạn
import useGetWallet from "@/hooks/useGetWallet";

const Withdraw = () => {
  // Lấy dữ liệu ví từ API
  const { data: walletResponse, isLoading } = useGetWallet();
  // Giả sử API trả về số dư nằm trong walletResponse.data.balance
  const availableBalance = walletResponse?.data?.data.balanceInVnd || 0;

  // Khởi tạo React Hook Form
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

  // Lắng nghe sự thay đổi của field amount để tính toán Payout
  const watchAmount = watch("amount");
  const feePercentage = 0.5; // Phí 50%

  // Tính toán số tiền thực nhận (Làm tròn xuống vì VND không có số lẻ)
  const calculatedPayout =
    watchAmount && !isNaN(watchAmount)
      ? Math.floor(Number(watchAmount) * (1 - feePercentage))
      : 0;

  // Hàm xử lý submit form
  const onSubmit = (data) => {
    // TODO: Gửi data này lên API tạo request rút tiền
    console.log("Dữ liệu gửi đi:", data);
  };

  // Mock data cho lịch sử rút tiền (Đã đổi sang VND)
  const payoutHistory = [
    {
      id: 1,
      date: "Oct 24, 2023",
      amount: "1.250.000 VND",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 2,
      date: "Sep 15, 2023",
      amount: "3.000.000 VND",
      method: "Bank Transfer",
      status: "Completed",
    },
  ];

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
        {/* CỘT TRÁI: Số dư & Form Rút tiền */}
        <div className="xl:col-span-1 flex flex-col gap-8">
          {/* Card Số dư */}
          <div className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

            <div className="flex items-center gap-2 text-gray-300 font-medium mb-3 text-sm">
              <FontAwesomeIcon icon={faWallet} className="text-gray-400" />
              Available Balance
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              {isLoading
                ? "Loading..."
                : `${availableBalance.toLocaleString("vi-VN")} VND`}
            </div>
          </div>

          {/* Card Form Rút tiền */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20"
          >
            <h2 className="text-xl font-semibold mb-6">Request Withdrawal</h2>

            {/* Input Amount */}
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

              {/* Hiển thị lỗi hoặc hiển thị số tiền thực nhận ngay dưới ô nhập */}
              {errors.amount ? (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.amount.message}
                </p>
              ) : (
                watchAmount &&
                !isNaN(watchAmount) &&
                Number(watchAmount) > 0 && (
                  <p className="text-green-400 text-xs mt-1.5 font-medium transition-all animate-in fade-in">
                    Thực nhận: {calculatedPayout.toLocaleString("vi-VN")} VND
                    (Đã trừ 50% phí)
                  </p>
                )
              )}
            </div>

            {/* Input Bank Name */}
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

            {/* Input Bank Account Number */}
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

            {/* Input Account Holder Name */}
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

            {/* Input Note */}
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

            {/* Warning Info */}
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

            {/* Calculated Payout (Summary) */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-5 mb-6">
              <span className="text-gray-400 text-sm font-medium">
                Calculated Payout
              </span>
              <span className="text-xl font-bold text-green-400">
                {calculatedPayout.toLocaleString("vi-VN")} VND
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
            >
              Request Withdrawal
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: Lịch sử rút tiền */}
        <div className="xl:col-span-2">
          <div className="bg-[#131b2f] border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/20 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Payout History</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-gray-800/50">
                    <th className="pb-4 font-medium pl-2">Date</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Method</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-800/30 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 pl-2 text-sm text-gray-300">
                        {item.date}
                      </td>
                      <td className="py-4 text-sm font-medium text-white">
                        {item.amount}
                      </td>
                      <td className="py-4 text-sm text-gray-400">
                        {item.method}
                      </td>
                      <td className="py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            item.status === "Completed"
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faCircle}
                            className={`text-[8px] ${
                              item.status === "Completed"
                                ? "text-purple-400"
                                : "text-gray-400"
                            }`}
                          />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {payoutHistory.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No payout history found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
