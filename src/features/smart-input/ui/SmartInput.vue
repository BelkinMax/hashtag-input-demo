<script setup lang="ts">
import { ref } from 'vue';

const userInput = defineModel<string>({
  required: true,
});

const inputRef = ref<HTMLElement | null>(null);

function onInput (event: Event) {
  userInput.value = (event.target as HTMLElement).textContent || '';
}
</script>

<template>
  <div
    ref="inputRef"
    class="smart-input"
    role="textbox"
    contenteditable
    @input="onInput"
  >
    <span v-text="userInput" />
  </div>
</template>

<style scoped lang="postcss">
.smart-input {
  @apply
    w-full p-4 border-2 rounded-lg
    text-gray-500 focus:outline-none focus:border-indigo-400
    cursor-text;
}
</style>
