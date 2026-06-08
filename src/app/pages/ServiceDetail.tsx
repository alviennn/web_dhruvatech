import { Check, AlertCircle } from "lucide-react";
import {
  PageHero,
  CTABlock,
  SectionHeader,
  ProcessStrip,
} from "../components/shared";
import { useT } from "../providers";
import type { Key } from "../i18n";

function ProblemSection({
  problems,
  accent,
}: {
  problems: string[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] service-texture" />
      <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader title={accent} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          {problems.map((p) => (
            <div
              key={p}
              className="group flex gap-4 rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/70 hover:shadow-[0_20px_70px_rgba(31,42,31,0.08)]"
            >
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[14px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                <AlertCircle size={18} strokeWidth={1.8} />
              </div>

              <p className="leading-relaxed text-[#5F6756]">
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function ListGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 border-y border-[#1F2A1F]/10 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
      <div className="pointer-events-none absolute -bottom-44 left-[-160px] h-[520px] w-[520px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader title={title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {items.map((it) => (
            <div
              key={it}
              className="group rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/70 hover:shadow-[0_20px_70px_rgba(31,42,31,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[14px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                  <Check size={17} strokeWidth={1.9} />
                </div>

                <span className="text-[#1F2A1F] leading-snug">
                  {it}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function ProcessSection() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
      <div className="pointer-events-none absolute -top-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("proc_section_title")}
          subtitle={t("proc_section_sub")}
        />

        <div className="mt-10">
          <ProcessStrip />
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

/* ---------------- Website Development ---------------- */

export function WebsiteDevelopment() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("web_hero_t1")}{" "}
            <span className="text-[#004B08]">
              {t("web_hero_t2")}
            </span>{" "}
            {t("web_hero_t3")}
          </>
        }
        subtitle={t("web_hero_sub")}
      />

      <ProblemSection
        accent={t("web_problem_title")}
        problems={[t("web_problem_1"), t("web_problem_2"), t("web_problem_3")]}
      />

      <ListGrid
        title={t("web_build_title")}
        items={[
          "Company Profile Website",
          "Landing Page",
          "Business Website",
          "Educational Website",
          "Portfolio Website",
        ]}
      />

      <ListGrid
        title={t("web_features_title")}
        items={[
          "Responsive design",
          "Modern UI/UX",
          "Clear content structure",
          "Service pages",
          "Portfolio section",
          "Contact form",
          "WhatsApp CTA",
          "SEO-friendly structure",
          "Fast loading experience",
        ]}
      />

      <ProcessSection />

      <CTABlock title={t("web_cta")} primaryTo="/contact?service=website" />
    </>
  );
}

/* ---------------- Mobile App ---------------- */

export function MobileAppDevelopment() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("mob_hero_t1")}{" "}
            <span className="text-[#004B08]">
              {t("mob_hero_t2")}
            </span>
          </>
        }
        subtitle={t("mob_hero_sub")}
      />

      <ProblemSection
        accent={t("mob_problem_title")}
        problems={[t("mob_problem_1"), t("mob_problem_2"), t("mob_problem_3")]}
      />

      <ListGrid
        title={t("mob_build_title")}
        items={[
          "Service Application",
          "Booking Application",
          "Educational Application",
          "Community Application",
          "Business Application",
        ]}
      />

      <ListGrid
        title={t("mob_features_title")}
        items={[
          "User-friendly interface",
          "Clear user flow",
          "Mobile-first experience",
          "Authentication flow",
          "Booking or service flow",
          "Notification-ready structure",
          "Admin integration planning",
          "API integration planning",
          "Prototype before development",
          "Scalable feature planning",
        ]}
      />

      <ProcessSection />

      <CTABlock title={t("mob_cta")} primaryTo="/contact?service=mobile-app" />
    </>
  );
}

/* ---------------- AI/ML ---------------- */

export function AIMLSolutions() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("ai_hero_t1")}{" "}
            <span className="text-[#004B08]">
              {t("ai_hero_t2")}
            </span>{" "}
            {t("ai_hero_t3")}
          </>
        }
        subtitle={t("ai_hero_sub")}
      />

      <ProblemSection
        accent={t("ai_problem_title")}
        problems={[t("ai_problem_1"), t("ai_problem_2"), t("ai_problem_3")]}
      />

      <ListGrid
        title={t("ai_build_title")}
        items={[
          "Computer Vision",
          "Prediction System",
          "Data Classification",
          "AI-Powered Features",
          "Automation Support",
        ]}
      />

      <ListGrid
        title={t("ai_usecases_title")}
        items={[
          "Image detection",
          "Object classification",
          "Data prediction",
          "Data processing",
          "Recommendation logic",
          "Intelligent dashboard features",
          "AI-assisted automation",
          "Computer vision prototype",
        ]}
      />

      <ProcessSection />

      <section className="relative overflow-hidden bg-[#f5f5f5] py-20 border-y border-[#1F2A1F]/10 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <div className="group flex gap-5 rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-7 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur transition-all duration-300 hover:border-[#C99A3D]/70">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[16px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
              <AlertCircle size={20} strokeWidth={1.8} />
            </div>

            <div>
              <h4 className="mb-2 text-xl text-[#1F2A1F]">
                {t("ai_feasibility_title")}
              </h4>

              <p className="leading-relaxed text-[#5F6756]">
                {t("ai_feasibility")}
              </p>
            </div>
          </div>
        </div>

        <ServiceMotionStyle />
      </section>

      <CTABlock title={t("ai_cta")} primaryTo="/contact?service=ai-ml" />
    </>
  );
}

/* ---------------- LOCAL STYLE ---------------- */

function ServiceMotionStyle() {
  return (
    <style>{`
      @keyframes serviceTextureMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 72px 72px;
        }
      }

      .service-texture {
        background-image:
          linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: serviceTextureMove 24s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .service-texture {
          animation: none;
        }
      }
    `}</style>
  );
}


export type _ = Key;