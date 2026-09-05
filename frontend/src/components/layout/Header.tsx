import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_KEYS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "resume", href: "/resume" },
  { key: "portfolio", href: "/portfolio" },
  { key: "contact", href: "/contact" },
] as const;

export default async function Header() {
  const t = await getTranslations("nav");

  return (
    <header
      id="header"
      className="header d-flex align-items-center light-background sticky-top"
    >
      <div className="container-fluid position-relative d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">Danny A</h1>
        </Link>

        <div className="header-right d-flex align-items-center flex-grow-1">
          <nav id="navmenu" className="navmenu mx-lg-auto">
            <ul>
              {NAV_KEYS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{t(item.key)}</Link>
                </li>
              ))}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
