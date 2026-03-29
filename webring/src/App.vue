<script setup lang="ts">
import { type JobFilters, type TechFilters, type YearFilters } from "./types";
import FilterButtons from "./components/FilterButtons.vue";
import { ref, toRaw } from "vue";
import DirectoryView from "./components/DirectoryView.vue";
import SearchBar from "./components/SearchBar.vue";

const activeJobFilters = ref<JobFilters[]>([]);
const activeTechFilters = ref<TechFilters[]>([]);
const activeYearFilters = ref<YearFilters[]>([]);
const activeSearchFilter = ref<string>("");

function setJobFilters(value: JobFilters) {
  const index = activeJobFilters.value.indexOf(value);
  if (index === -1) {
    activeJobFilters.value.push(value);
  } else {
    activeJobFilters.value.splice(index, 1);
  }
  console.log(toRaw(activeJobFilters.value));
}

function setTechFilters(value: TechFilters) {
  const index = activeTechFilters.value.indexOf(value);
  if (index === -1) {
    activeTechFilters.value.push(value);
  } else {
    activeTechFilters.value.splice(index, 1);
  }
  console.log(toRaw(activeTechFilters.value));
}

function setYearFilters(value: YearFilters) {
  const index = activeYearFilters.value.indexOf(value);
  if (index === -1) {
    activeYearFilters.value.push(value);
  } else {
    activeYearFilters.value.splice(index, 1);
  }
  console.log(toRaw(activeYearFilters.value));
}
</script>

<template>
  <main>
    <header>
      <h1><span>Mohawk College</span> Webring</h1>
      <p class="header-sub">A directory of student portfolio sites.</p>
    </header>

    <section class="controls-container">
      <SearchBar @set-search-input="activeSearchFilter = $event"></SearchBar>
      <FilterButtons
        :currentJobFilters="activeJobFilters"
        @set-job-filter="setJobFilters"
        :currentTechFilters="activeTechFilters"
        @set-tech-filter="setTechFilters"
        :currentYearFilters="activeYearFilters"
        @set-year-filter="setYearFilters"
      ></FilterButtons>
    </section>

    <section class="directory-container">
      <DirectoryView
        :currentJobFilters="activeJobFilters"
        :currentTechFilters="activeTechFilters"
        :currentYearFilters="activeYearFilters"
        :current-search-filter="activeSearchFilter"
      ></DirectoryView>
    </section>
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background-color: #111111;
  color: #cccccc;
  font-family: "Inter", system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
}

header {
  border-bottom: 2px solid #333333;
  padding-bottom: 1.75rem;
  margin-bottom: 2.5rem;
}

.header-ring {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ff9933;
  border: 1px solid #ff9933;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  margin-bottom: 1rem;
}

header h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #e8e8e8;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

header h1 span {
  color: #ff9933;
}

.header-sub {
  font-size: 1rem;
  color: #888888;
}

.controls-container {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.directory-container {
  border-top: 1px solid #333333;
  padding-top: 2rem;
}

a {
  color: #ff9933;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

a:hover,
a:focus {
  text-decoration: none;
  opacity: 0.8;
}

a:focus-visible {
  outline: 2px solid #ff9933;
  outline-offset: 2px;
}
</style>
