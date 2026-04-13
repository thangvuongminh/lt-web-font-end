import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default PageLayout;
