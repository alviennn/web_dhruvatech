import {
  ArrowUpRight,
  Code2,
  Smartphone,
  BrainCircuit,
} from "lucide-react";
import { Link } from "react-router";
import { useT } from "../providers";
import heroImage from "../../imports/hero.png";

export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative flex min-h-screen overflow-hidden bg-[#f5f5f5] text-[#1F2A1F]"
    >
      <HeroSystemTexture />

      {/* Mobile circular line decoration */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.14] md:opacity-[0.10] lg:hidden"
        viewBox="0 0 400 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="heroMobileGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#8E9970" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8E9970" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="720" fill="url(#heroMobileGlow)" />

        <circle
          cx="200"
          cy="340"
          r="230"
          stroke="#004B08"
          strokeWidth="0.6"
          fill="none"
        />
        <circle
          cx="200"
          cy="340"
          r="165"
          stroke="#004B08"
          strokeWidth="0.6"
          fill="none"
        />
        <circle
          cx="200"
          cy="340"
          r="105"
          stroke="#C99A3D"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_1fr] items-center px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 md:gap-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-12 lg:px-10 lg:pt-28 lg:pb-16">
        {/* Visual - mobile berada paling atas */}
        <div className="relative order-1 flex items-start justify-center lg:order-2 lg:col-span-6 lg:items-center lg:justify-end">
          <div className="relative mx-auto w-full max-w-[245px] sm:max-w-[330px] md:max-w-[420px] lg:max-w-xl">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 -z-10 scale-90 rounded-full bg-[#8E9970]/22 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="absolute bottom-8 right-6 -z-10 h-[42%] w-[55%] rounded-full bg-[#C99A3D]/14 blur-3xl sm:right-10"
              aria-hidden="true"
            />

            <div
              className="absolute left-[18%] top-[16%] -z-10 h-[30%] w-[38%] rounded-full bg-[#6EA7A1]/10 blur-3xl"
              aria-hidden="true"
            />

            {/* Animated floating icons */}
            <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
              <FloatingServiceIcon
                className="left-[22%] top-[10%] md:left-[27%] md:top-[9%]"
                icon={Code2}
                delay="0s"
                tone="gold"
              />

              <FloatingServiceIcon
                className="left-[44%] top-[-4%] md:left-[45%] md:top-[-5%]"
                icon={BrainCircuit}
                delay="0.45s"
                featured
                tone="teal"
              />

              <FloatingServiceIcon
                className="right-[20%] top-[10%] md:right-[26%] md:top-[9%]"
                icon={Smartphone}
                delay="0.9s"
                tone="green"
              />
            </div>

            <img
              src={heroImage}
              alt="Dhruva Tech digital products"
              className="relative z-10 h-auto w-full object-contain rounded-[24px] drop-shadow-[0_22px_50px_rgba(31,42,31,0.14)] sm:rounded-3xl lg:drop-shadow-[0_32px_75px_rgba(31,42,31,0.16)]"
            />
          </div>
        </div>

        {/* Text */}
        <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:col-span-6 lg:text-left">
          <h1 className="text-[clamp(2rem,8vw,4rem)] leading-[1.05] tracking-tight text-[#1F2A1F] sm:text-[clamp(2.4rem,7vw,4rem)]">
            {t("hero_title_1")}{" "}
            <span className="text-[#004B08]">{t("hero_title_accent")}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5F6756] sm:mt-6 sm:text-base lg:mx-0 lg:text-lg">
            {t("hero_sub")}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#004B08] px-6 py-3 text-sm font-medium text-[#F3EFDF] transition-colors hover:bg-[#24452A]"
            >
              {t("cta_start")}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#004B08] px-6 py-3 text-sm font-medium text-[#004B08] transition-colors hover:bg-[#004B08] hover:text-[#F3EFDF]"
            >
              {t("cta_see_work")}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes serviceFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          30% {
            transform: translate3d(0, -8px, 0) rotate(-2deg) scale(1.02);
          }
          60% {
            transform: translate3d(0, 4px, 0) rotate(2deg) scale(0.99);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes iconPulseGlow {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.92);
          }
          50% {
            opacity: 1;
            transform: scale(1.18);
          }
        }

        .service-float {
          animation: serviceFloat 4.8s ease-in-out infinite;
          will-change: transform;
        }

        .service-float:nth-child(2) {
          animation-duration: 5.3s;
        }

        .service-float:nth-child(3) {
          animation-duration: 5s;
        }

        .service-float-glow {
          animation: iconPulseGlow 3.6s ease-in-out infinite;
        }

        .service-float:nth-child(2) .service-float-glow {
          animation-delay: 0.45s;
        }

        .service-float:nth-child(3) .service-float-glow {
          animation-delay: 0.9s;
        }

        @media (prefers-reduced-motion: reduce) {
          .service-float,
          .service-float-glow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function FloatingServiceIcon({
  icon: Icon,
  className = "",
  delay = "0s",
  featured = false,
  tone = "green",
}: {
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  className?: string;
  delay?: string;
  featured?: boolean;
  tone?: "green" | "gold" | "teal";
}) {
  const toneClass = {
    green: {
      front: "text-[#0D6B1A]",
      back: "text-[#0A4F14]/25",
      glow: "bg-[#8E9970]/28",
      ring: "border-[#8E9970]/28",
    },
    gold: {
      front: "text-[#A87411]",
      back: "text-[#8A6312]/22",
      glow: "bg-[#E0C16A]/30",
      ring: "border-[#E0C16A]/30",
    },
    teal: {
      front: "text-[#2D7A73]",
      back: "text-[#245F5A]/22",
      glow: "bg-[#6EA7A1]/28",
      ring: "border-[#6EA7A1]/30",
    },
  }[tone];

  const size = featured ? 32 : 28;

  return (
    <div
      className={`service-float absolute grid place-items-center ${
        featured
          ? "h-[54px] w-[54px] md:h-[58px] md:w-[58px]"
          : "h-[46px] w-[46px] md:h-[50px] md:w-[50px]"
      } ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      {/* Pulsing glow */}
      <div
        className={`service-float-glow absolute inset-[8%] rounded-full blur-2xl ${toneClass.glow}`}
      />

      {/* Thin orbit ring */}
      <div
        className={`absolute inset-0 rounded-full border ${toneClass.ring} opacity-50`}
      />

      {/* Back layer for pseudo 3D depth */}
      <Icon
        size={size}
        strokeWidth={2.2}
        className={`absolute translate-x-[3px] translate-y-[4px] ${toneClass.back}`}
      />

      {/* Front icon */}
      <Icon
        size={size}
        strokeWidth={2.2}
        className={`relative z-10 ${toneClass.front} drop-shadow-[0_10px_18px_rgba(31,42,31,0.18)]`}
      />
    </div>
  );
}

function HeroSystemTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft colorful glow */}
      <div className="absolute -top-52 right-[-220px] h-[460px] w-[460px] rounded-full bg-[#8E9970]/18 blur-3xl sm:right-[-180px] sm:h-[640px] sm:w-[640px] sm:bg-[#8E9970]/22" />
      <div className="absolute bottom-[-220px] left-[-180px] h-[420px] w-[420px] rounded-full bg-[#C99A3D]/12 blur-3xl sm:left-[-160px] sm:h-[540px] sm:w-[540px] sm:bg-[#C99A3D]/14" />
      <div className="absolute left-[38%] top-[22%] h-[260px] w-[260px] rounded-full bg-[#6EA7A1]/[0.08] blur-3xl sm:h-[360px] sm:w-[360px] sm:bg-[#6EA7A1]/10" />
      <div className="absolute bottom-[16%] right-[22%] h-[220px] w-[220px] rounded-full bg-[#D98C67]/[0.08] blur-3xl sm:h-[300px] sm:w-[300px] sm:bg-[#D98C67]/10" />

      {/* Fine dotted grid */}
      <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_1px_1px,#1F2A1F_0.9px,transparent_0)] bg-[size:24px_24px] sm:opacity-[0.20] sm:bg-[size:28px_28px]" />

      {/* Accent dotted layer */}
      <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_1px_1px,#C99A3D_1px,transparent_0)] bg-[size:90px_90px] sm:opacity-[0.12] sm:bg-[size:112px_112px]" />

      {/* Large subtle layout grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#004B08_1px,transparent_1px),linear-gradient(to_bottom,#004B08_1px,transparent_1px)] bg-[size:180px_180px] sm:opacity-[0.07] sm:bg-[size:240px_240px]" />

      {/* Technical connector lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70 sm:opacity-100"
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="265"
          x2="1600"
          y2="265"
          stroke="#C99A3D"
          strokeOpacity="0.18"
        />
        <line
          x1="0"
          y1="610"
          x2="1600"
          y2="610"
          stroke="#6EA7A1"
          strokeOpacity="0.14"
        />

        <line
          x1="420"
          y1="0"
          x2="420"
          y2="900"
          stroke="#D98C67"
          strokeOpacity="0.12"
        />
        <line
          x1="1180"
          y1="0"
          x2="1180"
          y2="900"
          stroke="#004B08"
          strokeOpacity="0.12"
        />

        <path
          d="M420 265H560C590 265 610 285 610 315V360"
          stroke="#C99A3D"
          strokeOpacity="0.24"
        />
        <path
          d="M1180 610H1040C1010 610 990 590 990 560V520"
          stroke="#004B08"
          strokeOpacity="0.18"
        />
        <path
          d="M760 265V390C760 420 780 440 810 440H930"
          stroke="#6EA7A1"
          strokeOpacity="0.18"
        />
        <path
          d="M250 610H360C390 610 410 590 410 560V510"
          stroke="#D98C67"
          strokeOpacity="0.16"
        />

        <circle cx="420" cy="265" r="4.5" fill="#C99A3D" fillOpacity="0.42" />
        <circle cx="610" cy="360" r="4.5" fill="#C99A3D" fillOpacity="0.36" />

        <circle cx="1180" cy="610" r="4.5" fill="#004B08" fillOpacity="0.34" />
        <circle cx="990" cy="520" r="4.5" fill="#004B08" fillOpacity="0.30" />

        <circle cx="760" cy="265" r="4.5" fill="#6EA7A1" fillOpacity="0.38" />
        <circle cx="930" cy="440" r="4.5" fill="#6EA7A1" fillOpacity="0.32" />

        <circle cx="250" cy="610" r="4.5" fill="#D98C67" fillOpacity="0.32" />
        <circle cx="410" cy="510" r="4.5" fill="#D98C67" fillOpacity="0.28" />

        <circle cx="420" cy="265" r="10" stroke="#C99A3D" strokeOpacity="0.16" />
        <circle cx="1180" cy="610" r="10" stroke="#004B08" strokeOpacity="0.13" />
        <circle cx="760" cy="265" r="10" stroke="#6EA7A1" strokeOpacity="0.14" />
        <circle cx="250" cy="610" r="10" stroke="#D98C67" strokeOpacity="0.12" />
      </svg>

      {/* Clean overlay */}
      <div className="absolute inset-0 bg-[#f5f5f5]/52 sm:bg-[#f5f5f5]/48" />
    </div>
  );
}