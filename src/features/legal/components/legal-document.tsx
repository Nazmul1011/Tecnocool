"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import styles from "../legal.module.css";
import type { LegalDocumentModel } from "../types";

export function LegalDocument({ doc }: { doc: LegalDocumentModel }) {
  const [active, setActive] = useState(doc.sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = doc.sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const onScroll = () => {
      let current = nodes[0]?.id ?? "";
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top < 160) current = node.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc.sections]);

  return (
    <>
      <section className={cx(styles, "page-hero", "gray", "hero")}>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Legal</span>
          <span>/</span>
          <span>{doc.crumb}</span>
        </div>
        <h1 className="h-display" style={{ marginBottom: 24 }}>{doc.title}</h1>
        <div className={styles.dates}>
          <span>Last updated: <span className="mono">{doc.updated}</span></span>
          <span>Effective: <span className="mono">{doc.updated}</span></span>
        </div>
        <div className={cx(styles, "tabs", "underline-tabs", "switch")}>
          <Link href="/privacy" className={cx(styles, doc.key === "privacy" && "active")}>Privacy policy</Link>
          <Link href="/terms" className={cx(styles, doc.key === "terms" && "active")}>Terms & conditions</Link>
        </div>
      </section>
      <section className={styles.layout}>
        <aside className={styles.toc}>
          <div className={cx(styles, "muted", "toc-label")}>On this page</div>
          <nav>
            {doc.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={cx(styles, active === section.id && "active")}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <article className={styles.body}>
          <p className="lead" style={{ marginBottom: 48, color: "#393939" }}>{doc.lead}</p>
          {doc.sections.map((section, index) => (
            <div key={section.id} id={section.id} className={styles["legal-section"]}>
              <h2>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <div className={styles.notice}>
            <div>
              <strong>{doc.noticeTitle}</strong>
              <p>{doc.noticeBody}</p>
            </div>
            <Button href="mailto:legal@company.com" style={{ gap: 32 }}>
              <span>Email legal team</span>
              <span>→</span>
            </Button>
          </div>
        </article>
      </section>
    </>
  );
}
