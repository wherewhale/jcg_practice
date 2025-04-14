<template>
  <BaseLayout>
    <RouterView :key="route.fullPath" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/Layouts/BaseLayout.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>
