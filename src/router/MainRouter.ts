const MainRoutes =   {
  path: '/home',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/DashboardLayout.vue'),
  children: [
    // VIEWS
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/pages/DashboardApp.vue')
    },
    // TABLES
    {
      path: '/tables',
      name: 'Tables',
      component: () => import('@/views/pages/TablesUser.vue')
    },
    {
      path: '/tablesRoles',
      name: 'TablesRoles',
      component: () => import('@/views/pages/TablesRoles.vue')
    },
    {
      path: '/tablesExhibicion',
      name: 'TablesExhibicion',
      component: () => import('@/views/pages/TablesExhibicion.vue')
    },
    // FORMS
    {
      path: '/formUser',
      name: 'formUser',
      component: () => import('@/views/formApp/formUser.vue')
    },
    {
      path: '/formRoles',
      name: 'formRoles',
      component: () => import('@/views/formApp/formRoles.vue')
    },
  ]
}

export default MainRoutes;