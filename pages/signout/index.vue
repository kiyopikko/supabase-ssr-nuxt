<template>
  <div class="container">
    <button @click="signOut">sign out</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const client = useSupabaseClient();

const signOut = async () => {
  const { error } = await client.auth.signOut();
  if (error) return;
  location.href = "/";
};
</script>
