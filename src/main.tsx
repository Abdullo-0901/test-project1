import "./index.css";
import { App } from "./app/App";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./utils/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <ToastContainer />
    <App />
  </QueryClientProvider>
);
