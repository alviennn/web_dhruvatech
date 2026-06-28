// API service — connect ke PHP backend
// File: src/app/data/api.ts

const API_URL = import.meta.env.VITE_API_URL;

const AUTH_URL = `${API_URL}/auth/`;
const PORTFOLIO_URL = `${API_URL}/portfolio/`;

export function getToken(): string | null {
  return localStorage.getItem("dt-admin-token");
}

export function setToken(token: string): void {
  localStorage.setItem("dt-admin-token", token);
}

export function removeToken(): void {
  localStorage.removeItem("dt-admin-token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type PortfolioType = "Website" | "Mobile Apps" | "AI/ML";

export type PortfolioItem = {
  id: string;
  title: string;
  type: PortfolioType;
  description: string;
  en_description: string;
  keyFeatures: string[];
  techStack: string[];
  coverImage: string;
  images: string[];
  createdAt: string;
};

async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Response server bukan JSON valid.");
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${AUTH_URL}?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Login gagal.");

  setToken(data.token);
  return data;
}

export async function verifyToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${AUTH_URL}?action=me`, { headers: authHeaders() });
    if (!res.ok) { removeToken(); return null; }
    return await parseResponse(res);
  } catch {
    removeToken();
    return null;
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${AUTH_URL}?action=change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Gagal mengubah password.");
  return data;
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

export async function listPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(PORTFOLIO_URL);
  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Gagal mengambil data portfolio.");
  return data;
}

export async function addPortfolioItem(input: {
  title: string;
  type: PortfolioType;
  description: string;
  en_description: string;
  keyFeatures: string[];
  techStack: string[];
  imageFiles: File[];
}): Promise<PortfolioItem> {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("type", input.type);
  formData.append("description", input.description);
  formData.append("en_description", input.en_description);
  formData.append("keyFeatures", JSON.stringify(input.keyFeatures));
  formData.append("techStack", JSON.stringify(input.techStack));
  input.imageFiles.forEach((file) => formData.append("images[]", file));

  const res = await fetch(PORTFOLIO_URL, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Gagal menambah portfolio item.");
  return data.item;
}

/**
 * Update portfolio item.
 * - keptImageUrls : URL gambar lama yang masih dipertahankan
 * - newImageFiles : File[] gambar baru yang ditambahkan
 * Backend akan menghapus gambar lama yang tidak ada di keptImageUrls,
 * lalu menyimpan gambar baru, dan menggabungkan hasilnya.
 */
export async function updatePortfolioItem(
  id: string,
  input: {
    title: string;
    type: PortfolioType;
    description: string;
    en_description: string;
    keyFeatures: string[];
    techStack: string[];
    keptImageUrls: string[];   // URL gambar lama yang dipertahankan
    newImageFiles: File[];     // File gambar baru
  }
): Promise<PortfolioItem> {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("type", input.type);
  formData.append("description", input.description);
  formData.append("en_description", input.en_description);
  formData.append("keyFeatures", JSON.stringify(input.keyFeatures));
  formData.append("techStack", JSON.stringify(input.techStack));

  // Kirim daftar URL gambar lama yang masih dipakai
  formData.append("keptImageUrls", JSON.stringify(input.keptImageUrls));

  // Kirim file-file gambar baru
  input.newImageFiles.forEach((file) => formData.append("newImages[]", file));

  const res = await fetch(`${PORTFOLIO_URL}?id=${id}`, {
    method: "PUT",
    headers: authHeaders(), // jangan set Content-Type, biar browser set boundary otomatis
    body: formData,
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Gagal mengupdate portfolio item.");
  return data.item;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const res = await fetch(`${PORTFOLIO_URL}?id=${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.error || data?.message || "Gagal menghapus portfolio item.");
}