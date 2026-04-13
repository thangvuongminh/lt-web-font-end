import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { VALIDATE_FORGOT_PASSWORD } from "@/utils/validation/yupValidate";
import Loading from "@/components/ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useFetchForgotPassword } from "@/hooks/useFetchForgotPassword";
import notificationAntd from "@/utils/notifications/notificationAntd";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(VALIDATE_FORGOT_PASSWORD),
  });
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Forgot password");
  }, []);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { mutate, isLoading } = useFetchForgotPassword();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(data, {
      onError: (error) => {
        const res = error.response;
        if (res && res.status == "400") {
          setErrorMessages(res.data.message);
        }
      },
      onSuccess: (response) => {
        setIsRedirecting(true);
        window.sessionStorage.setItem("email", data.email);
        setTimeout(() => {
          navigate("/account/reset-password");
        }, 300);
        notificationAntd(
          "success",
          "Email Sent",
          "Please check your inbox and enter the OTP to continue.",
        );
      },
    });
  };
  if (isRedirecting) {
    return <Loading />;
  }
  return (
    <>
      {errorMessages && (
        <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm transition-all">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
          <span className="font-medium">{errorMessages}</span>
        </div>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <div className="w-full flex items-center border border-gray-300 rounded">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-400 flex-1"
            />
            <input
              {...register("email")}
              type="text"
              className="w-full px-3 py-2 flex-5  focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#E93C60] hover:bg-[#d43355] cursor-pointer text-white py-2.5 rounded text-sm font-medium transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loading size={"small"} />
              <span>Pending ...</span>
            </>
          ) : (
            "Forgot password"
          )}
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="grow border-t border-gray-200"></div>
        <Link
          to={"/account/login"}
          className="shrink-0 mx-4 text-[#6592B8] text-sm "
        >
          Login
        </Link>
        <div className="grow border-t border-gray-200"></div>
      </div>
    </>
  );
};
export default ForgotPassword;
