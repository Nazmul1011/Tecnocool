"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import type { HomeContent } from "../home.service";
import styles from "../home.module.css";

export function HeroCarousel({ slides }: { slides: HomeContent["slides"] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [index, slides.length]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles["hero-track"]} style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <div key={slide.title} className={cx(styles, "hero-slide", slideIndex === index && "active")}>
            <div className={styles["hero-media"]}>
              <Image
                className={cx(styles, "hero-img", slide.fit)}
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={slideIndex === 0}
              />
            </div>
            <div className={styles["hero-copy"]}>
              <span className="eyebrow blue">{slide.eyebrow}</span>
              <h1>{slide.title}</h1>
              <p>{slide.body}</p>
              <Button href={slide.href}>
                <span>{slide.cta}</span>
                <span>→</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <button className={cx(styles, "icon-btn", "prev")} aria-label="Previous" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}>
        ←
      </button>
      <button className={cx(styles, "icon-btn", "next")} aria-label="Next" onClick={() => setIndex((index + 1) % slides.length)}>
        →
      </button>
      <div className={styles["hero-dots"]}>
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            aria-label={`Slide ${slideIndex + 1}`}
            className={cx(styles, slideIndex === index && "active")}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
