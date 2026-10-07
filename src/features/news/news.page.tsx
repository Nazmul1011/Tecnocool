"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import styles from "./news.module.css";
import { useNews } from "./useNews";

const sideEvents = [
  ["14", "NOV", "HVAC Expo 2026", "Exhibition Centre · B12", "Book a meeting", "/news/hvac-expo-2026"],
  ["03", "DEC", "VRV design workshop", "Head office", "Register", "/news/hvac-expo-2026"],
  ["22", "JAN", "Cooling Technology Summit", "Convention Hall", "Details", "/news/chiller-seminar"],
  ["10", "MAR", "Daikin product launch", "City showroom", "Register", "/news/hvac-expo-2026"],
] as const;

function NewsScreen() {
  const news = useNews();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <section className="page-hero gray">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>News & events</span>
        </div>
        <div className={styles["hero-row"]}>
          <h1 className="h-display">News & events</h1>
          <label className={cx(styles, "search-field", "white", "search")}>
            <SearchIcon size={16} fill="#525252" />
            <input value={news.query} onChange={(event) => news.setQuery(event.target.value)} placeholder="Search articles" />
          </label>
        </div>
        <div className="tabs">
          {news.tabs.map((tab) => (
            <button key={tab} className={news.tab === tab ? "active" : ""} onClick={() => news.setTab(tab)}>
              {tab}
              <span className="count">{news.counts[tab]}</span>
            </button>
          ))}
        </div>
      </section>

      {news.showFeatured ? (
        <section className={styles.featured}>
          <Link className={styles.story} href={`/news/${news.featured.id}`}>
            <div className={styles["story-media"]}>
              <Placeholder dark label="Featured story image" />
            </div>
            <div className={styles["story-copy"]}>
              <div className={styles["story-meta"]}>
                <Tag label={news.featured.type} />
                <span className="mono" style={{ fontSize: 12, color: "#a8a8a8" }}>{news.featured.date} · Featured</span>
              </div>
              <h2>{news.featured.title}</h2>
              <p>{news.featured.excerpt}</p>
              <span className={styles["story-link"]}>Read story →</span>
            </div>
          </Link>
        </section>
      ) : null}

      <section className={styles.layout}>
        <div className={styles.list}>
          <div className="muted" style={{ fontSize: 14, marginBottom: 24 }}>
            {news.filtered.length} {news.filtered.length === 1 ? "article" : "articles"}
          </div>
          <div className={styles.grid}>
            {news.visible.map((article) => (
              <Link key={article.id} className="news-card" href={`/news/${article.id}`}>
                <Placeholder label="Article image" />
                <div className="meta">
                  <Tag label={article.type} />
                  <span className="mono">{article.date}</span>
                </div>
                <span className="title">{article.title}</span>
              </Link>
            ))}
          </div>
          <div className={news.filtered.length ? "empty" : "empty show"}>No articles match your search.</div>
          <div className="pagination">
            <span style={{ padding: "0 16px" }}>Items per page: 6</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ padding: "0 16px" }}>Page {news.page} of {news.pages}</span>
              <button aria-label="Previous page" onClick={() => news.setPage(Math.max(1, news.page - 1))}>←</button>
              <button aria-label="Next page" onClick={() => news.setPage(news.page + 1)}>→</button>
            </div>
          </div>
        </div>
        <aside className={styles.aside}>
          <div className={styles.panel}>
            <div className={styles["panel-title"]}>Upcoming events</div>
            {sideEvents.map(([day, month, title, place, cta, href]) => (
              <Link key={title} href={href} className={cx(styles, "event-row", "side-event")}>
                <div className={cx(styles, "date-block", "side-date")}>
                  <span className="d">{day}</span>
                  <span className="m">{month}</span>
                </div>
                <div className={styles["side-copy"]}>
                  <strong>{title}</strong>
                  <span className="muted" style={{ fontSize: 12 }}>{place}</span>
                  <span style={{ fontSize: 12, color: "#0f62fe" }}>{cta} →</span>
                </div>
              </Link>
            ))}
          </div>
          <div id="newsletter" className={styles.newsletter}>
            <p>Get project news and event invitations</p>
            {subscribed ? (
              <span className={styles.thanks}>✓ Thanks — you&apos;re subscribed.</span>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input type="email" required placeholder="Email address" aria-label="Email address" />
                <Button type="submit">
                  <span>Subscribe</span>
                  <span>→</span>
                </Button>
              </form>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={null}>
      <NewsScreen />
    </Suspense>
  );
}
