<style scoped>
header {
  padding: 1.25rem 1rem;
}
</style>

<template>
  <header class="bg-white d-flex justify-content-between align-items-center">
    <Typography tag="h2" color="black" weight="bold" size="lg" class="mb-0"> 정처기 실기 개념 </Typography>

    <RouterLink :to="linkTo" class="btn btn-primary">{{ linkText }}</RouterLink>
  </header>
</template>

<script setup>
import Typography from '../Common/Typography.vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const linkTo = route.name === 'home' ? { name: 'quiz.index' } : { name: 'home' };
const linkText = route.name === 'home' ? '대표 개념 퀴즈' : '개념 공부하기';
</script>
