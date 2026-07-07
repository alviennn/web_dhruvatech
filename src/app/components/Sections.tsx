import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listPortfolioItems, type PortfolioItem } from "../data/api/api";
import {
  ArrowUpRight,
  Compass,
  ClipboardList,
  PenTool,
  Code2,
  FlaskConical,
  Rocket,
  Globe,
  Smartphone,
  Cpu,
  Lightbulb,
  Layers,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "./shared";
import { useT } from "../providers";
import logo from "../../imports/logofoot.png";
import ctaImage from "../../imports/cta.png";
import ctaLogoMark from "../../imports/dhruva-mark.png";
import why from "../../imports/why.png";

/* ---------------- ANIMATION WRAPPER ---------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function HomeTexture() {
  return (
    <div className="home-texture absolute inset-0 pointer-events-none opacity-[0.16] sm:opacity-[0.18]" />
  );
}

/* ---------------- FEATURED WORK ---------------- */

export function FeaturedWorkPreview() {
  const { t, lang } = useT();

  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchFeaturedWorks() {
      try {
        setLoading(true);
        setError("");

        const data = await listPortfolioItems();

        if (!isMounted) return;

        setProjects(data.slice(0, 3));
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error ? err.message : t("portfolio_error_load"),
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFeaturedWorks();

    return () => {
      isMounted = false;
    };
  }, [t]);

  const getPortfolioTitle = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.title || item.title;
    }

    return item.title;
  };

  const getPortfolioType = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.type || item.type;
    }

    return item.type;
  };

  const getPortfolioDescription = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.en_description || item.description;
    }

    return item.description;
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
      <HomeTexture />

      <div className="absolute -top-44 right-[-220px] h-[420px] w-[420px] rounded-full bg-[#004B08]/[0.055] blur-3xl sm:-top-56 sm:right-[-180px] sm:h-[560px] sm:w-[560px]" />
      <div className="absolute -bottom-44 left-[-220px] h-[420px] w-[420px] rounded-full bg-[#C99A3D]/[0.065] blur-3xl sm:-bottom-56 sm:left-[-180px] sm:h-[560px] sm:w-[560px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <SectionHeader
              title={t("featured_title")}
              subtitle={t("featured_sub")}
            />

            <Link
              to="/portfolio"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#004B08]/35 bg-white/55 px-5 py-3 text-sm text-[#004B08] backdrop-blur transition-colors hover:bg-[#004B08] hover:text-[#F3EFDF]"
            >
              {t("cta_view_all")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <Reveal>
            <div className="rounded-[24px] border border-[#1F2A1F]/10 bg-white/60 px-5 py-12 text-center text-sm text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur sm:rounded-[28px] sm:px-6 sm:py-16">
              {t("featured_loading")}
            </div>
          </Reveal>
        ) : error ? (
          <Reveal>
            <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-12 text-center text-sm text-red-700 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur sm:rounded-[28px] sm:px-6 sm:py-16">
              {error}
            </div>
          </Reveal>
        ) : projects.length > 0 ? (
          <div className="-mx-4 overflow-hidden sm:-mx-6 lg:mx-0 lg:overflow-visible">
            <div className="home-scrollbar overflow-x-auto px-4 pb-4 sm:px-6 lg:overflow-visible lg:px-0 lg:pb-0">
              <div className="flex snap-x snap-mandatory scroll-smooth gap-5 overflow-x-auto pb-5 home-scrollbar md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
                {projects.map((p, i) => {
                  const title = getPortfolioTitle(p);
                  const type = getPortfolioType(p);
                  const description = getPortfolioDescription(p);

                  return (
                                      <Link
                    to={`/portfolio/${p.id}`}
                    key={p.id}
                    className="block h-full"
                  >
                    
                    <Reveal
                      key={p.id}
                      delay={i * 0.08}
                      className="min-w-full snap-start md:min-w-0"
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_24px_80px_rgba(31,42,31,0.10)] sm:rounded-[28px] lg:rounded-[30px]">
                        <div className="relative aspect-[16/11] overflow-hidden bg-[#1F2A1F] sm:aspect-[4/3]">
                          <img
                            src={p.coverImage}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1F]/35 via-transparent to-transparent opacity-70" />
                        </div>

                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#004B08] sm:text-xs">
                            {type}
                          </div>

                          <h3 className="mb-3 line-clamp-2 text-lg leading-snug text-[#1F2A1F] sm:text-xl">
                            {title}
                          </h3>

                          <p className="line-clamp-3 text-sm leading-relaxed text-[#5F6756]">
                            {description}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Reveal>
            <div className="rounded-[24px] border border-[#1F2A1F]/10 bg-white/60 px-5 py-12 text-center text-sm text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur sm:rounded-[28px] sm:px-6 sm:py-16">
              {t("portfolio_empty")}
            </div>
          </Reveal>
        )}
      </div>

      <HomeMotionStyle />
    </section>
  );
}


