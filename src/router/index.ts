import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRouter';
import AuthRoutes from './AuthRouter';
import { useAuthStore } from '@/stores/Auth';

// Rutas de la app
const routes = [
  AuthRoutes,
  MainRoutes,
  {
    // pagina para rutas desconocidas
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/ErrorApp404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

interface User {
  id: number;
  name: string;
}

interface AuthStore {
  user: User | null;
  returnUrl: string | null;
  login(username: string, password: string): void;
  logout(): void;
}


router.beforeEach(async (to, from, next) => {
  // redirigir a la página de inicio de sesión si no ha iniciado sesión e intenta acceder a una página restringida
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const auth: AuthStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return next('/');
    } else next();
  } else {
    next();
  }
});

export default router
