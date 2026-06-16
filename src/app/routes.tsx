import { createBrowserRouter, Link } from "react-router";
import { Layout } from "./components/Layout";

import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import {
  WebsiteDevelopment,
  MobileAppDevelopment,
  AIMLSolutions,
} from "./pages/ServiceDetail";
import { Portfolio } from "./pages/Portfolio";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { AdminPortfolio } from "./pages/AdminPortfolio";
import { PortfolioDetail } from "./pages/PortfolioDetails";

import { useT } from "./providers";

function NotFound() {
  const { t } = useT();

  return (
    <section className="min-h-[70vh] grid place-items-center bg-[#f5f5f5] px-6 transition-colors">
      <div className="text-center">
        <div className="text-[#C99A3D] tracking-widest text-sm mb-3">404</div>

        <h1 className="text-3xl text-[#1F2A1F] mb-4">
          {t("nf_title")}
        </h1>

        <p className="text-[#5F6756] mb-8">
          {t("nf_sub")}
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#004B08] text-[#F3EFDF] hover:bg-[#8E9970] transition-colors"
        >
          {t("cta_back_home")}
        </Link>
      </div>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },

      { path: "services", Component: Services },
      { path: "services/website-development", Component: WebsiteDevelopment },
      { path: "services/mobile-app-development", Component: MobileAppDevelopment },
      { path: "services/ai-ml-solutions", Component: AIMLSolutions },

      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:id", Component: PortfolioDetail },

      { path: "about", Component: About },
      { path: "contact", Component: Contact },

      { path: "*", Component: NotFound },
    ],
  },

  {
    path: "/admin",
    Component: AdminPortfolio,
  },
  {
    path: "/admin/portfolio",
    Component: AdminPortfolio,
  },
]);