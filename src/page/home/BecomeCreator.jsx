import React, { useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_CREATOR_VALIDATE } from "@/utils/validation/yupValidate";
import { useFetchRegisterCreator } from "@/hooks/useFetchRegisterCreator";
import { data } from "react-router-dom";
import ModalStudy from "@/components/ui/ModalStudy";

const BecomeCreator = () => {
  const [status, setStatus] = useState("idle");
  const [preview, setPreview] = useState();
  const [appearModal, setAppearModal] = useState(false);
  const [results, setResults] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(REGISTER_CREATOR_VALIDATE),
  });
  const {
    ref,
    onChange: onChangeImage,
    ...restRegister
  } = register("imageEvident");
  const { mutate } = useFetchRegisterCreator();

  const handleUploadFile = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = async (e) => {
    await onChangeImage(e);
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  const onSubmit = (data) => {
    setStatus("analyzing");
    const formData = new FormData();
    formData.append("evident", data.imageEvident[0]);
    formData.append("desc", data.desc);
    mutate(formData, {
      onSuccess: () => {
        setAppearModal(true);
        setTimeout(() => {
          setStatus("success");
        }, 200);
      },
      onError: (err) => {
        setResults(err.response?.data?.message);
        setTimeout(() => {
          setStatus("rejected");
        }, 200);
      },
    });
    reset();
  };
  return (
    <div className="min-h-screen bg-[#080911] text-gray-300 font-sans p-4 md:p-8 selection:bg-purple-500/30 flex flex-col items-center">
      {/* Header Section */}
      {appearModal && <ModalStudy />}
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
          <FontAwesomeIcon icon={faShieldHalved} /> SECURE VERIFICATION PORTAL
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-purple-400">
          Trở Thành Creator
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
          Hệ thống AI sẽ phân tích hồ sơ năng lực và minh chứng kinh nghiệm của
          bạn để cấp quyền truy cập vào mạng lưới sáng tạo toàn cầu.
        </p>
      </header>

      <form
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* LEFT COLUMN: UPLOAD & PREVIEW (col-span-5) */}
        <div className="lg:col-span-5 h-full">
          <section className="bg-[#111321] border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full min-h-125">
            {/* Vùng hiển thị ảnh Preview - Chiếm phần lớn không gian phía trên */}
            {preview ? (
              <div className="w-full h-100 overflow-hidden border-b border-gray-800/50 bg-[#0a0b14]">
                <img
                  src={preview}
                  alt="Minh chứng đã tải lên"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex-1 bg-[#0a0b14] flex flex-col justify-center items-center border-b border-gray-800/50 opacity-50 p-6 text-center">
                <FontAwesomeIcon
                  icon={faIdBadge}
                  className="text-gray-700 text-5xl mb-4"
                />
                <p className="text-gray-500 text-sm">
                  Chưa có ảnh minh chứng
                  <br />
                  <span className="text-xs">
                    Vui lòng tải ảnh lên ở bên dưới
                  </span>
                </p>
              </div>
            )}

            {/* Nút Upload nằm gọn ở dưới */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className="text-purple-400 text-sm"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-200">
                  Minh chứng kinh nghiệm
                </h2>
              </div>

              <div
                onClick={handleUploadFile}
                className="border-2 border-dashed border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center bg-[#0d0f1a] hover:border-purple-500/30 hover:bg-[#111322] transition-all cursor-pointer group"
              >
                <p className="text-sm text-gray-400 text-center">
                  <span className="font-semibold text-purple-400">
                    Nhấn để tải lên
                  </span>{" "}
                  (PDF, PNG, JPG)
                </p>
              </div>
              <input
                ref={ref}
                type="file"
                id="fileInput"
                accept=".png,.jpg,.pdf,.jpeg"
                className="hidden"
                onChange={handleFileChange}
                {...restRegister}
              />
              {errors.imageEvident && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.imageEvident.message}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: AI CHECK + MÔ TẢ + BUTTON (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: AI Verification (Thay thế vị trí Upload cũ) */}
          <aside className="bg-[#111321] border border-gray-800/50 rounded-xl p-6 shadow-2xl flex flex-col justify-center min-h-[220px]">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800/50 pb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${status === "analyzing" ? "bg-purple-500 animate-pulse" : "bg-gray-700"}`}
                ></div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
                  AI Engine Verification
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {(status === "idle" || status === "analyzing") && (
                <div className="animate-in fade-in duration-700 py-4">
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className={`text-3xl text-purple-500/60 mb-3 ${status === "analyzing" ? "animate-spin" : ""}`}
                  />
                  <h3 className="text-gray-300 font-medium text-sm mb-1">
                    {status === "analyzing"
                      ? "Đang phân tích dữ liệu..."
                      : "Chờ dữ liệu đầu vào"}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    Hệ thống đã sẵn sàng
                  </p>
                </div>
              )}

              {status === "success" && (
                <div className="animate-in zoom-in duration-500 py-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-4xl text-green-500 mb-3 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                  />
                  <h3 className="text-green-400 font-bold text-lg mb-1">
                    Đạt chuẩn!
                  </h3>
                  <p className="text-xs text-gray-400">
                    Năng lực phù hợp với tiêu chuẩn Creator.
                  </p>
                </div>
              )}

              {status === "rejected" && (
                <div className="animate-in zoom-in duration-500 py-2">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-4xl text-red-500 mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                  />
                  <h3 className="text-red-400 font-bold text-lg mb-1">
                    Chưa đạt
                  </h3>
                  <p className="text-xs text-gray-400">{results}</p>
                </div>
              )}
            </div>
          </aside>

          {/* Card 2: Experience Description (Giữ nguyên vị trí) */}
          <section className="bg-[#111321] border border-gray-800/50 rounded-xl p-6 shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-blue-400 text-sm"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-200">
                Mô tả năng lực
              </h2>
            </div>
            <textarea
              {...register("desc")}
              className="w-full flex-1 bg-[#0d0f1a] border border-gray-800 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 min-h-[160px] resize-none transition-colors"
              placeholder="Hãy tóm tắt quá trình làm việc, các kỹ năng chuyên môn và các dự án tiêu biểu của bạn..."
            ></textarea>
            {errors.desc && (
              <p className="text-red-500 text-xs mt-2">{errors.desc.message}</p>
            )}
          </section>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={status === "analyzing" || !preview}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg
              ${
                status === "analyzing" || !preview
                  ? "bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50"
                  : "bg-linear-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-purple-500/20"
              }`}
          >
            <FontAwesomeIcon
              icon={status === "analyzing" ? faCircleNotch : faMicrochip}
              className={status === "analyzing" ? "animate-spin" : ""}
            />
            {status === "analyzing"
              ? "Đang thẩm định hồ sơ..."
              : !preview
                ? "Vui lòng tải lên minh chứng để tiếp tục"
                : "Gửi hồ sơ thẩm định AI"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeCreator;
