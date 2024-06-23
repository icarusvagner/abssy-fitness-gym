import { RouteRecordRaw } from 'vue-router';
import { Platform } from 'quasar';

const electronRoute = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true, roles: ['admin', 'staff', 'super'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'dashboard',
        meta: { auth: true, roles: ['admin', 'staff', 'super'] },
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/membership',
        meta: { auth: true, roles: ['admin', 'staff', 'super'] },
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
          { path: '', name: 'staff', meta: { auth: true, roles: ['admin', 'super'] }, component: () => import('pages/StaffsPage.vue') },
          { path: '/add', name: 'new_staff', meta: { auth: true, roles: ['admin', 'super'] }, component: () => import('pages/NewStaffPage.vue') },
        ]
      },
      {
        path: '/trainer',
        name: 'trainers',
        meta: { auth: true, roles: ['admin', 'super'] },
        component: () => import('layouts/TrainersLayout.vue'),
        children: [
          { path: '', name: 'trainer', component: () => import('pages/TrainersPage.vue') },
          { path: '/add', name: 'new_trainer', component: () => import('pages/NewTrainerPage.vue') },
        ]
      },
      { path: '/sales',
        name: 'sales',
        meta: { auth: true, roles: ['admin', 'super', 'staff'] },
        component: () => import('pages/SalesPage.vue') },
      {
        path: '/inventory',
        name: 'inventory',
        meta: { auth: true, roles: ['admin', 'super'] },
        component: () => import('pages/InventoryPage.vue')
      },
      {
        path: '/package',
        name: 'package',
        meta: { auth: true, roles: ['admin', 'super'] },
        component: () => import('pages/PackagesPage.vue')
      },
      {
        path: '/announcement',
        name: 'announcement',
        meta: { auth: true, roles: ['admin', 'super'] },
        component: () => import('pages/AnnouncementsPage.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: { roles: ['admin', 'super'] },
    component: () => import('pages/LoginPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    meta: { roles: ['admin', 'super', 'customer'] },
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const notElectronRoute = [
  {
    path: '/',
    name: 'user_layout',
    component: () => import('layouts/UsersLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: { auth: true },
        component: () => import('pages/CustomerPage.vue')
      },
      {
        path: '/info',
        name: 'landing_page',
        component: () => import('pages/LandingPage.vue')
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import('pages/CustomerChoosePackage.vue'),
      },
      {
        path: '/membership',
        name: 'membership',
        component: () => import('pages/NewMemberPage.vue'),
      },
      {
        path: '/event',
        name: 'event',
        component: () => import('pages/EventsPage.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('pages/AboutUsPage.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/CustomerLoginPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    meta: { roles: ['admin', 'super', 'customer'] },
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const routes: RouteRecordRaw[] = Platform.is.electron ? electronRoute : notElectronRoute;

export default routes;
