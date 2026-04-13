import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/path";
import { Import } from "lucide-react";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./AuthProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </QueryClientProvider>,
);
