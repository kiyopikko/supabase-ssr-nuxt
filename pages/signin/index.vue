<template>
  <div class="container">
    <form @submit.prevent="submit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="ログイン" />
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const client = useSupabaseClient();

const email = ref("");
const password = ref("");

const submit = async () => {
  const session = await client.auth.signIn({
    email: email.value,
    password: password.value,
  });
  if (session) {
    location.href = "/";
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 50rem;
  margin: 5rem auto 3rem;
}
</style>
