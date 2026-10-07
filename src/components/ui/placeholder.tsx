export function Placeholder({
  label,
  dark = false,
  className = "",
}: {
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return <div className={`img-ph${dark ? " dark" : ""}${className ? ` ${className}` : ""}`}>{label}</div>;
}
