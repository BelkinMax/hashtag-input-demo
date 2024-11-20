<script setup lang="ts">
import { ref } from 'vue';

const userInput = ref('Hi #everyone! What do you think about #this?');
</script>

<template>
  <div class="app-container">
    {{ userInput }}
  </div>
</template>

<style lang="postcss" scoped>
.app-container {
  @apply
    flex flex-col gap-3
    justify-center items-center
    h-screen px-20 py-12 lg:px-8;
}
</style>
