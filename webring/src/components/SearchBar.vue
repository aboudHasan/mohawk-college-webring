<script setup lang="ts">
import { ref } from "vue";

const searchInput = ref<string>("");
const emits = defineEmits<{ setSearchInput: [input: string] }>();
</script>

<template>
  <div>
    <input
      v-model="searchInput"
      @input="emits('setSearchInput', searchInput)"
      placeholder="Search members by name..."
    />
  </div>
</template>
