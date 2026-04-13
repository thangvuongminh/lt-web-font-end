import { useEffect, useMemo, useState } from "react";

const transactionData = [
  {
    orderId: "240518642014",
    txId: "240518642029",
    date: "2024-05-08",
    time: "21:54:01",
    type: "Thanh toán cho",
    accountName: "thangchos",
    amount: "-540.000 VND",
    status: "Đã hoàn tất",
  },
  {
    orderId: "240518397295",
    txId: "240518397295",
    date: "2024-05-01",
    time: "22:57:43",
    type: "Thanh toán thẻ",
    accountName: "thanggay",
    amount: "540.000 VND",
    status: "Đã hủy",
  },
  {
    orderId: "240518397297",
    txId: "240518397297",
    date: "2024-05-02",
    time: "09:15:12",
    type: "Thanh toán cho",
    accountName: "vietpay",
    amount: "120.000 VND",
    status: "Đã hoàn tất",
  },
  {
    orderId: "240518397298",
    txId: "240518397298",
    date: "2024-05-03",
    time: "14:22:05",
    type: "Thanh toán thẻ",
    accountName: "nguyenvanb",
    amount: "1.200.000 VND",
    status: "Đã hủy",
  },
  {
    orderId: "240518397299",
    txId: "240518397299",
    date: "2024-05-04",
    time: "11:32:44",
    type: "Thanh toán cho",
    accountName: "dongxanh",
    amount: "780.000 VND",
    status: "Đã hoàn tất",
  },
  {
    orderId: "240518397300",
    txId: "240518397300",
    date: "2024-05-05",
    time: "16:40:19",
    type: "Thanh toán thẻ",
    accountName: "techviet",
    amount: "230.000 VND",
    status: "Đã hoàn tất",
  },
];

const statusClasses = {
  "Đã hoàn tất": "bg-green-100 text-green-700",
  "Đã hủy": "bg-red-100 text-red-700",
};

const Payouthistory = () => {
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredTransactions = useMemo(() => {
    return transactionData.filter((item) => {
      const matchesDate = !date || item.date === date;
      const matchesKind = kind === "all" || item.type === kind;
      const matchesStatus = status === "all" || item.status === status;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.orderId.toLowerCase().includes(query) ||
        item.txId.toLowerCase().includes(query) ||
        item.accountName.toLowerCase().includes(query);

      return matchesDate && matchesKind && matchesStatus && matchesSearch;
    });
  }, [date, kind, status, search]);

  useEffect(() => {
    setPage(1);
  }, [date, kind, status, search]);

  const pageCount = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);
  const firstItem = filteredTransactions.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(filteredTransactions.length, page * pageSize);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-gray-500">
              Trang chủ <span className="mx-2">/</span> Giao dịch
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-gray-900">Giao dịch</h1>
          </div>
          <button className="inline-flex items-center rounded-none border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50">
            Tải xuống các báo cáo
          </button>
        </div>

        <div className="rounded-none bg-white p-6 shadow-lg border border-gray-200">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Ngày</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-none border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phân loại</span>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="mt-2 w-full rounded-none border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
              >
                <option value="all">Tất cả</option>
                <option value="Thanh toán từ">Thanh toán từ</option>
                <option value="Thanh toán cho">Thanh toán cho</option>
                <option value="Thanh toán thẻ">Thanh toán thẻ</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Trạng thái</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-none border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
              >
                <option value="all">Tất cả</option>
                <option value="Đã hoàn tất">Đã hoàn tất</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm theo Tên/ID/VBA"
                className="w-full rounded-none border border-gray-300 bg-gray-50 px-12 py-3 text-sm text-gray-900 shadow-sm focus:border-[#E93C60] focus:outline-none focus:ring-2 focus:ring-[#E93C60]/20"
              />
            </div>
            <div className="text-sm text-gray-500">
              {filteredTransactions.length} giao dịch được tìm thấy
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Mã đơn hàng</th>
                  <th className="px-4 py-3 font-medium">Số giao dịch</th>
                  <th className="px-4 py-3 font-medium">Thời gian giao dịch</th>
                  <th className="px-4 py-3 font-medium">Loại giao dịch</th>
                  <th className="px-4 py-3 font-medium">Tên tài khoản</th>
                  <th className="px-4 py-3 font-medium">Số tiền</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium">Hoạt động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedTransactions.length ? (
                  paginatedTransactions.map((item) => (
                    <tr key={item.txId} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-gray-700">{item.orderId}</td>
                      <td className="px-4 py-4 text-gray-700">{item.txId}</td>
                      <td className="px-4 py-4 text-gray-700">
                        <div>{item.date}</div>
                        <div className="text-xs text-gray-500">{item.time}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{item.type}</td>
                      <td className="px-4 py-4 text-gray-700">{item.accountName || "---"}</td>
                      <td className="px-4 py-4 text-gray-700">{item.amount}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-none px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-sm font-semibold text-[#3b82f6] hover:text-[#1d4ed8]">Chi tiết</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                      Không tìm thấy giao dịch phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị {firstItem} - {lastItem} trên {filteredTransactions.length} giao dịch
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="rounded-none border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
              >
                Trước
              </button>
              {Array.from({ length: pageCount }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`rounded-none border border-gray-300 px-3 py-2 text-sm font-medium ${page === pageNumber ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                disabled={page === pageCount}
                className="rounded-none border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouthistory;
