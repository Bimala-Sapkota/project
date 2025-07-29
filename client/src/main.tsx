import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
// import './index.css'
import App from "./App.tsx";
import { QueryProvider } from "./providers/react-query.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
