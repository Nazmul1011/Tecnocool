"use client";

import { useEffect, useState } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import type { HomeContent } from "../home.service";
import styles from "../home.module.css";

export function LiveSites({
  sites,
  stages,
}: {
  sites: HomeContent["liveSites"];
  stages: HomeContent["stages"];
}) {
  const [tick, setTick] = useState(0);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const drawTime = () =>
      setUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    drawTime();
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
      drawTime();
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="live" className="section gray">
      <div className="section-head">
        <div>
          <div className="eyebrow">06 — Live sites</div>
          <h2 className="h-section">Real-time site status</h2>
        </div>
        <div className={styles.summary}>
          <div>
            <span className={styles["summary-value"]}>3</span>
            <span className="muted" style={{ fontSize: 12 }}>Active sites</span>
          </div>
          <div>
            <span className={styles["summary-value"]}>1</span>
            <span className="muted" style={{ fontSize: 12 }}>Handed over</span>
          </div>
          <div className={styles["summary-end"]}>
            <span className={styles["live-label"]}>
              <span className={styles["live-dot"]} />
              Live
            </span>
            <span className="mono muted" style={{ fontSize: 12 }}>{updated}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-auto-260">
        {sites.map((site, index) => {
          const percent = Math.min(100, site.progress + (site.progress < 100 ? (tick + index) % 4 : 0));
          const status = percent >= 100 ? "Complete" : site.review ? "Review" : "On track";
          const current = percent >= 100 ? 5 : stages.indexOf(site.stage);
          return (
            <article key={site.name} className={styles["site-card"]}>
              <div className={styles["site-media"]}>
                <Placeholder label="Site photo / camera" />
                <Tag label={status} />
              </div>
              <div className={styles["site-body"]}>
                <div>
                  <div className={styles["site-name"]}>{site.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{site.system}</div>
                </div>
                <div className={styles.meter}>
                  <div className={styles["progress-row"]}>
                    <span style={{ fontSize: 14 }}>{percent >= 100 ? "Handed over" : site.stage}</span>
                    <span className={styles.percent}>{percent}%</span>
                  </div>
                  <div className={styles.steps}>
                    {stages.map((stage, step) => (
                      <i key={stage} className={cx(styles, step < current && "done", step === current && "cur")} />
                    ))}
                  </div>
                  <div className={styles["steps-labels"]}>
                    {stages.map((stage, step) => (
                      <span key={stage} className={cx(styles, step === current && "cur")}>{stage}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
