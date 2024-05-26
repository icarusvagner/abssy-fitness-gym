import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true, roles: ['admin', 'staff'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', meta: { auth: true, roles: ['admin', 'staff'] }, component: () => import('pages/IndexPage.vue') },
      {
        path: '/membership',
        meta: { auth: true, roles: ['admin', 'staff'] },
        component: () => import('layouts/MembershipLayout.vue'),
        children: [
          { path: '', name: 'membership', component: () => import('pages/MembershipPage.vue') },
          { path: '/add', name: 'new_member', component: () => import('pages/NewMemberPage.vue') },
          { path: '/:id', name: 'one_member', component: () => import('pages/OneMemberPage.vue') },
        ]
      },
      {
        path: '/staff',
        name: 'staffs',
        meta: { auth: true, roles: ['admin'] },
        component: () => import('layouts/StaffLayout.vue'),
        children: [
          { path: '', name: 'staff', meta: { auth: true, roles: ['admin'] }, component: () => import('pages/StaffsPage.vue') },
          { path: '/add', name: 'new_staff', meta: { auth: true, roles: ['admin'] }, component: () => import('pages/NewStaffPage.vue') },
        ]
      },
      {
        path: '/trainer',
        name: 'trainers',
        meta: { auth: true, roles: ['admin'] },
        component: () => import('layouts/TrainersLayout.vue'),
        children: [
          { path: '', name: 'trainer', component: () => import('pages/TrainersPage.vue') },
          { path: '/add', name: 'new_trainer', component: () => import('pages/NewTrainerPage.vue') },
        ]
      },
      { path: '/sales', name: 'sales', component: () => import('pages/SalesPage.vue') },
      { path: '/inventory', name: 'inventory', component: () => import('pages/InventoryPage.vue') },
      { path: '/package', name: 'package', component: () => import('pages/PackagesPage.vue') },
      { path: '/announcement', name: 'announcement', component: () => import('pages/AnnouncementsPage.vue') },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
