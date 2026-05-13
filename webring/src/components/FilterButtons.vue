<script setup lang="ts">
import {
  type JobFilters,
  type TechFilters,
  type YearFilters,
  jobFiltersArray,
  yearFiltersArray,
  techFiltersArray,
} from "../../../types";

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
  <div class="filters-wrapper">
    <div class="filter-group">
      <button
        v-for="filter in jobFiltersArray"
        :key="filter"
        @click="emits('setJobFilter', filter)"
        class="filter-btn"
        :class="{ 'is-active': props.currentJobFilters.includes(filter) }"
      >
        {{ filter }}
      </button>
    </div>

    <div class="filter-group">
      <button
        v-for="filter in techFiltersArray"
        :key="filter"
        @click="emits('setTechFilter', filter)"
        class="filter-btn"
        :class="{ 'is-active': props.currentTechFilters.includes(filter) }"
      >
        {{ filter }}
      </button>
    </div>

    <div class="filter-group">
      <button
        v-for="filter in yearFiltersArray"
        :key="filter"
        @click="emits('setYearFilter', filter)"
        class="filter-btn"
        :class="{ 'is-active': props.currentYearFilters.includes(filter) }"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  padding: 0.6rem;
  background-color: #1e1e1e;
  border: 1px solid #333333;
  border-radius: 4px;
  gap: 0.5rem;
}

.filter-btn {
  background-color: transparent;
  border: 1px solid #333333;
  color: #cccccc;
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.4rem 0.85rem;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-btn:hover,
.filter-btn:focus-visible {
  border-color: #ff9933;
  color: #e8e8e8;
  outline: none;
}

.filter-btn.is-active {
  background-color: #ff9933;
  border-color: #ff9933;
  color: #111111;
}
</style>
