<script setup lang="ts">
import {
  type JobFilters,
  type Member,
  type TechFilters,
  type YearFilters,
} from "./types";
import membersArray from "../../members.json";
import FilterButtons from "./components/FilterButtons.vue";
import { ref, toRaw } from "vue";
import DirectoryView from "./components/DirectoryView.vue";
import SearchBar from "./components/SearchBar.vue";

const members: Member[] = membersArray as Member[];
const filterMembers = [];
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
    <h3>Hello</h3>
    <SearchBar @set-search-input="activeSearchFilter = $event"></SearchBar>
    <FilterButtons
      :currentJobFilters="activeJobFilters"
      @set-job-filter="setJobFilters"
      :currentTechFilters="activeTechFilters"
      @set-tech-filter="setTechFilters"
      :currentYearFilters="activeYearFilters"
      @set-year-filter="setYearFilters"
    ></FilterButtons>
    <DirectoryView
      :currentJobFilters="activeJobFilters"
      :currentTechFilters="activeTechFilters"
      :currentYearFilters="activeYearFilters"
      :current-search-filter="activeSearchFilter"
    ></DirectoryView>
  </main>
</template>

<style></style>
