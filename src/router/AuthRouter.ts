const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/LoginLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        name: 'Login',
        path: '/',
        component: () => import('@/views/formAuth/LoginApp.vue')
      },
      {
        name: 'Error 404',
        path: '/pages/error',
        component: () => import('@/views/404/ErrorApp404.vue')
      }
    ]
  };
  
  export default AuthRoutes;