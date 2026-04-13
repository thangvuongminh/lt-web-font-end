import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VALIDATE_REGISTER } from "@/utils/validation/yupValidate";
import { useMutation } from "react-query";
import { useRegister } from "@/hooks/useRegister";
import notification from "@/utils/notifications/notificationAntd";
import Loading from "@/components/ui/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faL } from "@fortawesome/free-solid-svg-icons";
import notificationAntd from "@/utils/notifications/notificationAntd";
const Register = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMessages, setErrorMessages] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(VALIDATE_REGISTER),
  });
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Create a new account");
  }, []);
  const { mutate, isLoading } = useRegister();
  const onSubmit = (data) => {
    const dataSend = {
      username: data?.username,
      password: data?.password,
      email: data?.email,
    };
    mutate(dataSend, {
      onError: (err) => {
        const res = err.response;
        if (res && res.status == "400") {
          setErrorMessages(res.data.message);
        }
      },
      onSuccess: () => {
        setIsRedirecting(true);
        setTimeout(() => {
          navigate("/account/login");
        }, 600);

        notificationAntd(
          "success",
          "Registration successful!",
          "Redirecting... Please log in to continue.",
        );
      },
    });
  };
  if (isRedirecting) {
    return <Loading />;
  }
  return (
    <>
      {" "}
      {errorMessages && (
        <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm transition-all">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
          <span className="font-medium">{errorMessages}</span>
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">
          {successMsg}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Username</label>
          <input
            type="text"
            {...register("username")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Email address
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
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
              <span>Pending Register...</span>
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-700">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/account/login")}
            className="text-[#6592B8] hover:underline"
          >
            Log in.
          </button>
        </p>
      </div>
    </>
  );
};

export default Register;
