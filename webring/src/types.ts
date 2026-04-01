export const jobFiltersArray = [
  "Seeking co-op",
  "Employed",
  "Not looking for work",
  "Seeking full-time",
] as const;

export const yearFiltersArray = [2023, 2024, 2025, 2026, 2027, 2028] as const;

export const techFiltersArray = [
  "React",
  "TypeScript",
  "JavaScript",
  "Vue",
  "Angular",
  "Node.js",
  "ASP.NET",
  "C",
  "C++",
  "C#",
  "Linux",
  "System Administration",
  "Machine Learning",
  "Data Science",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Kotlin",
  "Svelte",
  "Django",
  "FastAPI",
  "Spring Boot",
  "Java",
  "Laravel",
  "Bash",
  "Python",
  "Unity",
  "Godot",
  "Unreal Engine"
] as const;

export interface Member {
  name: string;
  url: string;
  tags: TechFilters[];
  jobStatus: JobFilters;
  graduationYear: YearFilters;
  email?: string;
}

export interface Menu {
  isVisible: boolean;
  member: Member;
  mouseX: number | null;
  mouseY: number | null;
}

export type JobFilters = (typeof jobFiltersArray)[number];
export type YearFilters = (typeof yearFiltersArray)[number];
export type TechFilters = (typeof techFiltersArray)[number];
