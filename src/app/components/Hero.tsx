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
      className="relative overflow-hidden bg-[#f5f5f5] text-[#1F2A1F] pt-28 pb-16 lg:pt-36 lg:pb-20"
    >
      <HeroSystemTexture />

      {/* Mobile-only circular line decoration */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none z-0"
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="heroMobileGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#8E9970" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8E9970" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="600" fill="url(#heroMobileGlow)" />

        <circle
          cx="200"
          cy="260"
          r="220"
          stroke="#004B08"
          strokeWidth="0.6"
          fill="none"
        />
        <circle
          cx="200"
          cy="260"
          r="160"
          stroke="#004B08"
          strokeWidth="0.6"
          fill="none"
        />
        <circle
          cx="200"
          cy="260"
          r="100"
          stroke="#C99A3D"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <h1 className="text-[clamp(2.25rem,4.8vw,4rem)] leading-[1.05] tracking-tight text-[#1F2A1F]">
            {t("hero_title_1")}{" "}
            <span className="text-[#004B08]">
              {t("hero_title_accent")}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[#5F6756] text-base lg:text-lg leading-relaxed">
            {t("hero_sub")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#004B08] text-[#F3EFDF] hover:bg-[#24452A] transition-colors"
            >
              {t("cta_start")}
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#004B08] text-[#004B08] hover:bg-[#004B08] hover:text-[#F3EFDF] transition-colors"
            >
              {t("cta_see_work")}
            </Link>
          </div>
        </div>

        <div className="hidden md:block lg:col-span-6 relative">
          <div className="relative w-full max-w-xl mx-auto">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 -z-10 rounded-full bg-[#8E9970]/25 blur-3xl scale-90"
              aria-hidden="true"
            />

            <div
              className="absolute right-10 bottom-8 -z-10 w-[55%] h-[45%] rounded-full bg-[#C99A3D]/15 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="absolute left-[18%] top-[16%] -z-10 w-[38%] h-[30%] rounded-full bg-[#6EA7A1]/10 blur-3xl"
              aria-hidden="true"
            />

            {/* Floating icons only */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <FloatingServiceIcon
                className="left-[29%] top-[9%]"
                icon={Code2}
                delay="0s"
                tone="gold"
              />

              <FloatingServiceIcon
                className="left-[45%] top-[-5%]"
                icon={BrainCircuit}
                delay="0.45s"
                featured
                tone="teal"
              />

              <FloatingServiceIcon
                className="right-[26%] top-[9%]"
                icon={Smartphone}
                delay="0.9s"
                tone="green"
              />
            </div>

            {/* Static hero image */}
            <img
              src={heroImage}
              alt="Dhruva Tech digital products"
              className="relative z-10 w-full h-auto object-contain rounded-3xl"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes serviceFloat {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          30% {
            transform: translateY(-8px) rotate(-2deg);
          }
          60% {
            transform: translateY(4px) rotate(2deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
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

        @media (prefers-reduced-motion: reduce) {
          .service-float {
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
    },
    gold: {
      front: "text-[#A87411]",
      back: "text-[#8A6312]/22",
      glow: "bg-[#E0C16A]/30",
    },
    teal: {
      front: "text-[#2D7A73]",
      back: "text-[#245F5A]/22",
      glow: "bg-[#6EA7A1]/28",
    },
  }[tone];

  const size = featured ? 34 : 29;

  return (
    <div
      className={`service-float absolute grid place-items-center ${
        featured ? "h-[58px] w-[58px]" : "h-[50px] w-[50px]"
      } ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      {/* Subtle glow */}
      <div
        className={`absolute inset-[18%] rounded-full blur-2xl ${toneClass.glow}`}
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
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft colorful glow */}
      <div className="absolute -top-52 right-[-180px] h-[640px] w-[640px] rounded-full bg-[#8E9970]/22 blur-3xl" />
      <div className="absolute bottom-[-220px] left-[-160px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/14 blur-3xl" />
      <div className="absolute top-[22%] left-[38%] h-[360px] w-[360px] rounded-full bg-[#6EA7A1]/10 blur-3xl" />
      <div className="absolute bottom-[16%] right-[22%] h-[300px] w-[300px] rounded-full bg-[#D98C67]/10 blur-3xl" />

      {/* Fine dotted grid */}
      <div className="absolute inset-0 opacity-[0.20] bg-[radial-gradient(circle_at_1px_1px,#1F2A1F_0.9px,transparent_0)] bg-[size:28px_28px]" />

      {/* Accent dotted layer */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,#C99A3D_1px,transparent_0)] bg-[size:112px_112px]" />

      {/* Large subtle layout grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#004B08_1px,transparent_1px),linear-gradient(to_bottom,#004B08_1px,transparent_1px)] bg-[size:240px_240px]" />

      {/* Technical connector lines */}
      <svg
        className="absolute inset-0 h-full w-full"
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
      <div className="absolute inset-0 bg-[#f5f5f5]/48" />
    </div>
  );
}