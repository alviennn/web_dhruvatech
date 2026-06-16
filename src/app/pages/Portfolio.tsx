// Portfolio.tsx — Public page
// Mengambil data dari backend API, menampilkan key features & tech stack

import { useEffect, useState } from "react";
import { PageHero, CTABlock } from "../components/shared";
import { useT } from "../providers";
import { listPortfolioItems, type PortfolioItem } from "../data/api/api";
import { Link } from "react-router";

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
      "4 Halaman: Beranda, Produk, Tentang Kami, Kontak",
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

export function Portfolio() {
  const { t } = useT();

  const filters = [
    { key: "all", label: t("portfolio_filter_all") },
    { key: "Website", label: t("portfolio_filter_website") },
    { key: "Mobile App", label: t("portfolio_filter_mobile") },
    { key: "AI/ML", label: t("portfolio_filter_ai") },
  ];

  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listPortfolioItems()
      .then(setItems)
      .catch(() => setError("Gagal memuat portfolio. Silakan coba lagi."))
      .finally(() => setLoading(false));
  }, []);

  const adminToFilter = (type: PortfolioItem["type"]) =>
    type === "Mobile Apps" ? "Mobile App" : type;

  const visibleItems = items.filter((item) => {
    if (filter === "all") return true;
    return adminToFilter(item.type) === filter;
  });

  return (
    <>
      <PageHero
        title={
          <>
            {t("portfolio_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("portfolio_hero_t2")}</span>
          </>
        }
        subtitle={t("portfolio_hero_sub")}
      />

      <section className="relative overflow-hidden bg-[#f5f5f5] pt-10 pb-24 lg:pt-12 lg:pb-28 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] portfolio-texture" />
        <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-160px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Filter Buttons */}
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                  filter === f.key
                    ? "border-[#004B08] bg-[#004B08] text-[#F3EFDF] shadow-[0_12px_30px_rgba(0,75,8,0.16)]"
                    : "border-[#1F2A1F]/10 bg-white/60 text-[#1F2A1F] backdrop-blur hover:border-[#C99A3D]/70 hover:bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[26px] border border-[#1F2A1F]/10 bg-white/70 overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#1F2A1F]/10" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-20 rounded bg-[#1F2A1F]/10" />
                    <div className="h-5 w-3/4 rounded bg-[#1F2A1F]/10" />
                    <div className="h-4 w-full rounded bg-[#1F2A1F]/8" />
                    <div className="h-4 w-5/6 rounded bg-[#1F2A1F]/8" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-[28px] border border-[#C99A3D]/30 bg-[#C99A3D]/10 px-6 py-10 text-center text-[#8A641E]">
              {error}
            </div>
          )}

          {/* Items Grid */}
          {!loading && !error && visibleItems.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleItems.map((p) => (
                <Link to={`/portfolio/${p.id}`} key={p.id} className="block">
                  <article
                    key={p.id}
                    className="group overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_22px_70px_rgba(31,42,31,0.09)]"
                  >
                    {/* Cover Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#1F2A1F]">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1F]/35 via-transparent to-transparent opacity-70" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]">
                        {p.type}
                      </div>

                      <h3 className="mb-3 text-xl leading-snug text-[#1F2A1F]">
                        {p.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#5F6756]">
                        {p.description}
                      </p>

                      {/* Key Features */}
                      {p.keyFeatures && p.keyFeatures.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#004B08]/60">
                            Fitur Kunci
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {p.keyFeatures.map((feature, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-[#004B08]/8 px-3 py-1 text-xs text-[#004B08]"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {p.techStack && p.techStack.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5F6756]/60">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {p.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-[#1F2A1F]/10 bg-white px-3 py-1 text-xs text-[#5F6756]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && visibleItems.length === 0 && (
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/60 px-6 py-20 text-center text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur">
              {t("portfolio_empty")}
            </div>
          )}
        </div>

        <style>{`
          @keyframes portfolioTextureMove {
            0% { background-position: 0 0; }
            100% { background-position: 72px 72px; }
          }
          .portfolio-texture {
            background-image:
              linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
            background-size: 72px 72px;
            animation: portfolioTextureMove 24s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .portfolio-texture { animation: none; }
          }
        `}</style>
      </section>

    </>
  );
}
