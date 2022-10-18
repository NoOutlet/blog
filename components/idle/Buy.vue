<template>
  <div class="columns is-multiline">
    <div
      class="column is-4-desktop is-3-widescreen is-2-fullhd"
      v-for="(item, itemKey) in items"
      :key="item.name"
    >
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ item.name }}</p>
        </header>
        <div class="card-image p-2">
          <figure class="image is-128x128">
            <img :src="item.picture" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">Item description, if I want to get silly.</div>
        </div>
        <footer class="card-footer">
          <a @click="buy(`${itemKey}`)" class="card-footer-item">
            Buy 1 for {{ item.price[2] }} <fa icon="plug"></fa>
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { items } from "@/assets/data/idleGame";
import { addItem } from "@/composables/idle";
import { useWealth } from "@/composables/wealth";
export default defineComponent({
  setup() {
    const { pay } = useWealth();
    const buy = (itemKey: string) => {
      if (pay(items[itemKey].price[2])) {
        addItem(itemKey);
      }
    };
    return { buy, items };
  },
});
</script>

<style lang="scss" scoped>
figure.image {
  margin: auto;
}
</style>