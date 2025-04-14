import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createGtag } from 'vue-gtag';

const app = createApp(App);

const gtag = createGtag({
  tagId: import.meta.env.VITE_GA_ID,
});

app.use(router);
app.use(gtag);

app.mount('#app');
