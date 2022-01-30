<template>
  <div class="container">
    <form @submit.prevent="submit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="ログイン" />
    </form>
  </div>
</template>

<script lang="ts">
export default {
  head() {
    return {
      title: "ログイン",
    };
  },
};
</script>

<script setup lang="ts">
const nuxtApp = useNuxtApp();

const email = ref("");
const password = ref("");
const submit = () => {
  nuxtApp.$supabase.auth
    .signIn({
      email: email.value,
      password: password.value,
    })
    .then(() => {
      location.href = "/";
    });
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 50rem;
  margin: 5rem auto 3rem;
}
</style>
