import { getTranslations } from "next-intl/server";

const SKILL_GROUPS = [
  {
    icon: "bi-code-slash",
    title: "Languages",
    tags: ["PHP", "JavaScript", "Python", "SQL"],
  },
  {
    icon: "bi-server",
    title: "Framework & Library",
    tags: [
      "Laravel",
      "Node.js (Express.js)",
      "Codeigniter",
      "Flutter",
      "Magento 2",
      "GraphQL",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    icon: "bi-database",
    title: "Database",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server"],
  },
  {
    icon: "bi-tools",
    title: "Tools & Platforms",
    tags: [
      "Git",
      "GitHub",
      "Docker",
      "REST API",
      "JSON/XML",
      "N8N",
      "EDA",
    ],
  },
  {
    icon: "bi-phone",
    title: "Methods",
    tags: ["Agile Methodology", "Responsive Design", "API Development"],
  },
  {
    icon: "bi-people",
    title: "Soft Skills",
    tags: ["Collaboration & Teamwork", "Attention to Detail"],
  },
] as const;

export async function generateMetadata() {
  const t = await getTranslations("about_page");
  return { title: t("about") };
}

export default async function AboutPage() {
  const t = await getTranslations("about_page");

  return (
    <main className="main">
      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("about")}</h2>
          <p>{t("content_about_1")}</p>
          <br />
          <p>{t("content_about_2")}</p>
          <br />
          <p>{t("content_about_3")}</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- preserve legacy image markup and CSS contract */}
              <img className="img-fluid" src="/img/profile-image.jpg" alt="" />
            </div>
            <div className="col-lg-8 content">
              <h2>{t("role")}</h2>
              <p className="fst-italic py-3">{t("bio")}</p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" />
                      <strong>{t("phone")}</strong>
                      <strong>:</strong>
                      <span> +62 81333091683</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right" />
                      <strong>{t("email")}</strong>
                      <strong>:</strong>
                      <span> dannyalfandi@gmail.com</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right" />
                      <strong>{t("freelance")}</strong>
                      <strong>:</strong>
                      <span> {t("status_work")}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" />
                      <strong>{t("city")}</strong>
                      <strong>:</strong>
                      <span> {t("location")}</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right" />
                      <strong>{t("degree")}</strong>
                      <strong>:</strong>
                      <span> {t("status_degree")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /About Section */}

      {/* Skills Section */}
      <section id="skills" className="skills section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("skills")}</h2>
          <p>{t("content_skills")}</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row skills-content skills-animation">
            <div className="row g-4">
              {SKILL_GROUPS.map((group) => (
                <div className="col-md-6" key={group.title}>
                  <div className="skill-card">
                    <h4>
                      <i className={`bi ${group.icon} me-2`} />
                      {group.title}
                    </h4>
                    <div className="skill-tags">
                      {group.tags.map((tag) => (
                        <span className="skill-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* /Skills Section */}
    </main>
  );
}
