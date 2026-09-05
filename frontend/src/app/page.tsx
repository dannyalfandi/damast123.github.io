import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home_page");

  return (
    <main className="main">
      <section id="hero" className="hero section">
        {/* eslint-disable-next-line @next/next/no-img-element -- preserve legacy image markup and CSS contract */}
        <img
          src="/img/background.jpg"
          alt="Hero background image"
          data-aos="fade-in"
        />
        <div
          className="container text-center"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2>Danny Alfandi</h2>
              <p>{t("description")}</p>
              <Link href="/about" className="btn-get-started">
                {t("about_me")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
