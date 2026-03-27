export interface Member {
  name: string;
  url: string;
  tags: string[];
  jobStatus:
    | "Seeking co-op"
    | "Employed"
    | "Not looking for work"
    | "Seeking full-time";
  graduationYear: number;
}

export type JobFilters =
  | "Seeking co-op"
  | "Employed"
  | "Not looking for work"
  | "Seeking full-time";
export type YearFilters = 2024 | 2025 | 2026 | 2027 | 2028;
export type TechFilters =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "Vue"
  | "Angular"
  | "Node.js"
  | "ASP.NET"
  | "C"
  | "C++"
  | "C#"
  | "Linux"
  | "System Administration";
