"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cx } from "@/lib/cx";
import styles from "./products.module.css";
import { useProducts } from "./useProducts";

function ProductsScreen() {
  const catalog = useProducts();
  const chips = [
    ...(catalog.category !== "All" ? [{ key: "cat" as const, value: catalog.category }] : []),
    ...catalog.selectedBrands.map((value) => ({ key: "brand" as const, value })),
    ...catalog.selectedApplications.map((value) => ({ key: "application" as const, value })),
  ];

  return (
    <>
      <section className="page-hero dark">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Products</span>
        </div>
        <div className={styles.intro}>
          <h1 className="h-display">Products</h1>
          <p>Chillers and VRV / VRF indoor units, supplied and installed as an authorised dealer for Daikin, LG and Dunham-Bush.</p>
        </div>
        <div className={styles["cat-tiles"]}>
          {catalog.categories.map((category) => {
            const count = category === "All" ? catalog.products.length : catalog.products.filter((product) => product.category === category).length;
            return (
              <button key={category} className={cx(styles, catalog.category === category && "active")} onClick={() => catalog.setCategory(category)}>
                {category}
                <span className={styles.n}>{count} product{count === 1 ? "" : "s"}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.layout}>
        <aside className={styles.filters}>
          <div>
            <div className={styles["filter-title"]}>
              <span>Brand</span>
              <button className={styles["text-btn"]} onClick={catalog.clearFilters}>Clear all</button>
            </div>
            {catalog.brands.map((brand) => (
              <button key={brand} className={cx(styles, "check", catalog.selectedBrands.includes(brand) && "on")} onClick={() => catalog.toggleBrand(brand)}>
                <span className={styles.box} />
                <span style={{ flex: 1 }}>{brand}</span>
                <span className="muted" style={{ fontSize: 12 }}>{catalog.inCategory.filter((product) => product.brand === brand).length}</span>
              </button>
            ))}
          </div>
          <div>
            <div className={styles["filter-title"]}><span>Application</span></div>
            {catalog.applications.map((application) => (
              <button key={application} className={cx(styles, "check", catalog.selectedApplications.includes(application) && "on")} onClick={() => catalog.toggleApplication(application)}>
                <span className={styles.box} />
                <span style={{ flex: 1 }}>{application}</span>
              </button>
            ))}
          </div>
          <div className={styles.help}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Not sure what you need?</span>
            <p>Our engineers can size and specify the right system for your building.</p>
            <Link href="/#quote" className="link-quiet">Talk to an engineer →</Link>
          </div>
        </aside>

        <div className={styles.results}>
          <div className={styles.toolbar}>
            <label className={cx(styles, "search-field", "search")}>
              <SearchIcon size={16} fill="#525252" />
              <input value={catalog.query} onChange={(event) => catalog.setQuery(event.target.value)} placeholder="Search by name, brand or type" />
            </label>
            <select className={styles.sort} value={catalog.sort} onChange={(event) => catalog.setSort(event.target.value as typeof catalog.sort)}>
              <option value="name">Sort: Name A–Z</option>
              <option value="nameDesc">Sort: Name Z–A</option>
            </select>
          </div>
          <div className={styles.meta}>
            <span className={styles.count}>{catalog.list.length} {catalog.list.length === 1 ? "product" : "products"}</span>
            <span className={styles.chips}>
              {chips.map((chip) => (
                <button
                  key={`${chip.key}-${chip.value}`}
                  className={styles.chip}
                  onClick={() => {
                    if (chip.key === "cat") catalog.setCategory("All");
                    if (chip.key === "brand") catalog.toggleBrand(chip.value);
                    if (chip.key === "application") catalog.toggleApplication(chip.value);
                  }}
                >
                  {chip.value} <span>✕</span>
                </button>
              ))}
            </span>
          </div>
          <div className={styles.grid}>
            {catalog.list.map((product) => (
              <article key={product.id} className={styles["product-card"]}>
                <div className={styles.media}>
                  <Image
                    className={styles["product-img"]}
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 672px) 100vw, 320px"
                  />
                  <Tag label={product.brand} tone="blue" />
                </div>
                <div className={styles["card-copy"]}>
                  <span className="muted" style={{ fontSize: 12 }}>{product.category}</span>
                  <span className={styles["product-name"]}>{product.name}</span>
                  <span className={styles.summary}>{product.summary}</span>
                </div>
                <div className={styles.specs}>
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <div className="muted" style={{ fontSize: 12 }}>{spec.label}</div>
                      <div style={{ fontSize: 14 }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.actions}>
                  <button className={cx(styles, "check", catalog.compare.includes(product.id) && "on")} onClick={() => catalog.toggleCompare(product.id)}>
                    <span className={styles.box} />
                    Compare
                  </button>
                  <Button href="#details" style={{ gap: 16 }}>
                    Details <span>→</span>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className={catalog.list.length ? "empty" : "empty show"}>
            <div style={{ fontSize: 20, color: "#161616", marginBottom: 12 }}>No products match these filters</div>
            <Button variant="tertiary" onClick={catalog.clearFilters} style={{ height: 40 }}>Clear filters</Button>
          </div>
        </div>
      </section>

      <div className={cx(styles, "compare-tray", catalog.compare.length > 0 && "show")}>
        <span className={styles["compare-count"]}>Compare ({catalog.compare.length}/3)</span>
        <div className={styles["compare-items"]}>
          {catalog.compare.map((id) => {
            const product = catalog.products.find((item) => item.id === id);
            return (
              <span key={id} className={styles.item}>
                {product?.name}
                <button onClick={() => catalog.removeCompare(id)} aria-label={`Remove ${product?.name}`}>✕</button>
              </span>
            );
          })}
        </div>
        <button className={styles["clear-compare"]} onClick={catalog.clearCompare}>Clear</button>
        <Button href="#compare" style={{ height: 40, gap: 32 }}>Compare now <span>→</span></Button>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsScreen />
    </Suspense>
  );
}
