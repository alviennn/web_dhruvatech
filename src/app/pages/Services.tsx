import { Link } from "react-router";
import { ArrowUpRight, Globe, Smartphone, Cpu } from "lucide-react";
import { PageHero, CTABlock, SectionHeader } from "../components/shared";
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

      <section className="relative overflow-hidden bg-[#f5f5f5] pt-10 pb-24 lg:pt-12 lg:pb-28 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] services-texture" />
        <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-160px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, titleKey, descKey, to, tags }, i) => (
              <Link
                key={titleKey}
                to={to}
                className="group relative h-full overflow-hidden rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-7 shadow-[0_18px_60px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_24px_80px_rgba(31,42,31,0.10)]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E0C16A]/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#004B08]/[0.04] blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="grid h-[58px] w-[58px] place-items-center rounded-[18px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <span className="text-sm font-medium tracking-wider text-[#C99A3D]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl text-[#1F2A1F] mb-3">
                    {t(titleKey)}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#5F6756] mb-6">
                    {t(descKey)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {tags.map((x) => (
                      <span
                        key={x}
                        className="rounded-full border border-[#1F2A1F]/10 bg-[#f5f5f5]/80 px-2.5 py-1 text-xs text-[#1F2A1F]/75"
                      >
                        {x}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm text-[#004B08]">
                    {t("cta_explore")}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ServicesMotionStyle />
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 border-y border-[#1F2A1F]/10 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] services-texture" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.05] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <SectionHeader
            title={t("services_support_title")}
            subtitle={t("services_support_sub")}
            center
          />
        </div>

        <ServicesMotionStyle />
      </section>

      <CTABlock
        title={t("services_final_cta")}
        primaryTo="/contact"
        primaryLabel={t("cta_tell_idea")}
      />
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