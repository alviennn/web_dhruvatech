// Portfolio.tsx — Public page
// Mengambil data dari backend API dan menampilkan data sesuai bahasa aktif

import { useEffect, useState } from "react";
import { PageHero } from "../components/shared";
import { useT } from "../providers";
import { listPortfolioItems, type PortfolioItem } from "../data/api/api";
import { Link } from "react-router";

export function Portfolio() {
  const { t, lang } = useT();

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
    let isMounted = true;

    listPortfolioItems()
      .then((data) => {
        if (!isMounted) return;
        setItems(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(t("portfolio_error_load"));
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  const adminToFilter = (type: PortfolioItem["type"]) =>
    type === "Mobile Apps" ? "Mobile App" : type;

  const visibleItems = items.filter((item) => {
    if (filter === "all") return true;
    return adminToFilter(item.type) === filter;
  });

  const getPortfolioTitle = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.title || item.title;
    }

    return item.title;
  };

  const getPortfolioType = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.type || item.type;
    }

    return item.type;
  };

  const getPortfolioDescription = (item: PortfolioItem) => {
    if (lang === "en") {
      return item.en_description || item.description;
    }

    return item.description;
  };

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

      <section className="relative overflow-hidden bg-[#f5f5f5] pb-24 pt-10 transition-colors lg:pb-28 lg:pt-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] portfolio-texture" />
        <div className="pointer-events-none absolute -top-40 right-[-160px] h-[540px] w-[540px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-160px] h-[540px] w-[540px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Filter Buttons */}
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
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

          {loading && (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70 animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#1F2A1F]/10" />

                  <div className="flex flex-1 flex-col space-y-3 p-6">
                    <div className="h-3 w-20 rounded bg-[#1F2A1F]/10" />
                    <div className="h-5 w-3/4 rounded bg-[#1F2A1F]/10" />
                    <div className="h-4 w-full rounded bg-[#1F2A1F]/8" />
                    <div className="h-4 w-5/6 rounded bg-[#1F2A1F]/8" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-[28px] border border-[#C99A3D]/30 bg-[#C99A3D]/10 px-6 py-10 text-center text-[#8A641E]">
              {error}
            </div>
          )}

          {!loading && !error && visibleItems.length > 0 && (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((p) => {
                const title = getPortfolioTitle(p);
                const type = getPortfolioType(p);
                const description = getPortfolioDescription(p);

                return (
                  <Link
                    to={`/portfolio/${p.id}`}
                    key={p.id}
                    className="block h-full"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#004B08]/25 hover:shadow-[0_22px_70px_rgba(31,42,31,0.09)]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#1F2A1F]">
                        <img
                          src={p.coverImage}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1F]/35 via-transparent to-transparent opacity-70" />
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]">
                          {type}
                        </div>

                        <h3 className="mb-3 text-xl leading-snug text-[#1F2A1F]">
                          {title}
                        </h3>

                        <p className="line-clamp-2 text-sm leading-relaxed text-[#5F6756]">
                          {description}
                        </p>

                        {p.keyFeatures && p.keyFeatures.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#004B08]/60">
                              {t("portfolio_key_features")}
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

                        {p.techStack && p.techStack.length > 0 && (
                          <div className="mt-auto pt-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5F6756]/60">
                              {t("portfolio_tech_stack")}
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
                );
              })}
            </div>
          )}

          {!loading && !error && visibleItems.length === 0 && (
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
    </>
  );
}