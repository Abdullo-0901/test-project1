import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { rutes } from "../shared/config/routes";

const router = createBrowserRouter(rutes);
export const App = () => {
  return <RouterProvider router={router} />;
};
