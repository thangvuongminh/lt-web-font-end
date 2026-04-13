import { Outlet } from "react-router";
import { useState } from "react";
const AuthLayout = () => {
  const [title, setTitle] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center  font-sans text-gray-800  bg-[#0f1a2f]">
      <div className="w-full max-w-md p-12 bg-white rounded">
        <h2 className="text-3xl font-light text-center mb-8 text-gray-800  ">
          {title}
        </h2>
        <Outlet context={{ setTitle }} />
      </div>
    </div>
  );
};
export default AuthLayout;
