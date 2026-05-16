import SidebarAdmin from "@/components/ui/Admin/SidebarAdmin";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans">
      <div className="flex min-h-screen">
        <SidebarAdmin />

        {/* ===== MAIN ===== */}
        <main className="flex-1 px-8 py-7">{children}</main>
      </div>
    </div>
  );
};
export default AdminLayout;
