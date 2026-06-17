import {
  Check,
  AlertCircle,
  Sparkles,
  MessageCircle,
  type LucideIcon,
  Building2,
  LayoutTemplate,
  BriefcaseBusiness,
  GraduationCap,
  FolderKanban,
  MonitorSmartphone,
  PencilRuler,
  Files,
  PanelsTopLeft,
  ContactRound,
  SearchCheck,
  Rocket,
  Smartphone,
  CalendarCheck2,
  UsersRound,
  ShieldCheck,
  BellRing,
  DatabaseZap,
  Cpu,
  BrainCircuit,
  Workflow,
  ScanSearch,
} from "lucide-react";
import { PageHero, SectionHeader, ProcessStrip } from "../components/shared";

import { useT } from "../providers";
import type { Key } from "../i18n";

type PricingPackage = {
  nameKey: Key;
  priceKey: Key;
  priceNoteKey?: Key;
  featureKeys: Key[];
  highlight?: boolean;
  badgeKey?: Key;
};

const pricingPackages: PricingPackage[] = [
  {
    nameKey: "pricing_basic_name",
    priceKey: "pricing_basic_price",
    priceNoteKey: "pricing_basic_note",
    featureKeys: [
      "pricing_basic_feature_1",
      "pricing_basic_feature_2",
      "pricing_basic_feature_3",
      "pricing_basic_feature_4",
      "pricing_basic_feature_5",
      "pricing_basic_feature_6",
    ],
  },
  {
    nameKey: "pricing_premium_name",
    priceKey: "pricing_premium_price",
    priceNoteKey: "pricing_premium_note",
    featureKeys: [
      "pricing_premium_feature_1",
      "pricing_premium_feature_2",
      "pricing_premium_feature_3",
      "pricing_premium_feature_4",
      "pricing_premium_feature_5",
    ],
    highlight: true,
    badgeKey: "pricing_premium_badge",
  },
  {
    nameKey: "pricing_custom_name",
    priceKey: "pricing_custom_price",
    priceNoteKey: "pricing_custom_note",
    featureKeys: [
      "pricing_custom_feature_1",
      "pricing_custom_feature_2",
      "pricing_custom_feature_3",
      "pricing_custom_feature_4",
    ],
  },
];

function buildWaLink(message: string) {
  return `https://wa.me/6289514693178?text=${encodeURIComponent(message)}`;
}

