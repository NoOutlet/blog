<template>
  <transition-group name="notifications" @before-leave="beforeLeave">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :data="notification"
    />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotify } from "@/composables/notify";
import Notification from "./Notification.vue";

export default defineComponent({
  components: { Notification },
  setup() {
    const { notifications } = useNotify();
    const beforeLeave = (el: Element) => {
      const element = el as HTMLElement;
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(
        element
      );
      element.style.left = `${element.offsetLeft - parseFloat(marginLeft)}px`;
      element.style.top = `${element.offsetTop - parseFloat(marginTop)}px`;
      element.style.width = width;
      element.style.height = height;
    };
    return { beforeLeave, notifications };
  },
});
</script>