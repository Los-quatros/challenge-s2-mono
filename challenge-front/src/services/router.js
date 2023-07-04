import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

export const router = createBrowserRouter([
  { path: "/admin", element: <Dashboard /> },
]);
