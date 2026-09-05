export interface Portfolio {
  id: string;
  project_name: string;
  category_project: string;
  filter_type: string;
  project_from: string;
  project_date: string;
  highlight: string;
  description: string;
  specifications: string[];
  images: string[];
  slug: string;
  header_image: string;
}

// The Express API (Presentations/Routes/projectRoutes.js) proxies this
// straight through to the external portfolio data source, same as the
// old Pug viewController did.
export async function getPortfolios(): Promise<Portfolio[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/detail`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load portfolios: ${res.status}`);
  }

  const list = (await res.json()) as Portfolio[];

  return [...list].sort(
    (a, b) => new Date(b.project_date).getTime() - new Date(a.project_date).getTime(),
  );
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | undefined> {
  const portfolios = await getPortfolios();
  return portfolios.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

interface DbPortfolioEntry {
  project_name?: string;
  category_project?: string;
  project_from?: string;
  description?: string;
  highlight?: string;
  specifications?: string[];
}

// Mirrors the old `t('db:portfolio.<slug>.<field>', { defaultValue })`
// lookups: locale-specific copy lives in messages/{locale}/db.json,
// keyed by slug, falling back to the raw API field when absent.
export function getDbPortfolioEntry(
  messages: { db?: { portfolio?: Record<string, DbPortfolioEntry> } },
  slug: string,
): DbPortfolioEntry {
  return messages.db?.portfolio?.[slug] ?? {};
}

export type MonthLabels = Record<
  "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12",
  string
>;

export function formatProjectDate(
  projectDate: string,
  locale: "en" | "id" | "ja",
  monthLabels: MonthLabels,
  yearSuffix: string,
): string {
  const [year, month] = projectDate.split("-");
  const monthLabel = monthLabels[month as keyof MonthLabels] ?? month;
  return locale === "ja" ? `${year}${yearSuffix}${monthLabel}` : `${monthLabel} ${year}`;
}
