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
    let jobCheck = false;
    let techCheck = false;
    let yearCheck = false;
    let nameCheck = false;

    if (
      props.currentSearchFilter.length === 0 ||
      member.name
        .toLowerCase()
        .startsWith(props.currentSearchFilter.toLowerCase())
    ) {
      nameCheck = true;
    }

    if (
      props.currentJobFilters.length === 0 ||
      props.currentJobFilters.includes(member.jobStatus)
    ) {
      jobCheck = true;
    }

    if (
      props.currentTechFilters.length === 0 ||
      member.tags.some((tag) =>
        props.currentTechFilters.includes(tag as TechFilters),
      )
    ) {
      techCheck = true;
    }

    if (
      props.currentYearFilters.length === 0 ||
      props.currentYearFilters.includes(member.graduationYear as YearFilters)
    ) {
      yearCheck = true;
    }
    return jobCheck && techCheck && yearCheck && nameCheck;
  });
});
</script>
<template>
  <div class="members-grid">
    <div
      v-for="member in filteredMembers"
      :key="member.name"
      class="member-card"
    >
      <h5 class="member-name">
        <a :href="member.url">{{ member.name }}</a>
      </h5>
      <p class="member-info">
        Class of {{ member.graduationYear }} | {{ member.jobStatus }}
      </p>

      <div class="tags-container">
        <span v-for="tag in member.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 350px;
  gap: 1.5rem;
  padding: 1rem;
}

.member-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  gap: 0.5rem;
  overflow-y: auto;
}
.member-name {
  margin: 0;
  font-size: 1.25rem;
}

.member-info {
  margin: 0;
  font-size: 0.9rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>
