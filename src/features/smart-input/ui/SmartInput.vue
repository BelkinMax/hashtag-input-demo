<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

import { useCaret, useStringHash } from '~/shared/composables';
import { getElementPositionToParent } from '~/shared/utils';

import { useMarkdown } from '../composables';
import { markdownMap } from '../model';
import type { Markdown } from '../model';
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
const lastOptionsMatch = ref('');
const isOptionsOpened = ref(false);
const optionsXPosition = ref(0);
const optionsPositionReset = () => {
  isOptionsOpened.value = false;
  optionsXPosition.value = 0;
};

const isExactOptionMatch = computed(() => (
  options.value.length === 1 &&
    lastOptionsMatch.value === options.value[0]
));
const isOptionsVisible = computed(() => (
  isOptionsOpened.value &&
  options.value.length &&
  !isExactOptionMatch.value
));

function onInput (event: Event) {
  const lastCaretPosition = caret.getPosition();

  userInput.value = (event.target as HTMLElement).textContent || '';

  nextTick(() => {
    // Set the caret to the same position as before the update
    caret.setPosition(lastCaretPosition);
    onCaretMove();
  });
}
function onDelete (event: KeyboardEvent) {
  if (
    !formattedUserInput.value.length &&
    event.key === 'Backspace'
  ) {
    // For some reason loses focus if
    // the Backspace pressed on empty input
    event.preventDefault();
  }
}
async function onCaretMove () {
  const element = caret.getElement();
  if (!element) {
    optionsPositionReset();
    return;
  }

  const markdownType = element.getAttribute('data-markdown-type');
  if (!markdownType) {
    optionsPositionReset();
    return;
  }

  const markdownParams = markdownMap.find(item => item.name === markdownType);
  if (
    !markdownParams ||
    !markdownParams.withOptions ||
    !markdownParams.service
  ) {
    optionsPositionReset();
    return;
  }

  await setOptionsState(element, markdownParams as Required<Markdown>);
}
async function setOptionsState (element: HTMLElement, markdownParams: Required<Markdown>) {
  const tag = element.textContent?.trim() || '';
  const { left } = getElementPositionToParent(element);
  const tagValue = tag.replace(/\W+/g, '');
  const openOptions = () => {
    optionsXPosition.value = left;
    isOptionsOpened.value = true;
  };

  if (lastOptionsMatch.value === tagValue) {
    openOptions();
    return;
  }

  lastOptionsMatch.value = tagValue;
  options.value = await markdownParams.service.findMatching(tagValue);

  openOptions();
}
</script>

<template>
  <div
    ref="inputRef"
    class="smart-input"
    @input="onInput"
    @keydown.left="onCaretMove"
    @keydown.right="onCaretMove"
    @keydown.delete="onDelete"
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
      v-show="isOptionsVisible"
      class="input-options"
      :style="{ left: `${optionsXPosition}px` }"
      :match-option="lastOptionsMatch"
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
