"use client";

import Link from "next/link";
import { Suspense } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import styles from "./projects.module.css";
import { listClients } from "./project.service";
import { useProjects } from "./useProjects";

function ProjectsScreen() {
  const catalog = useProjects();
  const clients = listClients();

  return (
    <>
      <section className="page-hero dark">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Projects</span>
        </div>
        <div className={styles.lead}>
          <h1 className="h-display">Our projects</h1>
          <p>Climate systems we have designed, supplied and installed for clients across commercial, healthcare, retail, hospitality and industrial buildings.</p>
        </div>
        <div className={styles["hero-stats"]}>
          {[
            ["1,200+", "Projects delivered"],
            ["480+", "Clients served"],
            ["6", "Sectors"],
            ["28 yrs", "In operation"],
          ].map(([value, label]) => (
            <div key={label} className={styles["hero-stat"]}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles["featured-media"]}>
          <Placeholder dark label="Featured project photo" />
        </div>
        <div className={styles["featured-copy"]}>
          <span className="eyebrow sky">Featured project · Healthcare</span>
          <h2>General Hospital Wing B</h2>
          <p>Replacement of the central chiller plant and theatre air handling units — phased over night shifts with zero clinical downtime.</p>
          <div className={styles.facts}>
            <div><small>Client</small>Ministry of Health</div>
            <div><small>Completed</small>2026</div>
            <div><small>System</small>Trane chillers, Kruger AHUs</div>
            <div><small>Capacity</small>2 × 1,500 kW</div>
          </div>
          <Button href="#featured" className={styles["case-cta"]}>
            <span>View case study</span>
            <span>→</span>
          </Button>
        </div>
      </section>

      <section className={styles["filter-bar"]}>
        <div className="tabs underline-tabs" style={{ minWidth: 0 }}>
          {catalog.sectors.map((sector) => {
            const count = sector === "All" ? catalog.projects.length : catalog.projects.filter((project) => project.sector === sector).length;
            return (
              <button key={sector} className={catalog.sector === sector ? "active" : ""} onClick={() => catalog.setSector(sector)}>
                {sector}
                <span className="count">{count}</span>
              </button>
            );
          })}
        </div>
        <div className={styles.tools}>
          <label className={cx(styles, "search-field", "search")}>
            <SearchIcon size={16} fill="#525252" />
            <input value={catalog.query} onChange={(event) => catalog.setQuery(event.target.value)} placeholder="Search client or project" />
          </label>
          <div className={styles["view-toggle"]}>
            {(["Grid", "List"] as const).map((mode) => (
              <button key={mode} className={cx(styles, catalog.view === mode && "active")} onClick={() => catalog.setView(mode)}>
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.count}>
          Showing {catalog.visible.length} of {catalog.list.length} project{catalog.list.length === 1 ? "" : "s"}
        </div>
        {catalog.view === "Grid" ? (
          <div className="grid grid-auto-280">
            {catalog.visible.map((project) => (
              <Link key={project.id} className={styles["project-card"]} href="#project">
                <div className={styles.media}>
                  <Placeholder label="Project photo" />
                  <Tag label={project.sector} tone="white" />
                </div>
                <div className={styles["card-copy"]}>
                  <span className="muted" style={{ fontSize: 12 }}>{project.client}</span>
                  <span className={styles["project-name"]}>{project.name}</span>
                  <span className={styles.scope}>{project.scope}</span>
                </div>
                <div className={styles.foot}>
                  <span>{project.city} · {project.year}</span>
                  <span className={styles.brand}>{project.brands}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.table}>
            <div className={cx(styles, "row", "head")}>
              <div>Project</div>
              <div>Client</div>
              <div>Sector</div>
              <div>System</div>
              <div>Year</div>
            </div>
            {catalog.visible.map((project) => (
              <Link key={project.id} className={styles.row} href="#project">
                <div>
                  <div>{project.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{project.city}</div>
                </div>
                <div style={{ color: "#525252" }}>{project.client}</div>
                <div><Tag label={project.sector} /></div>
                <div style={{ color: "#525252" }}>{project.brands}</div>
                <div className="mono" style={{ fontSize: 12 }}>{project.year}</div>
              </Link>
            ))}
          </div>
        )}
        <div className={catalog.list.length ? "empty" : "empty show"}>
          <div style={{ fontSize: 20, color: "#161616", marginBottom: 12 }}>No projects match your search</div>
          <Button variant="tertiary" onClick={catalog.reset} style={{ height: 40 }}>Show all projects</Button>
        </div>
        {catalog.list.length > catalog.shown ? (
          <div className={styles.load}>
            <Button variant="tertiary" onClick={catalog.loadMore} style={{ background: "#fff" }}>Load more projects</Button>
          </div>
        ) : null}
      </section>

      <section className="section">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="label eyebrow">Our clients</div>
          <h2 className="content h-section">Trusted by developers, operators and public institutions</h2>
        </div>
        <div className="logo-wall">
          {clients.map((client) => (
            <div key={client} className={styles.logos}>
              <Placeholder label={`${client} logo`} />
            </div>
          ))}
        </div>
      </section>

      <section className={cx(styles, "split", "quote")}>
        <div className={cx(styles, "label", "eyebrow", "quote-kicker")}>Client feedback</div>
        <div className="content" style={{ maxWidth: 960 }}>
          <p>&ldquo;They replaced our entire chiller plant while the hospital stayed fully operational. Planning, communication and handover were outstanding.&rdquo;</p>
          <div style={{ fontSize: 14 }}>Name Surname</div>
          <div style={{ fontSize: 14, color: "#d0e2ff" }}>Facilities Director, General Hospital</div>
        </div>
      </section>

      <section className={styles["dark-band"]}>
        <h2>Have a project in mind? Let&apos;s talk about the right system.</h2>
        <Button href="/#quote">
          <span>Request a quote</span>
          <span>→</span>
        </Button>
      </section>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsScreen />
    </Suspense>
  );
}
