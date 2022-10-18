<template>
  <teleport :disabled="disabled" to="#resizable-area">
    <span
      ref="container"
      :class="{ enabled: !disabled && enabled }"
      :style="!disabled ? position : {}"
    >
      <div class="grips" v-if="enabled">
        <div class="left"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="right"></div>
      </div>
      <slot />
    </span>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
export default defineComponent({
  props: { disabled: Boolean },
  setup(props) {
    const container = ref<HTMLElement | null>(null);
    const { disabled } = toRefs(props);
    const enabled = ref(false);
    const position = ref({ top: "0", left: "0", width: "0", height: "0" });
    watch(disabled, (d) => {
      if (!d) {
        const {
          top,
          left,
          width,
          height,
        } = container.value!.getBoundingClientRect();
        position.value = {
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
        };
      }
      enabled.value = !d;
    });
    return {
      enabled,
      position,
      container,
    };
  },
});
</script>

<style lang="scss" scoped>
$grip-width: 4px;
.enabled {
  position: absolute;
}
.left,
.top,
.right,
.bottom {
  position: absolute;
  background-color: blue;
}
.left,
.right {
  top: 0;
  bottom: 0;
  width: $grip-width;
}
.left {
  left: -$grip-width;
}
.right {
  right: -$grip-width;
}
.top,
.bottom {
  right: 0;
  left: 0;
  height: $grip-width;
}
.top {
  top: -$grip-width;
}
.bottom {
  bottom: -$grip-width;
}
</style>