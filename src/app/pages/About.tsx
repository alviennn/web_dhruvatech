import { motion } from "framer-motion";
import { PanelsTopLeft, PenTool, ServerCog } from "lucide-react";
import { PageHero } from "../components/shared";
import { useT } from "../providers";

import aboutWorkspace from "../../imports/about/about-workspace.png";
import aboutDelivery from "../../imports/about/about-delivery.png";

const aboutImages = {
  workspace: aboutWorkspace,
  delivery: aboutDelivery,
};

export function About() {
  const { t } = useT();

  return (
    <>
      {/* HERO */}
      <PageHero
        title={
          <>
            {t("about_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("about_hero_t2")}</span>{" "}
            {t("about_hero_t3")}
          </>
        }
        subtitle={t("about_hero_sub")}
      />

      {/* ABOUT DHRUVA TECH */}
      <section className="relative overflow-hidden border-y border-[#1F2A1F]/10 bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
        <SoftGlow />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* IMAGE LEFT */}
              <div className="lg:col-span-6">
                <ImageVisual
                  image={aboutImages.workspace}
                  alt="Dhruva Tech software house workspace"
                />
              </div>

              {/* CONTENT RIGHT */}
              <div className="lg:col-span-6">
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-[#1F2A1F] sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
                  {t("about_title")}
                </h2>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5F6756] sm:text-lg">
                  <p>{t("about_p1")}</p>
                  <p>{t("about_p2")}</p>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-28">
        <AboutTexture />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* CONTENT LEFT */}
              <div className="lg:col-span-6">
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-[#1F2A1F] sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
                  {t("about_help_title")}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5F6756] sm:text-lg">
                  {t("about_help_desc")}
                </p>

                <div className="mt-8 space-y-4">
                  <HelpPoint
                    icon={PenTool}
                    title={t("about_help_1_title")}
                    description={t("about_help_1_desc")}
                  />

                  <HelpPoint
                    icon={PanelsTopLeft}
                    title={t("about_help_2_title")}
                    description={t("about_help_2_desc")}
                  />

                  <HelpPoint
                    icon={ServerCog}
                    title={t("about_help_3_title")}
                    description={t("about_help_3_desc")}
                  />
                </div>
              </div>

              {/* IMAGE RIGHT */}
              <div className="lg:col-span-6">
                <ImageVisual
                  image={aboutImages.delivery}
                  alt="Dhruva Tech digital product delivery"
                  reverse
                  largeRounded
                  shiftRight
                />
              </div>
            </div>
          </Reveal>
        </div>

        <AboutMotionStyle />
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

function ImageVisual({
  image,
  alt,
  reverse = false,
  largeRounded = false,
  shiftRight = false,
}: {
  image: string;
  alt: string;
  reverse?: boolean;
  largeRounded?: boolean;
  shiftRight?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto flex w-full items-center justify-center ${
        largeRounded
          ? "min-h-[300px] max-w-[720px] sm:min-h-[420px] lg:min-h-[520px]"
          : "min-h-[320px] max-w-[560px] sm:min-h-[420px] lg:min-h-[520px]"
      } ${reverse ? "lg:justify-end" : "lg:justify-start"} ${
        shiftRight ? "lg:translate-x-10 xl:translate-x-16" : ""
      }`}
    >
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.045] blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-[#C99A3D]/[0.12] blur-2xl sm:right-14 sm:h-36 sm:w-36" />

      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={
          largeRounded
            ? "relative z-10 aspect-[16/10] w-full max-w-[680px] rounded-[28px] object-cover shadow-[0_26px_70px_rgba(31,42,31,0.14)] sm:rounded-[32px] lg:max-w-[720px]"
            : "relative z-10 w-[82%] max-w-[360px] object-contain drop-shadow-[0_26px_45px_rgba(31,42,31,0.16)] sm:max-w-[470px] lg:max-w-[540px]"
        }
      />
    </div>
  );
}

function HelpPoint({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4 rounded-[22px] border border-[#1F2A1F]/10 bg-white/60 p-4 shadow-[0_12px_36px_rgba(31,42,31,0.035)] backdrop-blur">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#004B08]/10 text-[#004B08]">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div>
        <h3 className="text-base font-semibold text-[#1F2A1F] sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#5F6756]">
          {description}
        </p>
      </div>
    </div>
  );
}

function SoftGlow() {
  return (
    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004B08]/[0.05] blur-3xl sm:h-[520px] sm:w-[520px]" />
  );
}

function AboutTexture() {
  return (
    <div className="about-texture pointer-events-none absolute inset-0 opacity-[0.16] sm:opacity-[0.18]" />
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
        background-size: 56px 56px;
        animation: aboutGridMove 24s linear infinite;
      }

      @media (min-width: 640px) {
        .about-texture {
          background-size: 72px 72px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .about-texture {
          animation: none;
        }
      }
    `}</style>
  );
}