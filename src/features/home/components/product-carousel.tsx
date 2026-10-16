"use client";

import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import type { HomeContent } from "../home.service";
import styles from "../home.module.css";

type Group = HomeContent["productRange"][number];

/** Auto-scrolling strip, same marquee as the brand cards: pauses on hover, loops forever. */
export function ProductCarousel({ group }: { group: Group }) {
  const loop = [...group.items, ...group.items];

  return (
    <div className={styles["range-group"]}>
      <div className={cx(styles, "eyebrow", "range-title")}>
        {group.title} · {group.items.length} models
      </div>
      <div className={cx(styles, "marquee", "bleed")}>
        <div className={cx(styles, "marquee-track", "range-track")}>
          {loop.map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              className={cx(styles, "cat-card", "range-slide")}
              href={group.href}
              aria-hidden={index >= group.items.length}
              tabIndex={index >= group.items.length ? -1 : undefined}
            >
              <div className={styles["cat-top"]}>
                <span>{item.index}</span>
                <span>→</span>
              </div>
              <Image
                className={cx(styles, "cat-img", group.shape)}
                src={item.image}
                alt={item.name}
                width={640}
                height={360}
                sizes="(max-width: 672px) 85vw, 440px"
              />
              <div className={styles["cat-bottom"]}>
                <div className={styles["cat-name"]}>{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
