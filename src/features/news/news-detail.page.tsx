"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import styles from "./news.module.css";
import { neighbours, relatedArticles } from "./news.service";
import { useArticle } from "./useNews";

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const article = useArticle(params.id);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      setProgress((100 * window.scrollY) / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [params.id]);

  if (!article) {
    return (
      <section className={styles.missing}>
        <h1 className="h-display">Article not found</h1>
        <p className="lead" style={{ margin: "16px 0 32px" }}>That story is no longer on this site.</p>
        <Button href="/news" variant="tertiary">Back to news</Button>
      </section>
    );
  }

  const { previous, next } = neighbours(article.id);
  const related = relatedArticles(article.id);

  return (
    <>
      <div className={styles["read-progress"]} aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>
      <section className={styles["article-hero"]}>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/news">News & events</Link>
          <span>/</span>
          <span>{article.type}</span>
        </div>
        <div className={styles["title-wrap"]}>
          <div className={styles.kicker}>
            <Tag label={article.type} />
            <span className="mono" style={{ fontSize: 12, color: "#525252" }}>{article.date}</span>
            <span style={{ fontSize: 12, color: "#525252" }}>· {article.readMinutes} min read</span>
          </div>
          <h1>{article.title}</h1>
          <p className="lead" style={{ maxWidth: 760 }}>{article.excerpt}</p>
        </div>
      </section>
      <div className={styles["hero-frame"]}>
        <Placeholder label="Article hero image" />
      </div>
      <div className="caption" style={{ padding: "8px 32px 0" }}>The project team receiving the award at the ceremony.</div>

      <section className={styles["article-layout"]}>
        <aside className={styles.rail}>
          <div className={styles.author}>
            <Placeholder className={styles.avatar} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Communications team</span>
              <span className="muted" style={{ fontSize: 12 }}>Company HVAC</span>
            </div>
          </div>
          <div>
            <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>Share</div>
            <div className="btn-group">
              <a className="btn share-btn" href="#share">LinkedIn</a>
              <a className="btn share-btn" href="#share">Facebook</a>
              <a className="btn share-btn" href="#share">X</a>
              <button
                className="btn share-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                }}
              >
                Copy link
              </button>
            </div>
            {copied ? <div style={{ fontSize: 12, color: "#0e6027", marginTop: 8 }}>✓ Link copied</div> : null}
          </div>
          <div className={styles.tags}>
            <span className="muted" style={{ fontSize: 12 }}>Tags</span>
            <div className={styles["tag-row"]}>
              {article.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </aside>
        <article className={styles.article}>
          {article.blocks.map((block, index) => {
            if (block.kind === "h2") return <h2 key={index}>{block.text}</h2>;
            if (block.kind === "p") return <p key={index}>{block.text}</p>;
            if (block.kind === "quote") {
              return (
                <blockquote key={index}>
                  <p>&ldquo;{block.text}&rdquo;</p>
                  <span style={{ fontSize: 14, color: "#525252" }}>{block.by}</span>
                </blockquote>
              );
            }
            if (block.kind === "facts") {
              return (
                <div key={index} className={styles.facts}>
                  {block.items.map((fact) => (
                    <div key={fact.label}>
                      <div className={styles.v}>{fact.value}</div>
                      <div className={styles.l}>{fact.label}</div>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <div key={index}>
                <div className={styles.figures}>
                  {block.labels.map((label) => (
                    <Placeholder key={label} label={label} />
                  ))}
                </div>
                <div className="caption" style={{ marginBottom: 40 }}>{block.caption}</div>
              </div>
            );
          })}
          <div className={styles["article-nav"]}>
            <Link href="/news">← Back to news & events</Link>
            <Link href="/#quote">Discuss your project →</Link>
          </div>
        </article>
      </section>

      <nav className={styles.pager}>
        {previous ? (
          <Link href={`/news/${previous.id}`}>
            <span className="muted" style={{ fontSize: 12 }}>← Previous article</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/news/${next.id}`}>
            <span className="muted" style={{ fontSize: 12 }}>Next article →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : null}
      </nav>

      {related.length ? (
        <section className="section gray" style={{ paddingTop: 96 }}>
          <div className="section-head" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 300 }}>Related articles</h2>
            <Link href="/news" className="link-quiet">All news →</Link>
          </div>
          <div className="grid grid-auto-260">
            {related.map((item) => (
              <Link key={item.id} className={cx(styles, "news-card", "related-card")} href={`/news/${item.id}`}>
                <Placeholder label="Article image" />
                <div className={styles["related-copy"]}>
                  <div className="meta">
                    <Tag label={item.type} />
                    <span className="mono">{item.date}</span>
                  </div>
                  <span className="title">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
