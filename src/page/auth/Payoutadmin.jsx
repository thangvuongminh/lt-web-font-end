import { useMemo, useState } from "react";

const bankOptions = [
  { value: "vcb", label: "Vietcombank" },
  { value: "vtb", label: "VietinBank" },
  { value: "acb", label: "ACB" },
  { value: "mb", label: "MB" },
  { value: "scb", label: "SCB" },
];

const presetAmounts = [500000, 1000000, 2000000, 5000000];

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const Payout = () => {
  const [bank, setBank] = useState(bankOptions[0].value);
  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [amount, setAmount] = useState(0);
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState("");

  const availableBalance = 2000000;
  const frozenBalance = 0;
  const usableBalance = availableBalance - frozenBalance;
  const maxWithdraw = availableBalance;

  const total = useMemo(() => amount, [amount]);

  const handlePreset = (value) => {
    setAmount(value);
    setAlert("");
  };

  const handleSubmit = () => {
    if (!bank || !account.trim() || !owner.trim() || amount <= 0) {
      setAlert("Vui lòng điền đầy đủ thông tin và chọn số tiền rút.");
      return;
    }
    if (amount > maxWithdraw) {
      setAlert(`Số tiền rút tối đa là ${formatCurrency(maxWithdraw)}.`);
      return;
    }

    setAlert("Yêu cầu rút tiền đã được ghi nhận và hoàn tất ngay lập tức.");
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-4 mb-8">
          <div className="rounded-none bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Số dư khả dụng</p>
            <p className="mt-4 text-5xl font-semibold text-green-600">{formatCurrency(availableBalance)}</p>
            <p className="mt-2 text-sm text-gray-500">Số tiền bạn có thể rút ngay lập tức.</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-white rounded-none p-6 shadow-lg border border-gray-200">
          <div className="flex flex-wrap items-center justify-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-none bg-[#E93C60]/10 text-[#E93C60] font-semibold">1</div>
              <div>
                <p className="text-sm text-gray-500 uppercase">Bước 1</p>
                <p className="text-lg font-semibold">Tạo yêu cầu</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-none bg-gray-100 text-gray-600 font-semibold">2</div>
              <div>
                <p className="text-sm text-gray-500 uppercase">Bước 2</p>
                <p className="text-lg font-semibold">Hoàn tất</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">Thông tin rút tiền</h2>
                <p className="mt-2 text-sm text-gray-500">Nhập thông tin ngân hàng và số tiền để gửi yêu cầu rút tiền.</p>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Tên ngân hàng</span>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="mt-2 w-full rounded-none border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
                    >
                      {bankOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Số tài khoản</span>
                    <input
                      type="text"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      placeholder="Nhập số tài khoản"
                      className="mt-2 w-full rounded-none border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Tên chủ tài khoản (viết in hoa không dấu)</span>
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="Nhập tên người nhận"
                      className="mt-2 w-full rounded-none border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
                    />
                  </label>

                  <label className="block">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Số tiền cần rút</span>
                      <span className="text-sm font-semibold text-gray-500">Tối đa {formatCurrency(maxWithdraw)}</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="Nhập số tiền"
                      className="mt-2 w-full rounded-none border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
                    />
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePreset(preset)}
                        className="rounded-none border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#E93C60] hover:bg-[#E93C60]/10 transition"
                      >
                        {formatCurrency(preset)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-none border border-[#E93C60]/10 bg-[#fff2f5] p-6 text-[#b02d4b] shadow-sm">
                <h3 className="text-lg font-semibold">Lưu ý:</h3>
                <p className="mt-3 text-sm leading-6">
                  Nếu bạn rút số tiền lớn hơn {formatCurrency(usableBalance)}, yêu cầu sẽ không được xử lý. Vui lòng kiểm tra lại thông tin tài khoản trước khi gửi.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">Tóm tắt</h2>
                <div className="mt-6 space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Ngân hàng</span>
                    <span>{bankOptions.find((item) => item.value === bank)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số tài khoản</span>
                    <span>{account || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ tài khoản</span>
                    <span>{owner || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số tiền rút</span>
                    <span>{amount ? formatCurrency(amount) : "---"}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4 font-semibold text-gray-900">
                    <span>Tổng thanh toán</span>
                    <span>{amount ? formatCurrency(total) : "---"}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">Trạng thái yêu cầu</h2>
                <div className="mt-5 grid gap-3">
                  <div className={`rounded-none p-4 ${step === 1 ? "bg-[#E93C60]/10 text-[#841c36]" : "bg-gray-100 text-gray-700"}`}>
                    <p className="font-semibold">Bước 1</p>
                    <p className="text-sm">Tạo yêu cầu</p>
                  </div>
                  <div className={`rounded-none p-4 ${step === 2 ? "bg-[#E93C60]/10 text-[#841c36]" : "bg-gray-100 text-gray-700"}`}>
                    <p className="font-semibold">Bước 2</p>
                    <p className="text-sm">Hoàn tất</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            {alert && (
              <div className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{alert}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-none bg-[#E93C60] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#d43355]"
            >
              Hoàn tất rút tiền
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payout;
