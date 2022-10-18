<template>
  <div
    class="field is-horizontal"
    v-for="(palette, name) in palettes"
    :key="name"
  >
    <div class="field-label">
      <label class="label" @click="select(name)">{{ name }}</label>
    </div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control is-expanded">
          <label class="radio">
            <input
              type="radio"
              :value="name"
              :checked="modelValue === name"
              @change="select(name)"
            />
          </label>
        </div>
        <div class="palette mx-3" @click="select(name)">
          <div
            v-for="color in palette"
            :key="color"
            class="color"
            :style="{ background: color }"
          ></div>
        </div>
        <div class="control">
          <button
            class="button is-danger is-small"
            @click="deletePalette(name)"
          >
            <fa icon="trash"></fa>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePalettes } from "@/composables/color";

export default defineComponent({
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { palettes, deletePalette } = usePalettes();
    const select = (name: string | number) => emit("update:modelValue", name);
    return { palettes, deletePalette, select };
  },
});
</script>

<style lang="scss" scoped>
.label {
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.palette {
  width: 100%;
  display: flex;
  .color {
    flex: 1 0 1px;
  }
}
</style>