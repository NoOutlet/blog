<template>
  <div class="columns is-multiline">
    <div
      class="column is-4-desktop is-3-widescreen is-2-fullhd"
      v-for="(item, itemKey) in sellableItems"
      :key="item.name"
    >
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ item.name }}</p>
        </header>
        <div class="card-image p-2">
          <figure class="image is-128x128">
            <img :src="item.picture" />
            <div class="item-count" v-if="item.count">{{ item.count }}</div>
          </figure>
        </div>
        <div class="card-content">
          <div class="content">Item description, if I want to get silly.</div>
        </div>
        <footer class="card-footer">
          <a @click="sell(`${itemKey}`)" class="card-footer-item">
            Sell {{ item.price[0] }} for {{ item.price[1] }}
            <fa icon="plug"></fa>
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useIdleGame } from "@/composables/idle";
import { useWealth } from "@/composables/wealth";
import { useNotify } from "@/composables/notify";
import { items } from "@/assets/data/idleGame";
import type { Sellables } from "@/definitions/idle";

export default defineComponent({
  setup() {
    const { userData } = useIdleGame();
    const { earn } = useWealth();
    const { addNotification } = useNotify();
    const sellableItems = computed(() =>
      userData.value.items.reduce((set, item) => {
        if (set.hasOwnProperty(item.name)) {
          set[item.name].count += items[item.name].stackable ? item.count! : 1;
        } else {
          set[item.name] = {
            ...items[item.name],
            count: items[item.name].stackable ? item.count! : 1,
          };
        }
        return set;
      }, {} as Sellables)
    );
    const sell = (itemKey: string) => {
      const item = items[itemKey];
      const userItems = userData.value.items.filter(
        ({ name }) => name === itemKey
      );
      const totalCount = userItems.reduce(
        (sum, i) => sum + (item.stackable ? i.count! : 1),
        0
      );
      if (totalCount < item.price[0]) {
        addNotification({ text: `Not enough ${item.name}`, color: "danger" });
      } else {
        if (!item.stackable) {
          const itemIndex = userData.value.items.findIndex(
            ({ name }) => name === itemKey
          );
          userData.value.items.splice(itemIndex, 1);
        } else {
          let itemsToRemove = item.price[0];
          for (let i = userData.value.items.length - 1; i >= 0; i--) {
            if (userData.value.items[i].name !== itemKey) {
              continue;
            }
            if (userData.value.items[i].count! > itemsToRemove) {
              userData.value.items[i].count! -= itemsToRemove;
              break;
            } else {
              itemsToRemove -= userData.value.items[i].count!;
              userData.value.items.splice(i, 1);
            }
          }
        }
        earn(item.price[1]);
      }
    };
    return { items, sell, sellableItems };
  },
});
</script>

<style lang="scss" scoped>
figure.image {
  margin: auto;
}
.item-count {
  position: absolute;
  bottom: 8px;
  right: 16px;
  font-size: 2.4rem;
  background: #ddd;
  border-radius: 50%;
  min-width: 48px;
  text-align: center;
}
</style>