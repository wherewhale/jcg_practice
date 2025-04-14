<template>
  <div class="container mt-5">
    <h2 class="mb-4 fw-bold text-center">📚 퀴즈 주제를 선택하세요</h2>

    <div class="d-grid gap-3">
      <button
        v-for="category in categories"
        :key="category.key"
        @click="goToCategory(category.key)"
        class="btn btn-primary btn-lg w-100"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = [
  { key: 'design-patterns', label: '디자인 패턴' },
  // { key: 'network', label: '네트워크' },
];

const goToCategory = (category) => {
  router.push(`/quiz/${category}`);
};
</script>
