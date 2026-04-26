import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheckCircle,
  faTriangleExclamation,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ModalLayout from "@/layout/ModalLayout";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authenticateSlice";
import { useLogout } from "@/hooks/useLogout";

const ModalStudy = () => {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  if (!showModal) return null;
  const { mutate } = useLogout();
  const logout = () => {
    mutate();
  };
  return (
    <ModalLayout>
      <div className="p-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-purple-400 tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
            Congratulations!
          </h2>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">
            You are now a Creator.
          </p>
        </div>
        <button
          className="text-gray-500 hover:text-white transition-colors"
          onClick={() => setShowModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* 2. Nội dung chính */}
      <div className="px-6 pb-6 flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-400 text-4xl"
          />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          Your application has been approved. Please{" "}
          <span className="text-purple-400 font-semibold">
            log out and log back in
          </span>{" "}
          to activate your Creator privileges.
        </p>
      </div>

      {/* 3. Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="flex-1 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm hover:bg-gray-800 transition-colors"
        >
          Later
        </button>
        <button
          onClick={logout}
          className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
          Logout Now
        </button>
      </div>
    </ModalLayout>
  );
};

export default ModalStudy;
