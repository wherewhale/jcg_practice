<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <Typography tag="span" color="black" weight="bold" size="md" class="mb-0">
        문제 {{ currentIndex + 1 }} / {{ total }}
      </Typography>
      <button class="btn btn-outline-secondary btn-sm" @click="goBack">← 퀴즈 목록</button>
    </div>

    <div class="card p-4" v-if="currentQuiz">
      <Typography tag="h4" color="black" weight="bold" size="lg" class="mb-3 card-title break-word">
        {{ currentQuiz.title }}
        Q. {{ currentQuiz.question }}
      </Typography>

      <input
        type="text"
        v-model="userAnswer"
        @keyup.enter="checkAnswer"
        placeholder="정답을 입력하세요"
        class="form-control mb-3"
      />

      <button class="btn btn-primary w-100 mb-3" @click="checkAnswer">정답 확인</button>

      <div v-if="result !== null" :class="['alert', result ? 'alert-success' : 'alert-danger']">
        {{ result ? '✅ 정답입니다!' : `❌ 틀렸어요! 정답은 "${currentQuiz.answer[0]}"입니다.` }}
      </div>

      <button v-if="result !== null" class="btn btn-outline-success w-100" @click="nextQuestion">
        {{ shuffledQuiz.length === currentIndex + 1 ? '퀴즈 목록으로 돌아가기' : '다음 문제' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import quizData from '@/assets/quizData.json';
import Typography from '@/components/Common/Typography.vue';

const route = useRoute();
const router = useRouter();
const category = route.params.category;

// ✅ 원본 문제 배열을 랜덤으로 섞기
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const originalQuiz = quizData[category] || [];
const shuffledQuiz = ref([]);

onMounted(() => {
  shuffledQuiz.value = shuffle([...originalQuiz]);
});

const currentIndex = ref(0);
const total = computed(() => shuffledQuiz.value.length);
const currentQuiz = computed(() => shuffledQuiz.value[currentIndex.value]);

const userAnswer = ref('');
const result = ref(null);

const checkAnswer = () => {
  const answer = userAnswer.value.trim().toLowerCase();
  result.value = currentQuiz.value.answer.includes(answer);
};

const nextQuestion = () => {
  userAnswer.value = '';
  result.value = null;
  currentIndex.value++;

  // ✅ 마지막 문제였으면 자동으로 이전 페이지로
  if (currentIndex.value >= total.value) {
    router.push({ name: 'quiz.index' });
  }
};

const goBack = () => {
  router.push({ name: 'quiz.index' });
};
</script>
