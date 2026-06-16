import { Check, AlertCircle, Sparkles, MessageCircle } from "lucide-react";
import {
  PageHero,
  CTABlock,
  SectionHeader,
  ProcessStrip,
} from "../components/shared";

import { useT } from "../providers";
import type { Key } from "../i18n";

type PricingPackage = {
  name: string;
  price: string;
  priceNote?: string;
  suitableFor?: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

const pricingPackages: PricingPackage[] = [
  {
    name: "Web Basic",
    price: "900rb-an",
    priceNote: "Landing page / non-CRUD",
    features: [
      "Free hosting & domain (.com) 1 tahun",
      "Free konsultasi",
      "Integrasi sosial media",
      "Website sederhana & responsif",
      "User guide (panduan pakai)",
      "4 Halaman (Contoh): Beranda, Produk, Tentang Kami, Kontak",
    ],
  },
  {
    name: "Web Premium",
    price: "1,5 JT - 2,5 JT",
    priceNote: "Cocok untuk UMKM, blog, company profile",
    features: [
      "Free hosting & domain (.com) 1 tahun",
      "User guide (panduan untuk client)",
      "Dashboard Admin",
      "Payment gateway & katalog produk (opsional)",
      "Statistik kunjungan website",
    ],
    highlight: true,
    badge: "Paling Direkomendasikan",
  },
  {
    name: "Web by Request",
    price: "Custom",
    priceNote: "Menyesuaikan fitur & desain kebutuhan kamu",
    features: [
      "Diskusi kebutuhan & fitur bareng tim kami",
      "Desain & arsitektur sesuai kompleksitas project",
      "Estimasi harga & timeline transparan",
      "Cocok untuk sistem khusus / fitur kompleks",
    ],
  },
];

function buildWaLink(packageName: string) {
  const text = `Hallo DhurvaTech! Saya tertarik dengan paket ${packageName}, saya ingin konsultasi mengenai project saya.`;
  return `https://wa.me/6289514693178?text=${encodeURIComponent(text)}`;
}

function ProblemSection({
  problems,
  accent,
}: {
  problems: string[];
  accent: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] service-texture" />
      <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader title={accent} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          {problems.map((p) => (
            <div
              key={p}
              className="group flex gap-4 rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/70 hover:shadow-[0_20px_70px_rgba(31,42,31,0.08)]"
            >
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[14px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                <AlertCircle size={18} strokeWidth={1.8} />
              </div>

              <p className="leading-relaxed text-[#5F6756]">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function ListGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 border-y border-[#1F2A1F]/10 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
      <div className="pointer-events-none absolute -bottom-44 left-[-160px] h-[520px] w-[520px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader title={title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {items.map((it) => (
            <div
              key={it}
              className="group rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/70 hover:shadow-[0_20px_70px_rgba(31,42,31,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[14px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
                  <Check size={17} strokeWidth={1.9} />
                </div>

                <span className="text-[#1F2A1F] leading-snug">{it}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function ProcessSection() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] py-20 lg:py-24 transition-colors">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
      <div className="pointer-events-none absolute -top-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("proc_section_title")}
          subtitle={t("proc_section_sub")}
        />

        <div className="mt-10">
          <ProcessStrip />
        </div>
      </div>

      <ServiceMotionStyle />
    </section>
  );
}

function WebsitePricingSection() {
  return (
    <section className="relative overflow-hidden bg-[#1F2A1F] py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] hero-grid-pricing" />
      <div className="pointer-events-none absolute -top-32 left-[-120px] h-[420px] w-[420px] rounded-full bg-[#004B08]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-[#C99A3D]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            <Sparkles size={13} className="text-[#C99A3D]" />
            Paket Website
          </div>

          <h2 className="text-3xl font-medium leading-tight text-white lg:text-4xl">
            Pilih Paket yang Sesuai{" "}
            <span className="text-[#C99A3D]">Kebutuhan Kamu</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/55">
            Mulai dari landing page sederhana hingga website dengan dashboard
            admin dan fitur khusus sesuai kebutuhan bisnis.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-center">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-[28px] border p-8 transition-all duration-300 ${
                pkg.highlight
                  ? "border-[#C99A3D]/50 bg-gradient-to-b from-[#2A3A2A] to-[#1F2A1F] shadow-[0_30px_80px_rgba(201,154,61,0.18)] lg:scale-105"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#C99A3D] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1F2A1F]">
                  {pkg.badge}
                </div>
              )}

              <h3
                className={`text-lg font-medium ${
                  pkg.highlight ? "text-[#C99A3D]" : "text-white"
                }`}
              >
                {pkg.name}
              </h3>

              <div className="mt-3">
                <div className="text-3xl font-semibold text-white">
                  {pkg.price}
                </div>

                {pkg.priceNote && (
                  <p className="mt-2 text-sm text-white/50">{pkg.priceNote}</p>
                )}
              </div>

              <div
                className={`my-6 h-px ${
                  pkg.highlight ? "bg-[#C99A3D]/25" : "bg-white/10"
                }`}
              />

              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <Check
                      size={16}
                      className={
                        pkg.highlight ? "text-[#C99A3D]" : "text-[#5FA86A]"
                      }
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildWaLink(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all ${
                  pkg.highlight
                    ? "bg-[#C99A3D] text-[#1F2A1F] hover:bg-[#dba94a]"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <MessageCircle size={16} />
                Konsultasi Paket Ini
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/35">
          Harga dapat berubah sesuai kompleksitas fitur dan kebutuhan project.
        </p>
      </div>

      <style>{`
        .hero-grid-pricing {
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </section>
  );
}
/* ---------------- Website Development ---------------- */

export function WebsiteDevelopment() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("web_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("web_hero_t2")}</span>{" "}
            {t("web_hero_t3")}
          </>
        }
        subtitle={t("web_hero_sub")}
      />
      <ProblemSection
        accent={t("web_problem_title")}
        problems={[t("web_problem_1"), t("web_problem_2"), t("web_problem_3")]}
      />
      <ListGrid
        title={t("web_build_title")}
        items={[
          "Company Profile Website",
          "Landing Page",
          "Business Website",
          "Educational Website",
          "Portfolio Website",
        ]}
      />
      <ListGrid
        title={t("web_features_title")}
        items={[
          "Responsive design",
          "Modern UI/UX",
          "Clear content structure",
          "Service pages",
          "Portfolio section",
          "Contact form",
          "WhatsApp CTA",
          "SEO-friendly structure",
          "Fast loading experience",
        ]}
      />
      S
      <ProcessSection />
      <WebsitePricingSection />
      <CTABlock title={t("web_cta")} primaryTo="/contact?service=website" />
    </>
  );
}

/* ---------------- Mobile App ---------------- */

export function MobileAppDevelopment() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("mob_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("mob_hero_t2")}</span>
          </>
        }
        subtitle={t("mob_hero_sub")}
      />

      <ProblemSection
        accent={t("mob_problem_title")}
        problems={[t("mob_problem_1"), t("mob_problem_2"), t("mob_problem_3")]}
      />

      <ListGrid
        title={t("mob_build_title")}
        items={[
          "Service Application",
          "Booking Application",
          "Educational Application",
          "Community Application",
          "Business Application",
        ]}
      />

      <ListGrid
        title={t("mob_features_title")}
        items={[
          "User-friendly interface",
          "Clear user flow",
          "Mobile-first experience",
          "Authentication flow",
          "Booking or service flow",
          "Notification-ready structure",
          "Admin integration planning",
          "API integration planning",
          "Prototype before development",
          "Scalable feature planning",
        ]}
      />
      <ProcessSection />
      <CTABlock title={t("mob_cta")} primaryTo="/contact?service=mobile-app" />
    </>
  );
}

/* ---------------- AI/ML ---------------- */

export function AIMLSolutions() {
  const { t } = useT();

  return (
    <>
      <PageHero
        title={
          <>
            {t("ai_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("ai_hero_t2")}</span>{" "}
            {t("ai_hero_t3")}
          </>
        }
        subtitle={t("ai_hero_sub")}
      />

      <ProblemSection
        accent={t("ai_problem_title")}
        problems={[t("ai_problem_1"), t("ai_problem_2"), t("ai_problem_3")]}
      />

      <ListGrid
        title={t("ai_build_title")}
        items={[
          "Computer Vision",
          "Prediction System",
          "Data Classification",
          "AI-Powered Features",
          "Automation Support",
        ]}
      />

      <ListGrid
        title={t("ai_usecases_title")}
        items={[
          "Image detection",
          "Object classification",
          "Data prediction",
          "Data processing",
          "Recommendation logic",
          "Intelligent dashboard features",
          "AI-assisted automation",
          "Computer vision prototype",
        ]}
      />

      <ProcessSection />

      <section className="relative overflow-hidden bg-[#f5f5f5] py-20 border-y border-[#1F2A1F]/10 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] service-texture" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <div className="group flex gap-5 rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-7 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur transition-all duration-300 hover:border-[#C99A3D]/70">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[16px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] transition-all duration-300 group-hover:border-[#C99A3D] group-hover:bg-[#FFF8E6]/80">
              <AlertCircle size={20} strokeWidth={1.8} />
            </div>

            <div>
              <h4 className="mb-2 text-xl text-[#1F2A1F]">
                {t("ai_feasibility_title")}
              </h4>

              <p className="leading-relaxed text-[#5F6756]">
                {t("ai_feasibility")}
              </p>
            </div>
          </div>
        </div>

        <ServiceMotionStyle />
      </section>

      <CTABlock title={t("ai_cta")} primaryTo="/contact?service=ai-ml" />
    </>
  );
}

/* ---------------- LOCAL STYLE ---------------- */

function ServiceMotionStyle() {
  return (
    <style>{`
      @keyframes serviceTextureMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 72px 72px;
        }
      }

      .service-texture {
        background-image:
          linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: serviceTextureMove 24s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .service-texture {
          animation: none;
        }
      }
    `}</style>
  );
}

export type _ = Key;
