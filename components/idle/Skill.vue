<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">{{ skill.name }}</p>
      <p class="subtitle">Level {{ skillLevel.level }}</p>
      <p class="subtitle">
        <progress :value="skillLevel.progress" max="100">
          {{ skillLevel.progress }}%
        </progress>
      </p>
    </div>
  </section>
  <div class="columns">
    <div
      class="column is-4-desktop is-3-widescreen is-2-fullhd"
      v-for="(action, actionKey) in skill.actions"
      :key="actionKey"
    >
      <div
        v-if="action.levelRequired <= skillLevel.level"
        class="message"
        :class="isCurrentAction(skillKey, actionKey) ? 'is-info' : 'is-primary'"
        @click="setAction(skillKey, actionKey)"
      >
        <div class="message-header">
          <p>{{ action.name }}</p>
        </div>
        <div class="message-body">
          <progress
            v-if="isCurrentAction(skillKey, actionKey)"
            class="progress is-info"
            :value="progress"
            max="100"
          >
            {{ progress }}%
          </progress>
          <progress v-else class="progress" value="0" max="100">0%</progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { gameData, getLevelData } from "@/assets/data/idleGame";
import { useIdleGame } from "@/composables/idle";

export default defineComponent({
  setup() {
    const route = useRoute();
    const skillKey = computed(() => route.params.skill as string);
    const skill = computed(() => gameData.skills[skillKey.value]);
    const { userData, setAction, progress, currentAction } = useIdleGame();
    const skillLevel = computed(() =>
      getLevelData(userData.value.skills[skillKey.value].experience)
    );
    const isCurrentAction = (skill: string, action: string | number) =>
      currentAction.value &&
      currentAction.value.action === action &&
      currentAction.value.skill === skill;

    return {
      skill,
      skillKey,
      skillLevel,
      setAction,
      progress,
      isCurrentAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.message {
  * {
    cursor: default;
  }
}
</style>