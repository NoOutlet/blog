<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Load Palette</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <PaletteRadio v-model="picked" />
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          @click="loadPalette"
          :disabled="!picked.length"
        >
          Load palette
        </button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PaletteRadio from "./PaletteRadio.vue";
import { usePalettes } from "@/composables/color";

export default defineComponent({
  components: { PaletteRadio },
  emits: ["close", "load"],
  setup(props, { emit }) {
    const close = () => emit("close");
    const { palettes } = usePalettes();
    const picked = ref("");

    const loadPalette = () => {
      if (picked.value.length) {
        emit("load", palettes.value[picked.value].slice());
      }
      close();
    };
    return {
      loadPalette,
      picked,
      close,
    };
  },
});
</script>