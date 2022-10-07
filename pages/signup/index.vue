<template>
  <div class="container">
    <form @submit.prevent="submit">
      <input type="text" v-model="username" />
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="新規登録" :disabled="true" />
    </form>
  </div>
</template>

<script lang="ts">
export default {
  head() {
    return {
      title: "新規登録",
    };
  },
};
</script>

<script setup lang="ts">
const client = useSupabaseClient();

const email = ref("");
const password = ref("");
const username = ref("");

const submit = async () => {
  const session = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  await client
    .from("user_statuses")
    .insert({ id: session.user.id, status: "home", username: username.value });
  location.href = "/";
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 50rem;
  margin: 5rem auto 3rem;
}
</style>
