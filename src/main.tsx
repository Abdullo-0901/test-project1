import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "./app/App";
import { queryClient } from "./utils/reactQuery";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <App />
  </QueryClientProvider>
);
