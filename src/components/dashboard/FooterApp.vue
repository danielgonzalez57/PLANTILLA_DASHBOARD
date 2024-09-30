<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// inicializar libreria flowBite 
onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div class="p-3 mt-40 sm:ml-64">
        <footer >
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" class="hover:underline">Tiendas Daka™</a>. All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Sobre Nosotros</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Soporte</a>
                </li>
            </ul>
            </div>
        </footer>
    </div>
</template>