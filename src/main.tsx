import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App";
import "./styles/index.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);