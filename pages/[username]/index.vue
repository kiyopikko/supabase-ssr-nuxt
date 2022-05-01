<template>
  <div class="container">
    <Title>{{
      userStatuses && userStatuses.length
        ? `${userStatuses[0].username} のステータス`
        : `見つかりません`
    }}</Title>
    <Meta
      name="description"
      :content="
        userStatuses && userStatuses.length
          ? `${userStatuses[0].username} is in ${
              statusMap[userStatuses[0].status]
            }`
          : 'そんなユーザーいませんよ'
      "
    />
    <Meta
      property="og:description"
      :content="
        userStatuses && userStatuses.length
          ? `${userStatuses[0].username} is in ${
              statusMap[userStatuses[0].status]
            }`
          : 'そんなユーザーいませんよ'
      "
    />
    <div v-if="userStatuses && userStatuses.length">
      <h1 class="headline">{{ userStatuses[0].username }} is in</h1>
      <p class="status">{{ statusMap[userStatuses[0].status] }}</p>
    </div>
    <div v-else>見つかりません</div>
  </div>
</template>

<script setup lang="ts">
const statusMap = {
  home: "🏠",
  commuting: "🚌",
  vacation: "🌴",
};

const nuxtApp = useNuxtApp();
const { params } = useRoute();
const { data: userStatuses } = useFetch<string, string, any[]>(
  `${nuxtApp.$config.SUPABASE_URL}/rest/v1/user_statuses?select=*&username=eq.${params.username}`,
  {
    headers: {
      apikey: nuxtApp.$config.SUPABASE_KEY,
      Authorization: `Bearer ${nuxtApp.$config.SUPABASE_KEY}`,
    },
  }
);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.status {
  margin-top: 0;
  text-align: center;
  font-size: 7rem;
}
</style>
