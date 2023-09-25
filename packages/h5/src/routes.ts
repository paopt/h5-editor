import { createRouter, createWebHashHistory } from 'vue-router';
import HomeComponent from '@/views/Home.vue';
import EditorComponent from '@/views/Editor.vue';

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/editor',
    component: EditorComponent
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;