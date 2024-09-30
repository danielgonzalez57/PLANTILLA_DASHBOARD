const MainRoutes =   {
  path: '/home',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/pages/DashboardApp.vue')
    },
    {
      path: '/tables',
      name: 'Tables',
      component: () => import('@/views/pages/TablesApp.vue')
    },
  ]
}

export default MainRoutes;