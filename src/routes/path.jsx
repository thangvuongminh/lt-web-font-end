import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Login from "@page/auth/Login";
import Home from "@/page/home/Home";
import PageLayout from "@/layout/PageLayout";
import ContentPage from "@/page/home/ContentPage";
import Register from "@/page/auth/Register";
import ForgotPassword from "@/page/auth/ForgotPassword";
import AuthLayout from "@/layout/AuthLayout";
import ResetPasswordForm from "@/page/auth/ResetPassword";
import ResetPassword from "@/page/auth/ResetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    element: <PageLayout />,
    children: [
      {
        path: "/content",
        element: <ContentPage />,
      },
    ],
  },
  {
    path: "account",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      // {
      //   path: "payout",
      //   element: <Payout />,
      // },
      // {
      //   path: "payoutadmin",
      //   element: <Payoutadmin />,
      // },
      // {
      //   path: "payouthistory",
      //   element: <Payouthistory />,
      // },
      // {
      //   path: "forgot-password/sentcomplete",
      //   element: <Sentcomplete />,
      // },
      // {
      //   path: "sentcomplete",
      //   element: <Sentcomplete />,
      // },
      // {
      //   path: "update-password",
      //   element: <UpdatePassword />,
      // },
    ],
  },
]);
export default router;
