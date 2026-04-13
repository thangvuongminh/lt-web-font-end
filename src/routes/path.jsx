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
import ProtectedRoute from "./ProtectedRoute";
import Payment from "@/page/home/Payment";
import { Button, Result } from "antd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/403",
    element: (
      <>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" href="/">
              Back Home
            </Button>
          }
        />
      </>
    ),
  },
  {
    path: "/404",
    element: (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" href="/">
              Back Home
            </Button>
          }
        />
      </>
    ),
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
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
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
