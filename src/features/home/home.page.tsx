"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import { AwardsEvents } from "./components/awards-events";
import { HeroCarousel } from "./components/hero-carousel";
import { LiveSites } from "./components/live-sites";
import { ProductCarousel } from "./components/product-carousel";
import { ReferenceProjects } from "./components/reference-projects";
import styles from "./home.module.css";
import { useHome } from "./useHome";

export default function HomePage() {
  const home = useHome();
  // Six copies so the short brand list still fills wide screens; the track scrolls by half.
  const loop = Array.from({ length: 6 }, () => home.brands).flat();

  return (
    <>
      <HeroCarousel slides={home.slides} />

      <section className={styles["about-intro"]}>
        <span className="eyebrow">About us</span>
        <h2>Company HVAC</h2>
        <p>
          A professional HVAC company integrating design, supply, installation and maintenance of air conditioning,
          ventilation and climate control systems for commercial, industrial and residential buildings.
        </p>
        <Link href="/about">Learn more about us →</Link>
      </section>

      <section id="brands" className="section" style={{ paddingTop: 64 }}>
        <div className="section-head">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow">01 — Our brands</div>
            <h2 className="h-section">Authorised partner for the world&apos;s leading climate brands.</h2>
          </div>
        </div>
        <div className={cx(styles, "marquee", "bleed")}>
          <div className={styles["marquee-track"]}>
            {loop.map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                className={styles["brand-card"]}
                href={brand.href}
                aria-hidden={index >= home.brands.length}
                tabIndex={index >= home.brands.length ? -1 : undefined}
              >
                <Image
                  className={cx(styles, "brand-img", brand.fit)}
                  src={brand.image}
                  alt={brand.alt}
                  width={640}
                  height={400}
                  sizes="320px"
                />
                <div className={styles.body}>
                  <span className={styles.name}>{brand.name}</span>
                  <p>{brand.body}</p>
                  <span className={styles.more}>{brand.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["stats-band"]}>
        <div className={cx(styles, "eyebrow", "stats-kicker")}>02 — Impact</div>
        <h2 className={cx(styles, "h-section", "stats-title")}>Engineering comfort across Bangladesh since 2003.</h2>
        <div className={styles["stats-grid"]}>
          {home.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles["stat-label"]}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="section gray">
        <div className="section-head">
          <div>
            <div className="eyebrow">03 — Products</div>
            <h2 className="h-section">Our product range</h2>
          </div>
          <Link href="/products" className="link-quiet">View all products →</Link>
        </div>
        {home.productRange.map((group) =>
          group.shape === "wide" ? (
            <ProductCarousel key={group.title} group={group} />
          ) : (
            <div key={group.title} className={styles["range-group"]}>
              <div className={cx(styles, "eyebrow", "range-title")}>
                {group.title} · {group.items.length} models
              </div>
              <div className="grid grid-auto-240">
                {group.items.map((item) => (
                  <Link key={item.name} className={styles["cat-card"]} href={group.href}>
                    <div className={styles["cat-top"]}>
                      <span>{item.index}</span>
                      <span>→</span>
                    </div>
                    <Image
                      className={cx(styles, "cat-img", group.shape)}
                      src={item.image}
                      alt={item.name}
                      width={480}
                      height={600}
                      sizes="(max-width: 672px) 100vw, 320px"
                    />
                    <div className={styles["cat-bottom"]}>
                      <div className={styles["cat-name"]}>{item.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ),
        )}
      </section>

      <ReferenceProjects items={home.references} />

      <section className={styles["client-strip"]}>
        <div className={styles["client-label"]}>Our clients</div>
        <div className={styles.marquee} style={{ flex: 1 }}>
          <div className={cx(styles, "marquee-track", "client-track")}>
            {[...home.clients, ...home.clients].map((client, index) => (
              <div key={`${client}-${index}`} className={styles["client-item"]} aria-hidden={index >= home.clients.length}>
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">05 — News, awards & events</div>
            <h2 className="h-section">Latest from the company</h2>
          </div>
          <Link href="/news" className="link-quiet">All news →</Link>
        </div>
        <div className={styles["news-grid"]}>
          {home.news.map((article) => (
            <Link key={article.id} className="news-card" href={`/news/${article.id}`}>
              <Placeholder label="News image" />
              <div className="meta">
                <Tag label={article.type} />
                <span className="mono">{article.date}</span>
              </div>
              <span className="title">{article.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <LiveSites sites={home.liveSites} stages={home.stages} />
      <AwardsEvents awards={home.awards} events={home.events} />

      <section id="quote" className={styles["quote-cta"]}>
        <div className={styles["quote-copy"]}>
          <h2 className="h-section">Planning a new installation or upgrade?</h2>
          <p>Send us your project details and our engineers will reply within 24 hours.</p>
          <Button href="mailto:info@company.com" className={styles["ref-cta"]}>
            <span>Request a quote</span>
            <span>→</span>
          </Button>
        </div>
        <div className={styles["quote-media"]}>
          <Placeholder dark label="Engineer / installation photo" />
        </div>
      </section>
    </>
  );
}
