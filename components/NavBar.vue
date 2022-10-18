<template>
  <nav class="navbar is-fixed-top is-header" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="@/assets/images/logo.png" width="128" />
      </RouterLink>
      <div class="navbar-item navbar-wealth">
        <span class="tag is-primary is-large has-text-black">
          <fa icon="plug"></fa>
          &nbsp;
          {{ wealth }}
        </span>
      </div>
      <div class="navbar-item" v-if="canUseSpeech">
        <a class="button" :class="recording ? 'is-danger' : 'is-primary'" @click="toggle()">
          <fa :class="`has-text-${recording ? 'white' : 'black'}`" icon="microphone"></fa>
        </a>
      </div>

      <a role="button" aria-label="menu" aria-expanded="false" @click="menuOpen = !menuOpen"
        class="navbar-burger burger" :class="{ 'is-active': menuOpen }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Experiments</a>

          <div class="navbar-dropdown">
            <NuxtLink to="/balls" class="navbar-item">Balls</NuxtLink>
            <NuxtLink to="/evolution" class="navbar-item">
              Evolution
            </NuxtLink>
            <NuxtLink to="/color" class="navbar-item">Color</NuxtLink>
            <NuxtLink to="/clock" class="navbar-item">Clock</NuxtLink>
            <NuxtLink to="/dash-offset" class="navbar-item">Dash Offset</NuxtLink>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Games</a>

          <div class="navbar-dropdown">
            <RouterLink to="/cube" class="navbar-item">Rubik's Cube</RouterLink>
            <RouterLink to="/flash" class="navbar-item">Flash Cards</RouterLink>
            <RouterLink to="/idle" class="navbar-item">Idle</RouterLink>
            <RouterLink to="/merge" class="navbar-item">Merge</RouterLink>
            <RouterLink to="/snake" class="navbar-item">Snake</RouterLink>
          </div>
        </div>
        <a href="https://blog.nooutlet.net" class="navbar-item">Blog</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useVoiceCommands, canUseSpeech } from "@/composables/voice";
import { useWealth } from "@/composables/wealth";

export default defineComponent({
  setup() {
    const { recording, toggle } = useVoiceCommands();
    const { wealth } = useWealth();

    return { menuOpen: ref(false), recording, toggle, wealth, canUseSpeech };
  },
});
</script>

<style lang="scss" scoped>
.navbar-burger {
  margin-left: 0;
}

.navbar-wealth {
  margin-left: auto;
}
</style>
