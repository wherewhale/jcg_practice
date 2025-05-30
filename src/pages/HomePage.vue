<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

<template>
  <BaseLayout v-if="currentData">
    <StaticIntro v-if="!ready" />
    <transition class="w-100" name="slide" mode="out-in">
      <div :key="currentIndex">
        <Typography color="black" weight="medium" size="md">
          {{ currentIndex + 1 }} / {{ shuffledData.length + 1 }}
        </Typography>
        <Typography tag="h2" color="black" weight="bold" size="lg">
          {{ currentData.title }}
        </Typography>
        <Typography tag="h3" color="black" weight="bold" size="md">
          {{ currentData.concept }}
        </Typography>
        <figure class="mt-4" v-if="currentData?.src">
          <img :src="currentData?.src" alt="concept image" class="w-100" />
        </figure>

        <div v-if="currentData?.types" class="w-100">
          <Typography tag="h4" color="black" weight="bold" size="md" class="mt-4 w-100">
            상세 정보 및 종류
          </Typography>
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
      </div>
    </transition>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/Layouts/BaseLayout.vue';
import Typography from '@/components/Common/Typography.vue';
import StaticIntro from '@/components/StaticIntro.vue';

import data from '@/assets/data.json';

import { onMounted, ref } from 'vue';

const currentIndex = ref(0);
const shuffledData = ref([]);
const currentData = ref(null);
const visibleList = ref([]);
const ready = ref(false);

// Fisher-Yates 셔플 함수
const shuffleArray = (arr) => {
  const copied = [...arr];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

const loadCurrentData = () => {
  currentData.value = shuffledData.value[currentIndex.value];
  visibleList.value = Array.isArray(currentData.value?.types)
    ? currentData.value.types.map(() => false)
    : [];
};

const onClickNext = () => {
  currentIndex.value++;
  if (currentIndex.value >= shuffledData.value.length) {
    shuffledData.value = shuffleArray(data);
    currentIndex.value = 0;
  }
  loadCurrentData();
};

const toggleVisible = (index) => {
  visibleList.value[index] = !visibleList.value[index];
};

onMounted(() => {
  shuffledData.value = shuffleArray(data);
  currentIndex.value = 0;
  loadCurrentData();
  ready.value = true; // 콘텐츠 준비 완료되면 전환
});
</script>
