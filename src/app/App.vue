<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { SmartInput } from '~/features/smart-input';
import { hashtagService } from '~/entities/hashtag';

const userInput = ref('Hi #everyone! What do you think about #gastroenterology?');
const allTags = ref<string[]>([]);

onMounted(async () => {
  const tags = await hashtagService.findMatching();

  allTags.value = tags.sort();
});
</script>

<template>
  <div class="app-container">
    <div class="content-wrapper">
      <SmartInput v-model="userInput" />

      <div v-if="allTags.length" class="all-tags">
        <span
          v-for="tag in allTags"
          :key="tag"
          v-text="`#${tag}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.app-container {
  @apply
    flex justify-center items-center
    h-screen px-28 py-8;
}
.content-wrapper {
  @apply
    flex flex-col gap-8
    justify-center items-center
    w-full max-w-screen-md;
}
.all-tags {
  @apply
    flex flex-wrap gap-3 w-full
    text-sm text-gray-400;
}
</style>
