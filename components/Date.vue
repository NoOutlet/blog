<template>
  <span :title="absolute(date)">{{ relative(date) }}</span>
</template>

<script lang="ts">
import { dateDisplay } from "@/utils";
import formatDistance from "date-fns/esm/fp/formatDistance/index";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["date"],
  setup() {
    const relative = (datetime: number) => {
      return formatDistance(new Date(datetime), new Date());
    }
    return { relative, absolute: dateDisplay }
  }
})
</script>
