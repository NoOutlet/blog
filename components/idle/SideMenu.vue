<template>
  <aside class="menu">
    <p class="menu-label">Skills</p>
    <ul class="menu-list">
      <li v-for="({ name }, key) of skills" :key="key">
        <router-link :to="`/idle/${key}`" :class="skill === key && 'is-active'">
          {{ name }}
        </router-link>
      </li>
    </ul>
    <p class="menu-label">Market</p>
    <ul class="menu-list">
      <li><router-link to="/idle/buy"> Buy </router-link></li>
      <li><router-link to="/idle/sell"> Sell </router-link></li>
    </ul>
    <p class="menu-label">Inventory</p>
    <div class="items">
      <figure
        class="image is-32x32"
        v-for="item in userData.items"
        :key="item.name"
        :title="item.name"
      >
        <img :src="getItemImage(item.name)" />
        <div class="item-count" v-if="item.count">{{ item.count }}</div>
      </figure>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { gameData, getItemImage } from "@/assets/data/idleGame";
import { useIdleGame } from "@/composables/idle";

export default defineComponent({
  setup() {
    const route = useRoute();
    const skill = computed(() => route.params.skill);
    const skills = gameData.skills;
    const { userData } = useIdleGame();

    return { userData, skills, getItemImage, skill };
  },
});
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-wrap: wrap;
}
.item-count {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 0.6rem;
  background: #ddd;
  border-radius: 50%;
  min-width: 12px;
  text-align: center;
}
</style>