import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  const [common, db] = await Promise.all([
    import(`../../messages/${locale}/common.json`).then((m) => m.default),
    import(`../../messages/${locale}/db.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: { ...common, db },
  };
});
