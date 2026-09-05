import { notFound } from "next/navigation";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import PortfolioSwiper from "@/components/portfolio/PortfolioSwiper";
import { formatProjectDate, getDbPortfolioEntry, getPortfolioBySlug } from "@/lib/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);
  const t = await getTranslations("detail_portfolio_page");
  if (!portfolio) return { title: t("portfolio_details") };

  const messages = await getMessages();
  const dbEntry = getDbPortfolioEntry(messages, portfolio.slug);
  return { title: dbEntry.project_name ?? portfolio.project_name };
}

export default async function PortfolioDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);
  if (!portfolio) notFound();

  const t = await getTranslations("detail_portfolio_page");
  const tMonth = await getTranslations("month");
  const tYear = await getTranslations("year");
  const locale = (await getLocale()) as "en" | "id" | "ja";
  const messages = await getMessages();
  const dbEntry = getDbPortfolioEntry(messages, portfolio.slug);

  const monthLabels = {
    "01": tMonth("01"), "02": tMonth("02"), "03": tMonth("03"), "04": tMonth("04"),
    "05": tMonth("05"), "06": tMonth("06"), "07": tMonth("07"), "08": tMonth("08"),
    "09": tMonth("09"), "10": tMonth("10"), "11": tMonth("11"), "12": tMonth("12"),
  };

  const projectName = dbEntry.project_name ?? portfolio.project_name;
  const category = dbEntry.category_project ?? portfolio.category_project;
  const client = dbEntry.project_from ?? portfolio.project_from;
  const description = dbEntry.description ?? portfolio.description;
  const specifications = dbEntry.specifications ?? portfolio.specifications;
  const dateLabel = formatProjectDate(portfolio.project_date, locale, monthLabels, tYear("nen"));
  const isMobileApp = portfolio.filter_type === "filter-mobile-app";

  return (
    <main className="main">
      <section id="portfolio-details" className="portfolio-details section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("portfolio_details")}</h2>
          <p></p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            <div className="col-lg-8">
              <PortfolioSwiper
                images={portfolio.images}
                alt={projectName}
                variant={isMobileApp ? "mobile" : "web"}
              />
            </div>
            <div className="col-lg-4">
              <div className="portfolio-info" data-aos="fade-up" data-aos-delay={200}>
                <h3>{t("project_information")}</h3>
                <ul>
                  <li>
                    <strong>{t("category")}</strong>: <span>{category}</span>
                  </li>
                  <li>
                    <strong>{t("client")}</strong>: <span>{client}</span>
                  </li>
                  <li>
                    <strong>{t("project_date")}</strong>: <span>{dateLabel}</span>
                  </li>
                </ul>
              </div>
              <div className="portfolio-description" data-aos="fade-up" data-aos-delay={300}>
                <h2>{projectName}</h2>
                <div className="portfolio-tabs" data-aos="fade-up" data-aos-delay={300}>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#description"
                        data-bs-toggle="tab"
                        role="tab"
                      >
                        {t("description")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#specification"
                        data-bs-toggle="tab"
                        role="tab"
                      >
                        {t("specification")}
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content mt-3">
                    <div id="description" className="tab-pane fade show active" role="tabpanel">
                      <p style={{ textAlign: "justify" }}>
                        <span>{description}</span>
                      </p>
                    </div>
                    <div id="specification" className="tab-pane fade" role="tabpanel">
                      <ul>
                        {specifications.map((spec, i) => (
                          <li key={spec}>
                            <strong>Feature {i + 1}</strong> : <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
