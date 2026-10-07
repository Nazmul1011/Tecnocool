"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { cx } from "@/lib/cx";
import styles from "./about.module.css";
import { useAbout } from "./useAbout";

const sections = [
  ["overview", "Company profile"],
  ["values", "Mission & values"],
  ["history", "History"],
  ["team", "Leadership"],
  ["partners", "Partners & certifications"],
] as const;

export default function AboutPage() {
  const { content, milestone, setMilestone } = useAbout();
  const current = content.milestones[milestone];

  return (
    <>
      <section className={cx(styles, "page-hero", "dark", "hero")}>
        <div className={styles.copy}>
          <div className="breadcrumb" style={{ margin: 0 }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About us</span>
          </div>
          <h1>Engineering better air for every building.</h1>
          <p>Since 1998 we have designed, supplied, installed and maintained HVAC systems for towers, hospitals, malls, factories and homes.</p>
        </div>
        <div className={styles["hero-media"]}>
          <Placeholder dark label="Team / head office photo" />
        </div>
      </section>

      <nav className={styles.subnav}>
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>

      <section id="overview" className="section split" style={{ gap: "48px 32px" }}>
        <div className="label eyebrow">01 — Company profile</div>
        <div className={cx(styles, "content", "profile")}>
          <h2 className="h-section">A single partner from design consultancy to after-sales service — authorised for the world&apos;s leading HVAC brands.</h2>
          <div className={styles.columns}>
            <p>Company HVAC was founded to bring reliable, energy-efficient climate systems to commercial and industrial buildings. Today our engineers deliver complete projects: load calculation, system design, equipment supply, installation, testing, commissioning and handover.</p>
            <p>As authorised partners of Daikin, LG, Kruger, Trane and DP, we specify the right equipment for each building rather than one brand for every job — and we stay on after handover with maintenance contracts and 24/7 service.</p>
          </div>
          <div className={styles.stats}>
            {content.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="section gray">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="label eyebrow">02 — What drives us</div>
          <h2 className="content h-section">Mission, vision and values</h2>
        </div>
        <div className="grid grid-auto-260">
          {content.values.map((value, index) => (
            <article key={value.title} className={styles["value-card"]}>
              <span className="eyebrow blue">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.t}>{value.title}</span>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="history" className="section dark">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="label eyebrow light">03 — History</div>
          <h2 className="content h-section">Milestones</h2>
        </div>
        <div className={styles["year-tabs"]}>
          {content.milestones.map(([year], index) => (
            <button key={year} className={cx(styles, index === milestone && "active")} onClick={() => setMilestone(index)}>
              {year}
            </button>
          ))}
        </div>
        <div className={styles.milestone}>
          <div className={styles["milestone-copy"]}>
            <span className={styles.year}>{current[0]}</span>
            <span className={styles["milestone-title"]}>{current[1]}</span>
            <p>{current[2]}</p>
          </div>
          <div className={styles["milestone-media"]}>
            <Placeholder dark label={`${current[0]} — ${current[1]} photo`} />
          </div>
        </div>
      </section>

      <section id="team" className="section">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="label eyebrow">04 — Leadership</div>
          <h2 className="content h-section">The people behind every project</h2>
        </div>
        <div className={styles.people}>
          {content.leaders.map(([name, role]) => (
            <article key={role} className={styles.person}>
              <div className={styles.portrait}>
                <Placeholder label="Portrait" />
              </div>
              <strong>{name}</strong>
              <span>{role}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="partners" className="section gray">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="label eyebrow">05 — Partners & certifications</div>
          <h2 className="content h-section">Authorised, certified, accountable</h2>
        </div>
        <div className={cx(styles, "logo-wall", "wall")}>
          {content.partners.map(([name, status]) => (
            <div key={name} className={styles.partner}>
              <strong>{name}</strong>
              <span className="muted" style={{ fontSize: 12 }}>{status}</span>
            </div>
          ))}
        </div>
        <div className={styles.certs}>
          {content.certifications.map(([name, detail]) => (
            <div key={name} className={styles.cert}>
              <span className={styles.ic}>✓</span>
              <span>
                <b>{name}</b>
                <span className="muted" style={{ fontSize: 12 }}>{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Work with an HVAC partner that stays after handover.</h2>
        <div className="btn-group">
          <Button href="/#quote" variant="dark">
            <span>Request a quote</span>
            <span>→</span>
          </Button>
          <Button href="/about" variant="outline-light">Download company profile</Button>
        </div>
      </section>
    </>
  );
}
