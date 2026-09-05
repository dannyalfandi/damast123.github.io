export const locales = ["en", "id", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Same cookie name the old Express + i18next setup used, so switching
// between the old and new stack (during migration) stays compatible.
export const LOCALE_COOKIE = "i18next";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
