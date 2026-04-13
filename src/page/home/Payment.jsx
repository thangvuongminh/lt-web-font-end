import React, { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
// Format tiền tệ VNĐ
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount || 0);
};
const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const presetAmounts = [50000, 100000, 200000, 500000];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const currentTotal = customAmount
    ? parseInt(customAmount) || 0
    : selectedAmount;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 p-6 md:p-10 font-sans">
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
                1,240,000{" "}
                <span className="text-sm text-slate-400 font-normal">đ</span>
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
                    key={amount}
                    onClick={() => handleAmountClick(amount)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-center flex flex-col items-center justify-center
                      ${
                        selectedAmount === amount
                          ? "border-indigo-500 bg-indigo-500/10 text-white"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                  >
                    <span className="font-bold text-lg">
                      {formatVND(amount)}
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
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="0.00"
                    className="w-full bg-[#0B1120] border border-slate-700 rounded-lg py-4 pl-16 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-600">
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Payment Method */}
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="text-cyan-400 mr-2">[02]</span> Payment Method
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
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

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-4 rounded-lg border transition-all duration-200 flex items-center text-left
                    ${
                      paymentMethod === "bank"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                >
                  <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center text-cyan-400 mr-4">
                    <FontAwesomeIcon icon={faBuildingColumns} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Bank Transfer</p>
                    <p className="text-xs text-slate-400">
                      Manual verification
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Info Cards (Security & Provisioning) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#0f1623] p-4 rounded-lg border border-slate-800/50">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
                  <h4 className="text-sm font-bold tracking-wider uppercase">
                    Security Protocol
                  </h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  All transactions are encrypted with AES-256 standards.
                  Synthetic Architect never stores your raw financial data.
                </p>
              </div>
              <div className="bg-[#0f1623] p-4 rounded-lg border border-slate-800/50">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FontAwesomeIcon icon={faBolt} className="mr-2" />
                  <h4 className="text-sm font-bold tracking-wider uppercase">
                    Instant Provisioning
                  </h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Credits are applied to your workspace environment immediately
                  after network confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (Phải) */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm border-b border-slate-800 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-mono text-white">
                    {formatVND(currentTotal)} VND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Fee</span>
                  <span className="font-mono text-cyan-400">0 VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Taxes (VAT)</span>
                  <span className="font-mono text-white">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Payable
                </span>
                <span className="text-2xl font-bold text-indigo-400">
                  {formatVND(currentTotal)}{" "}
                  <span className="text-sm font-normal text-indigo-500">
                    VND
                  </span>
                </span>
              </div>

              <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center group">
                Complete Transaction
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>

              <p className="text-[10px] text-slate-600 text-center mt-4 uppercase tracking-wide leading-relaxed">
                By completing this transaction, you agree to our{" "}
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors underline"
                >
                  Terms of Service
                </a>
                .
              </p>
            </div>

            {/* Need Assistance */}
            <div className="bg-[#151E2F] border border-slate-800 rounded-xl p-6">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
                Need Assistance?
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className="mr-3 w-4"
                    />
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className="mr-3 w-4"
                    />
                    Developer Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
