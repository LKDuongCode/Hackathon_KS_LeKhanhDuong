<script setup lang="ts"></script>

<template>
  <div class="h-screen w-96 bg-[#333] px-2 flex flex-col">
    <router-link
      exact-active-class="active"
      to="/"
      class="p-5 hover:bg-[#444] text-white rounded font-semibold text-lg mt-5"
      >Dashboard</router-link
    >
    <hr class="border-[#555] border-solid" />
    <router-link
      exact-active-class="active"
      to="/categories-manager"
      class="p-5 hover:bg-[#444] text-white rounded font-semibold text-lg"
    >
      Categories Manager
    </router-link>
    <hr class="border-[#555] border-solid" />
    <router-link
      exact-active-class="active"
      to="/products-manager"
      class="p-5 hover:bg-[#444] text-white rounded font-semibold text-lg"
      >Products Manager</router-link
    >
    <hr class="border-[#555] border-solid" />
  </div>
</template>

<style scoped>
.active {
  @apply bg-[#666];
}
</style>
