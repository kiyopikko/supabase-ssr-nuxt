<template>
  <div>
    <slot v-if="currentUser" />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const router = useRouter();

const currentUser = ref(null);

onMounted(() => {
  if (!user.value) {
    router.push("/signin");
    return;
  }
  currentUser.value = user.value;
});
</script>
