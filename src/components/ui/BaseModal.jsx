import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  showCloseIcon = true,
  maxWidth = "max-w-sm", // Có thể truyền: max-w-md, max-w-lg...
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-modal-backdrop">
      {/* Container chính với hiệu ứng Glass Panel */}
      <div
        className={`glass-panel border border-slate-700/50 w-full ${maxWidth} rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-modal-content`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-rainbow shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h2>
          )}
          {showCloseIcon && (
            <button
              onClick={onClose}
              className="text-studyhard hover:text-white transition-colors p-1"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        <div className="text-studyhard text-sm leading-relaxed">{children}</div>
        {footer && <div className="mt-8 flex flex-col gap-3">{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;
