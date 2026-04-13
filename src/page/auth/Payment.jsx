import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000];

const formatMoney = (value) => value.toLocaleString("vi-VN");

const Payment = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(options[0]);
  const [balance, setBalance] = useState(0); // Giá trị demo
  const [info, setInfo] = useState("");

  const chooseAmount = (amount) => {
    setSelectedAmount(amount);
    setInfo("");
  };

  const handleDeposit = () => {
    const xuToAdd = selectedAmount / 1000;
    setBalance((prev) => prev + xuToAdd);
    setInfo(`Bạn đã nạp thành công ${formatMoney(selectedAmount)} VND (${xuToAdd} XU) vào tài khoản`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg p-6" style={{ minHeight: "650px" }}>

          <div className="border-r-0 lg:border-r border-gray-200 flex flex-col items-center justify-start py-8 px-6">
            <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-5xl text-white font-bold">U</span>
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-black">User name</h2>
            <p className="mt-4 text-lg text-black">Số dư </p>
            <p className="mt-2 text-4xl font-bold text-black">{formatMoney(balance)} XU</p>
          </div>

          <div className="py-8 px-6">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Chọn số tiền muốn nạp</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {options.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => chooseAmount(amount)}
                  className={`rounded-xl py-3 text-sm font-medium transition focus:outline-none ${
                    selectedAmount === amount
                      ? "bg-blue-600 text-white border-transparent"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {formatMoney(amount)}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-black">Số tiền đang chọn:</p>
              <p className="text-2xl font-semibold text-black">{formatMoney(selectedAmount)} VND ({selectedAmount / 1000} XU)</p>

              <button
                type="button"
                onClick={handleDeposit}
                className="mt-6 w-full bg-[#E93C60] hover:bg-[#d43355] text-white py-2.5 rounded-xl text-lg font-semibold transition"
              >
                Nạp tiền
              </button>

              {info && (
                <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
                  {info}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
