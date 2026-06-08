import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useT } from "../providers";
import heroImage from "../../imports/hero.png";

export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#f5f5f5] text-[#1F2A1F] pt-32 pb-24 lg:pt-44 lg:pb-32"
    >
      {/* Mobile-only circular line decoration */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6">
          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[#1F2A1F]">
            {t("hero_title_1")}{" "}
            <span className="text-[#004B08]">
              {t("hero_title_accent")}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[#5F6756] text-lg leading-relaxed">
            {t("hero_sub")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#004B08] text-[#F3EFDF] hover:bg-[#24452A] transition-colors"
            >
              {t("cta_start")}
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#004B08] text-[#004B08] hover:bg-[#004B08] hover:text-[#F3EFDF] transition-colors"
            >
              {t("cta_see_work")}
            </Link>
          </div>
        </div>

        <div className="hidden md:block lg:col-span-6 relative">
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Static background glow behind image */}
            <div
              className="absolute inset-0 -z-10 rounded-full bg-[#8E9970]/25 blur-3xl scale-90"
              aria-hidden="true"
            />

            <div
              className="absolute right-10 bottom-8 -z-10 w-[55%] h-[45%] rounded-full bg-[#C99A3D]/15 blur-3xl"
              aria-hidden="true"
            />

            <img
              src={heroImage}
              alt="Dhruva Tech digital products"
              className="float-soft relative z-10 w-full h-auto object-contain rounded-3xl"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatSoft {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-16px);
          }
        }

        .float-soft {
          animation: floatSoft 3.5s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-soft {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}