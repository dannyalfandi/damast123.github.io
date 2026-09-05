"use client";

import Script from "next/script";
import { useEffect } from "react";

// Re-implements the global chrome behavior from the legacy theme's
// public/js/main.js (header scroll class, mobile nav toggle, scroll-top
// button) as a client component, since Header/Footer are Server Components.
export default function ThemeChrome() {
  useEffect(() => {
    const body = document.body;
    const header = document.querySelector("#header");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const navToggleBtn = document.querySelector<HTMLElement>(
      ".mobile-nav-toggle",
    );

    function toggleScrolled() {
      if (!header) return;
      const isFixed =
        header.classList.contains("scroll-up-sticky") ||
        header.classList.contains("sticky-top") ||
        header.classList.contains("fixed-top");
      if (!isFixed) return;
      body.classList.toggle("scrolled", window.scrollY > 100);
    }

    function toggleScrollTop() {
      scrollTopBtn?.classList.toggle("active", window.scrollY > 100);
    }

    function mobileNavToggle() {
      body.classList.toggle("mobile-nav-active");
      navToggleBtn?.classList.toggle("bi-list");
      navToggleBtn?.classList.toggle("bi-x");
    }

    function handleScrollTopClick(e: Event) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleNavLinkClick() {
      if (body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    }

    toggleScrolled();
    toggleScrollTop();

    document.addEventListener("scroll", toggleScrolled);
    document.addEventListener("scroll", toggleScrollTop);
    navToggleBtn?.addEventListener("click", mobileNavToggle);
    scrollTopBtn?.addEventListener("click", handleScrollTopClick);

    const navLinks = document.querySelectorAll("#navmenu a");
    navLinks.forEach((link) => link.addEventListener("click", handleNavLinkClick));

    return () => {
      document.removeEventListener("scroll", toggleScrolled);
      document.removeEventListener("scroll", toggleScrollTop);
      navToggleBtn?.removeEventListener("click", mobileNavToggle);
      scrollTopBtn?.removeEventListener("click", handleScrollTopClick);
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleNavLinkClick),
      );
    };
  }, []);

  return (
    <Script
      src="/vendor/bootstrap/js/bootstrap.bundle.min.js"
      strategy="afterInteractive"
    />
  );
}
