"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface PortfolioSwiperProps {
  images: string[];
  alt: string;
  variant: "mobile" | "web";
}

// Replaces the vendor Swiper bundle + init-swiper JSON-config markup from
// the legacy theme with the official swiper/react wrapper, same behavior
// (loop, autoplay 5s, bullet pagination, prev/next arrows).
export default function PortfolioSwiper({ images, alt, variant }: PortfolioSwiperProps) {
  return (
    <div className={`portfolio-details-slider-${variant}`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        speed={600}
        autoplay={{ delay: 5000 }}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        navigation
        className="align-items-center"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* eslint-disable-next-line @next/next/no-img-element -- preserve legacy image markup and CSS contract */}
            <img
              src={`/img/portfolio/${image}`}
              alt={alt}
              style={
                variant === "web"
                  ? { objectFit: "contain", width: "100%", height: "100%", maxHeight: 800 }
                  : undefined
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
