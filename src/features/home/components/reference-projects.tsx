"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { cx } from "@/lib/cx";
import type { HomeContent } from "../home.service";
import styles from "../home.module.css";

export function ReferenceProjects({ items }: { items: HomeContent["references"] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="ref-projects" className={styles["ref-projects"]}>
      <div className={styles["ref-media"]}>
        {items.map((item, index) => (
          <Placeholder key={item.name} dark label={item.image} className={cx(styles, index === active && "active")} />
        ))}
      </div>
      <div className={styles["ref-list"]}>
        <div className={cx(styles, "eyebrow", "light", "ref-kicker")}>04 — Reference projects</div>
        <h2 className={cx(styles, "h-section", "ref-title")}>Trusted on landmark sites</h2>
        <div className={styles["ref-rules"]}>
          {items.map((item, index) => (
            <button
              key={item.name}
              className={cx(styles, "ref-item", index === active && "active")}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>
                <span className={styles.t}>{item.name}</span>
                <span className={styles.s}>{item.summary}</span>
              </span>
              <span className={styles.arr}>→</span>
            </button>
          ))}
        </div>
        <Button href="/projects" variant="outline-light" className={styles["ref-cta"]}>
          <span>All projects</span>
          <span>→</span>
        </Button>
      </div>
    </section>
  );
}
