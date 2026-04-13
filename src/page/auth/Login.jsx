import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { VALIDATE_LOGIN } from "@/utils/validation/yupValidate";
import {
  data,
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useMutation } from "react-query";
import { useLogin } from "@/hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faL } from "@fortawesome/free-solid-svg-icons";

import { Flex, Spin } from "antd";
import {
  QUERY_PARAM,
  useLoginOauth2Google,
} from "@/hooks/useLoginOauth2Google";
import Loading from "@/components/ui/Loading";
import { useDispatch } from "react-redux";
import { login } from "@/store/authenticateSlice";
// import { QUERY_PARAM } from "@/hooks/useLoginOauth2Google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(VALIDATE_LOGIN),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState(null);
  const { mutate, mutateAsync, isSuccess, data, isLoading } = useLogin();
  const [searchParams] = useSearchParams();
  const { mutate: mutationLoginGoogle } = useLoginOauth2Google();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Log in to access your saved code");
  }, []);
  useEffect(() => {
    if (searchParams.get("code") != null) {
      mutationLoginGoogle(searchParams.get("code"), {
        onError: () => {
          navigate("/account/login");
          setErrorMessages("Login failed, please try again later");
        },
        onSuccess: (response) => {
          setIsRedirecting(true);
          const data = response.data.data.accessToken;
          dispatch(login(data));
          setTimeout(() => {
            navigate("/home");
          }, 300);
        },
      });
    }
  }, []);
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
        const data = response.data.data.accessToken;
        dispatch(login(data));
        setTimeout(() => {
          navigate("/home");
        }, 300);
      },
    });
  };
  const loginGoogle = () => {
    window.location.href = QUERY_PARAM;
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
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Username</label>
          <input
            {...register("username")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
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
              <span>Pending Login...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink-0 mx-4 text-gray-400 text-sm">Hoặc</span>
        <div className="grow border-t border-gray-200"></div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={loginGoogle}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-sm text-gray-700 py-2.5 rounded text-sm font-medium transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
      <div className="mt-6 text-center text-sm space-y-4">
        <p className="text-gray-700">
          New to Codeshare?{" "}
          <a
            href="/account/register"
            type="button"
            className="text-[#6592B8] hover:underline"
          >
            Sign up here.
          </a>
        </p>
        <p>
          <Link
            to={"/account/forgot-password"}
            type="button"
            className="text-[#6592B8] hover:underline"
          >
            Forgot your password?
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
