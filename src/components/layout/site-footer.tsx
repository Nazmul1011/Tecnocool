import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={styles.cols}>
        <div className={styles.col}>
          <Link className={styles.brand} href="/">
            <Image className={styles.mark} src="/images/tecnocool_logo.jpeg" alt="" width={32} height={32} />
            Techno Cool Associates
          </Link>
          <span className={styles.blurb}>Design, supply, installation and maintenance of HVAC systems.</span>
        </div>
        <div className={styles.col}>
          <span className={styles["col-title"]}>Brands</span>
          <span>Daikin</span>
          <span>LG</span>
          <span>DP</span>
          <span>Kruger</span>
          <span>Trane</span>
        </div>
        <div className={styles.col}>
          <span className={styles["col-title"]}>Company</span>
          <Link href="/about">About us</Link>
          <Link href="/products">Products</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/news">News & events</Link>
        </div>
        <div className={styles.col}>
          <span className={styles["col-title"]}>Contact</span>
          <span>Business: info@company.com</span>
          <span>Service: service@company.com</span>
          <span>+00 000 000 0000</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Company HVAC</span>
        <nav>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
        </nav>
      </div>
    </footer>
  );
}
