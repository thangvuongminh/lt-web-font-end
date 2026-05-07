import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faPen,
  faMobileScreen,
  faBuildingColumns,
  faShieldHalved,
  faBolt,
  faCircleQuestion,
  faCommentDots,
  faArrowRight,
  faSpinner,
  faCircleNotch,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { usePaymentConfirm } from "@/hooks/usePaymentConfirm";
import { useDeposit } from "@/hooks/useDeposit";
import { formatCurrency } from "@/utils/systems/sysFuc";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/utils/validation/yupValidate";
import useGetWallet from "@/hooks/useGetWallet";
import { QUERY_KEY } from "@/config/queryConfig";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const presetAmounts = [50000, 100000, 200000, 500000];
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const queryClient = useQueryClient();
  const { data } = useGetWallet();
  const userId = useSelector((state) => state.auth.id);
  const [modal, setModal] = useState({
    isOpen: false,
    status: "verifying",
    message: "",
  });

  const { mutate: depositMutate, isLoading: isDepositing } = useDeposit();
  const { mutate: confirmPayment } = usePaymentConfirm();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: { total: 50000 },
  });
  const currentTotal = watch("total");
  const handleAmountClick = (amount) => {
    setValue("total", amount, { shouldValidate: true });
  };
  useEffect(() => {
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    if (vnpResponseCode) {
      setModal({
        isOpen: true,
        status: "verifying",
        message: "Đang xác thực giao dịch với hệ thống...",
      });
      const params = Object.fromEntries([...searchParams]);

      confirmPayment(params, {
        onSuccess: () => {
          setModal({
            isOpen: true,
            status: "success",
            message: "Thanh toán thành công! Số dư đã được cập nhật.",
          });
          queryClient.invalidateQueries(QUERY_KEY.getWalletUser(userId));
        },
        onError: (error) => {
          const errorMsg =
            error?.response?.data?.message ||
            "Giao dịch không hợp lệ hoặc đã bị hủy.";
          console.log(error?.response);
          setModal({ isOpen: true, status: "error", message: errorMsg });
        },
        onSettled: () => {
          setSearchParams({});
        },
      });
    }
  }, [searchParams]);
  const onSubmit = (data) => {
    depositMutate(data.total, {
      onSuccess: (response) => {
        const paymentUrl = response.data?.data;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          alert(
            "Tạo giao dịch thành công nhưng không tìm thấy link thanh toán.",
          );
        }
      },
      onError: (error) => {
        const errorMsg =
          error.response?.data?.message ||
          "Không thể kết nối đến máy chủ thanh toán.";
        alert("Lỗi: " + errorMsg);
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-[#0B1120] text-slate-300 p-6 md:p-10 font-sans"
    >
      {modal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0B1120]/70 animate-modal-backdrop">
          {/* Thân Modal sử dụng glass-panel và anime-zoom-in */}
          <div className="glass-panel border border-slate-700/50 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-modal-content">
            {/* Thanh màu viền trên cùng (rainbow) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-rainbow)] shadow-[0_0_15px_rgba(192,193,255,0.5)]"></div>

            {/* Trạng thái: Đang xác thực */}
            {modal.status === "verifying" && (
              <div className="text-center py-4">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  spin
                  className="text-5xl text-[var(--color-rainbow)] mb-4"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  Đang xác thực
                </h2>
                <p className="text-[var(--color-studyhard)] text-sm">
                  {modal.message}
                </p>
              </div>
            )}

            {/* Trạng thái: Thành công */}
            {modal.status === "success" && (
              <div className="text-center py-4">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-5xl text-green-400 mb-4"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  Thành công!
                </h2>
                <p className="text-slate-400 text-sm mb-6">{modal.message}</p>
                <button
                  type="button"
                  onClick={() => setModal({ ...modal, isOpen: false })}
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  Xác nhận
                </button>
              </div>
            )}

            {/* Trạng thái: Thất bại */}
            {modal.status === "error" && (
              <div className="text-center py-4">
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="text-5xl text-rose-400 mb-4"
                />
                <h2 className="text-xl font-bold text-white mb-2">Thất bại!</h2>
                <p className="text-slate-400 text-sm mb-6">{modal.message}</p>
                <button
                  type="button"
                  onClick={() => setModal({ ...modal, isOpen: false })}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-cyan-400 text-xs font-bold tracking-wider uppercase mb-1">
              Account Dashboard
            </h2>
            <h1 className="text-3xl font-bold text-white">Top-up Credits</h1>
          </div>
          <div className="mt-4 md:mt-0 flex items-center bg-[#151E2F] rounded-lg p-4 shadow-sm border border-slate-800">
            <div className="mr-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(data?.data?.data?.balanceInVnd)}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center text-xl">
              <FontAwesomeIcon icon={faWallet} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Trái) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Block 1: Select Amount */}
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="text-cyan-400 mr-2">[01]</span> Select Amount
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {presetAmounts.map((amount) => (
                  <button
                    type="button" // Ngăn chặn trigger submit form
                    key={amount}
                    onClick={() => handleAmountClick(amount)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-center flex flex-col items-center justify-center
                      ${
                        currentTotal === amount
                          ? "border-indigo-500 bg-indigo-500/10 text-white"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                  >
                    <span className="font-bold text-lg">
                      {formatCurrency(amount)}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">VND</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-cyan-400 font-semibold">VND</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    {...register("total", {
                      required: "Vui lòng nhập số tiền",
                      min: {
                        value: 10000,
                        message: "Số tiền tối thiểu là 10.000 VNĐ",
                      },
                      valueAsNumber: true, // Ép kiểu thành dạng số
                    })}
                    className={`w-full bg-[#0B1120] border ${errors.total ? "border-rose-500" : "border-slate-700"} rounded-lg py-4 pl-16 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-600">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                </div>
                {/* Hiển thị lỗi từ React Hook Form */}
                {errors.total && (
                  <p className="text-rose-500 text-xs mt-2 font-medium">
                    {errors.total.message}
                  </p>
                )}
              </div>
            </div>

            {/* Block 2: Payment Method */}
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="text-cyan-400 mr-2">[02]</span> Payment Method
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("vnpay")}
                  className={`p-4 rounded-lg border transition-all duration-200 flex items-center text-left
                    ${
                      paymentMethod === "vnpay"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                >
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white mr-4 italic font-bold">
                    VN
                  </div>
                  <div>
                    <p className="text-white font-semibold">VNPay Gateway</p>
                    <p className="text-xs text-slate-400">ATM / QR Code</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("momo")}
                  className={`p-4 rounded-lg border transition-all duration-200 flex items-center text-left
                    ${
                      paymentMethod === "momo"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                >
                  <div className="w-10 h-10 bg-pink-600 rounded flex items-center justify-center text-white mr-4">
                    <FontAwesomeIcon icon={faMobileScreen} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">MoMo Wallet</p>
                    <p className="text-xs text-slate-400">Instant processing</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Info Cards (Giữ nguyên) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* ... (Các thẻ Info Cards của bạn) */}
            </div>
          </div>

          {/* Sidebar (Phải) */}
          <div className="space-y-6">
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm border-b border-slate-800 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-mono text-white">
                    {formatCurrency(currentTotal || 0)} VND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Fee</span>
                  <span className="font-mono text-cyan-400">0 VND</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Payable
                </span>
                <span className="text-2xl font-bold text-indigo-400">
                  {formatCurrency(currentTotal || 0)}{" "}
                  <span className="text-sm font-normal text-indigo-500">
                    VND
                  </span>
                </span>
              </div>

              {/* Đổi button thành type="submit" */}
              <button
                type="submit"
                disabled={isDepositing}
                className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center group ${isDepositing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isDepositing ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Complete Transaction
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Payment;
