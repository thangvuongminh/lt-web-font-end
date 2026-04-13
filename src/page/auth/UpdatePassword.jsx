import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePassword } from "../../Api";

const updatePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(3, "At least 3 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await updatePassword(data);
      setSuccessMsg("Password updated successfully!");
      reset();
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Password update failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-800">
      
      <div className="w-full max-w-md p-6">
        
        <h2 className="text-3xl font-light text-center mb-8 text-gray-800">
          Update password
        </h2>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting }
            className="w-full bg-[#E93C60] hover:bg-[#d43355] text-white py-2.5 rounded text-sm font-medium transition-colors mt-2 "
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-700">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[#6592B8] hover:underline"
            >
              Back to Home
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UpdatePassword;