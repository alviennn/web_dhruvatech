import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Layers,
  Lightbulb,
  Cpu,
  Target,
  Compass,
  Workflow,
} from "lucide-react";
import { SectionHeader, ProcessStrip } from "../components/shared";
import { useT } from "../providers";

export function About() {
  const { t } = useT();

  const philosophy = [
    { icon: Layers, titleKey: "val_stable", descKey: "val_stable_desc" },
    { icon: Lightbulb, titleKey: "val_purposeful", descKey: "val_purposeful_desc" },
    { icon: Cpu, titleKey: "val_evolving", descKey: "val_evolving_desc" },
  ] as const;

  const focus = [
    { icon: Target, titleKey: "about_focus_1_title", descKey: "about_focus_1_desc" },
    { icon: Compass, titleKey: "about_focus_2_title", descKey: "about_focus_2_desc" },
    { icon: Workflow, titleKey: "about_focus_3_title", descKey: "about_focus_3_desc" },
  ] as const;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f5f5f5] pt-32 pb-24 lg:pt-44 lg:pb-32 text-[#1F2A1F]">
        <AboutTexture />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-48 -left-48 h-[620px] w-[620px] rounded-full bg-[#004B08]/[0.07] blur-3xl" />
          <div className="absolute -bottom-56 right-[-180px] h-[720px] w-[720px] rounded-full bg-[#8E9970]/[0.12] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-7">
            

            <h1 className="max-w-4xl text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[1.02] tracking-tight text-[#1F2A1F]">
              {t("about_hero_t1")}{" "}
              <span className="relative inline-block text-[#004B08]">
                {t("about_hero_t2")}
                <span className="absolute -bottom-2 left-0 h-[8px] w-full rounded-full bg-[#C99A3D]/20" />
              </span>{" "}
              {t("about_hero_t3")}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#5F6756]">
              {t("about_hero_sub")}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="relative rounded-[32px] border border-[#1F2A1F]/10 bg-white/65 p-8 shadow-[0_24px_80px_rgba(31,42,31,0.08)] backdrop-blur">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C99A3D]/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#004B08]/[0.06] blur-3xl" />

              <div className="relative">
        
                <p className="mt-5 whitespace-pre-line text-[clamp(1.35rem,2.4vw,2rem)] leading-snug text-[#1F2A1F]">
                  {t("about_quote")}
                </p>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/60 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>

        <AboutMotionStyle />
      </section>

      {/* INTRO */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-28 border-y border-[#1F2A1F]/10">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.05] blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader title={t("about_title")} />

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#5F6756]">
              <p>{t("about_p1")}</p>
              <p>{t("about_p2")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MINDSET */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-28">
        <AboutTexture />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader title={t("mindset_title")} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {philosophy.map(({ icon: Icon, titleKey, descKey }, index) => (
              <Reveal key={titleKey} delay={index * 0.08}>
                <div className="group h-full rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_24px_80px_rgba(31,42,31,0.10)]">
                  <IconBox icon={Icon} />

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

        <AboutMotionStyle />
      </section>

      {/* FOCUS */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-28 border-y border-[#1F2A1F]/10">
        <div className="absolute -top-48 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader title={t("about_focus_title")} />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {focus.map(({ icon: Icon, titleKey, descKey }, index) => (
              <Reveal key={titleKey} delay={index * 0.08}>
                <div className="group h-full rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_24px_80px_rgba(31,42,31,0.10)]">
                  <IconBox icon={Icon} />

                  <h3 className="text-xl text-[#1F2A1F] mb-3">
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
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-28">
        <AboutTexture />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader
              title={t("about_work_title")}
              subtitle={t("about_work_sub")}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <ProcessStrip />
          </Reveal>
        </div>

        <AboutMotionStyle />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-24 lg:py-28 border-t border-[#1F2A1F]/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight text-[#1F2A1F]">
              {t("about_cta")}
            </h2>

            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#004B08] px-7 py-3.5 text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A]"
              >
                {t("cta_start")}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------- LOCAL COMPONENTS ---------------- */

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

function IconBox({
  icon: Icon,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}) {
  return (
    <div className="mb-7 flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
      <Icon size={22} strokeWidth={1.8} />
    </div>
  );
}

function AboutTexture() {
  return (
    <div className="about-texture absolute inset-0 pointer-events-none opacity-[0.18]" />
  );
}

function AboutMotionStyle() {
  return (
    <style>{`
      @keyframes aboutGridMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 72px 72px;
        }
      }

      .about-texture {
        background-image:
          linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: aboutGridMove 24s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .about-texture {
          animation: none;
        }
      }
    `}</style>
  );
}