"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SECTORS } from "@/lib/content";
import { listProjects } from "./project.service";

const sectors = ["All", ...SECTORS];

export function useProjects() {
  const params = useSearchParams();
  const sectorParam = params.get("sector");
  const projects = useMemo(() => listProjects(), []);
  const [sector, setSector] = useState(sectorParam && sectors.includes(sectorParam) ? sectorParam : "All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [shown, setShown] = useState(9);

  useEffect(() => {
    setSector(sectorParam && sectors.includes(sectorParam) ? sectorParam : "All");
    setShown(9);
  }, [sectorParam]);

  const list = projects.filter(
    (project) =>
      (sector === "All" || project.sector === sector) &&
      `${project.name} ${project.client}`.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    projects,
    sectors,
    sector,
    setSector: (next: string) => {
      setSector(next);
      setShown(9);
    },
    query,
    setQuery: (next: string) => {
      setQuery(next);
      setShown(9);
    },
    view,
    setView,
    shown,
    loadMore: () => setShown((count) => count + 6),
    reset: () => {
      setSector("All");
      setQuery("");
      setShown(9);
    },
    list,
    visible: list.slice(0, shown),
  };
}
