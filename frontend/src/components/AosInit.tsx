"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Loads the same vendor AOS build the old Pug/Express site used
// (public/vendor/aos/aos.js) and initializes it once it's on the page,
// so existing `data-aos="..."` attributes carried over from the .pug
// templates keep working without rewriting every animation.
export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    // @ts-expect-error -- AOS is attached to window by the vendor script
    window.AOS?.refreshHard?.();
  }, [pathname]);

  return (
    <Script
      src="/vendor/aos/aos.js"
      strategy="afterInteractive"
      onReady={() => {
        // @ts-expect-error -- AOS is attached to window by the vendor script
        window.AOS?.init();
      }}
    />
  );
}
