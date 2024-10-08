<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import SideBarComponent from './components/SideBarComponent.vue'
</script>

<template>
  <div>
    <HeaderComponent></HeaderComponent>
  </div>
  <div class="flex">
    <SideBarComponent></SideBarComponent>
    <div class="p-5 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
