import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { useT } from "../providers";
import logo from "../../imports/7.png";

export function Navbar() {
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const links = [
    { label: t("nav_home"), to: "/" },
    {
      label: t("nav_services"),
      to: "/services",
      children: [
        { label: t("nav_website"), to: "/services/website-development" },
        { label: t("nav_mobile"), to: "/services/mobile-app-development" },
        { label: t("nav_ai"), to: "/services/ai-ml-solutions" },
      ],
    },
    { label: t("nav_portfolio"), to: "/portfolio" },
    { label: t("nav_about"), to: "/about" },
    { label: t("nav_contact"), to: "/contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 rounded-full border px-5 transition-all duration-300 lg:px-7 ${
          scrolled
            ? "border-[#1F2A1F]/10 bg-[#f5f5f5]/85 shadow-[0_18px_60px_rgba(31,42,31,0.08)] backdrop-blur-xl"
            : "border-[#1F2A1F]/10 bg-white/55 shadow-[0_12px_40px_rgba(31,42,31,0.04)] backdrop-blur-xl"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Dhruva Tech home"
        >
          <img
            src={logo}
            alt="Dhruva Tech"
            className="h-16 w-auto md:h-[112px] lg:h-[116px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((l) =>
            "children" in l && l.children ? (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-all ${
                      isActive
                        ? "bg-[#004B08]/10 text-[#004B08]"
                        : "text-[#1F2A1F]/75 hover:bg-[#004B08]/[0.06] hover:text-[#004B08]"
                    }`
                  }
                >
                  {l.label}
                  <ChevronDown
                    size={15}
                    strokeWidth={2.2}
                    className={`transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-4">
                    <div className="w-72 rounded-[24px] border border-[#1F2A1F]/10 bg-white/90 p-2 shadow-[0_24px_80px_rgba(31,42,31,0.12)] backdrop-blur-xl">
                      {l.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block rounded-[18px] px-4 py-3 text-sm font-semibold text-[#1F2A1F]/75 transition-colors hover:bg-[#f5f5f5] hover:text-[#004B08]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2.5 text-[15px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#004B08]/10 text-[#004B08]"
                      : "text-[#1F2A1F]/75 hover:bg-[#004B08]/[0.06] hover:text-[#004B08]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher lang={lang} onChange={setLang} />

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#004B08] px-6 py-3 text-sm font-semibold text-[#F3EFDF] shadow-[0_14px_35px_rgba(0,75,8,0.18)] transition-colors hover:bg-[#24452A]"
          >
            {t("cta_start")}
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#1F2A1F]/10 bg-white/70 text-[#1F2A1F] lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-[#1F2A1F]/10 bg-[#f5f5f5]/95 px-6 py-6 shadow-[0_24px_80px_rgba(31,42,31,0.12)] backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <div key={l.to}>
                <Link
                  to={l.to}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold text-[#1F2A1F]/85 transition-colors hover:bg-white hover:text-[#004B08]"
                >
                  {l.label}
                </Link>

                {"children" in l && l.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-[#1F2A1F]/10 pl-3">
                    {l.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-[#1F2A1F]/65 transition-colors hover:bg-white hover:text-[#004B08]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#1F2A1F]/10 pt-5">
            <LangSwitcher lang={lang} onChange={setLang} />
          </div>

          <Link
            to="/contact"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#004B08] px-5 py-3 font-semibold text-[#F3EFDF]"
          >
            {t("cta_start")}
          </Link>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({
  lang,
  onChange,
}: {
  lang: "en" | "id";
  onChange: (l: "en" | "id") => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-[#1F2A1F]/10 bg-white/75 p-1 shadow-[0_8px_24px_rgba(31,42,31,0.05)] backdrop-blur">
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
            lang === l
              ? "bg-[#C99A3D] text-[#1F2A1F] shadow-sm"
              : "text-[#1F2A1F]/60 hover:text-[#004B08]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}