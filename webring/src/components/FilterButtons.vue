<script setup lang="ts">
import { type JobFilters, type TechFilters, type YearFilters } from "../types";

const JOBFILTERS: JobFilters[] = [
  "Seeking co-op",
  "Employed",
  "Not looking for work",
  "Seeking full-time",
];

const TECHFILTERS: TechFilters[] = [
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
];

const YEARFILTERS: YearFilters[] = [2024, 2025, 2026, 2027, 2028];

const props = defineProps<{
  currentJobFilters: JobFilters[];
  currentTechFilters: TechFilters[];
  currentYearFilters: YearFilters[];
}>();

const emits = defineEmits<{
  setJobFilter: [filter: JobFilters];
  setTechFilter: [filter: TechFilters];
  setYearFilter: [filter: YearFilters];
}>();
</script>

<template>
  <div class="container">
    <button
      @click="emits('setJobFilter', filter)"
      v-for="filter in JOBFILTERS"
      :key="filter"
      :class="{ active: props.currentJobFilters.includes(filter) }"
    >
      {{ filter }}
    </button>
  </div>
  <div class="container">
    <button
      @click="emits('setTechFilter', filter)"
      v-for="filter in TECHFILTERS"
      :key="filter"
      :class="{ active: props.currentTechFilters.includes(filter) }"
    >
      {{ filter }}
    </button>
  </div>
  <div class="container">
    <button
      @click="emits('setYearFilter', filter)"
      v-for="filter in YEARFILTERS"
      :key="filter"
      :class="{ active: props.currentYearFilters.includes(filter) }"
    >
      {{ filter }}
    </button>
  </div>
</template>

<style scoped>
.container {
  margin: 3px;
}
</style>
