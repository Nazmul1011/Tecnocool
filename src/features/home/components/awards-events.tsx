"use client";

import Link from "next/link";
import { useState } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import type { HomeContent } from "../home.service";
import styles from "../home.module.css";

export function AwardsEvents({
  awards,
  events,
}: {
  awards: HomeContent["awards"];
  events: HomeContent["events"];
}) {
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const rows = events[tab];

  return (
    <section id="awards" className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">07 — Awards & events</div>
          <h2 className="h-section">Recognition and where to meet us</h2>
        </div>
      </div>
      <div className="split" style={{ gap: "48px 32px" }}>
        <div className={styles.awards}>
          <div className={styles["panel-head"]}>
            <span style={{ fontWeight: 600 }}>Awards</span>
            <Link href="/news?tab=Awards" className="link-quiet">All awards →</Link>
          </div>
          <div className={styles["award-grid"]}>
            {awards.map((award) => (
              <article key={award.title} className={styles["award-card"]}>
                <Placeholder label="Award / certificate photo" />
                <div className={styles["award-body"]}>
                  <span className="mono" style={{ fontSize: 12, color: "#0f62fe" }}>{award.year}</span>
                  <span className={styles["award-title"]}>{award.title}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{award.source}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.events}>
          <div className={styles["events-head"]}>
            <span style={{ fontWeight: 600 }}>Events</span>
            <div className={styles.switcher}>
              {(["Upcoming", "Past"] as const).map((key) => (
                <button key={key} className={cx(styles, tab === key && "active")} onClick={() => setTab(key)}>
                  {key}
                </button>
              ))}
            </div>
          </div>
          <div>
            {rows.map((event) => (
              <Link key={event.title} className="event-row" href={event.href}>
                <div className={`date-block${tab === "Past" ? " past" : ""}`}>
                  <span className="d">{event.day}</span>
                  <span className="m">{event.month}</span>
                </div>
                <div className={styles["event-copy"]}>
                  <Tag label={event.type} />
                  <span style={{ fontSize: 16 }}>{event.title}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{event.place}</span>
                </div>
                <span className={styles["event-cta"]}>{event.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
