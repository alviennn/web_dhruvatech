import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Layers,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { listPortfolioItems, type PortfolioItem } from "../data/api/api";
import { getTechLogo } from "../data/techLogos";
import type { Lang } from "../i18n";
import { useT } from "../providers";

/* ──────────────────────────────────────────────────────────────
   Carousel
────────────────────────────────────────────────────────────── */

function Carousel({
  images,
  title,
  onOpenLightbox,
}: {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}) {
  const { t } = useT();

  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (total <= 1) return;

    autoRef.current = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    resetAuto();

    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [resetAuto]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
        resetAuto();
      }

      if (event.key === "ArrowLeft") {
        prev();
        resetAuto();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, resetAuto]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStartX(event.clientX);
    setDragDelta(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragDelta(event.clientX - dragStartX);
  };

  const onPointerUp = () => {
    if (!dragging) return;

    if (dragDelta < -50) {
      next();
      resetAuto();
    } else if (dragDelta > 50) {
      prev();
      resetAuto();
    }

    setDragging(false);
    setDragDelta(0);
  };

  if (total === 0) return null;

  if (total === 1) {
    return (
      <div
        className="group overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white shadow-[0_16px_45px_rgba(31,42,31,0.055)] sm:rounded-[30px] sm:shadow-[0_18px_55px_rgba(31,42,31,0.06)]"
        onClick={() => onOpenLightbox(0)}
      >
        <img
          src={images[0]}
          alt={title}
          className="aspect-[16/11] w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:aspect-[16/10]"
        />

        <div className="flex items-center justify-center border-t border-[#1F2A1F]/10 px-4 py-3 text-xs text-[#5F6756]">
          {t("portfolio_detail_zoom_hint")}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white shadow-[0_16px_45px_rgba(31,42,31,0.055)] sm:rounded-[30px] sm:shadow-[0_18px_55px_rgba(31,42,31,0.06)]">
      <div
        className="relative aspect-[16/11] w-full cursor-grab select-none overflow-hidden active:cursor-grabbing sm:aspect-[16/10]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(${-current * 100}% + ${dragDelta}px))`,
            transition: dragging
              ? "none"
              : "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
        >
          {images.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`${title} — ${t("portfolio_detail_image")} ${index + 1}`}
              draggable={false}
              className="h-full w-full shrink-0 cursor-zoom-in object-cover"
              onClick={() => {
                if (Math.abs(dragDelta) < 5) onOpenLightbox(index);
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-black/20 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-black/20 to-transparent sm:w-20" />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            prev();
            resetAuto();
          }}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1F2A1F] shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
          aria-label={t("portfolio_detail_prev_image")}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
            resetAuto();
          }}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1F2A1F] shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
          aria-label={t("portfolio_detail_next_image")}
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur-sm sm:bottom-4 sm:right-4">
          {current + 1} / {total}
        </div>
      </div>

      <div className="border-t border-[#1F2A1F]/10 px-4 py-4">
        <div className="mb-3 flex items-center justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                goTo(index);
                resetAuto();
              }}
              aria-label={`${t("portfolio_detail_image")} ${index + 1}`}
              style={{
                width: index === current ? "22px" : "7px",
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
              className={`h-1.5 rounded-full ${
                index === current
                  ? "bg-[#004B08]"
                  : "bg-[#1F2A1F]/20 hover:bg-[#1F2A1F]/40"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, index) => (
            <button
              key={`${src}-thumb-${index}`}
              type="button"
              onClick={() => {
                goTo(index);
                resetAuto();
              }}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                index === current
                  ? "scale-105 border-[#004B08] opacity-100"
                  : "border-transparent opacity-55 hover:opacity-85"
              }`}
              aria-label={`${t("portfolio_detail_view_image")} ${index + 1}`}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="h-12 w-16 object-cover sm:h-14 sm:w-20"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Lightbox
────────────────────────────────────────────────────────────── */

function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const { t } = useT();

  const [current, setCurrent] = useState(startIndex);
  const total = images.length;

  const next = () => setCurrent((currentIndex) => (currentIndex + 1) % total);
  const prev = () =>
    setCurrent((currentIndex) => (currentIndex - 1 + total) % total);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-5 sm:top-5"
        onClick={onClose}
        aria-label={t("portfolio_detail_close")}
      >
        <X size={20} />
      </button>

      {total > 1 && (
        <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      )}

      {total > 1 && (
        <button
          type="button"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-4 sm:h-11 sm:w-11"
          onClick={(event) => {
            event.stopPropagation();
            prev();
          }}
          aria-label={t("portfolio_detail_previous")}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <img
        src={images[current]}
        alt={`${title} — ${current + 1}`}
        className="max-h-[84vh] max-w-[86vw] rounded-2xl object-contain shadow-2xl sm:max-h-[88vh] sm:max-w-[88vw]"
        onClick={(event) => event.stopPropagation()}
      />

      {total > 1 && (
        <button
          type="button"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-4 sm:h-11 sm:w-11"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          aria-label={t("portfolio_detail_next")}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setCurrent(index);
              }}
              style={{
                width: index === current ? "20px" : "6px",
                transition: "width 0.3s ease",
              }}
              className={`h-1.5 rounded-full ${
                index === current ? "bg-white" : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`${t("portfolio_detail_image")} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Tech Badge
────────────────────────────────────────────────────────────── */

function TechBadge({ name, index }: { name: string; index: number }) {
  const logo = getTechLogo(name);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 70);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease ${index * 0.04}s, transform 0.4s ease ${
          index * 0.04
        }s`,
      }}
      className="group flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#1F2A1F]/10 bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(31,42,31,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99A3D]/55 hover:shadow-[0_14px_34px_rgba(31,42,31,0.08)] sm:px-4 sm:py-3"
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-5 w-5 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-lg bg-[#004B08]/10 text-[9px] font-bold text-[#004B08] sm:h-6 sm:w-6 sm:text-[10px]">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}

      <span className="truncate text-sm font-medium text-[#1F2A1F]">
        {name}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Small UI
────────────────────────────────────────────────────────────── */

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-2 text-xs text-white/75 backdrop-blur-md sm:px-4 sm:text-sm">
      <Icon size={13} className="shrink-0 text-[#E0C16A]" />
      <span className="leading-none">{children}</span>
    </div>
  );
}

// Tambah helper di atas komponen PortfolioDetail
function useLocalizedDescription(item: PortfolioItem | null, lang: Lang) {
  if (!item) return "";
  return lang === "en" && item.en_description
    ? item.en_description
    : item.description;
}

/* ──────────────────────────────────────────────────────────────
   Main Page
────────────────────────────────────────────────────────────── */

export function PortfolioDetail() {
  const { t, lang } = useT();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [pageVisible, setPageVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const description = useLocalizedDescription(item, lang);

  useEffect(() => {
    const pageTimer = setTimeout(() => setPageVisible(true), 50);
    const heroTimer = setTimeout(() => setHeroVisible(true), 100);

    return () => {
      clearTimeout(pageTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    listPortfolioItems()
      .then((items) => {
        const found = items.find((portfolioItem) => portfolioItem.id === id);

        console.log("found item:", found); // ← tambah ini
        console.log("lang:", lang);

        if (!found) {
          navigate("/portfolio", { replace: true });
          return;
        }

        setItem(found);
        setAllItems(
          items.filter((portfolioItem) => portfolioItem.id !== id).slice(0, 3),
        );
      })
      .catch(() => navigate("/portfolio", { replace: true }))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#004B08]/20 border-t-[#004B08]" />
          <p className="text-sm text-[#5F6756]">
            {t("portfolio_detail_loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const images =
    item.images && item.images.length > 0 ? item.images : [item.coverImage];

  const contactService =
    item.type === "Website"
      ? "website"
      : item.type === "Mobile Apps"
        ? "mobile-app"
        : "ai-ml";

  return (
    <div
      className="min-h-screen bg-[#f5f5f5]"
      style={{
        opacity: pageVisible ? 1 : 0,
        transform: pageVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          title={item.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <section className="relative overflow-hidden bg-[#102417] pt-28 pb-20 text-white sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#102417_0%,#173323_46%,#102417_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="pointer-events-none absolute -left-32 top-20 h-[360px] w-[360px] rounded-full bg-[#C99A3D]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-[-140px] top-0 h-[460px] w-[460px] rounded-full bg-[#004B08]/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-140px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div
            className="max-w-5xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <Link
              to="/portfolio"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/70 backdrop-blur transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              <ChevronLeft size={16} />
              {t("portfolio_detail_back")}
            </Link>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.35rem,8vw,4.8rem)] font-semibold leading-[1.02] tracking-tight text-white">
              {item.title}
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/68 ...">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MetaPill icon={Tag}>{item.type}</MetaPill>

              <MetaPill icon={Calendar}>
                {new Date(item.createdAt).toLocaleDateString(
                  lang === "id" ? "id-ID" : "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </MetaPill>

              {item.keyFeatures.length > 0 && (
                <MetaPill icon={Zap}>
                  {item.keyFeatures.length}{" "}
                  {t("portfolio_detail_features_count")}
                </MetaPill>
              )}

              {item.techStack.length > 0 && (
                <MetaPill icon={Layers}>
                  {item.techStack.length} {t("portfolio_detail_tech_count")}
                </MetaPill>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 lg:pb-20">
          <div
            className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] lg:items-start"
            style={{
              opacity: pageVisible ? 1 : 0,
              transform: pageVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div id="project-gallery" className="space-y-8 scroll-mt-28">
              <Carousel
                images={images}
                title={item.title}
                onOpenLightbox={(index) => setLightboxIndex(index)}
              />

              {item.techStack.length > 0 && (
                <section className="rounded-[24px] border border-[#1F2A1F]/10 bg-white p-5 shadow-[0_14px_45px_rgba(31,42,31,0.045)] sm:rounded-[30px] sm:p-7">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]/70">
                        {t("portfolio_detail_tech_stack")}
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-[#1F2A1F] sm:text-2xl">
                        {t("portfolio_detail_tech_title")}
                      </h2>
                    </div>

                    <span className="rounded-full bg-[#1F2A1F]/[0.06] px-4 py-2 text-xs text-[#5F6756]">
                      {item.techStack.length} {t("portfolio_detail_tech_count")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {item.techStack.map((tech, index) => (
                      <TechBadge
                        key={`${tech}-${index}`}
                        name={tech}
                        index={index}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              {item.keyFeatures.length > 0 && (
                <section className="rounded-[24px] border border-[#1F2A1F]/10 bg-white p-5 shadow-[0_14px_45px_rgba(31,42,31,0.045)] sm:rounded-[30px] sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]/70">
                    {t("portfolio_detail_key_features")}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-[#1F2A1F] sm:text-2xl">
                    {t("portfolio_detail_features_title")}
                  </h2>

                  <ul className="mt-6 space-y-3">
                    {item.keyFeatures.map((feature, index) => (
                      <li
                        key={`${feature}-${index}`}
                        className="grid grid-cols-[10px_1fr] gap-3 rounded-2xl border border-[#1F2A1F]/[0.08] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-[#5F6756]"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#004B08]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Link
                to={`/contact?service=${contactService}`}
                className="group flex items-center justify-between gap-5 rounded-[24px] border border-[#004B08]/15 bg-[#004B08]/[0.06] px-5 py-5 text-[#004B08] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#004B08]/25 hover:bg-[#004B08] hover:text-[#F3EFDF] sm:rounded-[30px] sm:px-7 sm:py-6"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-65">
                    {t("portfolio_detail_cta_eyebrow")}
                  </p>

                  <p className="mt-2 text-base font-semibold sm:text-lg">
                    {t("portfolio_detail_cta_title")}
                  </p>
                </div>

                <ArrowUpRight
                  size={22}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </aside>
          </div>

          {allItems.length > 0 && (
            <section className="mt-16 border-t border-[#1F2A1F]/10 pt-12 sm:mt-20 sm:pt-14">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]/70">
                    {t("portfolio_detail_more_eyebrow")}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1F2A1F] sm:text-3xl">
                    {t("portfolio_detail_other_projects")}
                  </h2>
                </div>

                <Link
                  to="/portfolio"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#004B08] hover:underline"
                >
                  {t("portfolio_detail_view_all")}
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {allItems.map((project) => (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.id}`}
                    className="group block"
                  >
                    <article className="overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white shadow-[0_12px_38px_rgba(31,42,31,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(31,42,31,0.075)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#1F2A1F]">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />

                        {project.images && project.images.length > 1 && (
                          <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm">
                            +{project.images.length - 1}{" "}
                            {t("portfolio_detail_photos")}
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#004B08]">
                          {project.type}
                        </p>

                        <h3 className="mt-2 truncate text-base font-semibold text-[#1F2A1F]">
                          {project.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5F6756]">
                          {lang === "en" && project.en_description
                            ? project.en_description
                            : project.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
