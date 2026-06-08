// NOTE: This admin page is intentionally not linked from any public navigation.
// TODO: Protect this route with authentication once an auth system is in place.

import { useEffect, useState } from "react";
import { ArrowUpRight, Image as ImageIcon, Trash2 } from "lucide-react";
import { useT } from "../providers";
import {
  addAdminPortfolioItem,
  listAdminPortfolioItems,
  removeAdminPortfolioItem,
  type AdminPortfolioItem,
  type PortfolioType,
} from "../data/portfolioStore";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PROJECT_TYPES: PortfolioType[] = ["Website", "Mobile Apps", "AI/ML"];

const TITLE_MAX_LENGTH = 45;
const DESCRIPTION_MAX_LENGTH = 130;

export function AdminPortfolio() {
  const { t } = useT();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<PortfolioType | "">("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [deletedNotice, setDeletedNotice] = useState(false);
  const [items, setItems] = useState<AdminPortfolioItem[]>([]);

  useEffect(() => {
    setItems(listAdminPortfolioItems());
  }, []);

  const validateForm = () => {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !type || !cleanDescription || !coverImage) {
      return t("admin_validation");
    }

    if (cleanTitle.length > TITLE_MAX_LENGTH) {
      return `Judul maksimal ${TITLE_MAX_LENGTH} karakter.`;
    }

    if (cleanDescription.length > DESCRIPTION_MAX_LENGTH) {
      return `Deskripsi maksimal ${DESCRIPTION_MAX_LENGTH} karakter.`;
    }

    return "";
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess(false);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setCoverImage("");
      setError(t("admin_file_type"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result ?? "");

      if (!result) {
        setCoverImage("");
        setError("Gagal membaca file gambar. Coba upload gambar lain.");
        return;
      }

      setCoverImage(result);
    };

    reader.onerror = () => {
      setCoverImage("");
      setError("Gagal membaca file gambar. Coba upload gambar lain.");
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const validationMessage = validateForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const created = addAdminPortfolioItem({
      title: title.trim(),
      type: type as PortfolioType,
      description: description.trim(),
      coverImage,
    });

    setItems([created, ...items]);

    setTitle("");
    setType("");
    setDescription("");
    setCoverImage("");

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  const onDelete = (id: string) => {
    if (!window.confirm(t("admin_delete_confirm"))) return;

    removeAdminPortfolioItem(id);

    setItems((prev) => prev.filter((it) => it.id !== id));

    setDeletedNotice(true);
    setTimeout(() => setDeletedNotice(false), 3500);
  };

  const previewReady = title.trim() || description.trim() || coverImage;

  const titleTooLong = title.length > TITLE_MAX_LENGTH;
  const descriptionTooLong = description.length > DESCRIPTION_MAX_LENGTH;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f5f5] px-6 pb-20 pt-16 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] admin-texture" />
      <div className="pointer-events-none absolute -top-44 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 left-[-180px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-[#004B08]/70">
            {t("admin_label")}
          </div>

          <h1 className="text-3xl tracking-tight text-[#1F2A1F]">
            {t("admin_title")}
          </h1>

          <p className="mt-2 max-w-2xl text-[#5F6756]">
            {t("admin_subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur lg:col-span-3 lg:p-8"
          >
            <AdminField label={t("admin_field_title")} required>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                className={`${adminInput} ${
                  titleTooLong ? "border-[#C99A3D]" : ""
                }`}
                type="text"
                maxLength={TITLE_MAX_LENGTH}
              />

              <div className="mt-1 flex justify-between gap-3 text-xs">
                <p className="text-[#5F6756]">
                  Maksimal {TITLE_MAX_LENGTH} karakter agar judul tetap rapi di
                  card.
                </p>

                <p
                  className={
                    titleTooLong ? "text-[#C99A3D]" : "text-[#5F6756]"
                  }
                >
                  {title.length}/{TITLE_MAX_LENGTH}
                </p>
              </div>
            </AdminField>

            <AdminField label={t("admin_field_type")} required>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as PortfolioType);
                  setError("");
                  setSuccess(false);
                }}
                className={adminInput}
              >
                <option value="">{t("admin_select_type")}</option>
                {PROJECT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </AdminField>

            <AdminField label={t("admin_field_desc")} required>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                rows={5}
                maxLength={DESCRIPTION_MAX_LENGTH}
                className={`${adminInput} ${
                  descriptionTooLong ? "border-[#C99A3D]" : ""
                }`}
              />

              <div className="mt-1 flex justify-between gap-3 text-xs">
                <p className="text-[#5F6756]">
                  Maksimal {DESCRIPTION_MAX_LENGTH} karakter agar tinggi card
                  tetap konsisten.
                </p>

                <p
                  className={
                    descriptionTooLong ? "text-[#C99A3D]" : "text-[#5F6756]"
                  }
                >
                  {description.length}/{DESCRIPTION_MAX_LENGTH}
                </p>
              </div>
            </AdminField>

            <AdminField label={t("admin_field_cover")} required>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[#1F2A1F]/15 bg-[#f5f5f5]/80 px-4 py-6 text-[#5F6756] transition-colors hover:border-[#C99A3D]/70 hover:bg-white">
                <ImageIcon size={18} />
                <span className="text-sm">{t("admin_upload_hint")}</span>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={onFile}
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs leading-relaxed text-[#5F6756]">
                Rekomendasi gambar: 1200 × 900 px, rasio 4:3, format WebP/JPG.
              </p>

              {coverImage && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              )}
            </AdminField>

            {error && (
              <p className="rounded-2xl border border-[#C99A3D]/30 bg-[#C99A3D]/10 px-4 py-3 text-sm text-[#8A641E]">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-2xl border border-[#004B08]/20 bg-[#004B08]/10 px-4 py-3 text-sm text-[#004B08]">
                {t("admin_success")}
              </p>
            )}

            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-[#004B08] px-6 py-3 text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A]"
            >
              {t("admin_submit")}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </form>

          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur">
              <h2 className="mb-4 text-sm uppercase tracking-[0.22em] text-[#004B08]/60">
                {t("admin_preview")}
              </h2>

              {previewReady ? (
                <article className="overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70">
                  <div className="aspect-[4/3] bg-[#f5f5f5]">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-[#5F6756]/60">
                        {t("admin_no_cover")}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {type && (
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#004B08]">
                        {type}
                      </div>
                    )}

                    <h3 className="mb-3 line-clamp-2 text-xl leading-snug text-[#1F2A1F]">
                      {title || t("admin_no_title")}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-[#5F6756]">
                      {description || t("admin_no_desc")}
                    </p>
                  </div>
                </article>
              ) : (
                <p className="text-sm leading-relaxed text-[#5F6756]">
                  {t("admin_preview_hint")}
                </p>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl text-[#1F2A1F]">
              {t("admin_list_title")}
            </h2>

            {deletedNotice && (
              <span className="text-sm text-[#004B08]">
                {t("admin_delete_success")}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#1F2A1F]/15 bg-white/60 p-10 text-center text-[#5F6756]">
              {t("admin_empty_full")}
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="flex gap-4 rounded-[24px] border border-[#1F2A1F]/10 bg-white/70 p-4 shadow-[0_12px_40px_rgba(31,42,31,0.045)] backdrop-blur"
                >
                  <img
                    src={it.coverImage}
                    alt={it.title}
                    className="h-24 w-24 flex-shrink-0 rounded-2xl border border-[#1F2A1F]/10 object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#004B08]">
                      {it.type}
                    </div>

                    <h3 className="mb-1 truncate leading-snug text-[#1F2A1F]">
                      {it.title}
                    </h3>

                    <p className="line-clamp-2 text-sm leading-relaxed text-[#5F6756]">
                      {it.description}
                    </p>

                    <div className="mt-auto pt-3">
                      <button
                        type="button"
                        onClick={() => onDelete(it.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2A1F]/10 px-3 py-1.5 text-sm text-[#1F2A1F] transition-colors hover:border-[#C99A3D] hover:text-[#C99A3D]"
                      >
                        <Trash2 size={14} />
                        {t("admin_delete")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        @keyframes adminTextureMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 72px 72px;
          }
        }

        .admin-texture {
          background-image:
            linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
          background-size: 72px 72px;
          animation: adminTextureMove 24s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .admin-texture {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

const adminInput =
  "w-full rounded-2xl border border-[#1F2A1F]/10 bg-white px-4 py-3 text-[#1F2A1F] placeholder:text-[#5F6756]/60 transition-colors focus:border-[#C99A3D] focus:outline-none";

function AdminField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#1F2A1F]">
        {label} {required && <span className="text-[#C99A3D]">*</span>}
      </span>

      {children}
    </label>
  );
}