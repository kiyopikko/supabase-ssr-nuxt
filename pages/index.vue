<template>
  <NuxtLayout name="authenticated">
    <div class="container">
      <h1 class="headline">
        Hi {{ currentUserStatus ? currentUserStatus.username : "" }}, you are
        in...
      </h1>
      <div class="radio-tile-group">
        <div class="input-container">
          <input
            id="home"
            class="radio-button"
            type="radio"
            name="radio"
            :checked="currentUserStatus && currentUserStatus.status === 'home'"
            @input="changeStatus('home')"
          />
          <div class="radio-tile">
            <label for="home" class="radio-tile-label">🏠</label>
          </div>
        </div>
        <div class="input-container">
          <input
            id="commuting"
            class="radio-button"
            type="radio"
            name="radio"
            :checked="
              currentUserStatus && currentUserStatus.status === 'commuting'
            "
            @input="changeStatus('commuting')"
          />
          <div class="radio-tile">
            <label for="commuting" class="radio-tile-label">🚌</label>
          </div>
        </div>
        <div class="input-container">
          <input
            id="vacation"
            class="radio-button"
            type="radio"
            name="radio"
            :checked="
              currentUserStatus && currentUserStatus.status === 'vacation'
            "
            @input="changeStatus('vacation')"
          />
          <div class="radio-tile">
            <label for="vacation" class="radio-tile-label">🌴</label>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const currentUserStatus = ref(null);
const user = useSupabaseUser();
const client = useSupabaseClient();

const changeStatus = async (status: string) => {
  const { data: userStatus } = await client
    .from("user_statuses")
    .update({ status })
    .match({ id: user.value.id })
    .single();
  currentUserStatus.value = userStatus;
};

onMounted(async () => {
  if (!user.value) return;
  const { data: userStatus } = await client
    .from("user_statuses")
    .select("*")
    .eq("id", user.value.id)
    .single();
  currentUserStatus.value = userStatus;
});
</script>

<style lang="scss">
$primary-color: #ffee50;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.headline {
  font-size: 2rem;
}

.radio-tile-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .input-container {
    position: relative;
    height: 7rem;
    width: 7rem;
    margin: 0.5rem;

    .radio-button {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin: 0;
      cursor: pointer;
    }

    .radio-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: 2px solid $primary-color;
      border-radius: 5px;
      padding: 1rem;
      transition: transform 300ms ease;
    }

    .radio-tile-label {
      text-align: center;
      font-size: 3rem;
    }

    .radio-button:checked + .radio-tile {
      background-color: $primary-color;
      border: 2px solid $primary-color;
      color: white;
      transform: scale(1.1, 1.1);

      .icon svg {
        fill: white;
        background-color: $primary-color;
      }
      .radio-tile-label {
        color: white;
        background-color: $primary-color;
      }
    }
  }
}
</style>
