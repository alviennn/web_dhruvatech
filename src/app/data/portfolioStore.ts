// Temporary frontend storage for portfolio items added via the admin form.
// Backed by localStorage only — swap for a real backend when one is available.

export type PortfolioType = "Website" | "Mobile Apps" | "AI/ML";

export type AdminPortfolioItem = {
  id: string;
  title: string;
  type: PortfolioType;
  description: string;
  coverImage: string;
  createdAt: string;
};

const KEY = "dt-admin-portfolio";

function read(): AdminPortfolioItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AdminPortfolioItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: AdminPortfolioItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export function listAdminPortfolioItems(): AdminPortfolioItem[] {
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addAdminPortfolioItem(input: Omit<AdminPortfolioItem, "id" | "createdAt">): AdminPortfolioItem {
  const item: AdminPortfolioItem = {
    ...input,
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  write([item, ...read()]);
  return item;
}

export function removeAdminPortfolioItem(id: string): void {
  write(read().filter((it) => it.id !== id));
}
