import { getLocale, getTranslations } from "next-intl/server";

const WORK_HISTORY = [
  {
    key: "content_work_5",
    titleKey: "web_app_freelance",
    company: "UD Anugrah Sembilan Surya",
    date: { en: "02/2026 - 05/2026", id: "2026/02 - 2026/05", ja: "2026年2月 - 2026年5月" },
    locationKeys: ["surabaya", "indonesia"] as const,
    remote: true,
  },
  {
    key: "content_work_4",
    titleKey: "fullstack_dev",
    company: "PT Inaugurasi Pelangi Nusantara",
    date: { en: "08/2023 - 08/2024", id: "2023/08 - 2024/08", ja: "2023年8月 - 2024年8月" },
    suffixKey: "software_house",
    locationKeys: ["surabaya", "indonesia"] as const,
    remote: true,
  },
  {
    key: "content_work_3",
    titleKey: "mobile_app_freelance",
    company: "Projects.co.id",
    date: { en: "09/2021 - 01/2022", id: "2021/09 - 2022/01", ja: "2021年9月 - 2022年1月" },
    suffixKey: "software_house",
    locationKeys: ["indonesia"] as const,
    remote: true,
  },
  {
    key: "content_work_2",
    titleKey: "software_backend_dev",
    company: "ICUBE by Sirclo",
    date: { en: "06/2021 - 06/2023", id: "2021/06 - 2022/06", ja: "2021年6月 - 2022年6月" },
    suffixKey: "software_house",
    locationKeys: ["tangerang", "jakarta", "indonesia"] as const,
    remote: true,
  },
  {
    key: "content_work_1",
    titleKey: "software_engineer",
    company: "Hiro Solutions",
    date: { en: "03/2021 - 06/2021", id: "2021/03 - 2021/06", ja: "2021年3月 - 2021年6月" },
    locationKeys: ["surabaya", "indonesia"] as const,
    remote: false,
  },
] as const;

export async function generateMetadata() {
  const t = await getTranslations("resume_page");
  return { title: t("resume") };
}

export default async function ResumePage() {
  const t = await getTranslations("resume_page");
  const tLocation = await getTranslations("location");
  const locale = (await getLocale()) as "en" | "id" | "ja";

  return (
    <main className="main">
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("resume")}</h2>
          <p>{t("content_resume")}</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <h3 className="resume-title">{t("education")}</h3>
              <div className="resume-item">
                <h4>{t("system")}</h4>
                <h5>{t("year")}</h5>
                <p>
                  <em>
                    {t("university")}, {tLocation("surabaya")}, {tLocation("indonesia")}
                  </em>
                </p>
              </div>

              <h3 className="resume-title">{t("certifications")}</h3>
              <div className="resume-item">
                <h4>Node.js Express, MongoDB &amp; More: The Complete Bootcamp</h4>
                <h5>
                  {t("issue")} - {t("node_certification")}
                </h5>
                <br />
                <a href="/files/bootcamp-node-uc.pdf" download>
                  {t("click_here_to_download")}
                </a>
              </div>
              <div className="resume-item">
                <h4>AI Engineering Camp</h4>
                <h5>
                  {t("issue")} - {t("ai_engineer_issue")}
                </h5>
                <br />
                <a href="/files/1002 - DSC 33 - Danny Alfandi.pdf" download>
                  {t("click_here_to_download")}
                </a>
              </div>
              <div className="resume-item">
                <h4>Belajar Dasar AI</h4>
                <h5>
                  {t("issue")} - {t("dasar_ai_issue")} | {t("expired")} - {t("dasar_ai_expired")}
                </h5>
                <br />
                <a
                  href="https://www.dicoding.com/certificates/EYX4KK7R5PDL"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("click_here_to_download")}
                </a>
              </div>
              <div className="resume-item">
                <h4>Sertifikat EF SET Bahasa inggris 63/100 (C1 Lanjut)</h4>
                <h5>
                  {t("issue")} - {t("ef")}
                </h5>
                <br />
                <a href="https://cert.efset.org/id/1zdXpk" target="_blank" rel="noreferrer">
                  {t("click_here_to_download")}
                </a>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <h3 className="resume-title">{t("prof_experience")}</h3>
              {WORK_HISTORY.map((job) => {
                const lines = t.raw(job.key) as string[];
                const suffixKey = "suffixKey" in job ? job.suffixKey : undefined;
                const location = job.locationKeys.map((k) => tLocation(k)).join(", ");
                return (
                  <div className="resume-item" key={job.company}>
                    <h4>
                      {t(job.titleKey)} ({job.company})
                    </h4>
                    <h5>
                      {job.date[locale]}
                      {suffixKey ? ` | ${t(suffixKey)}` : ""}
                    </h5>
                    <p>
                      <em>
                        {location}
                        {job.remote ? ` (${tLocation("remote")})` : ""}
                      </em>
                    </p>
                    <ul>
                      {lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
