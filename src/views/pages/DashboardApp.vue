
<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import Banner from '@/components/BannerApp.vue'
import Cards from '@/components/CardsApp.vue'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})

</script>

<template>
  <div class="about">
    <!-- Banner -->
    <Banner/>

    <!-- Cards Info -->
    <Cards/>
    
  </div>
</template>

