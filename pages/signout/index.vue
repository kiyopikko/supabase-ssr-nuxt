<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

onMounted(() => {
  nuxtApp.$supabase.auth.signOut().then(() => {
    location.href = "/";
  });
});
</script>
