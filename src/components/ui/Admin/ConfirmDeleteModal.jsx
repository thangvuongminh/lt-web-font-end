import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ConfirmDeleteModal = ({ open, user, onClose, onConfirm, isDeleting }) => {
  if (!open || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-sm mx-4 shadow-2xl animate-in zoom-in-95 fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="w-5 h-5 text-rose-400"
            />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Delete User?</h2>
          <p className="text-sm text-slate-400">
            Bạn có chắc muốn xóa user{" "}
            <span className="text-white font-medium">{user.email}</span>? Hành
            động này không thể hoàn tác.
          </p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-800 bg-[#0a0f1c] rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition disabled:opacity-60"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-lg shadow-rose-600/25 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-3.5 h-3.5 animate-spin"
              />
            )}
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
