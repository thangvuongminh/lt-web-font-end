import SideBarCreator from "@/components/ui/creator/SideBarCreator";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

const CreatorLayout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <SideBarCreator />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default CreatorLayout;
