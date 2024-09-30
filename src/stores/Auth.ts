import { defineStore } from 'pinia';
import router from '@/router';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') as string) as User | null,
    returnUrl: null,
    error: ''
  }),
  actions: {
    async login({ Email, Password }: { Email: string, Password: string }) {
      
      const validEmail = 'dan.gonzalez@tiendasdaka.com';
      const validPassword = '123456';

      if (Email === validEmail && Password === validPassword) {

        const user = { id: 1, name: 'Dan Gonzalez', email: Email };
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        router.push(this.returnUrl || '/dashboard');

      } else {

        this.error = 'Usuario o contraseña incorrectas'

        setTimeout(() => {
          this.error = ''
        }, 6000);

      }
    },
    clearError() {
      this.error = '';
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push({ name: 'Login' });
    }
  }
});
