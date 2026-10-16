"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import { Placeholder } from "@/components/ui/placeholder";
import { cx } from "@/lib/cx";
import { menus, navItems, type NavKey } from "./navigation";
import styles from "./site-header.module.css";

function activeKey(pathname: string): NavKey | "" {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/products")) return "products";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/news")) return "news";
  return "";
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const current = activeKey(pathname);
  const [openMenu, setOpenMenu] = useState<NavKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState<NavKey | null>(null);
  const [query, setQuery] = useState("");
  const menu = openMenu ? menus[openMenu] : null;

  useEffect(() => {
    setOpenMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
    setMobileKey(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={styles["site-header"]} onMouseLeave={() => setOpenMenu(null)}>
      <div className={styles.topbar}>
        <span>technocool.bd@gmail.com</span>
        <span>+8801762625960-99</span>
        <span>Dhaka, Bangladesh</span>
      </div>
      <div className={styles.bar}>
        <Link className={styles.logo} href="/" onMouseEnter={() => setOpenMenu(null)}>
          <Image
            className={styles["logo-mark"]}
            src="/images/tecnocool_logo.jpeg"
            alt=""
            width={40}
            height={40}
            priority
          />
          <span className={styles["logo-text"]}>
            Techno Cool <span>Associates</span>
          </span>
        </Link>
        <nav className={styles["main-nav"]}>
          {navItems.map((item) => {
            const key = item.key === "live" ? null : item.key;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(styles, current === item.key && "active", openMenu === item.key && "open")}
                onMouseEnter={() => setOpenMenu(key)}
              >
                {item.label}
                {key ? <span className={styles.caret}>▾</span> : null}
              </Link>
            );
          })}
        </nav>
        <button
          className={styles["search-btn"]}
          aria-label="Search"
          onMouseEnter={() => setOpenMenu(null)}
          onClick={() => {
            setOpenMenu(null);
            setMobileOpen(false);
            setSearchOpen((open) => !open);
          }}
        >
          <SearchIcon />
        </button>
        <Link className={styles["quote-btn"]} href="/#quote" onMouseEnter={() => setOpenMenu(null)}>
          Get a quote <span>→</span>
        </Link>
        <button
          className={cx(styles, "menu-btn", mobileOpen && "open")}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setSearchOpen(false);
            setOpenMenu(null);
            setMobileOpen((open) => !open);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <form
        className={cx(styles, "dropdown", "search-panel", searchOpen && "show")}
        onSubmit={(event) => {
          event.preventDefault();
          const next = query.trim();
          router.push(next ? `/products?q=${encodeURIComponent(next)}` : "/products");
          setSearchOpen(false);
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, brands, projects, news"
          aria-label="Search"
        />
        <button type="button" onClick={() => setSearchOpen(false)}>
          Close
        </button>
      </form>
      <div className={cx(styles, "dropdown", menu && "show")}>
        {menu ? (
          <>
            <div className={styles["mega-intro"]}>
              <span className="eyebrow">{menu.label}</span>
              <span className={styles.title}>{menu.intro}</span>
              <Link href={menu.href}>{menu.all} →</Link>
            </div>
            <div className={styles["mega-links"]}>
              {menu.items.map((item) => (
                <Link key={item.name} href={item.href}>
                  <b>{item.name}</b>
                  <span>{item.summary}</span>
                </Link>
              ))}
            </div>
            <Link className={styles["mega-feature"]} href={menu.feature[2]}>
              {menu.feature[3] ? (
                <Image
                  className={styles["feature-img"]}
                  src={menu.feature[3]}
                  alt={menu.feature[1]}
                  width={1086}
                  height={1448}
                  sizes="320px"
                />
              ) : (
                <Placeholder label="Featured image" />
              )}
              <span className="eyebrow blue">{menu.feature[0]}</span>
              <span>{menu.feature[1]}</span>
            </Link>
          </>
        ) : null}
      </div>
      <nav className={cx(styles, "drawer", mobileOpen && "show")} aria-label="Mobile">
        {navItems.map((item) => {
          const key = item.key === "live" ? null : item.key;
          const section = key ? menus[key] : null;
          const expanded = key !== null && mobileKey === key;
          return (
            <div key={item.href}>
              <div className={styles["drawer-row"]}>
                <Link href={item.href} className={cx(styles, current === item.key && "active")}>
                  {item.label}
                </Link>
                {section ? (
                  <button
                    type="button"
                    aria-label={`${expanded ? "Hide" : "Show"} ${item.label}`}
                    onClick={() => setMobileKey(expanded ? null : key)}
                  >
                    {expanded ? "▴" : "▾"}
                  </button>
                ) : null}
              </div>
              {section && expanded ? (
                <div className={styles["drawer-sub"]}>
                  {section.items.map((link) => (
                    <Link key={link.name} href={link.href}>{link.name}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <Link className={styles["drawer-quote"]} href="/#quote">
          Get a quote <span>→</span>
        </Link>
        <div className={styles["drawer-contact"]}>
          <span>technocool.bd@gmail.com</span>
          <span>+8801762625960-99</span>
        </div>
      </nav>
    </header>
  );
}
