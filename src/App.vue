<style scoped></style>

<template>
  <BaseLayout>
    <Typography tag="h2" color="black" weight="bold" size="lg"> {{ currentData.title }} </Typography>
    <Typography tag="h3" color="black" weight="bold" size="md"> {{ currentData.concept }} </Typography>
    <figure class="mt-4" v-if="currentData?.src">
      <img :src="currentData?.src" alt="concept image" class="w-100" />
    </figure>

    <div v-if="currentData?.types" class="w-100">
      <Typography tag="h4" color="black" weight="bold" size="md" class="mt-4 w-100"> 종류 </Typography>
      <Typography
        v-for="(type, index) in currentData.types"
        :key="type"
        color="black"
        weight="regular"
        size="md"
        class="mt-2 w-100 cursor-pointer p-2 bg-white"
        @click="toggleVisible(index)"
      >
        {{ visibleList[index] ? type : '🙈 클릭해서 보기' }}
      </Typography>
    </div>

    <button class="btn btn-primary w-100 mt-5" @click="onClickNext">다음 개념으로</button>
  </BaseLayout>
</template>

<script setup>
import Typography from './components/Common/Typography.vue';
import BaseLayout from './components/Layouts/BaseLayout.vue';
import data from '@/assets/data.json';

import { onMounted, ref } from 'vue';

const currentIndex = ref(0);
const currentData = ref(data[currentIndex.value]);
const visibleList = ref(Array.isArray(currentData.value?.types) ? currentData.value.types.map(() => false) : []);

const getRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * data.length);
  return randomIndex;
};

const onClickNext = () => {
  const randomIndex = getRandomIndex();
  currentData.value = data[randomIndex];
  currentIndex.value = randomIndex;
  visibleList.value = currentData.value.types.map(() => false); // 다시 전부 보이게
};

const toggleVisible = (index) => {
  visibleList.value[index] = !visibleList.value[index];
};

onMounted(() => {
  // currentIndex.value = getRandomIndex();
  currentIndex.value = 9;
  currentData.value = data[currentIndex.value];
  visibleList.value = Array.isArray(currentData.value?.types) ? currentData.value.types.map(() => false) : []; // 다시 전부 보이게
});
</script>
