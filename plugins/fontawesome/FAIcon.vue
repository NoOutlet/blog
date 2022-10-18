<template>
  <span class="icon" :class="$props.class">
    <FontAwesomeIcon :icon="[prefix || 'fas', icon]" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  components: { FontAwesomeIcon },
  props: {
    prefix: String,
    icon: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: false,
    },
  },
});
</script>
