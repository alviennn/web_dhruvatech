import { useEffect, useState } from "react";
import { PageHero, CTABlock } from "../components/shared";
import { useT } from "../providers";
import {
  listAdminPortfolioItems,
  type AdminPortfolioItem,
} from "../data/portfolioStore";

export function Portfolio() {
  const { t } = useT();

  const filters = [
    { key: "all", label: t("portfolio_filter_all") },
    { key: "Website", label: t("portfolio_filter_website") },
    { key: "Mobile App", label: t("portfolio_filter_mobile") },
    { key: "AI/ML", label: t("portfolio_filter_ai") },
  ];

  const [filter, setFilter] = useState("all");
  const [adminItems, setAdminItems] = useState<AdminPortfolioItem[]>([]);

  useEffect(() => {
    setAdminItems(listAdminPortfolioItems());
  }, []);

  const adminToFilter = (type: AdminPortfolioItem["type"]) =>
    type === "Mobile Apps" ? "Mobile App" : type;

  const visibleAdmin = adminItems.filter((item) => {
    if (filter === "all") return true;
    return adminToFilter(item.type) === filter;
  });

  return (
    <>
      <PageHero
        title={
          <>
            {t("portfolio_hero_t1")}{" "}
            <span className="text-[#004B08]">
              {t("portfolio_hero_t2")}
            </span>
          </>
        }
        subtitle={t("portfolio_hero_sub")}
      />

      <section className="relative overflow-hidden bg-[#f5f5f5] pt-10 pb-24 lg:pt-12 lg:pb-28 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] portfolio-texture" />
        <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-160px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
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

          {visibleAdmin.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleAdmin.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_22px_70px_rgba(31,42,31,0.09)]"
                >
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

                    <h3 className="mb-3 text-xl leading-snug text-[#1F2A1F]">
                      {p.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#5F6756]">
                      {p.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/60 px-6 py-20 text-center text-[#5F6756] shadow-[0_16px_50px_rgba(31,42,31,0.045)] backdrop-blur">
              {t("portfolio_empty")}
            </div>
          )}
        </div>

        <style>{`
          @keyframes portfolioTextureMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 72px 72px;
            }
          }

          .portfolio-texture {
            background-image:
              linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
            background-size: 72px 72px;
            animation: portfolioTextureMove 24s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .portfolio-texture {
              animation: none;
            }
          }
        `}</style>
      </section>

      <CTABlock title={t("portfolio_cta")} primaryTo="/contact" />
    </>
  );
}