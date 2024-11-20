<script setup lang="ts">
withDefaults(defineProps<{
  options: string[]
  selectedIdx?: number;
  matchOption?: string;
}>(), {
  selectedIdx: -1,
  matchOption: '',
});
const emits = defineEmits<{
  'select': [string]
}>();

function match (source: string, option: string) {
  return option.slice(source.length);
}
function onSelect (item: string) {
  emits('select', item);
}
</script>

<template>
  <div class="options-list">
    <button
      v-for="(item, idx) in options"
      :key="item"
      class="options-item"
      :class="{
        'selected': idx === selectedIdx
      }"
      tabindex="-1"
      @click.stop="onSelect(item)"
    >
      <span class="font-bold" v-text="matchOption" />
      <span v-text="match(matchOption, item)" />
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

  &.selected:not(:hover) {
    @apply bg-gray-50;
  }
}
</style>
