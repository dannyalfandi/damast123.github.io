import { getLocale, getMessages, getTranslations } from "next-intl/server";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { formatProjectDate, getDbPortfolioEntry, getPortfolios } from "@/lib/portfolio";

export async function generateMetadata() {
  const t = await getTranslations("portfolio_page");
  return { title: t("portfolio") };
}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio_page");
  const tMonth = await getTranslations("month");
  const tYear = await getTranslations("year");
  const locale = (await getLocale()) as "en" | "id" | "ja";
  const messages = await getMessages();

  const portfolios = await getPortfolios();

  const monthLabels = {
    "01": tMonth("01"), "02": tMonth("02"), "03": tMonth("03"), "04": tMonth("04"),
    "05": tMonth("05"), "06": tMonth("06"), "07": tMonth("07"), "08": tMonth("08"),
    "09": tMonth("09"), "10": tMonth("10"), "11": tMonth("11"), "12": tMonth("12"),
  };

  const items = portfolios.map((portfolio) => {
    const dbEntry = getDbPortfolioEntry(messages, portfolio.slug);
    return {
      slug: portfolio.slug,
      filterType: portfolio.filter_type,
      headerImage: portfolio.header_image,
      projectName: dbEntry.project_name ?? portfolio.project_name,
      highlight: dbEntry.highlight ?? portfolio.highlight,
      dateLabel: formatProjectDate(portfolio.project_date, locale, monthLabels, tYear("nen")),
    };
  });

  const filters = [
    { value: "*", label: t("all") },
    { value: ".filter-mobile-app", label: t("mobile_app") },
    { value: ".filter-web-app", label: t("web_app") },
    { value: ".filter-data-science", label: t("data_science") },
  ];

  return (
    <main className="main">
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("portfolio")}</h2>
          <p>{t("description")}</p>
        </div>
        <div className="container">
          <PortfolioGrid items={items} filters={filters} detailsLabel={t("more_details")} />
        </div>
      </section>
    </main>
  );
}
