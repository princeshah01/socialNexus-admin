import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import IssueDetails from "../pages/IssueDetails";
import Issues from "../pages/Issues";
import Login from "../pages/Login";
import Messages from "../pages/Message";
import MessageMonitor from "../pages/MessageMonitor";
import Settings from "../pages/Settings";
import UserDetails from "../pages/UserDetails";
import Users from "../pages/Users";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
      {
        path: "issues",
        element: <Issues />,
      },
      {
        path: "issues/:id",
        element: <IssueDetails />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "monitor",
        element: <MessageMonitor />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
