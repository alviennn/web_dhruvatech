import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  listPortfolioItems,
  type PortfolioItem,
} from "../data/api/api";
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
} from "lucide-react";
import { SectionHeader } from "./shared";
import { useT } from "../providers";
import logo from "../../imports/8.png";
import ctaImage from "../../imports/cta.png";
import ctaLogoMark from "../../imports/dhruva-mark.png";

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
    <div className="home-texture absolute inset-0 pointer-events-none opacity-[0.18]" />
  );
}

/* ---------------- FEATURED WORK (home preview, 3 items) ---------------- */

export function FeaturedWorkPreview() {
  const { t } = useT();

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
          err instanceof Error
            ? err.message
            : "Gagal mengambil data portfolio."
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
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-32">
      <HomeTexture />

      <div className="absolute -top-56 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="absolute -bottom-56 left-[-180px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.07] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <SectionHeader
              title={t("featured_title")}
              subtitle={t("featured_sub")}
            />

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#004B08]/35 bg-white/55 text-[#004B08] backdrop-blur hover:bg-[#004B08] hover:text-[#F3EFDF] transition-colors self-start"
            >
              {t("cta_view_all")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <Reveal>
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/60 px-6 py-16 text-center text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur">
              Memuat featured work...
            </div>
          </Reveal>
        ) : error ? (
          <Reveal>
            <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-16 text-center text-red-700 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur">
              {error}
            </div>
          </Reveal>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_20px_70px_rgba(31,42,31,0.06)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_28px_90px_rgba(31,42,31,0.11)]">
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#1F2A1F]">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1F]/35 via-transparent to-transparent opacity-70" />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]">
                      {p.type}
                    </div>

                    <h3 className="mb-3 line-clamp-2 text-xl leading-snug text-[#1F2A1F]">
                      {p.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-[#5F6756]">
                      {p.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/60 px-6 py-16 text-center text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur">
              {t("portfolio_empty")}
            </div>
          </Reveal>
        )}
      </div>

      <HomeMotionStyle />
    </section>
  );
}

