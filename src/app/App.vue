<script setup lang="ts">
import { ref } from 'vue';

import { SmartInput } from '~/features/smart-input';

const userInput = ref('Hi #everyone! What do you think about #this?');
</script>

<template>
  <div class="app-container">
    <SmartInput v-model="userInput" />
    <p class="original-text" v-text="userInput || 'Input is empty'" />
  </div>
</template>

<style scoped lang="postcss">
.app-container {
  @apply
    flex flex-col gap-3
    justify-center items-center
    h-screen px-20 py-12 lg:px-8;
}
.original-text {
  @apply
    text-sm text-gray-500;
}
</style>
