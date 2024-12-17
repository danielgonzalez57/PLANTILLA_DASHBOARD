import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

const dataBaseUrl = `${import.meta.env.VITE_URL}/auth`;
 
interface User {
  ID_User: number;
  Nombre: string;
  Email: string;
  ID_Rol: number;
  Token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') as string) as User | null,
    returnUrl: null,
    error: ''
  }),
  actions: {
    async login({ Email, Password }: { Email: string, Password: string }) {
      try {
        const response = await axios.post(`${dataBaseUrl}/login`, { Email, Password });
    
        if (response.data) {
          this.user = response.data;
          localStorage.setItem('user', JSON.stringify(this.user));
          router.push(this.returnUrl || '/dashboard');
        } else {
          this.setError('Usuario o contraseña incorrectas');
        }
      } catch (error) {
        
        if (error instanceof Error) {

          if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
            this.setError('Usuario o contraseña incorrectas');
          } else {
            this.setError('Error al intentar iniciar sesión');
          }
        } else {
          this.setError('Error desconocido');
        }
      }
    },
    setError(message: string) {
      this.error = message;
      setTimeout(() => {
        this.error = '';
      }, 6000);
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
