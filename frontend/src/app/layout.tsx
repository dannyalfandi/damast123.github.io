import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Raleway, Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AosInit from "@/components/AosInit";
import ThemeChrome from "@/components/ThemeChrome";

export const metadata: Metadata = {
  title: "Danny Portfolio",
  description: "Danny Alfandi's personal portfolio.",
  icons: {
    icon: "/img/favicon.png",
    apple: "/img/apple-touch-icon.png",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="/vendor/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/vendor/aos/aos.css" />
        <link rel="stylesheet" href="/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/vendor/glightbox/css/glightbox.min.css" />
        <link rel="stylesheet" href="/css/main.css" />
      </head>

      <body
        className={`${roboto.variable} ${raleway.variable} ${poppins.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <AosInit />
          <ThemeChrome />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
