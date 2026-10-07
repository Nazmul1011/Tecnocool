import { clientNames, projects } from "@/lib/content";
import type { Project } from "@/types/content";

export function listProjects(): Project[] {
  return projects;
}

export function listClients() {
  return clientNames;
}
