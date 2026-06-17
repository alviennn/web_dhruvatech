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
import { PageHero ,SectionHeader, ProcessStrip } from "../components/shared";
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
      <PageHero
  title={
    <>
      {t("about_hero_t1")}{" "}
      <span className="text-[#004B08]">
        {t("about_hero_t2")}
      </span>{" "}
      {t("about_hero_t3")}
    </>
  }
  subtitle={t("about_hero_sub")}
  accent={
    <div className="relative overflow-hidden rounded-[32px] border border-[#1F2A1F]/10 bg-white/65 p-8 shadow-[0_24px_80px_rgba(31,42,31,0.08)] backdrop-blur">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C99A3D]/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative">
        <p className="whitespace-pre-line text-[clamp(1.35rem,2.4vw,2rem)] leading-snug text-[#1F2A1F]">
          {t("about_quote")}
        </p>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/60 to-transparent" />
      </div>
    </div>
  }
/>

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

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {philosophy.map(({ icon: Icon, titleKey, descKey }, index) => (
              <Reveal key={titleKey} delay={index * 0.08}>
                <div className="group relative flex min-h-[280px] h-full overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/75 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:bg-white hover:shadow-[0_26px_80px_rgba(31,42,31,0.09)]">
                  {/* Soft glow */}
                  <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-[#004B08]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#C99A3D]/[0.08]" />

                  {/* Watermark icon */}
                  <Icon
                    aria-hidden="true"
                    size={92}
                    strokeWidth={1.6}
                    className="pointer-events-none absolute right-7 top-7 text-[#004B08]/[0.12] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.20]"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end">
                    <div className="max-w-[86%]">
                      <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1F2A1F]">
                        {t(titleKey)}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#5F6756]">
                        {t(descKey)}
                      </p>

                      <div className="mt-7 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/50 to-transparent" />
                    </div>
                  </div>
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

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {focus.map(({ icon: Icon, titleKey, descKey }, index) => (
              <Reveal key={titleKey} delay={index * 0.08}>
                <div className="group relative flex min-h-[280px] h-full overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/75 p-8 shadow-[0_18px_60px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:bg-white hover:shadow-[0_26px_80px_rgba(31,42,31,0.09)]">
                  {/* Soft glow */}
                  <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-[#004B08]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#C99A3D]/[0.08]" />

                  {/* Watermark icon */}
                  <Icon
                    aria-hidden="true"
                    size={76}
                    strokeWidth={1.6}
                    className="pointer-events-none absolute right-7 top-7 text-[#004B08]/[0.12] transition-all duration-500 group-hover:scale-[1.05] group-hover:text-[#C99A3D]/[0.20]"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end">
                    <div className="max-w-[86%]">
                      <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#1F2A1F]">
                        {t(titleKey)}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#5F6756]">
                        {t(descKey)}
                      </p>

                      <div className="mt-7 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/50 to-transparent" />
                    </div>
                  </div>
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