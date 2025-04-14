<style scoped>
.container {
  max-width: 768px !important;
  min-height: 100vh;
  padding: 0;
  position: relative;
}
main {
  padding: 2rem 1rem 6rem;
}
</style>

<template>
  <div class="container bg-gray-1">
    <BaseHeader />
    <main class="d-flex align-items-center flex-column">
      <slot></slot>
    </main>
    <BaseFooter />
  </div>
</template>

<script setup>
import BaseFooter from './BaseFooter.vue';
import BaseHeader from './BaseHeader.vue';
</script>
