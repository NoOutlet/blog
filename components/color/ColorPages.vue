<template>
  <div class="columns">
    <div
      v-for="(picture, name) in pictures"
      :key="name"
      class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <svg viewBox="0 0 900 1200">
              <path
                v-for="shape in picture"
                :key="shape[0]"
                :d="shape[0]"
                :fill="shape[1] || 'white'"
                stroke="black"
              />
            </svg>
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            {{ name }}
          </div>
        </div>
        <footer class="card-footer">
          <router-link class="card-footer-item" :to="`/color/${name}`">
            <fa icon="chalkboard"></fa>
          </router-link>
          <!-- <a
            href="#"
            class="card-footer-item"
            @click="alert('Not implemented, yet')"
          >
            <fa icon="chalkboard-teacher"></fa>
          </a> -->
          <a href="#" class="card-footer-item" @click="clearPage(name)">
            <fa icon="eraser"></fa>
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotify } from "@/composables/notify";
import { useColoring } from "@/composables/color";
export default defineComponent({
  setup() {
    const { pictures, clearPage } = useColoring();
    const { addNotification } = useNotify();

    const alert = (text: string) => {
      addNotification({ text, color: "info" });
    };
    return { pictures, clearPage, alert };
  },
});
</script>

<style lang="scss" scoped>
</style>