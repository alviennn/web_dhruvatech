import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  X,
  Zap,
  Layers,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { listPortfolioItems, type PortfolioItem } from "../data/api/api";
import { getTechLogo } from "../data/techLogos";

// ── Carousel ──────────────────────────────────────────────────────────────────

function Carousel({
  images,
  title,
  onOpenLightbox,
}: {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance setiap 4 detik
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (total <= 1) return;
    autoRef.current = setInterval(next, 4000);
  }, [next, total]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [resetAuto]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        next();
        resetAuto();
      }
      if (e.key === "ArrowLeft") {
        prev();
        resetAuto();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, resetAuto]);

  // Touch/drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setDragStartX(e.clientX);
    setDragDelta(0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragDelta(e.clientX - dragStartX);
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

  // Single image — tampilan lama
  if (total === 1) {
    return (
      <div
        className="group cursor-zoom-in overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white shadow-[0_16px_60px_rgba(31,42,31,0.10)]"
        onClick={() => onOpenLightbox(0)}
      >
        <img
          src={images[0]}
          alt={title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="flex items-center justify-center gap-2 py-3 text-xs text-[#5F6756]">
          <span>Klik untuk perbesar</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#1F2A1F]/10 bg-white shadow-[0_16px_60px_rgba(31,42,31,0.10)]">
      {/* Main image */}
      <div
        className="relative aspect-[16/10] w-full select-none overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Slide strip */}
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
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} — gambar ${i + 1}`}
              draggable={false}
              className="h-full w-full shrink-0 object-cover"
              onClick={() => {
                if (Math.abs(dragDelta) < 5) onOpenLightbox(i);
              }}
            />
          ))}
        </div>

        {/* Gradient overlay kiri/kanan */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent" />

        {/* Tombol prev/next */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
            resetAuto();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1F2A1F] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
          aria-label="Gambar sebelumnya"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
            resetAuto();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1F2A1F] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
          aria-label="Gambar berikutnya"
        >
          <ChevronRight size={18} />
        </button>

        {/* Counter badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      </div>

      {/* Dot indicators + thumbnail strip */}
      <div className="border-t border-[#1F2A1F]/6 px-4 py-3">
        {/* Dots */}
        <div className="mb-3 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                goTo(i);
                resetAuto();
              }}
              aria-label={`Gambar ${i + 1}`}
              style={{
                width: i === current ? "20px" : "6px",
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
              className={`h-1.5 rounded-full ${
                i === current
                  ? "bg-[#004B08]"
                  : "bg-[#1F2A1F]/20 hover:bg-[#1F2A1F]/40"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                goTo(i);
                resetAuto();
              }}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === current
                  ? "border-[#004B08] opacity-100 scale-105"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
              style={{ transition: "all 0.25s ease" }}
              aria-label={`Lihat gambar ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="h-14 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Lightbox (support multiple) ───────────────────────────────────────────────

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
  const [current, setCurrent] = useState(startIndex);
  const total = images.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Tutup"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      )}

      {/* Prev */}
      {total > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Sebelumnya"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[current]}
        alt={`${title} — ${current + 1}`}
        className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ transition: "opacity 0.2s ease" }}
      />

      {/* Next */}
      {total > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Berikutnya"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot strip */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              style={{
                width: i === current ? "20px" : "6px",
                transition: "width 0.3s ease",
              }}
              className={`h-1.5 rounded-full ${i === current ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tech Badge ────────────────────────────────────────────────────────────────

function TechBadge({ name, index }: { name: string; index: number }) {
  const logo = getTechLogo(name);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-6px) scale(1.08)"
            : "translateY(0) scale(1)"
          : "translateY(16px) scale(0.92)",
        transition: visible
          ? "opacity 0.4s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease"
          : `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
        boxShadow: hovered
          ? "0 12px 35px rgba(31,42,31,0.15), 0 4px 12px rgba(31,42,31,0.08)"
          : "0 4px 20px rgba(31,42,31,0.06)",
      }}
      className={`group flex items-center gap-2.5 rounded-2xl border px-4 py-3 cursor-default ${
        hovered
          ? "border-[#C99A3D]/60 bg-white"
          : "border-[#1F2A1F]/10 bg-white"
      }`}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          style={{
            transform: hovered
              ? "scale(1.2) rotate(-4deg)"
              : "scale(1) rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="h-6 w-6 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div
          style={{
            transform: hovered ? "scale(1.2) rotate(-4deg)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="h-6 w-6 rounded-lg bg-[#004B08]/10 flex items-center justify-center shrink-0"
        >
          <span className="text-[10px] font-bold text-[#004B08]">
            {name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <span
        style={{
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "transform 0.25s ease",
        }}
        className="text-sm font-medium text-[#1F2A1F]"
      >
        {name}
      </span>

      {/* Tooltip */}
      <div
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(-4px)" : "translateY(0px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: "none",
        }}
        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1F2A1F] px-3 py-1 text-xs text-white shadow-lg"
      >
        {name}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2A1F]" />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [pageVisible, setPageVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 100);
    const t2 = setTimeout(() => setPageVisible(true), 50);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    listPortfolioItems()
      .then((items) => {
        const found = items.find((p) => p.id === id);
        if (!found) navigate("/portfolio", { replace: true });
        else {
          setItem(found);
          setAllItems(items.filter((p) => p.id !== id).slice(0, 3));
        }
      })
      .catch(() => navigate("/portfolio", { replace: true }))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#004B08]/20 border-t-[#004B08]" />
          <p className="text-sm text-[#5F6756]">Memuat project...</p>
        </div>
      </div>
    );
  }

  if (!item) return null;

  // Ambil images array, fallback ke coverImage saja
  const images: string[] =
    item.images && item.images.length > 0 ? item.images : [item.coverImage];

  return (
    <div
      className="min-h-screen bg-[#f5f5f5]"
      style={{
        opacity: pageVisible ? 1 : 0,
        transform: pageVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          title={item.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#1F2A1F] pb-14 pt-8 lg:pb-20 lg:pt-10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] hero-grid" />
        <div className="pointer-events-none absolute -top-32 right-[-100px] h-[400px] w-[400px] rounded-full bg-[#004B08]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-[-100px] h-[400px] w-[400px] rounded-full bg-[#C99A3D]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 lg:pt-27">
          <div
            className="max-w-3xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <h1 className="text-3xl font-medium leading-tight text-white lg:text-5xl">
              {item.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/60 lg:text-lg">
              {item.description}
            </p>

            {/* Meta pills */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/60">
                <Tag size={13} />
                {item.type}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/60">
                <Calendar size={13} />
                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {item.keyFeatures.length > 0 && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/60">
                  <Zap size={13} />
                  {item.keyFeatures.length} Fitur
                </div>
              )}
              {item.techStack.length > 0 && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/60">
                  <Layers size={13} />
                  {item.techStack.length} Teknologi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] detail-texture" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <div
            className="grid gap-8 lg:grid-cols-3"
            style={{
              opacity: pageVisible ? 1 : 0,
              transform: pageVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            {/* Left — carousel + tech stack */}
            <div className="space-y-6 lg:col-span-2">
              <Carousel
                images={images}
                title={item.title}
                onOpenLightbox={(i) => setLightboxIndex(i)}
              />

              {/* Tech Stack */}
              {item.techStack.length > 0 && (
                <div className="rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-7 shadow-[0_8px_40px_rgba(31,42,31,0.05)] backdrop-blur">
                  <div className="mb-5 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5F6756]/10">
                      <Layers size={15} className="text-[#5F6756]" />
                    </div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F6756]/70">
                      Tech Stack
                    </h2>
                    <span className="ml-auto rounded-full bg-[#1F2A1F]/6 px-3 py-1 text-xs text-[#5F6756]">
                      {item.techStack.length} teknologi
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 pb-4">
                    {item.techStack.map((tech, i) => (
                      <div key={i} className="relative">
                        <TechBadge name={tech} index={i} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — fitur + CTA */}
            <div className="space-y-5">
              {item.keyFeatures.length > 0 && (
                <div className="rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-6 shadow-[0_8px_40px_rgba(31,42,31,0.05)] backdrop-blur">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#004B08]/10">
                      <Zap size={15} className="text-[#004B08]" />
                    </div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F6756]/70">
                      Fitur Kunci
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {item.keyFeatures.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-2xl border border-[#004B08]/10 bg-[#004B08]/[0.03] px-4 py-3 text-sm text-[#1F2A1F]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#004B08]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/contact?service=${item.type === "Website" ? "website" : item.type === "Mobile Apps" ? "mobile-app" : "ai-ml"}`}
                className="group flex items-center justify-between gap-3 rounded-[24px] border border-[#004B08]/20 bg-[#004B08] px-6 py-5 shadow-[0_16px_40px_rgba(0,75,8,0.18)] transition-all hover:bg-[#24452A]"
              >
                <div>
                  <p className="text-xs text-[#F3EFDF]/60">
                    Tertarik project seperti ini?
                  </p>
                  <p className="mt-0.5 font-medium text-[#F3EFDF]">
                    Diskusi Project Kamu
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-[#F3EFDF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Other Projects */}
          {allItems.length > 0 && (
            <div className="mt-16 pb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl text-[#1F2A1F]">Project Lainnya</h2>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-1.5 text-sm text-[#004B08] hover:underline"
                >
                  Lihat semua <ArrowUpRight size={14} />
                </Link>
              </div>
              <div
                className="grid gap-8 lg:grid-cols-3"
                style={{
                  opacity: pageVisible ? 1 : 0,
                  transform: pageVisible ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                }}
              >
                {allItems.map((p) => (
                  <Link
                    key={p.id}
                    to={`/portfolio/${p.id}`}
                    className="group block"
                  >
                    <article className="overflow-hidden rounded-[22px] border border-[#1F2A1F]/10 bg-white/70 shadow-[0_8px_30px_rgba(31,42,31,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(31,42,31,0.09)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#1F2A1F]">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        {/* Badge jumlah gambar */}
                        {p.images && p.images.length > 1 && (
                          <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                            +{p.images.length - 1} foto
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#004B08]">
                          {p.type}
                        </div>
                        <h3 className="truncate text-base font-medium text-[#1F2A1F]">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5F6756]">
                          {p.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .detail-texture {
          background-image:
            linear-gradient(rgba(31,42,31,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,42,31,0.055) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
