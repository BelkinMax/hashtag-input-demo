<script setup lang="ts">
import { nextTick, ref } from 'vue';

import { useCaret, useStringHash } from '~/shared/composables';

import { useMarkdown } from '../composables';
import InputOptions from './InputOptions.vue';

const inputRef = ref<HTMLElement | null>(null);
const markdown = useMarkdown();
const caret = useCaret(inputRef);

const userInput = defineModel<string>({
  required: true,
});
const formattedUserInput = markdown.transform(userInput);
const inputHash = useStringHash(userInput);
const options = ref<string[]>([]);

function onInput (event: Event) {
  const lastCaretPosition = caret.getPosition();

  userInput.value = (event.target as HTMLElement).textContent || '';

  nextTick(() => {
    // Set the caret to the same position as before the update
    caret.setPosition(lastCaretPosition);
  });
}
</script>

<template>
  <div
    ref="inputRef"
    class="smart-input"
    @input="onInput"
    @paste.prevent
    @keydown.enter.prevent
    @keydown.up.prevent
    @keydown.down.prevent
  >
    <div
      :key="inputHash"
      class="textbox"
      role="textbox"
      contenteditable
    >
      <template
        v-for="(item, idx) in formattedUserInput"
        :key="idx"
      >
        <span
          v-if="item.markdown"
          v-text="item.text"
          :class="item.markdown.classList"
          :data-markdown-type="item.markdown.name"
        />
        <span
          v-else
          v-text="item.text"
        />
      </template>
    </div>

    <InputOptions
      class="input-options"
      :options="options"
    />
  </div>
</template>

<style scoped lang="postcss">
.smart-input {
  @apply
    relative
    w-full max-w-xl
    border-2 rounded-lg
    text-gray-500
    cursor-text;
}
.textbox {
  @apply
    p-4
    focus:outline-none
    focus:border-indigo-400
}
.input-options {
  @apply
    absolute
    top-full mt-2 left-0;
}
</style>
