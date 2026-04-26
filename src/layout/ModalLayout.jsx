const ModalLayout = ({ children }) => {
  return (
    <div className="fixed z-50 inset-0 animate-modal-backdrop bg-black/60 flex items-center justify-center p-4">
        <div className="w-full max-w-lg animate-modal-content bg-[#161b22] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
            {children}
        </div>
    </div>
  );
};
export default ModalLayout;
