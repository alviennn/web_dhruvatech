import { Link } from "react-router";
import {
  ArrowUpRight,
  Compass,
  ListChecks,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { useT } from "../providers";

export function SectionHeader({
  title,
  subtitle,
  dark = false,
  center = false,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <h2
        className={`text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight ${
          dark ? "text-[#F3EFDF]" : "text-[#1F2A1F]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            dark ? "text-[#F3EFDF]/70" : "text-[#5F6756]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  accent,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  accent?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] text-[#1F2A1F] min-h-screen flex items-center">
      <HeroSystemTexture />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-12 lg:px-10 lg:pt-32 lg:pb-24">
        <div className={accent ? "lg:col-span-7" : "lg:col-span-9"}>
          <h1 className="max-w-5xl text-[clamp(3rem,6vw,5.6rem)] leading-[0.98] tracking-tight text-[#1F2A1F]">
            {title}
          </h1>

          <p className="mt-9 max-w-2xl text-lg leading-relaxed text-[#5F6756]">
            {subtitle}
          </p>
        </div>

        {accent && <div className="lg:col-span-5">{accent}</div>}
      </div>
    </section>
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

      {/* Colored dotted overlay */}
      <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_1px_1px,#C99A3D_1px,transparent_0)] bg-[size:112px_112px]" />

      {/* Large subtle layout grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#004B08_1px,transparent_1px),linear-gradient(to_bottom,#004B08_1px,transparent_1px)] bg-[size:240px_240px]" />

      {/* Professional technical lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main guide lines */}
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
          strokeOpacity="0.16"
        />

        <line
          x1="420"
          y1="0"
          x2="420"
          y2="900"
          stroke="#D98C67"
          strokeOpacity="0.14"
        />
        <line
          x1="1180"
          y1="0"
          x2="1180"
          y2="900"
          stroke="#004B08"
          strokeOpacity="0.13"
        />

        {/* Connector motifs */}
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
          strokeOpacity="0.20"
        />
        <path
          d="M250 610H360C390 610 410 590 410 560V510"
          stroke="#D98C67"
          strokeOpacity="0.18"
        />

        {/* Colorful nodes */}
        <circle cx="420" cy="265" r="4.5" fill="#C99A3D" fillOpacity="0.46" />
        <circle cx="610" cy="360" r="4.5" fill="#C99A3D" fillOpacity="0.40" />

        <circle cx="1180" cy="610" r="4.5" fill="#004B08" fillOpacity="0.38" />
        <circle cx="990" cy="520" r="4.5" fill="#004B08" fillOpacity="0.34" />

        <circle cx="760" cy="265" r="4.5" fill="#6EA7A1" fillOpacity="0.42" />
        <circle cx="930" cy="440" r="4.5" fill="#6EA7A1" fillOpacity="0.36" />

        <circle cx="250" cy="610" r="4.5" fill="#D98C67" fillOpacity="0.38" />
        <circle cx="410" cy="510" r="4.5" fill="#D98C67" fillOpacity="0.34" />

        {/* Node rings */}
        <circle cx="420" cy="265" r="10" stroke="#C99A3D" strokeOpacity="0.16" />
        <circle cx="1180" cy="610" r="10" stroke="#004B08" strokeOpacity="0.13" />
        <circle cx="760" cy="265" r="10" stroke="#6EA7A1" strokeOpacity="0.14" />
        <circle cx="250" cy="610" r="10" stroke="#D98C67" strokeOpacity="0.13" />
      </svg>

      {/* Clean overlay */}
      <div className="absolute inset-0 bg-[#f5f5f5]/48" />
    </div>
  );
}

export function CTAButton({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outline-dark";
}) {
  const cls = {
    primary: "bg-[#C99A3D] text-[#24452A] hover:bg-[#E0C16A]",
    outline:
      "border border-[#F3EFDF]/20 text-[#F3EFDF] hover:border-[#E0C16A] hover:text-[#E0C16A]",
    "outline-dark":
      "border border-[#004B08] text-[#004B08] hover:bg-[#004B08] hover:text-[#F3EFDF]",
  }[variant];

  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full transition-colors ${cls}`}
    >
      {children} <ArrowUpRight size={18} />
    </Link>
  );
}

export function CTABlock({
  title,
  primaryTo,
  primaryLabel,
  secondaryTo = "/contact",
  secondaryLabel,
}: {
  title: string;
  primaryTo: string;
  primaryLabel?: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}) {
  const { t } = useT();

  return (
    <section className="bg-[#24452A] text-[#F3EFDF] py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#8E9970]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C99A3D]/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight">
          {title}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAButton to={primaryTo} variant="primary">
            {primaryLabel ?? t("cta_start")}
          </CTAButton>

          <CTAButton to={secondaryTo} variant="outline">
            {secondaryLabel ?? t("cta_contact")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export function ProcessStrip({ compact = false }: { compact?: boolean }) {
  const { t } = useT();

  const steps = [
    { title: t("step_discover"), desc: t("step_discover_desc"), icon: Compass },
    { title: t("step_define"), desc: t("step_define_desc"), icon: ListChecks },
    { title: t("step_design"), desc: t("step_design_desc"), icon: PenTool },
    { title: t("step_develop"), desc: t("step_develop_desc"), icon: Code2 },
    { title: t("step_test"), desc: t("step_test_desc"), icon: ShieldCheck },
    { title: t("step_launch"), desc: t("step_launch_desc"), icon: Rocket },
  ];

  const items = compact ? steps.slice(0, 4) : steps;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ title, desc, icon: Icon }, index) => (
        <div
          key={title}
          className="group relative h-full overflow-hidden rounded-[30px] border border-[#1F2A1F]/10 bg-white/70 p-7 shadow-[0_20px_70px_rgba(31,42,31,0.06)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A3D]/70 hover:shadow-[0_26px_90px_rgba(31,42,31,0.10)]"
        >
          {/* Soft accent */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E0C16A]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#004B08]/[0.04] blur-3xl" />

          <div className="relative z-10 flex min-h-[230px] flex-col">
            <div className="flex items-start justify-between">
              <div className="grid h-[58px] w-[58px] place-items-center rounded-[18px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                <Icon size={22} strokeWidth={1.8} />
              </div>

              <span className="text-sm font-medium tracking-wider text-[#C99A3D]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-auto">
              <h3 className="text-xl tracking-tight text-[#1F2A1F]">
                {title}
              </h3>

              <p className="mt-3 max-w-[92%] text-sm leading-relaxed text-[#5F6756]">
                {desc}
              </p>
            </div>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-[#C99A3D]/45 via-[#D7D2B8]/60 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}