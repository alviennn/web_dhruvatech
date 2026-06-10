// API service — connect ke PHP backend
// Ganti file lama: src/app/data/api.ts

// Akses langsung ke file PHP (bypass .htaccess router)
const BASE          = import.meta.env.VITE_API_URL || "http://localhost:8080/dhruvatech-api/php-backend";
const AUTH_URL      = `${BASE}/api/auth/index.php`;
const PORTFOLIO_URL = `${BASE}/api/portfolio/index.php`;

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
  keyFeatures: string[];
  techStack: string[];
  coverImage: string;
  createdAt: string;
};

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${AUTH_URL}?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login gagal.");
  setToken(data.token);
  return data;
}

export async function verifyToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${AUTH_URL}?action=me`, { headers: authHeaders() });
    if (!res.ok) { removeToken(); return null; }
    return await res.json();
  } catch { return null; }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${AUTH_URL}?action=change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Gagal mengubah password.");
}

export async function listPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(PORTFOLIO_URL);
  if (!res.ok) throw new Error("Gagal mengambil data portfolio.");
  return res.json();
}

export async function addPortfolioItem(input: {
  title: string;
  type: PortfolioType;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  coverImageFile: File;
}): Promise<PortfolioItem> {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("type", input.type);
  formData.append("description", input.description);
  formData.append("keyFeatures", JSON.stringify(input.keyFeatures));
  formData.append("techStack", JSON.stringify(input.techStack));
  formData.append("coverImage", input.coverImageFile);
  const res = await fetch(PORTFOLIO_URL, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Gagal menambah portfolio item.");
  return data.item;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const res = await fetch(`${PORTFOLIO_URL}?id=${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Gagal menghapus portfolio item.");
}
