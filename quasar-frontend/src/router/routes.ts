import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      {
        path: '/membership',
        component: () => import('layouts/MembershipLayout.vue'),
        children: [
          { path: '', name: 'membership', component: () => import('pages/MembershipPage.vue') },
          { path: '/add', name: 'new', component: () => import('pages/NewMemberPage.vue') }
        ]
      },
      { path: '/staff', name: 'staff', component: () => import('pages/StaffsPage.vue') },
      { path: '/trainer', name: 'trainer', component: () => import('pages/TrainersPage.vue') },
      { path: '/sales', name: 'sales', component: () => import('pages/SalesPage.vue') },
      { path: '/inventory', name: 'inventory', component: () => import('pages/InventoryPage.vue') },
      { path: '/package', name: 'package', component: () => import('pages/PackagesPage.vue') },
      { path: '/announcement', name: 'announcement', component: () => import('pages/AnnouncementsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
