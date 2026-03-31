<script setup lang="ts">
import { computed } from "vue";
import {
  type JobFilters,
  type Member,
  type TechFilters,
  type YearFilters,
} from "../types";
import membersArray from "../../../members.json";

const props = defineProps<{
  currentJobFilters: JobFilters[];
  currentTechFilters: TechFilters[];
  currentYearFilters: YearFilters[];
  currentSearchFilter: string;
}>();

const members: Member[] = membersArray as Member[];

const filteredMembers = computed(() => {
  return members.filter((member) => {
    const matchName =
      props.currentSearchFilter.length === 0 ||
      member.name
        .toLowerCase()
        .startsWith(props.currentSearchFilter.toLowerCase());

    const matchJob =
      props.currentJobFilters.length === 0 ||
      props.currentJobFilters.includes(member.jobStatus);

    const matchTech =
      props.currentTechFilters.length === 0 ||
      member.tags.some((tag) =>
        props.currentTechFilters.includes(tag as TechFilters),
      );

    const matchYear =
      props.currentYearFilters.length === 0 ||
      props.currentYearFilters.includes(member.graduationYear as YearFilters);

    return matchName && matchJob && matchTech && matchYear;
  });
});
</script>

<template>
  <div class="members-grid">
    <article
      v-for="member in filteredMembers"
      :key="member.name"
      class="member-card"
    >
      <h2 class="member-name">
        <a :href="member.url" target="_blank" rel="noopener noreferrer">
          {{ member.name }}
        </a>
      </h2>
      <p class="member-info">
        Class of {{ member.graduationYear }} &middot; {{ member.jobStatus }}
      </p>
      <div class="tags-container">
        <span v-for="tag in member.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 240px;
  gap: 1.5rem;
}

.member-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  border: 1px solid #333333;
  padding: 1.5rem;
  gap: 0.5rem;
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

.member-card:hover,
.member-card:focus-within {
  border-color: #ff9933;
}

.member-name {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

.member-name a {
  color: #e8e8e8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.member-name a:hover,
.member-name a:focus {
  color: #ff9933;
}

.member-info {
  margin: 0;
  font-size: 0.85rem;
  color: #888888;
  letter-spacing: 0.02em;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  overflow-y: auto;
  align-content: flex-start;
  min-height: 0;
  padding-right: 0.25rem;
  scrollbar-color: #ff9933;
}

.tags-container::-webkit-scrollbar {
  width: 6px;
  color: #ff9933;
}

.tags-container::-webkit-scrollbar-track {
  background: transparent;
}

.tags-container::-webkit-scrollbar-thumb {
  background-color: #333333;
  border-radius: 4px;
}

.tags-container::-webkit-scrollbar-thumb:hover {
  background-color: #555555;
}

.tags-container::-webkit-scrollbar-thumb:active {
  background-color: #ff9933;
  color: #ff9933;
}

.tag {
  background-color: transparent;
  border: 1px solid #333333;
  color: #cccccc;
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 2px;
  letter-spacing: 0.03em;
}
</style>
