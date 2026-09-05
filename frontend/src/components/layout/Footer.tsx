import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer_template");

  return (
    <>
      <footer id="footer" className="footer light-background">
        <div className="container">
          <div className="copyright text-center">{t("copyright")}</div>

          <div className="social-links d-flex justify-content-center">
            <a
              href="https://www.facebook.com/dannyalfandi06"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook" />
            </a>

            <a
              href="https://www.instagram.com/dannyalfandi06"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram" />
            </a>

            <a
              href="https://www.linkedin.com/in/danny-alfandi-496374196"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin" />
            </a>

            <a
              href="https://github.com/dannyalfandi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="bi bi-github" />
            </a>
          </div>

          <div className="credits">
            {t("designed")}
            <a href="https://bootstrapmade.com/">{t("bootstrap_made")}</a>{" "}
            {t("distributed")}
            <a href="https://themewagon.com/">{t("theme_wagon")}</a>
          </div>
        </div>
      </footer>

      <a
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
        href="#"
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}
