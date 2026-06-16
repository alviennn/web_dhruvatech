import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { DigitalProductCTA, Footer } from "./Sections";
import { useT } from "../providers";
import type { Key } from "../i18n";

type CTAContent = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

function getCTAContent(
  pathname: string,
  t: (key: Key) => string
): CTAContent {
  if (pathname === "/") {
    return {
      title: t("home_cta_title"),
      subtitle: t("home_cta_sub"),
      buttonLabel: t("home_cta_button"),
    };
  }

  if (pathname === "/services") {
    return {
      title: t("services_cta_title"),
      subtitle: t("services_cta_sub"),
      buttonLabel: t("services_cta_button"),
    };
  }

  if (pathname.startsWith("/services/website-development")) {
    return {
      title: t("web_cta_title"),
      subtitle: t("web_cta_sub"),
      buttonLabel: t("web_cta_button"),
    };
  }

  if (pathname.startsWith("/services/mobile-app-development")) {
    return {
      title: t("mob_cta_title"),
      subtitle: t("mob_cta_sub"),
      buttonLabel: t("mob_cta_button"),
    };
  }

  if (pathname.startsWith("/services/ai-ml-solutions")) {
    return {
      title: t("ai_cta_title"),
      subtitle: t("ai_cta_sub"),
      buttonLabel: t("ai_cta_button"),
    };
  }

  if (pathname.startsWith("/portfolio")) {
    return {
      title: t("portfolio_cta_title"),
      subtitle: t("portfolio_cta_sub"),
      buttonLabel: t("portfolio_cta_button"),
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      title: t("about_cta_title"),
      subtitle: t("about_cta_sub"),
      buttonLabel: t("about_cta_button"),
    };
  }

  if (pathname.startsWith("/contact")) {
    return {
      title: t("contact_cta_title"),
      subtitle: t("contact_cta_sub"),
      buttonLabel: t("contact_cta_button"),
    };
  }

  return {
    title: t("home_cta_title"),
    subtitle: t("home_cta_sub"),
    buttonLabel: t("home_cta_button"),
  };
}

export function AppShell() {
  const location = useLocation();
  const { t } = useT();

  const cta = getCTAContent(location.pathname, t);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1F2A1F]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <DigitalProductCTA
        title={cta.title}
        subtitle={cta.subtitle}
        buttonLabel={cta.buttonLabel}
      />

      <Footer />
    </div>
  );
}