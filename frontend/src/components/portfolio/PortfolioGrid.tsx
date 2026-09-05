"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export interface PortfolioGridItem {
  slug: string;
  filterType: string;
  headerImage: string;
  projectName: string;
  dateLabel: string;
  highlight: string;
}

interface Filter {
  value: string;
  label: string;
}

interface PortfolioGridProps {
  items: PortfolioGridItem[];
  filters: Filter[];
  detailsLabel: string;
}

declare global {
  interface Window {
    imagesLoaded?: (element: Element, callback: () => void) => void;
    Isotope?: new (element: Element, options: Record<string, unknown>) => {
      arrange: (options: { filter: string }) => void;
      destroy: () => void;
    };
    GLightbox?: (options: Record<string, unknown>) => { destroy: () => void };
  }
}

// Ports the Isotope + GLightbox wiring from the legacy theme's
// public/js/main.js into a scoped client component, since neither
// library ships an official React integration.
export default function PortfolioGrid({ items, filters, detailsLabel }: PortfolioGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isotopeRef = useRef<InstanceType<NonNullable<Window["Isotope"]>> | null>(null);
  const [activeFilter, setActiveFilter] = useState("*");
  const [scriptsReady, setScriptsReady] = useState(0);
  const scriptsNeeded = 3;

  useEffect(() => {
    if (scriptsReady < scriptsNeeded) return;
    const container = containerRef.current;
    if (!container || !window.imagesLoaded || !window.Isotope) return;

    window.imagesLoaded(container, () => {
      isotopeRef.current = new window.Isotope!(container, {
        itemSelector: ".isotope-item",
        layoutMode: "masonry",
        filter: "*",
        sortBy: "original-order",
      });
    });

    const lightbox = window.GLightbox?.({ selector: ".glightbox" });

    return () => {
      isotopeRef.current?.destroy();
      isotopeRef.current = null;
      lightbox?.destroy();
    };
  }, [scriptsReady, items]);

  function handleFilterClick(value: string) {
    setActiveFilter(value);
    isotopeRef.current?.arrange({ filter: value });
  }

  return (
    <>
      <Script
        src="/vendor/imagesloaded/imagesloaded.pkgd.min.js"
        strategy="afterInteractive"
        onReady={() => setScriptsReady((n) => n + 1)}
      />
      <Script
        src="/vendor/isotope-layout/isotope.pkgd.min.js"
        strategy="afterInteractive"
        onReady={() => setScriptsReady((n) => n + 1)}
      />
      <Script
        src="/vendor/glightbox/js/glightbox.min.js"
        strategy="afterInteractive"
        onReady={() => setScriptsReady((n) => n + 1)}
      />

      <div
        className="isotope-layout"
        data-default-filter="*"
        data-layout="masonry"
        data-sort="original-order"
      >
        <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay={100}>
          {filters.map((filter) => (
            <li
              key={filter.value}
              className={activeFilter === filter.value ? "filter-active" : ""}
              onClick={() => handleFilterClick(filter.value)}
            >
              {filter.label}
            </li>
          ))}
        </ul>

        <div
          className="row gy-4 isotope-container"
          data-aos="fade-up"
          data-aos-delay={200}
          ref={containerRef}
        >
          {items.map((item) => (
            <div
              className={`col-lg-4 col-md-6 portfolio-item isotope-item ${item.filterType}`}
              key={item.slug}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- preserve legacy image markup and CSS contract */}
              <img
                className="portfolio-img"
                src={`/img/portfolio/${item.headerImage}`}
                alt=""
                loading="lazy"
              />
              <div className="portfolio-info">
                <h4>{item.projectName}</h4>
                <strong>Project Date: </strong>
                <strong>{item.dateLabel}</strong>
                <p>{item.highlight}</p>
                <a
                  className="glightbox preview-link"
                  href={`/img/portfolio/${item.headerImage}`}
                  title={item.projectName}
                  data-gallery="portfolio-gallery-app"
                >
                  <i className="bi bi-zoom-in" />
                </a>
                <Link
                  className="details-link"
                  href={`/detail-portfolio/${item.slug}`}
                  title={detailsLabel}
                >
                  <i className="bi bi-link-45deg" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
