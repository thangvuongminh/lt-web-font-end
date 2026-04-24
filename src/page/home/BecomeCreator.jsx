import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faAddressCard,
  faMicrochip,
  faCheckCircle,
  faTimesCircle,
  faCircleNotch,
  faIdBadge,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const BecomeCreator = () => {
  // State mô phỏng quá trình AI phân tích
  const [status, setStatus] = useState("idle"); // idle | analyzing | success | rejected

  const handleAnalyze = () => {
    setStatus("analyzing");
    // Giả lập AI quét dữ liệu trong 3 giây
    setTimeout(() => {
      const isAccepted = Math.random() > 0.3; // Tỷ lệ 70% thành công
      setStatus(isAccepted ? "success" : "rejected");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#080911] text-gray-300 font-sans p-4 md:p-8 selection:bg-purple-500/30">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
          <FontAwesomeIcon icon={faShieldHalved} /> SECURE VERIFICATION PORTAL
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-purple-400">
          Trở Thành Creator
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          Hệ thống AI sẽ phân tích hồ sơ năng lực và minh chứng kinh nghiệm của
          bạn để cấp quyền truy cập vào mạng lưới sáng tạo toàn cầu.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Registration Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Proof of Experience */}
          <section className="bg-[#111321] border border-gray-800/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faIdBadge} className="text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-200">
                Minh chứng kinh nghiệm
              </h2>
            </div>

            <div className="border-2 border-dashed border-gray-800 rounded-lg p-12 flex flex-col items-center justify-center bg-[#0d0f1a] hover:border-purple-500/30 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="text-gray-400 group-hover:text-purple-400"
                />
              </div>
              <p className="text-sm text-gray-400 text-center">
                Tải lên chứng chỉ hoặc Portfolio (PDF, PNG, JPG) <br />
                <span className="text-xs text-gray-600 mt-2 block italic">
                  Kéo thả dữ liệu minh chứng vào đây
                </span>
              </p>
            </div>
          </section>

          {/* Card: Experience Description */}
          <section className="bg-[#111321] border border-gray-800/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="text-purple-400"
              />
              <h2 className="text-lg font-semibold text-gray-200">
                Mô tả năng lực
              </h2>
            </div>

            <textarea
              className="w-full bg-[#0d0f1a] border border-gray-800 rounded-lg p-4 text-sm text-gray-400 focus:outline-none focus:border-purple-500/50 min-h-[150px] resize-none transition-colors"
              placeholder="Hãy tóm tắt quá trình làm việc, các kỹ năng chuyên môn và các dự án tiêu biểu của bạn..."
            ></textarea>
          </section>

          {/* Submit Action */}
          <button
            onClick={handleAnalyze}
            disabled={status === "analyzing"}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg
              ${
                status === "analyzing"
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-linear-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-purple-500/20"
              }`}
          >
            <FontAwesomeIcon
              icon={status === "analyzing" ? faCircleNotch : faMicrochip}
              className={status === "analyzing" ? "animate-spin" : ""}
            />
            {status === "analyzing"
              ? "Đang thẩm định hồ sơ..."
              : "Gửi hồ sơ thẩm định AI"}
          </button>
        </div>

        {/* Right Section: AI Verification Result */}
        <div className="lg:col-span-5">
          <aside className="h-full bg-[#111321] border border-gray-800/50 rounded-xl p-6 shadow-2xl flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-8 border-b border-gray-800/50 pb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${status === "analyzing" ? "bg-purple-500 animate-pulse" : "bg-gray-700"}`}
                ></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
                  AI Verification Engine
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              {/* State: IDLE / ANALYZING */}
              {(status === "idle" || status === "analyzing") && (
                <div className="animate-in fade-in duration-700">
                  <div className="relative mb-6 mx-auto w-fit">
                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      className={`text-5xl text-purple-500/60 relative z-10 ${status === "analyzing" ? "animate-spin" : ""}`}
                    />
                  </div>
                  <h3 className="text-gray-300 font-medium mb-2">
                    Chờ dữ liệu đầu vào
                  </h3>
                  <p className="text-[10px] font-mono text-gray-600 leading-relaxed uppercase tracking-widest">
                    Hệ thống ở chế độ chờ. Vui lòng gửi <br /> hồ sơ để bắt đầu
                    phân tích.
                  </p>
                </div>
              )}

              {/* State: SUCCESS */}
              {status === "success" && (
                <div className="animate-in zoom-in duration-500">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-6xl text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  />
                  <h3 className="text-green-400 font-bold text-xl mb-2">
                    Phê duyệt thành công!
                  </h3>
                  <p className="text-sm text-gray-400">
                    AI xác nhận năng lực của bạn đạt chuẩn Creator. Tài khoản
                    của bạn sẽ được kích hoạt trong giây lát.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-purple-400 underline hover:text-purple-300"
                  >
                    Gửi lại hồ sơ mới
                  </button>
                </div>
              )}

              {/* State: REJECTED */}
              {status === "rejected" && (
                <div className="animate-in zoom-in duration-500">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-6xl text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  />
                  <h3 className="text-red-400 font-bold text-xl mb-2">
                    Chưa đủ điều kiện
                  </h3>
                  <p className="text-sm text-gray-400">
                    Minh chứng kinh nghiệm chưa đủ rõ ràng hoặc mô tả năng lực
                    chưa phù hợp với tiêu chuẩn hệ thống.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-4 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Thử lại lần nữa
                  </button>
                </div>
              )}

              {/* Decorative Skeleton */}
              <div className="w-full space-y-3 mt-12 opacity-30">
                <div className="h-px bg-linear-to-r from-transparent via-gray-500 to-transparent w-full"></div>
                <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  <span>Logic scan: OK</span>
                  <span>Data match: 88%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BecomeCreator;
