<script setup lang="ts">
import type { Member } from "../types";

const props = defineProps<{
  filteredMembers: Member[];
  highlightedMemberIndex: number | null;
}>();

const emit = defineEmits<{
  (e: "card-hover", index: number | null): void;
}>();
</script>

<template>
  <div class="members-grid">
    <article
      v-for="(member, i) in props.filteredMembers"
      :key="member.name"
      class="member-card"
      :class="{ highlighted: i === props.highlightedMemberIndex }"
      @mouseenter="emit('card-hover', i)"
      @mouseleave="emit('card-hover', null)"
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
.member-card:focus-within,
.member-card.highlighted {
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
  scrollbar-color: #ff9933 transparent;
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
