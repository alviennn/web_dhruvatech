import { Link } from "react-router";
import { ArrowUpRight, Globe, Smartphone, Cpu } from "lucide-react";
import { PageHero, SectionHeader } from "../components/shared";
import { useT } from "../providers";

export function Services() {
  const { t } = useT();

  const services = [
    {
      icon: Globe,
      titleKey: "nav_website",
      descKey: "svc_website_desc",
      to: "/services/website-development",
      tags: ["Company Profile", "Landing Page", "Business", "Educational"],
    },
    {
      icon: Smartphone,
      titleKey: "nav_mobile",
      descKey: "svc_mobile_desc",
      to: "/services/mobile-app-development",
      tags: ["Service App", "Booking", "Community", "Business"],
    },
    {
      icon: Cpu,
      titleKey: "nav_ai",
      descKey: "svc_ai_desc",
      to: "/services/ai-ml-solutions",
      tags: ["Computer Vision", "Prediction", "Automation", "AI Features"],
    },
  ] as const;

  return (
    <>
      <PageHero
        title={
          <>
            {t("services_hero_t1")}{" "}
            <span className="text-[#004B08]">
              {t("services_hero_t2")}
            </span>
          </>
        }
        subtitle={t("services_hero_sub")}
      />

      <section className="relative overflow-hidden bg-[#f5f5f5] pt-8 pb-20 lg:pt-10 lg:pb-24 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] services-texture" />
        <div className="pointer-events-none absolute -top-44 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 left-[-180px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, titleKey, descKey, to, tags }) => (
              <Link
                key={titleKey}
                to={to}
                className="group relative flex min-h-[360px] overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/75 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:bg-white hover:shadow-[0_26px_80px_rgba(31,42,31,0.09)]"
              >
                {/* Soft glow */}
                <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-[#004B08]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#C99A3D]/[0.08]" />

                {/* Watermark icon */}
                <Icon
                  aria-hidden="true"
                  size={64}
                  strokeWidth={1.6}
                  className="pointer-events-none absolute right-7 top-7 text-[#004B08]/[0.40] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.20]"
                />

                <div className="relative z-10 flex h-full w-full flex-col justify-end">
                  <div className="max-w-[88%]">
                    <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1F2A1F]">
                      {t(titleKey)}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-[#5F6756]">
                      {t(descKey)}
                    </p>

                    <div className="mb-7 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#1F2A1F]/10 bg-[#f5f5f5]/80 px-3 py-1.5 text-xs text-[#1F2A1F]/70 transition-colors duration-300 group-hover:border-[#C99A3D]/35 group-hover:bg-[#FFF8E6]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-[#004B08]">
                      {t("cta_explore")}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/50 to-transparent" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ServicesMotionStyle />
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] py-16 lg:py-20 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] services-texture" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.045] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[34px] border border-[#1F2A1F]/10 bg-white/70 px-6 py-12 shadow-[0_22px_80px_rgba(31,42,31,0.055)] backdrop-blur md:px-10 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C99A3D]/[0.08] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#004B08]/[0.06] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <SectionHeader
                title={t("services_support_title")}
                subtitle={t("services_support_sub")}
                center
              />

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-[#004B08]/15 bg-[#F7F6F0]/80 px-4 py-2 text-sm text-[#004B08]">
                  {t("nav_website")}
                </span>
                <span className="rounded-full border border-[#004B08]/15 bg-[#F7F6F0]/80 px-4 py-2 text-sm text-[#004B08]">
                  {t("nav_mobile")}
                </span>
                <span className="rounded-full border border-[#004B08]/15 bg-[#F7F6F0]/80 px-4 py-2 text-sm text-[#004B08]">
                  {t("nav_ai")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ServicesMotionStyle />
      </section>
    </>
  );
}

function ServicesMotionStyle() {
  return (
    <style>{`
      @keyframes servicesTextureMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 72px 72px;
        }
      }

      .services-texture {
        background-image:
          linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: servicesTextureMove 24s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .services-texture {
          animation: none;
        }
      }
    `}</style>
  );
}