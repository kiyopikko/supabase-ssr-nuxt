<template>
  <div>
    <slot v-if="currentUser" />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { currentSession } = useAuth();
const router = useRouter();

const currentUser = ref(null);

onMounted(() => {
  if (!currentSession.value) {
    router.replace("/signin");
    return;
  }
  currentUser.value = currentSession.value.user;
});
</script>
