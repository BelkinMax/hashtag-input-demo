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
const selectedOptionIdx = ref(-1);
const optionsPositionReset = () => {
  isOptionsOpened.value = false;
  optionsXPosition.value = 0;
  selectedOptionIdx.value = -1;
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
function onEnter () {
  const selectedOption = (
    options.value[selectedOptionIdx.value] ||
    options.value[0]
  );

  onOptionSelect(selectedOption);
}
function onSelectPrev () {
  const newIdx = selectedOptionIdx.value - 1;
  const lastIdx = options.value.length - 1;

  selectedOptionIdx.value = newIdx < 0
    ? lastIdx
    : newIdx;
}
function onSelectNext () {
  const newIdx = selectedOptionIdx.value + 1;
  const lastIdx = options.value.length - 1;

  selectedOptionIdx.value = newIdx > lastIdx
    ? 0
    : newIdx;
}
function onOptionSelect (selectedOption: string) {
  const element = caret.getElement();
  if (!element || !isOptionsVisible.value) {
    return;
  }

  const currentContent = element.textContent;
  if (!currentContent) {
    return;
  }

  setContent(
    element,
    currentContent.replace(/\w+/g, selectedOption)
  );
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
  const tagValue = tag.replace(/\W+/g, '');
  const { left } = getElementPositionToParent(element);
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
function setContent (element: HTMLElement, content: string) {
  element.textContent = content;

  nextTick(() => {
    const caretPosition = caret.getPosition();

    caret.setPosition(caretPosition + content.length);
    onCaretMove();
  });
}
</script>

<template>
  <div
    ref="inputRef"
    class="smart-input"
    @input="onInput"
    @keydown.left="onCaretMove"
    @keydown.right="onCaretMove"
    @keydown.up="onSelectPrev"
    @keydown.down="onSelectNext"
    @keydown.delete="onDelete"
    @keydown.enter.prevent="onEnter"
    @paste.prevent
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
      :selected-idx="selectedOptionIdx"
      :match-option="lastOptionsMatch"
      :options="options"
      @select="onOptionSelect"
    />
  </div>
</template>

<style scoped lang="postcss">
.smart-input {
  @apply
    relative
    w-full
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
