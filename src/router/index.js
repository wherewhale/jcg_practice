import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../pages/QuizPage.vue'), // 퀴즈 레이아웃
      children: [
        {
          path: '',
          name: 'quiz.index',
          component: () => import('../pages/quiz/QuizMain.vue'), // 퀴즈 주제 선택
        },
        {
          path: ':category',
          name: 'quiz.runner',
          component: () => import('../pages/quiz/QuizRunner.vue'), // 퀴즈 진행
        },
      ],
    },
  ],
});

export default router;