function ProblemSection({
  problems,
  accent,
}: {
  problems: string[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-18 lg:py-20 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
      <div className="pointer-events-none absolute -top-44 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 left-[-180px] h-[520px] w-[520px] rounded-full bg-[#C99A3D]/[0.055] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-5">
          <SectionHeader title={accent} />
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4">
            {problems.map((problem, i) => (
              <div
                key={problem}
                className="group relative overflow-hidden rounded-[28px] border border-[#1F2A1F]/10 bg-white/75 px-6 py-5 shadow-[0_16px_55px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/55 hover:bg-white hover:shadow-[0_22px_75px_rgba(31,42,31,0.08)]"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#C99A3D]/70 via-[#E0C16A]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="pointer-events-none absolute right-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-[#004B08]/[0.08] bg-[#004B08]/[0.025] transition-all duration-500 group-hover:border-[#C99A3D]/25 group-hover:bg-[#C99A3D]/[0.05]" />

                <div className="relative z-10 flex items-start gap-5">
                  <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C99A3D]/35 bg-[#FFF8E6]/70 text-xs font-semibold text-[#004B08]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="max-w-3xl text-base leading-relaxed text-[#5F6756]">
                    {problem}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function ListGrid({
  title,
  items,
}: {
  title: string;
  items: { labelKey: Key; icon: LucideIcon }[];
}) {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden border-y border-[#1F2A1F]/10 bg-[#f5f5f5] py-18 lg:py-20 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] service-texture" />
      <div className="pointer-events-none absolute -bottom-44 left-[-180px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -top-44 right-[-180px] h-[520px] w-[520px] rounded-full bg-[#004B08]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader title={title} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ labelKey, icon: Icon }) => (
            <div
              key={labelKey}
              className="group relative min-h-[156px] overflow-hidden rounded-[28px] border border-[#1F2A1F]/10 bg-white/78 px-6 py-5 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A3D]/55 hover:bg-white hover:shadow-[0_24px_75px_rgba(31,42,31,0.085)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C99A3D]/70 via-[#E0C16A]/35 to-transparent opacity-80" />

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#004B08]/[0.035] blur-3xl transition-all duration-300 group-hover:bg-[#C99A3D]/[0.06]" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[#C99A3D]/30 bg-[#FFF8E6]/70 text-[#004B08] shadow-[0_10px_24px_rgba(31,42,31,0.04)] transition-all duration-300 group-hover:border-[#C99A3D]/50 group-hover:bg-white">
                    <Icon size={20} strokeWidth={2.1} />
                  </div>

                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#C99A3D]/55 transition-colors duration-300 group-hover:bg-[#004B08]/45" />
                </div>

                <div className="mt-auto">
                  <h3 className="max-w-[88%] text-[1.1rem] leading-snug text-[#1F2A1F]">
                    {t(labelKey)}
                  </h3>

                  <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#C99A3D]/55 via-[#D7D2B8]/50 to-transparent transition-all duration-300 group-hover:w-24" />
                </div>
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
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 lg:py-20 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] service-texture" />
      <div className="pointer-events-none absolute -top-44 right-[-180px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
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

function WebsitePricingSection() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />

      <div className="pointer-events-none absolute -top-40 left-[-160px] h-[520px] w-[520px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 right-[-160px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#004B08]/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#004B08] shadow-[0_12px_36px_rgba(31,42,31,0.04)] backdrop-blur">
            <Sparkles size={13} className="text-[#C99A3D]" />
            {t("pricing_badge")}
          </div>

          <h2 className="text-3xl font-medium leading-tight text-[#1F2A1F] lg:text-4xl">
            {t("pricing_title_1")}{" "}
            <span className="text-[#004B08]">{t("pricing_title_2")}</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#5F6756]">
            {t("pricing_subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3 lg:items-stretch">
          {pricingPackages.map((pkg) => {
            const packageName = t(pkg.nameKey);
            const waMessage = t("pricing_wa_message").replace(
              "{packageName}",
              packageName
            );

            return (
              <div
                key={pkg.nameKey}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border p-8 transition-all duration-300 ${
                  pkg.highlight
                    ? "z-10 border-[#C99A3D]/70 bg-white ring-2 ring-[#C99A3D]/20 shadow-[0_30px_90px_rgba(31,42,31,0.12)]"
                    : "border-[#1F2A1F]/10 bg-white/75 shadow-[0_20px_70px_rgba(31,42,31,0.07)] backdrop-blur hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_28px_90px_rgba(31,42,31,0.10)]"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 ${
                    pkg.highlight
                      ? "bg-gradient-to-r from-[#C99A3D] via-[#E0C16A] to-[#C99A3D]"
                      : "bg-gradient-to-r from-[#004B08]/25 via-[#C99A3D]/30 to-transparent"
                  }`}
                />

                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl ${
                    pkg.highlight ? "bg-[#C99A3D]/18" : "bg-[#004B08]/[0.05]"
                  }`}
                />
                <div
                  className={`pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-3xl ${
                    pkg.highlight ? "bg-[#004B08]/[0.07]" : "bg-[#C99A3D]/[0.05]"
                  }`}
                />

                {pkg.badgeKey && (
                  <div className="absolute right-4 top-5 rounded-full bg-[#C99A3D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1F2A1F] shadow-[0_10px_24px_rgba(201,154,61,0.24)]">
                    {t(pkg.badgeKey)}
                  </div>
                )}

                <div className={`relative ${pkg.badgeKey ? "pt-8" : ""}`}>
                  <h3
                    className={`text-xl font-semibold ${
                      pkg.highlight ? "text-[#004B08]" : "text-[#1F2A1F]"
                    }`}
                  >
                    {packageName}
                  </h3>

                  <div className="mt-4">
                    <div
                      className={`font-semibold tracking-tight text-[#1F2A1F] ${
                        pkg.highlight
                          ? "text-[2.35rem] leading-none"
                          : "text-3xl"
                      }`}
                    >
                      {t(pkg.priceKey)}
                    </div>

                    {pkg.priceNoteKey && (
                      <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-[#5F6756]">
                        {t(pkg.priceNoteKey)}
                      </p>
                    )}
                  </div>

                  <div
                    className={`my-7 h-px ${
                      pkg.highlight
                        ? "bg-gradient-to-r from-[#C99A3D]/60 via-[#C99A3D]/25 to-transparent"
                        : "bg-[#1F2A1F]/10"
                    }`}
                  />

                  <ul className="space-y-3.5">
                    {pkg.featureKeys.map((featureKey) => (
                      <li
                        key={featureKey}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[#5F6756]"
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full ${
                            pkg.highlight
                              ? "bg-[#C99A3D]/18 text-[#004B08]"
                              : "bg-[#004B08]/8 text-[#004B08]"
                          }`}
                        >
                          <Check size={13} strokeWidth={2.3} />
                        </span>

                        <span>{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={buildWaLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative mt-auto flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all ${
                    pkg.highlight
                      ? "bg-[#004B08] text-[#F3EFDF] shadow-[0_16px_38px_rgba(0,75,8,0.22)] hover:bg-[#24452A]"
                      : "border border-[#004B08]/20 bg-[#F7F6F0] text-[#004B08] hover:bg-[#004B08] hover:text-[#F3EFDF]"
                  }`}
                >
                  <MessageCircle size={16} />
                  {t("pricing_cta")}
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-14 text-center text-xs text-[#5F6756]">
          {t("pricing_note")}
        </p>
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
            <span className="text-[#004B08]">{t("web_hero_t2")}</span>{" "}
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
        { labelKey: "web_type_company_profile", icon: Building2 },
        { labelKey: "web_type_landing_page", icon: LayoutTemplate },
        { labelKey: "web_type_business", icon: BriefcaseBusiness },
      ]}
    />

    <ListGrid
      title={t("web_features_title")}
      items={[
        { labelKey: "web_feature_content_structure", icon: Files },
        { labelKey: "web_feature_responsive", icon: MonitorSmartphone },
        { labelKey: "web_feature_whatsapp", icon: MessageCircle },
        { labelKey: "web_feature_seo", icon: SearchCheck },
      ]}
    />

      <ProcessSection />
      <WebsitePricingSection />
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
            <span className="text-[#004B08]">{t("mob_hero_t2")}</span>
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
        { labelKey: "mob_type_service_app", icon: Smartphone },
        { labelKey: "mob_type_booking_app", icon: CalendarCheck2 },
        { labelKey: "mob_type_business_app", icon: BriefcaseBusiness },
      ]}
    />

    <ListGrid
      title={t("mob_features_title")}
      items={[
        { labelKey: "mob_feature_user_flow", icon: Workflow },
        { labelKey: "mob_feature_mobile_first", icon: MonitorSmartphone },
        { labelKey: "mob_feature_auth_flow", icon: ShieldCheck },
        { labelKey: "mob_feature_api", icon: DatabaseZap },
      ]}
    />

      <ProcessSection />
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
            <span className="text-[#004B08]">{t("ai_hero_t2")}</span>{" "}
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
        { labelKey: "ai_type_computer_vision", icon: ScanSearch },
        { labelKey: "ai_type_prediction", icon: BrainCircuit },
        { labelKey: "ai_type_automation", icon: Workflow },
      ]}
    />

    <ListGrid
      title={t("ai_usecases_title")}
      items={[
        { labelKey: "ai_usecase_image_detection", icon: ScanSearch },
        { labelKey: "ai_usecase_data_prediction", icon: BrainCircuit },
        { labelKey: "ai_usecase_dashboard", icon: PanelsTopLeft },
        { labelKey: "ai_usecase_automation", icon: Workflow },
      ]}
    />

      <ProcessSection />

      <section className="relative overflow-hidden border-y border-[#1F2A1F]/10 bg-[#f5f5f5] py-16 lg:py-20 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] service-texture" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <div className="group relative overflow-hidden rounded-[32px] border border-[#1F2A1F]/10 bg-white/75 p-8 shadow-[0_22px_80px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:border-[#C99A3D]/55 hover:bg-white">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#C99A3D]/60 via-[#E0C16A]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 max-w-3xl">
              <h4 className="mb-3 text-2xl font-medium tracking-tight text-[#1F2A1F]">
                {t("ai_feasibility_title")}
              </h4>

              <p className="max-w-2xl leading-relaxed text-[#5F6756]">
                {t("ai_feasibility")}
              </p>

              <div className="mt-7 h-px w-full max-w-xl bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/50 to-transparent" />
            </div>
          </div>
        </div>

        <ServiceMotionStyle />
      </section>
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