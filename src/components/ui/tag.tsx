const TAG_CLASS: Record<string, string> = {
  Award: "yellow",
  Event: "purple",
  Exhibition: "blue",
  Workshop: "green",
  Conference: "purple",
  Launch: "magenta",
  Seminar: "",
  "On track": "green",
  Review: "yellow",
  Complete: "blue",
};

export function Tag({ label, tone }: { label: string; tone?: string }) {
  const extra = tone ?? TAG_CLASS[label] ?? "";
  return <span className={`tag${extra ? ` ${extra}` : ""}`}>{label}</span>;
}
