import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faShield,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { CHANGE_PASSWORD_VALIDATE } from "@/utils/validation/yupValidate";
import { useChangePassword } from "@/hooks/useChangePassword";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/authenticateSlice";
import { useNavigate } from "react-router-dom";

function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  show,
  onToggle,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={`
            w-full bg-[#1e2235] text-slate-200 text-sm
            px-4 py-3 pr-11 rounded-lg outline-none
            border transition-all duration-200
            placeholder:text-slate-600
            ${
              error
                ? "border-red-500/60 focus:border-red-400"
                : "border-slate-700/60 focus:border-violet-500/70 hover:border-slate-600"
            }
          `}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-[11px] flex items-center gap-1 mt-0.5">
          {error.message}
        </p>
      )}
    </div>
  );
}

// ─── FeatureItem ──────────────────────────────────────────────────────────────
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400">
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChangePassword() {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const toggle = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(CHANGE_PASSWORD_VALIDATE),
    mode: "onSubmit",
  });
  const { mutate } = useChangePassword();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const sendNewPassword = {
      password: data.currentPassword,
      newPassword: data.newPassword,
    };
    setMessage(null);
    mutate(sendNewPassword, {
      onSuccess: () => {
        notificationAntd(
          "success",
          "Change password success",
          "Your password has been updated successfully.",
        );
        window.location.href = "/account/login";
      },
      onError: (err) => {
        const res = err.response.data.message;
        setMessage(res);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-slate-800/60">
        {/* ── Left Panel ── */}
        <div className="bg-[#13161f] px-8 py-10 lg:py-12 flex flex-col justify-between gap-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-violet-400 uppercase mb-4">
              Security Protocol
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Bảo vệ kiến trúc số{" "}
              <span className="text-slate-400">của bạn.</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Cập nhật mã khóa định kỳ là bước thiết yếu để duy trì tính toàn
              vẹn của môi trường phát triển Synthetic Architect.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <FeatureItem
              icon={faShield}
              title="Mã hóa đa lớp"
              desc="Tất cả mật khẩu được băm bằng thuật toán Argon2id cấp độ quân sự."
            />
            <FeatureItem
              icon={faKey}
              title="Yêu cầu độ phức tạp"
              desc="Sử dụng ít nhất 6 ký tự để đảm bảo an toàn tài khoản."
            />
          </div>

          <p className="text-[11px] text-slate-700">
            © 2026 Synthetic Architect · v2.4.1
          </p>
        </div>

        {/* ── Right Panel ── */}
        <div className="bg-[#161925] px-8 py-10 lg:py-12 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-white mb-8">
            Đổi mật khẩu
          </h2>

          {message && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-[#FFF5F5] border border-[#F87171] text-[#EF4444] text-sm">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            <PasswordInput
              id="currentPassword"
              label="Mật khẩu hiện tại"
              placeholder="••••••••"
              register={register("currentPassword")}
              error={errors.currentPassword}
              show={show.current}
              onToggle={() => toggle("current")}
            />

            <PasswordInput
              id="newPassword"
              label="Mật khẩu mới"
              placeholder="••••••••"
              register={register("newPassword")}
              error={errors.newPassword}
              show={show.new}
              onToggle={() => toggle("new")}
            />

            <PasswordInput
              id="confirmPassword"
              label="Xác nhận mật khẩu mới"
              placeholder="••••••••"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              show={show.confirm}
              onToggle={() => toggle("confirm")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            >
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
