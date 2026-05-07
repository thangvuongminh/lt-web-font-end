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
import CartPage from "@/page/home/CartPage";
import ChangePassword from "@/page/auth/ChangePassword";
import ProfilePage from "@/page/home/ProfilePage";
import EditProfile from "@/components/ui/EditProfile";
import BecomeCreator from "@/page/home/BecomeCreator";
import CreatorLayout from "@/layout/CreatorLayout";
import CreateContentCreator from "@/page/creator/CreateContentCreator";
import ProtectedRouteV2 from "./ProtectedRouteV2";
import BlockContentCreator from "@/page/creator/BlockContentCreator";
import ContentDetail from "@/page/home/ContentDetail";
import Withdraw from "./../page/home/Withdraw";
const router = createBrowserRouter([
  {
    path: "/about-us",
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
    element: <CreatorLayout />,
    children: [
      {
        path: "/content/create",
        element: (
          <ProtectedRoute requireRole={"CREATOR"}>
            <CreateContentCreator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/content/management",
        element: (
          <ProtectedRoute requireRole={"CREATOR"}>
            <BlockContentCreator />
          </ProtectedRoute>
        ),
      },
    ],
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
          <ProtectedRoute requireRole={["CREATOR", "CONSUMER"]}>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/become-creator",
        element: (
          <ProtectedRouteV2 requireRole={"CONSUMER"}>
            <BecomeCreator />
          </ProtectedRouteV2>
        ),
      },
      {
        path: "/content/study/:contentId",
        element: (
          <ProtectedRoute requireRole={["CONSUMER", "CREATOR"]}>
            <ContentDetail />
          </ProtectedRoute>
        ),
      },

      {
        path: "/course/:courseId/lesson/:lessonId",
        element: (
          <ProtectedRoute requireRole={["CONSUMER", "CREATOR"]}>
            <ContentDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-password/*",
        element: (
          <ProtectedRoute
            requireRole={["CREATOR", "CONSUMER", "ADMIN", "MODERATOR"]}
          >
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/withdraw",
        element: (
          <ProtectedRoute requireRole={["CONSUMER", "CREATOR"]}>
            <Withdraw />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart/*",
        element: (
          <ProtectedRoute requireRole={["CREATOR", "CONSUMER"]}>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/:nickname",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/account",
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
    ],
  },
]);
export default router;
