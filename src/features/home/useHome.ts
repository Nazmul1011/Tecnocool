"use client";

import { useMemo } from "react";
import { getHomeContent } from "./home.service";

export function useHome() {
  return useMemo(() => getHomeContent(), []);
}
