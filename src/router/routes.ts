import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TimelinePage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'post', component: () => import('pages/PostPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/post',
    component: () => import('pages/PostPage.vue')
  },
  {
    path: '/profile',
    component: () => import('pages/ProfilePage.vue')
  },
  {
    path: '/settings',
    component: () => import('pages/SettingsPage.vue')
  }
];

export default routes;
