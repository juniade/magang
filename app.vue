<template>
  <div>
    <!-- bekerja seperti routerview -->
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useAuth } from './stores/auth';

const store = useAuth()
store.initializeAuth() //bisa panggil action tanpa menggunakan onmounted

</script>
