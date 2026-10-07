import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "dark" | "tertiary" | "outline-light" | "secondary";

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  style,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `btn btn-${variant}${className ? ` ${className}` : ""}`;
  if (href) {
    return (
      <Link href={href} className={classes} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} style={style} onClick={onClick}>
      {children}
    </button>
  );
}