export function ProjectVisual({
  kind,
}: {
  kind: "rental" | "learn" | "dashboard" | "ai";
}) {
  if (kind === "rental") {
    return (
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[#F3EFDF]/80 text-xs">
          <span>TRANS KUDAMAS 88</span>
          <span className="text-[#E0C16A]">Book Now →</span>
        </div>

        <svg viewBox="0 0 200 80" className="w-full">
          <path
            d="M20 60 Q 50 30, 100 50 T 180 40"
            stroke="#C99A3D"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <circle cx="100" cy="50" r="3" fill="#E0C16A" />
        </svg>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-lg bg-[#f5f5f5]/10 border border-[#C99A3D]/15"
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "learn") {
    return (
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="text-[#E0C16A] text-xs mb-3">
          CHAPTER 02 · INTERACTIVE
        </div>

        <div className="flex-1 rounded-2xl bg-[#004B08]/60 border border-[#C99A3D]/20 p-4 flex flex-col justify-between">
          <div>
            <div className="h-2 w-2/3 rounded bg-[#f5f5f5]/30 mb-2" />
            <div className="h-2 w-1/2 rounded bg-[#f5f5f5]/15" />
          </div>

          <div className="space-y-1.5">
            {["A. Continuous evolution", "B. Stable foundation", "C. Both above"].map(
              (text) => (
                <div
                  key={text}
                  className="text-[10px] px-2 py-1.5 rounded bg-[#8E9970]/30 text-[#F3EFDF]/80 border border-[#C99A3D]/15"
                >
                  {text}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "ai") {
    return (
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="text-[#E0C16A] text-xs mb-3">
          AI · OBJECT DETECTION
        </div>

        <div className="flex-1 rounded-2xl bg-[#004B08]/60 border border-[#C99A3D]/20 p-4 relative">
          <div className="absolute inset-4 border border-dashed border-[#E0C16A]/60 rounded-lg" />
          <div className="absolute top-8 left-8 px-2 py-0.5 text-[9px] bg-[#C99A3D] text-[#24452A] rounded">
            person · 0.94
          </div>
          <div className="absolute bottom-10 right-10 px-2 py-0.5 text-[9px] bg-[#C99A3D] text-[#24452A] rounded">
            vehicle · 0.88
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="30"
              cy="40"
              r="14"
              fill="none"
              stroke="#E0C16A"
              strokeWidth="0.5"
            />
            <circle
              cx="70"
              cy="65"
              r="18"
              fill="none"
              stroke="#E0C16A"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 p-6 grid grid-cols-3 gap-2">
      <div className="col-span-1 rounded-xl bg-[#004B08]/60 border border-[#C99A3D]/15 p-3 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-2 rounded bg-[#f5f5f5]/15" />
        ))}
      </div>

      <div className="col-span-2 rounded-xl bg-[#004B08]/60 border border-[#C99A3D]/15 p-3 flex flex-col">
        <div className="flex items-end gap-1.5 h-20">
          {[30, 50, 40, 70, 55, 80, 65].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#8E9970] to-[#E0C16A]"
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="h-6 rounded bg-[#f5f5f5]/10" />
          <div className="h-6 rounded bg-[#C99A3D]/40" />
          <div className="h-6 rounded bg-[#f5f5f5]/10" />
        </div>
      </div>
    </div>
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
    <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-[#1F2A1F]/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#1F2A1F]/10" />
      <HomeTexture />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeader
            title={t("services_preview_title")}
            subtitle={t("services_preview_sub")}
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {items.map(({ icon: Icon, titleKey, descKey, to }, i) => (
            <Reveal key={titleKey} delay={i * 0.08}>
            <Link
              to={to}
              className="group relative block h-full min-h-[300px] overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/75 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:bg-white hover:shadow-[0_26px_80px_rgba(31,42,31,0.09)]"
            >
              {/* Watermark icon */}
              <Icon
                aria-hidden="true"
                size={76}
                strokeWidth={1.5}
                className="pointer-events-none absolute right-7 top-7 text-[#004B08]/[0.40] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.15]"
              />

              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="max-w-[82%]">
                  <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1F2A1F]">
                    {t(titleKey as any)}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#5F6756]">
                    {t(descKey as any)}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#004B08]">
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
    <section className="relative overflow-hidden bg-[#f5f5f5] text-[#1F2A1F] py-24 lg:py-32">
      <div className="absolute -top-48 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="absolute -bottom-48 left-[-180px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.07] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <SectionHeader title={t("process_title")} subtitle={t("process_sub")} />

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#004B08]/35 bg-white/55 text-[#004B08] backdrop-blur hover:bg-[#004B08] hover:text-[#F3EFDF] transition-colors self-start"
            >
              {t("cta_more_about")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, key, descKey }, i) => (
          <Reveal key={key} delay={i * 0.06}>
            <div className="group relative min-h-[175px] overflow-hidden rounded-[22px] border border-[#1F2A1F]/10 bg-white/75 px-6 py-5 shadow-[0_12px_38px_rgba(31,42,31,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A3D]/55 hover:bg-white hover:shadow-[0_20px_60px_rgba(31,42,31,0.075)]">
              {/* Watermark icon */}
              <Icon
                aria-hidden="true"
                size={76}
                strokeWidth={1.5}
                className="pointer-events-none absolute right-6 top-6 text-[#004B08]/[0.40] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.20]"
              />

              {/* Soft glow */}
              <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full bg-[#004B08]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#C99A3D]/[0.07]" />

              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="max-w-[78%]">
                  <h3 className="text-xl font-medium tracking-tight text-[#1F2A1F]">
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

/* ---------------- MINDSET PREVIEW ---------------- */

export function MindsetPreview() {
  const { t } = useT();

  const values = [
    { icon: Layers, titleKey: "val_stable", descKey: "val_stable_desc" },
    { icon: Lightbulb, titleKey: "val_purposeful", descKey: "val_purposeful_desc" },
    { icon: Cpu, titleKey: "val_evolving", descKey: "val_evolving_desc" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-32">
      <HomeTexture />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHeader title={t("mindset_title")} subtitle={t("mindset_sub")} />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {values.map(({ icon: Icon, titleKey, descKey }, i) => (
            <Reveal key={titleKey} delay={i * 0.08}>
              <div className="group h-full rounded-[28px] bg-white/70 border border-[#1F2A1F]/10 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_24px_80px_rgba(31,42,31,0.10)]">
                <div className="mb-7 flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="text-2xl text-[#1F2A1F] mb-3">
                  {t(titleKey)}
                </h3>

                <p className="text-[#5F6756] leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <HomeMotionStyle />
    </section>
  );
}

/* ---------------- INTRO (home short about) ---------------- */

export function HomeIntro() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 border-y border-[#1F2A1F]/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.05] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <p className="text-[clamp(1.35rem,2.5vw,2rem)] leading-snug text-[#1F2A1F]">
            {t("home_intro")}{" "}
            <span className="text-[#004B08]">
              {t("home_intro_accent")}
            </span>{" "}
            {t("home_intro_tail")}
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-[#004B08] hover:text-[#24452A]"
          >
            {t("cta_more_about_dt")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

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
    <section className="relative z-20 overflow-visible bg-[#f5f5f5] pt-10 pb-0 lg:pt-14">
      <div className="absolute inset-x-0 bottom-[-2px] h-[42%] bg-[#24452A]" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[42px] bg-[#46585B] px-6 pt-9 pb-9 shadow-[0_28px_90px_rgba(31,42,31,0.16)] md:px-10 lg:min-h-[360px] lg:px-16 lg:py-0">
            {/* Logo watermark */}
            <img
              src={ctaLogoMark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-120px] top-1/2 h-[640px] w-auto -translate-y-1/2 opacity-[0.045] mix-blend-screen"
            />

            <div className="pointer-events-none absolute right-[10%] top-[16%] h-48 w-48 rounded-full bg-white/[0.04] blur-2xl" />
            <div className="pointer-events-none absolute bottom-[-140px] right-[-90px] h-[360px] w-[360px] rounded-full bg-[#C99A3D]/12 blur-3xl" />
            <div className="pointer-events-none absolute left-[18%] bottom-[-130px] h-[280px] w-[280px] rounded-full bg-[#8E9970]/12 blur-3xl" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
              {/* Image side */}
              <div className="relative hidden min-h-[360px] lg:col-span-6 lg:block">
                <img
                  src={ctaImage}
                  alt="Dhruva Tech consultation"
                  className="absolute left-[39%] bottom-[-58px] h-[420px] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                />
              </div>

              {/* Text side */}
              <div className="lg:col-span-6 lg:py-10">
                <h2 className="max-w-lg text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-[#F3EFDF]">
                  {title}
                </h2>

                <p className="mt-5 max-w-xl text-base lg:text-[1.05rem] leading-relaxed text-[#F3EFDF]/82">
                  {subtitle}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#F3EFDF] px-6 py-3 text-sm font-semibold text-[#004B08] shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-colors hover:bg-white"
                  >
                    <MessageCircle size={18} strokeWidth={2} />
                    {buttonLabel}
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>

                {note && (
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#F3EFDF]/65">
                    {note}
                  </p>
                )}
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
      {/* Simple wave motif */}
    <div
      className="pointer-events-none absolute inset-x-0 top-[-40px] h-[260px] overflow-visible z-0"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Dhruva Tech"
              className="h-20 md:h-24 lg:h-28 w-auto"
            />
          </div>

          <p className="leading-relaxed max-w-sm text-[#F3EFDF]/75">
            {t("footer_desc")}
          </p>
        </div>

        <div className="md:col-span-2">
          <FooterTitle>{t("footer_menu")}</FooterTitle>
          <ul className="space-y-3">
            <li>
              <Link
                to="/services"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_services")}
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_portfolio")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_about")}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <FooterTitle>{t("footer_services")}</FooterTitle>
          <ul className="space-y-3">
            <li>
              <Link
                to="/services/website-development"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_website")}
              </Link>
            </li>
            <li>
              <Link
                to="/services/mobile-app-development"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_mobile")}
              </Link>
            </li>
            <li>
              <Link
                to="/services/ai-ml-solutions"
                className="hover:text-[#E0C16A] transition-colors"
              >
                {t("nav_ai")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <FooterTitle>{t("footer_contact")}</FooterTitle>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-[#E0C16A] transition-colors">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E0C16A] transition-colors">
                Email
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E0C16A] transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E0C16A] transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#C99A3D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 justify-between text-sm text-[#F3EFDF]/60">
          <span>{t("footer_rights")}</span>
          <span>{t("footer_tag")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[#E0C16A] text-sm tracking-widest uppercase mb-5">
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

      @media (prefers-reduced-motion: reduce) {
        .home-texture {
          animation: none;
        }
      }
    `}</style>
  );
}
