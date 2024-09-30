<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/Auth';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useLocalStorage } from "@vueuse/core";

const username = ref<string>('');
const password = ref<string>('');
const remenberMe = ref<boolean>(false);
const storedEmail = useLocalStorage('Email', '');
const storedPassword = useLocalStorage('Password', '');
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

const authStore = useAuthStore();

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();

    if (storedEmail.value && storedPassword.value) {
    username.value = storedEmail.value;
    password.value = storedPassword.value;
    remenberMe.value = true;
  }
})

const useLocalStorageAuthentication = () => {
  if (remenberMe.value) {
    storedEmail.value = username.value;
    storedPassword.value = password.value;
  } else {
    storedEmail.value = '';
    storedPassword.value = '';
  }
}

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleLogin = async () => {
  emailError.value = null;
  passwordError.value = null;

  if (!validateEmail(username.value)) {
    emailError.value = 'Correo electrónico no válido';
  }

  if (!password.value) {
    passwordError.value = 'La contraseña no puede estar vacía';
  }

  if (!emailError.value && !passwordError.value) {
    useLocalStorageAuthentication();
    authStore.clearError(); // Limpiar errores anteriores
    try {
      await authStore.login({ Email: username.value, Password: password.value });
    } catch (error) {
      console.log('error');
    }
  }
};

</script>

<template>
<div class="relative h-full w-full bg-gray-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

  <div class="grid h-screen place-items-center ">
    <div class="max-w-lg w-full z-10">
      <div
        style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);"
        class="bg-gray-800 border-gray-700 rounded-lg shadow-xl overflow-hidden"
      >
        <div class="p-8">
          <!-- logo -->
          <div class="flex justify-center">
            <img src="@/assets/img/daka.png" class="w-32 rounded-lg" alt="Logo de tiendas daka">
          </div>

          <br>
          <!-- Formulario -->
          <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm">
              <div>

                <label 
                  for="email" 
                  class="block mb-2 text-sm font-medium text-white">
                    Correo Electronico
                </label>

                <input
                  v-model="username"
                  placeholder="ejemplo@tiendasdaka.com"
                  :class="{'border-red-500  text-red-900 placeholder-red-700': emailError}"
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autocomplete="email"
                  type="text"
                  name="email"
                  id="email"
                />

                <p v-if="emailError" 
                class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium"></span> {{ emailError }}
                </p>

              </div>
              <div class="mt-4">

                <label 
                  for="email" 
                  class="block mb-2 text-sm font-medium text-white">
                  Contraseña
                </label>

                <input
                v-model="password"
                  placeholder="123456"
                  :class="{'border-red-500  text-red-900 placeholder-red-700': passwordError}"
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autocomplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                />

                <p 
                  v-if="passwordError" 
                  class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium"></span> {{ passwordError }}
                </p>

              </div>
            </div>

            <div class="flex items-center justify-between mt-4">

              <div class="flex items-center me-4">
                <input 
                  checked id="yellow-checkbox" 
                  type="checkbox"
                  v-model="remenberMe"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="yellow-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300">Recordar</label>
              </div>

            </div>

            <!-- bottom -->
            <div>
              <button type="submit" class="text-white w-full justify-center bg-blue-700 hover:bg-blue-800 transition duration-400 ease-in-out transform font-medium rounded-lg text-lg px-4 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Iniciar sesión
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2 transition-transform duration-400 ease-in-out hover:translate-x-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>
            </div>

            <div v-if="authStore.error" id="alert-2" class="flex items-center p-4 mb-4 border border-red-500 rounded-lg  bg-gray-800 text-red-500" role="alert">
              <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              
              <span class="sr-only">Info</span>

              <div class="ms-3 text-sm font-medium">
                {{ authStore.error }}
              </div>
            </div>
          </form>
        </div>  
        <!-- footer login -->
        <div class="px-8 py-4 bg-gray-700 text-center">
          <span class="text-gray-400">All Rights Reserved</span>
          <RouterLink class="font-medium text-blue-500 hover:text-blue-400" to="/"
            > © Tiendas Daka™
          </RouterLink>
        </div>

      </div>
    </div>

  </div>
</div>
</template>