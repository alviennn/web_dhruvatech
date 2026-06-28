import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(<App />);
<HelmetProvider>
  <App />
</HelmetProvider>;
