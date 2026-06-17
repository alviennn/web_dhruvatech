import type { ComponentType } from "react";
import {
  Check,
  Sparkles,
  MessageCircle,
  Building2,
  LayoutTemplate,
  BriefcaseBusiness,
  MonitorSmartphone,
  Files,
  SearchCheck,
  Smartphone,
  CalendarCheck2,
  ShieldCheck,
  DatabaseZap,
  PanelsTopLeft,
  BrainCircuit,
  Workflow,
  ScanSearch,
} from "lucide-react";
import { PageHero } from "../components/shared";
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

type IconDetailItem = {
  titleKey: Key;
  descKey: Key;
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

type ProcessStep = {
  titleKey: Key;
  descKey: Key;
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

function ServiceIntroSection({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-b border-[#1F2A1F]/10 pb-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-3xl text-sm leading-7 text-[#5F6756] md:text-base md:leading-8">
              {description}
            </p>

            <div className="mt-8 space-y-4">
              {points.map((point) => (
                <div
                  key={point}
                  className="grid grid-cols-[14px_1fr] gap-3 sm:grid-cols-[16px_1fr]"
                >
                  <span className="mt-[7px] h-2.5 w-2.5 rounded-full bg-[#004B08]" />

                  <p className="max-w-3xl text-sm leading-6 text-[#5F6756]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitySection({
  title,
  description,
  items,
  reverse = false,
}: {
  title: string;
  description: string;
  items: IconDetailItem[];
  reverse?: boolean;
}) {
  const { t } = useT();

  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className={`grid gap-10 border-b border-[#1F2A1F]/10 pb-14 lg:grid-cols-12 lg:items-start ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:col-span-5">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#5F6756] md:text-base">
              {description}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {items.map(({ titleKey, descKey, icon: Icon }) => (
              <div
                key={titleKey}
                className="rounded-[22px] border border-[#1F2A1F]/10 bg-white/65 p-5 shadow-[0_14px_42px_rgba(31,42,31,0.04)] backdrop-blur sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004B08]/10 text-[#004B08] sm:bg-transparent">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#004B08] sm:size-[28px]"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold leading-snug text-[#1F2A1F] sm:text-lg">
                      {t(titleKey)}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#5F6756]">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const { t } = useT();

  const methodologyItems = [
    {
      titleKey: "method_agile_title",
      descKey: "method_agile_desc",
    },
    {
      titleKey: "method_transparency_title",
      descKey: "method_transparency_desc",
    },
    {
      titleKey: "method_iteration_title",
      descKey: "method_iteration_desc",
    },
  ] as const;

  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-b border-[#1F2A1F]/10 pb-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
              {t("method_section_title")}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#5F6756] md:text-base">
              {t("method_section_sub")}
            </p>
          </div>

          <div className="space-y-6 lg:col-span-7">
            {methodologyItems.map((item) => (
              <div
                key={item.titleKey}
                className="grid grid-cols-[14px_1fr] gap-4"
              >
                <span className="mt-[9px] h-2.5 w-2.5 rounded-full bg-[#C99A3D]" />

                <div>
                  <h3 className="text-lg font-semibold leading-snug text-[#1F2A1F] sm:text-xl">
                    {t(item.titleKey)}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5F6756]">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useT();

  const steps: ProcessStep[] = [
    {
      titleKey: "process_prepare_title",
      descKey: "process_prepare_desc",
    },
    {
      titleKey: "process_define_title",
      descKey: "process_define_desc",
    },
    {
      titleKey: "process_design_title",
      descKey: "process_design_desc",
    },
    {
      titleKey: "process_develop_title",
      descKey: "process_develop_desc",
    },
    {
      titleKey: "process_polish_title",
      descKey: "process_polish_desc",
    },
    {
      titleKey: "process_launch_title",
      descKey: "process_launch_desc",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
              {t("proc_section_title")}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#5F6756] md:text-base">
              {t("proc_section_sub")}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="relative space-y-8 sm:space-y-10">
              <div className="absolute left-[19px] top-2 hidden h-[calc(100%-24px)] w-px bg-[#1F2A1F]/10 sm:block" />

              {steps.map((step, index) => (
                <div
                  key={step.titleKey}
                  className="relative grid grid-cols-[40px_1fr] gap-4"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#004B08] text-xs font-semibold text-[#F3EFDF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-[#1F2A1F] sm:text-xl">
                      {t(step.titleKey)}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5F6756]">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsitePricingSection() {
  const { t } = useT();

  return (
    <section className="bg-[#f5f5f5] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#004B08]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#004B08]">
            <Sparkles size={13} className="text-[#C99A3D]" />
            {t("pricing_badge")}
          </div>

          <h2 className="text-3xl font-semibold leading-tight text-[#1F2A1F] lg:text-4xl">
            {t("pricing_title_1")}{" "}
            <span className="text-[#004B08]">{t("pricing_title_2")}</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#5F6756]">
            {t("pricing_subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPackages.map((pkg) => {
            const packageName = t(pkg.nameKey);
            const waMessage = t("pricing_wa_message").replace(
              "{packageName}",
              packageName
            );

            return (
              <div
                key={pkg.nameKey}
                className={`relative flex h-full flex-col rounded-[28px] border bg-white p-7 ${
                  pkg.highlight
                    ? "border-[#C99A3D]/70 shadow-[0_24px_70px_rgba(31,42,31,0.10)]"
                    : "border-[#1F2A1F]/10"
                }`}
              >
                {pkg.badgeKey && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#C99A3D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1F2A1F]">
                    {t(pkg.badgeKey)}
                  </span>
                )}

                <div className={pkg.badgeKey ? "pt-8" : ""}>
                  <h3 className="text-xl font-semibold text-[#1F2A1F]">
                    {packageName}
                  </h3>

                  <div className="mt-4">
                    <div className="text-3xl font-semibold tracking-tight text-[#004B08]">
                      {t(pkg.priceKey)}
                    </div>

                    {pkg.priceNoteKey && (
                      <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-[#5F6756]">
                        {t(pkg.priceNoteKey)}
                      </p>
                    )}
                  </div>

                  <div className="my-7 h-px bg-[#1F2A1F]/10" />

                  <ul className="space-y-3.5">
                    {pkg.featureKeys.map((featureKey) => (
                      <li
                        key={featureKey}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[#5F6756]"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[#004B08]/10 text-[#004B08]">
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
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-semibold transition-colors ${
                    pkg.highlight
                      ? "bg-[#004B08] text-[#F3EFDF] hover:bg-[#24452A]"
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

        <p className="mt-10 text-center text-xs text-[#5F6756]">
          {t("pricing_note")}
        </p>
      </div>
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

      <ServiceIntroSection
        title={t("web_intro_title")}
        description={t("web_intro_desc")}
        points={[t("web_problem_1"), t("web_problem_2"), t("web_problem_3")]}
      />

      <CapabilitySection
        title={t("web_build_title")}
        description={t("web_capability_desc")}
        items={[
          {
            titleKey: "web_type_company_profile",
            descKey: "web_type_company_profile_desc",
            icon: Building2,
          },
          {
            titleKey: "web_type_landing_page",
            descKey: "web_type_landing_page_desc",
            icon: LayoutTemplate,
          },
          {
            titleKey: "web_type_business",
            descKey: "web_type_business_desc",
            icon: BriefcaseBusiness,
          },
        ]}
      />

      <CapabilitySection
        reverse
        title={t("web_features_title")}
        description={t("web_deliverable_desc")}
        items={[
          {
            titleKey: "web_feature_content_structure",
            descKey: "web_feature_content_structure_desc",
            icon: Files,
          },
          {
            titleKey: "web_feature_responsive",
            descKey: "web_feature_responsive_desc",
            icon: MonitorSmartphone,
          },
          {
            titleKey: "web_feature_whatsapp",
            descKey: "web_feature_whatsapp_desc",
            icon: MessageCircle,
          },
          {
            titleKey: "web_feature_seo",
            descKey: "web_feature_seo_desc",
            icon: SearchCheck,
          },
        ]}
      />

      <MethodologySection />
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

      <ServiceIntroSection
        title={t("mob_intro_title")}
        description={t("mob_intro_desc")}
        points={[t("mob_problem_1"), t("mob_problem_2"), t("mob_problem_3")]}
      />

      <CapabilitySection
        title={t("mob_build_title")}
        description={t("mob_capability_desc")}
        items={[
          {
            titleKey: "mob_type_service_app",
            descKey: "mob_type_service_app_desc",
            icon: Smartphone,
          },
          {
            titleKey: "mob_type_booking_app",
            descKey: "mob_type_booking_app_desc",
            icon: CalendarCheck2,
          },
          {
            titleKey: "mob_type_business_app",
            descKey: "mob_type_business_app_desc",
            icon: BriefcaseBusiness,
          },
        ]}
      />

      <CapabilitySection
        reverse
        title={t("mob_features_title")}
        description={t("mob_deliverable_desc")}
        items={[
          {
            titleKey: "mob_feature_user_flow",
            descKey: "mob_feature_user_flow_desc",
            icon: Workflow,
          },
          {
            titleKey: "mob_feature_mobile_first",
            descKey: "mob_feature_mobile_first_desc",
            icon: MonitorSmartphone,
          },
          {
            titleKey: "mob_feature_auth_flow",
            descKey: "mob_feature_auth_flow_desc",
            icon: ShieldCheck,
          },
          {
            titleKey: "mob_feature_api",
            descKey: "mob_feature_api_desc",
            icon: DatabaseZap,
          },
        ]}
      />

      <MethodologySection />
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

      <ServiceIntroSection
        title={t("ai_intro_title")}
        description={t("ai_intro_desc")}
        points={[t("ai_problem_1"), t("ai_problem_2"), t("ai_problem_3")]}
      />

      <CapabilitySection
        title={t("ai_build_title")}
        description={t("ai_capability_desc")}
        items={[
          {
            titleKey: "ai_type_computer_vision",
            descKey: "ai_type_computer_vision_desc",
            icon: ScanSearch,
          },
          {
            titleKey: "ai_type_prediction",
            descKey: "ai_type_prediction_desc",
            icon: BrainCircuit,
          },
          {
            titleKey: "ai_type_automation",
            descKey: "ai_type_automation_desc",
            icon: Workflow,
          },
        ]}
      />

      <CapabilitySection
        reverse
        title={t("ai_usecases_title")}
        description={t("ai_deliverable_desc")}
        items={[
          {
            titleKey: "ai_usecase_image_detection",
            descKey: "ai_usecase_image_detection_desc",
            icon: ScanSearch,
          },
          {
            titleKey: "ai_usecase_data_prediction",
            descKey: "ai_usecase_data_prediction_desc",
            icon: BrainCircuit,
          },
          {
            titleKey: "ai_usecase_dashboard",
            descKey: "ai_usecase_dashboard_desc",
            icon: PanelsTopLeft,
          },
          {
            titleKey: "ai_usecase_automation",
            descKey: "ai_usecase_automation_desc",
            icon: Workflow,
          },
        ]}
      />

      <MethodologySection />
      <ProcessSection />

      <section className="bg-[#f5f5f5] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl border-t border-[#1F2A1F]/10 pt-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#004B08]/70">
              {t("ai_feasibility_title")}
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5F6756]">
              {t("ai_feasibility")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export type _ = Key;