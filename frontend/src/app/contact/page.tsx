import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("contact_page");
  return { title: t("contact") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact_page");
  const tLocation = await getTranslations("location");

  return (
    <main className="main">
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("contact")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            <div className="col-lg-12">
              <div className="info-wrap">
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={200}>
                  <i className="bi bi-geo-alt flex-shrink-0" />
                  <div>
                    <h3>{t("address")}</h3>
                    <p>
                      {tLocation("surabaya")}, {tLocation("indonesia")}
                    </p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                  <i className="bi bi-telephone flex-shrink-0" />
                  <div>
                    <h3>{t("whatsapp")}</h3>
                    <p>+62 81333091683</p>
                  </div>
                </div>

                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                  <i className="bi bi-envelope flex-shrink-0" />
                  <div>
                    <h3>{t("email_me")}</h3>
                    <p>dannyalfandi@gmail.com</p>
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
