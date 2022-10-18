<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Save Palette As...</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <div class="modal-card-body">
        <PaletteRadio v-model="name" />
        <div class="field">
          <label class="label">Palette Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="My palette"
              v-model="name"
              maxlength="20"
            />
          </div>
          <p class="help">Please provide a name for your palette.</p>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          @click="save"
          :disabled="!name.length"
        >
          Save
        </button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import PaletteRadio from "./PaletteRadio.vue";
import { usePalettes } from "@/composables/color";

export default defineComponent({
  components: { PaletteRadio },
  props: ["palette"],
  emits: ["close"],
  setup(props, { emit }) {
    const { palette } = toRefs(props);
    const close = () => emit("close");
    const { setPalette } = usePalettes();
    const name = ref("");

    const save = () => {
      if (name.value.length > 0) {
        setPalette(name.value, palette.value.slice());
        close();
      }
    };

    return { name, save, close };
  },
});
</script>