"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  ja: "JA",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSelect(next: Locale) {
    if (next === locale) return;

    await fetch("/api/set-locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="dropdown lang-switch ms-3">
      <a
        id="langDropdown"
        className="nav-link p-0 d-inline-flex align-items-center gap-1"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-busy={isPending}
      >
        <i className="bi bi-globe" />
        {LANGUAGE_LABELS[locale]}
      </a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="langDropdown">
        {locales.map((lng) => (
          <li key={lng}>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => handleSelect(lng)}
            >
              {LANGUAGE_LABELS[lng]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
