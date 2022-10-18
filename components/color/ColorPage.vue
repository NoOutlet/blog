<template>
  <div class="page" :class="{ 'panel-on-top': panelLocation === 'top' }">
    <Resizable :disabled="true">
      <ColorPanel
        :color="color"
        @select-color="setColor"
        :panelLocation="panelLocation"
        @set-panel-location="setPanelLocation"
      />
    </Resizable>
    <svg viewBox="0 0 900 1200">
      <path
        v-for="shape in picture"
        :key="shape[0]"
        :d="shape[0]"
        :fill="shape[1] || 'white'"
        stroke="black"
        @click="shape[1] = color"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useColoring } from "@/composables/color";
import ColorPanel from "@/components/color/ColorPanel.vue";
import Resizable from "@/components/Resizable.vue";
import { useRoute } from "vue-router";
import type { PanelLocation } from "@/definitions/color";

export default defineComponent({
  components: { ColorPanel, Resizable },
  setup() {
    const { params } = useRoute();
    const { pictures } = useColoring();
    const picture = pictures.value[params.pageName as string];
    const color = ref("#ff0000");
    const setColor = (newColor: string) => (color.value = newColor);
    const panelLocation = ref<PanelLocation>("top");
    const setPanelLocation = (location: PanelLocation) => {
      panelLocation.value = location;
    };
    return { picture, color, setColor, panelLocation, setPanelLocation };
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;

  &.panel-on-top {
    flex-direction: column;
  }
}
.button {
  transition: background 0.3s, color 0.3s;
}
</style>