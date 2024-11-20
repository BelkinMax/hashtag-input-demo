<script setup lang="ts">
defineProps<{
  options: string[]
}>();
</script>

<template>
  <div class="options-list">
    <button
      v-for="item in options"
      :key="item"
      class="options-item"
      tabindex="-1"
    >
      {{ item }}
    </button>
  </div>
</template>

<style scoped lang="postcss">
.options-list {
  @apply
    flex flex-col
    max-h-60 min-w-48
    overflow-x-hidden overflow-y-auto
    bg-white text-base
    py-1 rounded-md shadow-lg
    ring-1 ring-black ring-opacity-5
    focus:outline-none;
}
.options-item {
  @apply
    relative
    px-4 py-2 w-full text-start
    cursor-pointer select-none
    text-gray-500 hover:bg-indigo-500 hover:text-white;
}
</style>