/* ---------------- SERVICES PREVIEW ---------------- */

export function ServicesPreview() {
  const { t } = useT();

  const items = [
    {
      icon: Globe,
      titleKey: "nav_website",
      descKey: "svc_website_desc",
      to: "/services/website-development",
    },
    {
      icon: Smartphone,
      titleKey: "nav_mobile",
      descKey: "svc_mobile_desc",
      to: "/services/mobile-app-development",
    },
    {
      icon: Cpu,
      titleKey: "nav_ai",
      descKey: "svc_ai_desc",
      to: "/services/ai-ml-solutions",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F2A1F]/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#1F2A1F]/10" />
      <HomeTexture />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionHeader
            title={t("services_preview_title")}
            subtitle={t("services_preview_sub")}
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {items.map(({ icon: Icon, titleKey, descKey, to }, i) => (
            <Reveal key={titleKey} delay={i * 0.08}>
              <Link
                to={to}
                className="group relative block h-full min-h-[240px] overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white/75 p-6 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:bg-white hover:shadow-[0_24px_75px_rgba(31,42,31,0.09)] sm:min-h-[270px] sm:rounded-[28px] sm:p-7 lg:min-h-[300px] lg:rounded-[30px] lg:p-8"
              >
                <Icon
                  aria-hidden="true"
                  size={64}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute right-5 top-5 text-[#004B08]/[0.32] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.15] sm:right-7 sm:top-7"
                />

                <div className="relative z-10 flex h-full flex-col justify-end">
                  <div className="max-w-[86%] sm:max-w-[82%]">
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-[#1F2A1F] sm:text-2xl">
                      {t(titleKey as any)}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#5F6756]">
                      {t(descKey as any)}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#004B08] sm:mt-7">
                      {t("cta_learn_more")}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <HomeMotionStyle />
    </section>
  );
}

/* ---------------- PROCESS PREVIEW ---------------- */

export function ProcessPreview() {
  const { t } = useT();

  const steps = [
    {
      icon: Compass,
      key: "step_discover",
      descKey: "step_discover_desc",
    },
    {
      icon: ClipboardList,
      key: "step_define",
      descKey: "step_define_desc",
    },
    {
      icon: PenTool,
      key: "step_design",
      descKey: "step_design_desc",
    },
    {
      icon: Code2,
      key: "step_develop",
      descKey: "step_develop_desc",
    },
    {
      icon: FlaskConical,
      key: "step_test",
      descKey: "step_test_desc",
    },
    {
      icon: Rocket,
      key: "step_launch",
      descKey: "step_launch_desc",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 text-[#1F2A1F] sm:py-20 lg:py-28">
      <div className="absolute -top-44 right-[-220px] h-[420px] w-[420px] rounded-full bg-[#004B08]/[0.055] blur-3xl sm:-top-48 sm:right-[-180px] sm:h-[560px] sm:w-[560px]" />
      <div className="absolute -bottom-44 left-[-220px] h-[420px] w-[420px] rounded-full bg-[#C99A3D]/[0.065] blur-3xl sm:-bottom-48 sm:left-[-180px] sm:h-[560px] sm:w-[560px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:gap-8">
            <SectionHeader
              title={t("process_title")}
              subtitle={t("process_sub")}
            />

            <Link
              to="/about"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#004B08]/35 bg-white/55 px-5 py-3 text-sm text-[#004B08] backdrop-blur transition-colors hover:bg-[#004B08] hover:text-[#F3EFDF]"
            >
              {t("cta_more_about")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map(({ icon: Icon, key, descKey }, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <div className="group relative min-h-[160px] overflow-hidden rounded-[20px] border border-[#1F2A1F]/10 bg-white/75 px-5 py-5 shadow-[0_12px_38px_rgba(31,42,31,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A3D]/55 hover:bg-white hover:shadow-[0_20px_60px_rgba(31,42,31,0.075)] sm:min-h-[175px] sm:rounded-[22px] sm:px-6">
                <Icon
                  aria-hidden="true"
                  size={58}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute right-5 top-5 text-[#004B08]/[0.30] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.20] sm:right-6 sm:top-6 sm:size-[76px]"
                />

                <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-[#004B08]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#C99A3D]/[0.07] sm:h-28 sm:w-28" />

                <div className="relative z-10 flex h-full flex-col justify-end">
                  <div className="max-w-[86%] sm:max-w-[78%]">
                    <h3 className="text-lg font-medium tracking-tight text-[#1F2A1F] sm:text-xl">
                      {t(key)}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#5F6756]">
                      {t(descKey)}
                    </p>

                    <div className="mt-5 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/50 to-transparent" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ---------------- */

export function WhyChoosePreview() {
  const { t } = useT();

  const items = [
    {
      icon: Layers,
      titleKey: "home_why_2_title",
      descKey: "home_why_2_desc",
    },
    {
      icon: Smartphone,
      titleKey: "home_why_3_title",
      descKey: "home_why_3_desc",
    },
    {
      icon: ClipboardList,
      titleKey: "home_why_4_title",
      descKey: "home_why_4_desc",
    },
    {
      icon: MessageCircle,
      titleKey: "home_why_5_title",
      descKey: "home_why_5_desc",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
      <HomeTexture />

      <div className="absolute -top-44 right-[-220px] h-[420px] w-[420px] rounded-full bg-[#004B08]/[0.055] blur-3xl sm:-top-56 sm:right-[-180px] sm:h-[560px] sm:w-[560px]" />
      <div className="absolute -bottom-44 left-[-220px] h-[420px] w-[420px] rounded-full bg-[#C99A3D]/[0.065] blur-3xl sm:-bottom-56 sm:left-[-180px] sm:h-[560px] sm:w-[560px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader title={t("home_why_title")} />

            <p className="mt-5 text-sm leading-relaxed text-[#5F6756] sm:text-base">
              {t("home_why_desc")}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Image area - no border, no card */}
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-[#004B08]/10 blur-3xl" />
              <div className="absolute -bottom-8 right-4 h-52 w-52 rounded-full bg-[#C99A3D]/15 blur-3xl" />

              <img
                src={why}
                alt={t("home_why_image_alt")}
                className="relative z-10 w-full max-w-[620px] rounded-[32px] object-cover lg:max-w-none"
              />
            </div>
          </Reveal>

          {/* Text list area - stacked vertically */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {items.map(({ icon: Icon, titleKey, descKey }, i) => (
                <Reveal key={titleKey} delay={i * 0.07}>
                  <div className="group flex gap-5">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#004B08]/10 text-[#004B08] transition-colors duration-300 group-hover:bg-[#004B08] group-hover:text-[#F3EFDF]">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div className="border-b border-[#1F2A1F]/10 pb-6 last:border-b-0">
                      <h3 className="text-lg font-medium tracking-tight text-[#1F2A1F] sm:text-xl">
                        {t(titleKey)}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5F6756] sm:text-base">
                        {t(descKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HomeMotionStyle />
    </section>
  );
}

/* ---------------- ABOUT PREVIEW ---------------- */

export function HomeAboutPreview() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F2A1F]/10" />
      <HomeTexture />

      <img
        src={ctaLogoMark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-40px] top-1/2 h-56 w-56 -translate-y-1/2 object-contain opacity-[0.045] sm:h-72 sm:w-72 lg:right-[5%] lg:h-96 lg:w-96"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeader
                title={t("home_about_title")}
                subtitle={t("home_about_sub")}
              />
            </div>

            <div className="lg:col-span-7">
              <p className="max-w-3xl text-sm leading-relaxed text-[#5F6756] sm:text-base">
                {t("home_about_desc")}
              </p>

              <Link
                to="/about"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#004B08]/35 bg-white/60 px-5 py-3 text-sm text-[#004B08] backdrop-blur transition-colors hover:bg-[#004B08] hover:text-[#F3EFDF]"
              >
                {t("cta_more_about_dt")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <HomeMotionStyle />
    </section>
  );
}

/* ---------------- HOME FAQ ---------------- */

export function HomeFAQ() {
  const { t } = useT();

  const faqs = [
    {
      q: "home_faq_1_q",
      a: "home_faq_1_a",
    },
    {
      q: "home_faq_2_q",
      a: "home_faq_2_a",
    },
    {
      q: "home_faq_3_q",
      a: "home_faq_3_a",
    },
    {
      q: "home_faq_4_q",
      a: "home_faq_4_a",
    },
    {
      q: "home_faq_5_q",
      a: "home_faq_5_a",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
      <HomeTexture />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <h2 className="text-4xl font-semibold tracking-tight text-[#1F2A1F] sm:text-5xl">
              FAQ
            </h2>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-1 w-20 rounded-full bg-[#C99A3D]" />
              <span className="h-1 w-5 rounded-full bg-[#C99A3D]" />
              <span className="h-1 w-1.5 rounded-full bg-[#C99A3D]" />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#5F6756] sm:text-base">
              {t("home_faq_sub")}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-5xl space-y-4">
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.05}>
              <details className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(31,42,31,0.035)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-base font-semibold text-[#1F2A1F] sm:px-7 sm:py-6 sm:text-lg">
                  <span>{t(item.q)}</span>

                  <ChevronDown
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-[#1F2A1F] transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <div className="px-5 pb-5 pr-12 text-sm leading-relaxed text-[#5F6756] sm:px-7 sm:pb-6 sm:pr-16 sm:text-base">
                  {t(item.a)}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <HomeMotionStyle />
    </section>
  );
}

/* ---------------- INTRO ---------------- */

export function HomeIntro() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden border-y border-[#1F2A1F]/10 bg-[#f5f5f5] py-14 sm:py-16 lg:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.05] blur-3xl sm:h-[420px] sm:w-[420px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-[clamp(1.25rem,5vw,2rem)] leading-snug text-[#1F2A1F]">
            {t("home_intro")}{" "}
            <span className="text-[#004B08]">{t("home_intro_accent")}</span>{" "}
            {t("home_intro_tail")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

export function DigitalProductCTA({
  title,
  subtitle,
  buttonLabel,
  note,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  note?: string;
}) {
  return (
    <section className="relative z-20 overflow-visible bg-[#f5f5f5] pb-0 pt-8 sm:pt-10 lg:pt-14">
      <div className="absolute inset-x-0 bottom-[-2px] h-[42%] bg-[#24452A]" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#46585B] px-5 py-8 shadow-[0_24px_75px_rgba(31,42,31,0.16)] sm:rounded-[34px] sm:px-8 sm:py-10 md:px-10 lg:min-h-[360px] lg:rounded-[42px] lg:px-16 lg:py-0">
            <img
              src={ctaLogoMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-150px] top-1/2 h-[420px] w-auto -translate-y-1/2 opacity-[0.045] mix-blend-screen sm:right-[-140px] sm:h-[520px] lg:right-[-120px] lg:h-[640px]"
            />

            <div className="pointer-events-none absolute right-[10%] top-[16%] h-40 w-40 rounded-full bg-white/[0.04] blur-2xl sm:h-48 sm:w-48" />
            <div className="pointer-events-none absolute bottom-[-140px] right-[-90px] h-[300px] w-[300px] rounded-full bg-[#C99A3D]/12 blur-3xl sm:h-[360px] sm:w-[360px]" />
            <div className="pointer-events-none absolute bottom-[-130px] left-[18%] h-[240px] w-[240px] rounded-full bg-[#8E9970]/12 blur-3xl sm:h-[280px] sm:w-[280px]" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
              <div className="relative hidden min-h-[360px] lg:col-span-6 lg:block">
                <img
                  src={ctaImage}
                  alt="Dhurva Tech consultation"
                  className="absolute bottom-[-58px] left-[39%] h-[420px] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                />
              </div>

              <div className="lg:col-span-6 lg:py-10">
                <h2 className="max-w-lg text-[clamp(1.75rem,7vw,3rem)] font-semibold leading-[1.08] tracking-tight text-[#F3EFDF]">
                  {title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#F3EFDF]/82 sm:mt-5 sm:text-base lg:text-[1.05rem]">
                  {subtitle}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F3EFDF] px-6 py-3 text-sm font-semibold text-[#004B08] shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-colors hover:bg-white sm:w-auto"
                  >
                    <MessageCircle size={18} strokeWidth={2} />
                    {buttonLabel}
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

export function Footer() {
  const { t } = useT();

  return (
    <footer className="relative z-10 overflow-visible bg-[#24452A] text-[#F3EFDF]/80">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-40px] z-0 h-[220px] overflow-visible sm:h-[260px]"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-80 170C160 60 320 60 520 140C720 220 900 220 1120 120C1280 48 1400 56 1520 110"
            stroke="#C99A3D"
            strokeWidth="56"
            strokeLinecap="round"
            strokeOpacity="0.10"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Dhruva Tech"
              className="h-16 w-auto sm:h-20 lg:h-24"
            />
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[#F3EFDF]/75 sm:text-base">
            {t("footer_desc")}
          </p>
        </div>

        <div className="lg:col-span-2">
          <FooterTitle>{t("footer_menu")}</FooterTitle>
          <ul className="space-y-3 text-sm sm:text-base">
            <li>
              <Link
                to="/services"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_services")}
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_portfolio")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_about")}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>{t("footer_services")}</FooterTitle>
          <ul className="space-y-3 text-sm sm:text-base">
            <li>
              <Link
                to="/services/website-development"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_website")}
              </Link>
            </li>
            <li>
              <Link
                to="/services/mobile-app-development"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_mobile")}
              </Link>
            </li>
            <li>
              <Link
                to="/services/ai-ml-solutions"
                className="transition-colors hover:text-[#E0C16A]"
              >
                {t("nav_ai")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterTitle>{t("footer_contact")}</FooterTitle>
          <ul className="space-y-3 text-sm sm:text-base">
            <li>
              <a
                href="https://wa.me/6289514693178?text=Hello%20Dhurva%20Tech!"
                className="transition-colors hover:text-[#E0C16A]"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:dhurvatech@gmail.com"
                className="transition-colors hover:text-[#E0C16A]"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/dhurvatech_/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#E0C16A]"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#C99A3D]/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-5 text-xs text-[#F3EFDF]/60 sm:flex-row sm:px-6 sm:py-6 sm:text-sm lg:px-10">
          <span>{t("footer_rights")}</span>
          <span>{t("footer_tag")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 text-sm uppercase tracking-widest text-[#E0C16A]">
      {children}
    </h4>
  );
}

/* ---------------- LOCAL STYLE ---------------- */

function HomeMotionStyle() {
  return (
    <style>{`
      @keyframes subtleGridMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 72px 72px;
        }
      }

      .home-texture {
        background-image:
          linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: subtleGridMove 24s linear infinite;
      }

      .home-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
      }

      .home-scrollbar::-webkit-scrollbar {
        display: none;
      }

      @media (max-width: 640px) {
        .home-texture {
          background-size: 52px 52px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .home-texture {
          animation: none;
        }
      }
    `}</style>
  );
}
