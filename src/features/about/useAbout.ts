"use client";

import { useMemo, useState } from "react";
import { getAboutContent } from "./about.service";

export function useAbout() {
  const content = useMemo(() => getAboutContent(), []);
  const [milestone, setMilestone] = useState(0);
  return { content, milestone, setMilestone };
}
