<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { initFlowbite } from 'flowbite'
import { useToggleStore } from '@/stores/ToggleStore';
import { useAuthStore } from '@/stores/Auth';

// pinia
const authStore = useAuthStore();
const toggleStore = useToggleStore();

// Cargar la preferencia del usuario al montar el componente
onMounted(() => {
  initFlowbite();
  const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  toggleStore.isToggled = isDarkMode;
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Observa los cambios en el estado isToggled y guarda la preferencia
watch(() => toggleStore.isToggled, (newVal) => {
  localStorage.setItem('isDarkMode', newVal.toString());
  if (newVal) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// cerrar session
const handleLogout = () => {
  authStore.logout();
  
};

</script>

<template>
    
        <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">

                <div class="flex items-center justify-start rtl:justify-end">
                    <!-- Buttom responsive -->
                    <button 
                        data-drawer-target="logo-sidebar" 
                        data-drawer-toggle="logo-sidebar" 
                        aria-controls="logo-sidebar" 
                        type="button" 
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                    </button>

                    <!-- Logo -->
                    <RouterLink to="/dashboard" class="flex ms-2 md:me-24">
                        <img src="@/assets/img/dakaCamion.png" class="h-9 me-3" alt="FlowBite Logo" />
                        <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Sugerido de Pedidos</span>
                    </RouterLink>
                </div>

                <div class="flex items-center">
                    <!-- darkMode -->
                    <div class="flex items-center ms-3">
                        <div>
                            <button type="button" class="flex text-sm" aria-expanded="false">
                            <label class="inline-flex items-center me-2 cursor-pointer">
                                <input type="checkbox" class="sr-only peer" v-model="toggleStore.isToggled"  @click="toggleStore.toggle()">
                                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                            </button>
                        </div>
                    </div>

                    <!-- foto de perfil -->
                    <div class="flex items-center ms-3">
                        <div>
                            <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-8 h-8 rounded-full" src="@/assets/img/avatar-1.png" alt="user photo">
                            </button>
                        </div>
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                        <div class="px-4 py-3" role="none">
                            <p class="text-sm text-gray-900 dark:text-white" role="none">
                            Daniel Gonzalez
                            </p>
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            dan.gonzalez@tiendasdaka.com
                            </p>
                        </div>
                        <ul class="py-1" role="none">
                            <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                            </li>
                            <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Configuracion</a>
                            </li>
                            <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Soporte</a>
                            </li>
                            <li >
                                <button @click="handleLogout()" type="button" class="px-3 py-2 me-2 mb-2 mx-3 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cerrar sesión
                                    <svg class="rtl:rotate-180 w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </nav>
   
    
</template>