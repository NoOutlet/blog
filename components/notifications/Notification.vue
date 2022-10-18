<template>
  <div class="notification" :class="data.color && `is-${data.color}`">
    <button class="delete" @click="deleteNotification(data.id)"></button>
    <span
      v-for="(text, i) in textContent"
      :key="i"
      :class="{ 'has-text-weight-bold': text.high }"
    >
      {{ text.text }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, type PropType } from "vue";
import { useNotify } from "@/composables/notify";
import { extractHighlights } from "./utils";
import type { SiteNotification } from "@/definitions/notify";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<SiteNotification>,
      required: true,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { deleteNotification } = useNotify();
    const textContent = extractHighlights(
      data.value.text,
      data.value.highlightText
    );

    return { data, textContent, deleteNotification };
  },
});
</script>

<style lang="scss" scoped>
</style>