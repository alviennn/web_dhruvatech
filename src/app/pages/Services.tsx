import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  ChevronDown,
  MessageCircle,
  PencilRuler,
  Workflow,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "../components/shared";
import { useT } from "../providers";
import type { Key } from "../i18n";

import websiteServiceImage from "../../imports/services/website-development.png";
import mobileServiceImage from "../../imports/services/mobile-app-development.png";
import aiServiceImage from "../../imports/services/ai-ml-solutions.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

type HighlightItem = {
  titleKey: Key;
  descKey: Key;
};

type ServiceItem = {
  image: string;
  imageAltKey: Key;
  titleKey: Key;
  eyebrowKey: Key;
  detailTitleKey: Key;
  detailDescKey: Key;
  bestKey: Key;
  to: string;
  highlights: HighlightItem[];
};

type SupportItem = {
  icon: LucideIcon;
  titleKey: Key;
  descKey: Key;
};

type FAQItem = {
  questionKey: Key;
  answerKey: Key;
};

export function Services() {
  <HelmetProvider>
    <Helmet>
      <title>
        Dhurva Tech | Software House Yogyakarta - Web, Mobile & AI Development
      </title>
      <meta
        name="description"
        content="Dhurva Tech membantu membangun produk digital anda mulai dari website company profile, aplikasi mobile, hingga solusi berbasis AI/ML. Mari Realisasikan Ide Besar Anda Bersama Kami!"
      />
    </Helmet>
  </HelmetProvider>;

  const { t } = useT();

  const services: ServiceItem[] = [
    {
      image: websiteServiceImage,
      imageAltKey: "svc_website_image_alt",
      titleKey: "nav_website",
      eyebrowKey: "svc_website_eyebrow",
      detailTitleKey: "svc_website_detail_title",
      detailDescKey: "svc_website_detail_desc",
      bestKey: "svc_website_best",
      to: "/services/website-development",
      highlights: [
        {
          titleKey: "svc_website_highlight_1_title",
          descKey: "svc_website_highlight_1_desc",
        },
        {
          titleKey: "svc_website_highlight_2_title",
          descKey: "svc_website_highlight_2_desc",
        },
      ],
    },
    {
      image: mobileServiceImage,
      imageAltKey: "svc_mobile_image_alt",
      titleKey: "nav_mobile",
      eyebrowKey: "svc_mobile_eyebrow",
      detailTitleKey: "svc_mobile_detail_title",
      detailDescKey: "svc_mobile_detail_desc",
      bestKey: "svc_mobile_best",
      to: "/services/mobile-app-development",
      highlights: [
        {
          titleKey: "svc_mobile_highlight_1_title",
          descKey: "svc_mobile_highlight_1_desc",
        },
        {
          titleKey: "svc_mobile_highlight_2_title",
          descKey: "svc_mobile_highlight_2_desc",
        },
      ],
    },
    {
      image: aiServiceImage,
      imageAltKey: "svc_ai_image_alt",
      titleKey: "nav_ai",
      eyebrowKey: "svc_ai_eyebrow",
      detailTitleKey: "svc_ai_detail_title",
      detailDescKey: "svc_ai_detail_desc",
      bestKey: "svc_ai_best",
      to: "/services/ai-ml-solutions",
      highlights: [
        {
          titleKey: "svc_ai_highlight_1_title",
          descKey: "svc_ai_highlight_1_desc",
        },
        {
          titleKey: "svc_ai_highlight_2_title",
          descKey: "svc_ai_highlight_2_desc",
        },
      ],
    },
  ];

  const supportItems: SupportItem[] = [
    {
      icon: PencilRuler,
      titleKey: "services_support_item_1_title",
      descKey: "services_support_item_1_desc",
    },
    {
      icon: Workflow,
      titleKey: "services_support_item_2_title",
      descKey: "services_support_item_2_desc",
    },
    {
      icon: ShieldCheck,
      titleKey: "services_support_item_3_title",
      descKey: "services_support_item_3_desc",
    },
  ];

  const faqItems: FAQItem[] = [
    { questionKey: "services_faq_1_q", answerKey: "services_faq_1_a" },
    { questionKey: "services_faq_2_q", answerKey: "services_faq_2_a" },
    { questionKey: "services_faq_3_q", answerKey: "services_faq_3_a" },
    { questionKey: "services_faq_4_q", answerKey: "services_faq_4_a" },
    { questionKey: "services_faq_5_q", answerKey: "services_faq_5_a" },
    { questionKey: "services_faq_6_q", answerKey: "services_faq_6_a" },
  ];

  return (
    <>
      <PageHero
        title={
          <>
            {t("services_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("services_hero_t2")}</span>
          </>
        }
        subtitle={t("services_hero_sub")}
      />

      <ServicesIntro />

      <section className="bg-[#f5f5f5] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-20 lg:space-y-24">
            {services.map((service, index) => (
              <ServiceFeature
                key={service.titleKey}
                service={service}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <SupportSection items={supportItems} />

      <ServicesFAQSection items={faqItems} />
    </>
  );
}

function ServicesIntro() {
  const { t } = useT();

  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 border-b border-[#1F2A1F]/10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#004B08]/70">
              {t("services_intro_eyebrow")}
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#1F2A1F] md:text-4xl">
              {t("services_intro_title")}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#5F6756] md:text-base">
              {t("services_intro_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceFeature({
  service,
  reverse = false,
}: {
  service: ServiceItem;
  reverse?: boolean;
}) {
  const { t } = useT();

  return (
    <article>
      <div
        className={`grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="lg:col-span-5">
          <div className="flex min-h-[220px] items-center justify-center sm:min-h-[280px] md:min-h-[340px] lg:min-h-[420px]">
            <img
              src={service.image}
              alt={t(service.imageAltKey)}
              loading="lazy"
              className="h-auto w-full max-w-[300px] object-contain sm:max-w-[400px] md:max-w-[500px] lg:max-w-[560px]"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
            {t(service.titleKey)}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5F6756] sm:text-base">
            {t(service.detailDescKey)}
          </p>

          <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
            {service.highlights.map((item) => (
              <div
                key={item.titleKey}
                className="grid grid-cols-[14px_1fr] gap-3 sm:grid-cols-[16px_1fr]"
              >
                <span className="mt-[7px] h-2.5 w-2.5 rounded-full bg-[#004B08] sm:mt-2" />

                <div>
                  <h4 className="text-base font-semibold leading-snug text-[#1F2A1F] sm:text-lg">
                    {t(item.titleKey)}
                  </h4>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5F6756]">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-[14px_1fr] gap-3 sm:grid-cols-[16px_1fr]">
              <span className="mt-[7px] h-2.5 w-2.5 rounded-full bg-[#C99A3D] sm:mt-2" />

              <div>
                <h4 className="text-base font-semibold leading-snug text-[#1F2A1F] sm:text-lg">
                  {t("svc_best_for")}
                </h4>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5F6756]">
                  {t(service.bestKey)}
                </p>
              </div>
            </div>
          </div>

          <Link
            to={service.to}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#004B08] px-6 py-3 text-sm font-semibold text-[#F3EFDF] transition-colors hover:bg-[#24452A] sm:w-auto sm:min-w-[190px] lg:mt-9"
          >
            {t("services_detail_cta")}
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SupportSection({ items }: { items: SupportItem[] }) {
  const { t } = useT();

  return (
    <section className="bg-[#f5f5f5] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-y border-[#1F2A1F]/10 py-12 sm:py-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#004B08]/70">
              {t("services_support_eyebrow")}
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl md:text-4xl">
              {t("services_support_title")}
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-[#5F6756] md:text-base">
              {t("services_support_sub")}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:col-span-7">
            {items.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="rounded-[22px] border border-[#1F2A1F]/10 bg-white/65 p-5 shadow-[0_14px_42px_rgba(31,42,31,0.04)] backdrop-blur sm:bg-transparent sm:p-0 sm:shadow-none sm:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004B08]/10 text-[#004B08] sm:h-auto sm:w-auto sm:bg-transparent">
                    <Icon
                      aria-hidden="true"
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#004B08] sm:size-[30px]"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold leading-snug text-[#1F2A1F] sm:text-lg">
                      {t(titleKey)}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#5F6756] sm:mt-3">
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

function ServicesFAQSection({ items }: { items: FAQItem[] }) {
  const { t } = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f5f5f5] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-[#1F2A1F] md:text-5xl">
            {t("services_faq_title")}
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-1.5 w-20 rounded-full bg-[#C99A3D]" />
            <span className="h-1.5 w-4 rounded-full bg-[#C99A3D]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C99A3D]" />
          </div>

          <p className="mt-6 text-lg leading-relaxed text-[#5F6756]">
            {t("services_faq_sub")}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl space-y-5">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.questionKey}
                className="overflow-hidden rounded-[14px] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-7"
                >
                  <span className="text-base font-semibold leading-snug text-[#1F2A1F] md:text-lg">
                    {t(item.questionKey)}
                  </span>

                  <ChevronDown
                    size={22}
                    strokeWidth={2}
                    className={`shrink-0 text-[#1F2A1F] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-7">
                      <p className="max-w-4xl border-t border-[#1F2A1F]/10 pt-5 text-sm leading-relaxed text-[#5F6756] md:text-[15px]">
                        {t(item.answerKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-[#1F2A1F]">
            {t("services_faq_cta_text")}
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C99A3D] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#b8892e]"
          >
            <MessageCircle size={17} strokeWidth={2.2} />
            {t("services_faq_cta_button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
