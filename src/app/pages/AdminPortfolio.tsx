// Admin page — dilindungi login, connect ke backend Express
// File ini menggantikan src/app/pages/AdminPortfolio.tsx

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Image as ImageIcon,
  Trash2,
  LogOut,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useT } from "../providers";
import {
  loginAdmin,
  verifyToken,
  removeToken,
  isLoggedIn,
  listPortfolioItems,
  addPortfolioItem,
  deletePortfolioItem,
  changePassword,
  type PortfolioItem,
  type PortfolioType,
} from "../data/api/api";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PROJECT_TYPES: PortfolioType[] = ["Website", "Mobile Apps", "AI/ML"];
const TITLE_MAX_LENGTH = 45;
const DESCRIPTION_MAX_LENGTH = 130;

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginAdmin(username.trim(), password);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/80 p-8 shadow-[0_24px_80px_rgba(31,42,31,0.09)] backdrop-blur">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004B08]/10">
              <Lock size={22} className="text-[#004B08]" />
            </div>
            <h1 className="text-2xl tracking-tight text-[#1F2A1F]">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-[#5F6756]">
              Dhruva Tech Portfolio Admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-[#1F2A1F]">
                Username <span className="text-[#C99A3D]">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className={adminInput}
                placeholder="admin"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#1F2A1F]">
                Password <span className="text-[#C99A3D]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`${adminInput} pr-12`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F6756] hover:text-[#1F2A1F]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-[#C99A3D]/30 bg-[#C99A3D]/10 px-4 py-3 text-sm text-[#8A641E]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#004B08] px-6 py-3 text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Masuk..." : "Masuk"}
              {!loading && (
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Change Password Modal ─────────────────────────────────────────────────────

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPw.length < 6) {
      setError("Password baru minimal 6 karakter.");
      return;
    }
    setLoading(true);
    try {
      await changePassword(currentPw, newPw);
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal ubah password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm rounded-[28px] border border-[#1F2A1F]/10 bg-white p-7 shadow-2xl">
        <h2 className="mb-5 text-lg text-[#1F2A1F]">Ganti Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            className={adminInput}
            placeholder="Password lama"
          />
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className={adminInput}
            placeholder="Password baru (min. 6 karakter)"
          />
          {error && <p className="text-sm text-[#8A641E]">{error}</p>}
          {success && (
            <p className="text-sm text-[#004B08]">Password berhasil diubah!</p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-[#1F2A1F]/15 px-4 py-2.5 text-sm text-[#1F2A1F] hover:bg-[#f5f5f5]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-[#004B08] px-4 py-2.5 text-sm text-[#F3EFDF] hover:bg-[#24452A] disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────

export function AdminPortfolio() {
  const { t } = useT();
  const [authed, setAuthed] = useState<boolean | null>(null); // null = loading

  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<PortfolioType | "">("");
  const [description, setDescription] = useState("");
  const [keyFeatures, setKeyFeatures] = useState(""); // comma-separated input
  const [techStack, setTechStack] = useState(""); // comma-separated input
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [deletedNotice, setDeletedNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [showChangePw, setShowChangePw] = useState(false);

  // Check auth on mount
  useEffect(() => {
    if (!isLoggedIn()) {
      setAuthed(false);
      return;
    }
    verifyToken().then((user) => {
      setAuthed(!!user);
    });
  }, []);

  // Fetch items when authed
  useEffect(() => {
    if (!authed) return;
    listPortfolioItems()
      .then(setItems)
      .catch(() =>
        setFetchError("Gagal memuat data. Pastikan backend berjalan."),
      );
  }, [authed]);

  const handleLogout = () => {
    removeToken();
    setAuthed(false);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSuccess(false);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return;
    }
    setCoverImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!title.trim() || !type || !description.trim() || !coverImageFile) {
      setError("Semua field wajib diisi, termasuk gambar cover.");
      return;
    }
    if (title.trim().length > TITLE_MAX_LENGTH) {
      setError(`Judul maksimal ${TITLE_MAX_LENGTH} karakter.`);
      return;
    }
    if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      setError(`Deskripsi maksimal ${DESCRIPTION_MAX_LENGTH} karakter.`);
      return;
    }

    const features = keyFeatures
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const techs = techStack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      const created = await addPortfolioItem({
        title: title.trim(),
        type: type as PortfolioType,
        description: description.trim(),
        keyFeatures: features,
        techStack: techs,
        coverImageFile,
      });

      setItems((prev) => [created, ...prev]);
      setTitle("");
      setType("");
      setDescription("");
      setKeyFeatures("");
      setTechStack("");
      setCoverImageFile(null);
      setCoverPreview("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePortfolioItem(deleteId);
      setItems((prev) => prev.filter((it) => it.id !== deleteId));
      setDeletedNotice(true);
      setTimeout(() => setDeletedNotice(false), 3500);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setDeleteId(null);
    }
  };

  // ── Render States ──
  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-[#5F6756]">Memuat...</p>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  const titleTooLong = title.length > TITLE_MAX_LENGTH;
  const descriptionTooLong = description.length > DESCRIPTION_MAX_LENGTH;
  const previewReady = title.trim() || description.trim() || coverPreview;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f5f5] px-6 pb-20 pt-16 lg:px-10">
      {showChangePw && (
        <ChangePasswordModal onClose={() => setShowChangePw(false)} />
      )}

      <div className="pointer-events-none absolute inset-0 opacity-[0.14] admin-texture" />
      <div className="pointer-events-none absolute -top-44 right-[-180px] h-[560px] w-[560px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 left-[-180px] h-[560px] w-[560px] rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.24em] text-[#004B08]/70">
              Admin Panel
            </div>
            <h1 className="text-3xl tracking-tight text-[#1F2A1F]">
              Kelola Portfolio
            </h1>
            <p className="mt-2 max-w-2xl text-[#5F6756]">
              Tambah, lihat, dan hapus project portfolio yang tampil di halaman
              publik.
            </p>
          </div>

          {/* Admin actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowChangePw(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#1F2A1F]/15 px-4 py-2.5 text-sm text-[#1F2A1F] hover:bg-white transition-colors"
            >
              <Lock size={14} />
              Ganti Password
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-[#1F2A1F]/15 px-4 py-2.5 text-sm text-[#1F2A1F] hover:bg-white transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {fetchError && (
          <div className="mb-6 rounded-2xl border border-[#C99A3D]/30 bg-[#C99A3D]/10 px-5 py-4 text-sm text-[#8A641E]">
            ⚠️ {fetchError}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur lg:col-span-3 lg:p-8"
          >
            <h2 className="text-base text-[#1F2A1F] font-medium">
              Tambah Project Baru
            </h2>

            {/* Title */}
            <AdminField label="Nama Project" required>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                className={`${adminInput} ${titleTooLong ? "border-[#C99A3D]" : ""}`}
                type="text"
                placeholder="Contoh: Dashboard Manajemen Klinik"
                maxLength={TITLE_MAX_LENGTH}
              />
              <div className="mt-1 flex justify-between gap-3 text-xs">
                <p className="text-[#5F6756]">
                  Maksimal {TITLE_MAX_LENGTH} karakter.
                </p>
                <p
                  className={titleTooLong ? "text-[#C99A3D]" : "text-[#5F6756]"}
                >
                  {title.length}/{TITLE_MAX_LENGTH}
                </p>
              </div>
            </AdminField>

            {/* Type */}
            <AdminField label="Kategori" required>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as PortfolioType);
                  setError("");
                  setSuccess(false);
                }}
                className={adminInput}
              >
                <option value="">Pilih kategori...</option>
                {PROJECT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </AdminField>

            {/* Description */}
            <AdminField label="Deskripsi Singkat" required>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                rows={4}
                maxLength={DESCRIPTION_MAX_LENGTH}
                className={`${adminInput} ${descriptionTooLong ? "border-[#C99A3D]" : ""}`}
                placeholder="Cerita singkat tentang project ini..."
              />
              <div className="mt-1 flex justify-between gap-3 text-xs">
                <p className="text-[#5F6756]">
                  Maksimal {DESCRIPTION_MAX_LENGTH} karakter.
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

            {/* Key Features */}
            <AdminField label="Fitur Kunci">
              <input
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                className={adminInput}
                type="text"
                placeholder="Admin Dashboard, Laporan PDF, Multi-User"
              />
              <p className="mt-1 text-xs text-[#5F6756]">
                Pisahkan dengan koma. Contoh: Login Admin, Export Excel,
                Notifikasi
              </p>
            </AdminField>

            {/* Tech Stack */}
            <AdminField label="Tech Stack">
              <input
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className={adminInput}
                type="text"
                placeholder="React, Node.js, PostgreSQL, Tailwind"
              />
              <p className="mt-1 text-xs text-[#5F6756]">
                Pisahkan dengan koma. Contoh: React, Express, MySQL
              </p>
            </AdminField>

            {/* Cover Image */}
            <AdminField label="Gambar Cover" required>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[#1F2A1F]/15 bg-[#f5f5f5]/80 px-4 py-6 text-[#5F6756] transition-colors hover:border-[#C99A3D]/70 hover:bg-white">
                <ImageIcon size={18} />
                <span className="text-sm">
                  {coverImageFile
                    ? coverImageFile.name
                    : "Klik untuk upload gambar"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={onFile}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-xs leading-relaxed text-[#5F6756]">
                Rekomendasi: 1200×900px, rasio 4:3, format WebP/JPG, maks 5MB.
              </p>
              {coverPreview && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]">
                  <img
                    src={coverPreview}
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
                ✓ Project berhasil ditambahkan!
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-2 rounded-full bg-[#004B08] px-6 py-3 text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Tambah Project"}
              {!loading && (
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              )}
            </button>
          </form>

          {/* Live Preview */}
          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur">
              <h2 className="mb-4 text-sm uppercase tracking-[0.22em] text-[#004B08]/60">
                Preview Card
              </h2>
              {previewReady ? (
                <article className="overflow-hidden rounded-[26px] border border-[#1F2A1F]/10 bg-white/70">
                  <div className="aspect-[4/3] bg-[#f5f5f5]">
                    {coverPreview ? (
                      <img
                        src={coverPreview}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-[#5F6756]/60">
                        Belum ada gambar
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
                      {title || "Nama project..."}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#5F6756]">
                      {description || "Deskripsi project..."}
                    </p>

                    {/* Key Features Preview */}
                    {keyFeatures && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#004B08]/60">
                          Fitur Kunci
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {keyFeatures
                            .split(",")
                            .map((f) => f.trim())
                            .filter(Boolean)
                            .map((f, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-[#004B08]/8 px-3 py-1 text-xs text-[#004B08]"
                              >
                                {f}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Preview */}
                    {techStack && (
                      <div className="mt-3">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5F6756]/60">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {techStack
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-[#1F2A1F]/10 bg-white px-3 py-1 text-xs text-[#5F6756]"
                              >
                                {t}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ) : (
                <p className="text-sm leading-relaxed text-[#5F6756]">
                  Isi form di sebelah kiri untuk melihat preview card.
                </p>
              )}
            </div>
          </aside>
        </div>

        {/* Items List */}
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl text-[#1F2A1F]">
              Project Tersimpan ({items.length})
            </h2>
            {deletedNotice && (
              <span className="text-sm text-[#004B08]">
                ✓ Project berhasil dihapus.
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#1F2A1F]/15 bg-white/60 p-10 text-center text-[#5F6756]">
              Belum ada project. Tambahkan project pertamamu di form di atas.
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
                    className="h-24 w-24 flex-shrink-0 rounded-2xl border border-[#1F2A1F]/10 object-cover bg-[#f5f5f5]"
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

                    {/* Features & Techs mini badges */}
                    {(it.keyFeatures.length > 0 || it.techStack.length > 0) && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {it.keyFeatures.slice(0, 2).map((f, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[#004B08]/8 px-2 py-0.5 text-[10px] text-[#004B08]"
                          >
                            {f}
                          </span>
                        ))}
                        {it.techStack.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-[#1F2A1F]/10 px-2 py-0.5 text-[10px] text-[#5F6756]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-3">
                      <button
                        type="button"
                        onClick={() => setDeleteId(it.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1F2A1F]/10 px-3 py-1.5 text-sm text-[#1F2A1F] transition-colors hover:border-[#C99A3D] hover:text-[#C99A3D]"
                      >
                        <Trash2 size={14} />
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-sm rounded-[28px] border border-[#1F2A1F]/10 bg-white p-8 shadow-2xl">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C99A3D]/10">
              <Trash2 size={22} className="text-[#C99A3D]" />
            </div>
            <h2 className="mt-4 text-lg text-[#1F2A1F]">Hapus Project?</h2>
            <p className="mt-2 text-sm text-[#5F6756]">
              Project yang dihapus tidak bisa dikembalikan.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-full border border-[#1F2A1F]/15 px-4 py-2.5 text-sm text-[#1F2A1F] hover:bg-[#f5f5f5] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="flex-1 rounded-full bg-[#C99A3D] px-4 py-2.5 text-sm text-white hover:bg-[#a87e2f] transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes adminTextureMove {
          0% { background-position: 0 0; }
          100% { background-position: 72px 72px; }
        }
        .admin-texture {
          background-image:
            linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
          background-size: 72px 72px;
          animation: adminTextureMove 24s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .admin-texture { animation: none; }
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
