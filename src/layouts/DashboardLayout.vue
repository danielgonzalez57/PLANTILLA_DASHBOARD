<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/dashboard/NavbarApp.vue'
import Sidebar from '@/components/dashboard/SidebarApp.vue'
import Footer from '@/components/dashboard/FooterApp.vue'

</script>

<template>
   <!-- navbar de la app -->
   <Navbar />
   <!-- navbar de la app -->

   <!-- sidebar de la app -->
   <Sidebar />
   <!-- sidebar de la app -->

   <!-- contenido de la app -->
   <div class="p-4 sm:ml-64 dark:bg-gray-900">
      <div class="p-3 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
         <RouterView />
      </div>
   </div>
   <!-- contenido de la app -->

    <Footer/>
</template>

<style>
/* Style scroll */
::-webkit-scrollbar {
    width: 6px; /* Ancho de la barra de desplazamiento */
}
::-webkit-scrollbar-track {
    background: #e4e3e3; /* Color de fondo de la pista */
}
::-webkit-scrollbar-thumb {
    background: #888; /* Color del pulgar */
    border-radius: 10px; /* Redondez del pulgar */
}
::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color del pulgar al pasar el ratón */
}
</style>


