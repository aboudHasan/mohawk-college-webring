<script setup lang="ts">
import {
  type JobFilters,
  type TechFilters,
  type YearFilters,
  type Member,
} from "./types";
import FilterButtons from "./components/FilterButtons.vue";
import { computed, ref } from "vue";
import DirectoryView from "./components/DirectoryView.vue";
import SearchBar from "./components/SearchBar.vue";
import Graph from "./components/Graph.vue";
import membersArray from "../../members.json";

const activeJobFilters = ref<JobFilters[]>([]);
const activeTechFilters = ref<TechFilters[]>([]);
const activeYearFilters = ref<YearFilters[]>([]);
const activeSearchFilter = ref<string>("");
const highlightedMemberIndex = ref<number | null>(null);

const members: Member[] = membersArray as Member[];

const filteredMembers = computed<Member[]>(() => {
  return members.filter((member) => {
    const matchName =
      activeSearchFilter.value.length === 0 ||
      member.name
        .toLowerCase()
        .startsWith(activeSearchFilter.value.toLowerCase());

    const matchJob =
      activeJobFilters.value.length === 0 ||
      activeJobFilters.value.includes(member.jobStatus);

    const matchTech =
      activeTechFilters.value.length === 0 ||
      member.tags.some((tag) =>
        activeTechFilters.value.includes(tag as TechFilters),
      );

    const matchYear =
      activeYearFilters.value.length === 0 ||
      activeYearFilters.value.includes(member.graduationYear as YearFilters);

    return matchName && matchJob && matchTech && matchYear;
  });
});

function setJobFilters(value: JobFilters) {
  const index = activeJobFilters.value.indexOf(value);
  if (index === -1) {
    activeJobFilters.value.push(value);
  } else {
    activeJobFilters.value.splice(index, 1);
  }
}

function setTechFilters(value: TechFilters) {
  const index = activeTechFilters.value.indexOf(value);
  if (index === -1) {
    activeTechFilters.value.push(value);
  } else {
    activeTechFilters.value.splice(index, 1);
  }
}

function setYearFilters(value: YearFilters) {
  const index = activeYearFilters.value.indexOf(value);
  if (index === -1) {
    activeYearFilters.value.push(value);
  } else {
    activeYearFilters.value.splice(index, 1);
  }
}
</script>

<template>
  <main>
    <header>
      <div class="title-container">
        <img src="../public/logo.svg" class="header-logo" />
        <h1><span>Mohawk College</span> Webring</h1>
      </div>
      <p class="header-sub">A directory of student portfolio sites</p>
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

    <div class="content-layout">
      <aside class="graph-sidebar">
        <Graph
          :filtered-members="filteredMembers"
          :highlighted-member-index="highlightedMemberIndex"
          @node-hover="highlightedMemberIndex = $event"
        ></Graph>
      </aside>

      <section class="directory-panel">
        <DirectoryView
          :filtered-members="filteredMembers"
          :highlighted-member-index="highlightedMemberIndex"
          @card-hover="highlightedMemberIndex = $event"
        ></DirectoryView>
      </section>
    </div>
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
  max-width: 92rem;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
}

header {
  border-bottom: 2px solid #333333;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  height: 3.25rem;
  width: auto;
  flex-shrink: 0;
}

header h1 {
  font-size: 3.25rem;
  font-weight: 800;
  color: #e8e8e8;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

header h1 span {
  color: #ff9933;
}

.header-sub {
  font-size: 1rem;
  color: #888888;
}

.controls-container {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-layout {
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 2rem;
  align-items: start;
}

.graph-sidebar {
  position: sticky;
  top: 2rem;
  align-self: start;
}

.directory-panel {
  min-width: 0;
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

img {
  width: 50px;
  height: 50px;
}
</style>
