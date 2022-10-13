import { computed, ref, watch } from "vue";
import { gameData, getLevelData, items } from "@/assets/data/idleGame";
import useStorage from "./storage";
import type { CurrentAction, UserData } from "@/definitions/idle";

const initialUserData: UserData = {
  skills: {
    woodcutting: { experience: 0, actions: { oak: 0 } },
    mining: { experience: 0, actions: { copper: 0, tin: 0 } },
  },
  items: [],
};

const userData = useStorage("idleUserData", initialUserData);

const currentAction = ref<CurrentAction | null>(null);
const setAction = (skill: string, action: string | number) => {
  if (
    currentAction.value?.skill === skill &&
    currentAction.value?.action === action
  ) {
    currentAction.value = null;
  } else {
    currentAction.value = { skill, action: action as string };
  }
};

const actionData = computed(() => {
  if (currentAction.value !== null) {
    const { skill, action } = currentAction.value;
    return gameData.skills[skill].actions[action];
  }
  return null;
});

const duration = computed(() => {
  if (currentAction.value && actionData.value) {
    const { skill } = currentAction.value;
    const skillLevel = getLevelData(userData.value.skills[skill].experience);
    return actionData.value.duration(skillLevel.level);
  }
  return 0;
});

const actionStartTime = ref(0);
const progress = ref(0);

export const addItem = (itemName: string) => {
  if (items[itemName].stackable) {
    const existingItem = userData.value.items.find(
      (item) => item.name === itemName && item.count! < 99
    );
    if (existingItem) {
      existingItem.count!++;
    } else {
      userData.value.items.push({ name: itemName, count: 1 });
    }
  } else {
    userData.value.items.push({ name: itemName, health: 100 });
  }
};

const completeAction = () => {
  if (currentAction.value && actionData.value) {
    const { skill, action } = currentAction.value;
    userData.value.skills[skill].experience += actionData.value.experience;
    userData.value.skills[skill].actions[action]++;
    const skillLevel = getLevelData(userData.value.skills[skill].experience);
    const skillData = gameData.skills[skill];
    actionData.value.drops
      .filter((d) => {
        const roll = Math.random();
        return roll > d.chance[0] && roll < d.chance[1];
      })
      .forEach((drop) => addItem(drop.name));
    const userActions = Object.keys(userData.value.skills[skill].actions);
    Object.keys(skillData.actions)
      .filter(
        (a) =>
          !userActions.includes(a) &&
          skillData.actions[a].levelRequired <= skillLevel.level
      )
      .forEach((a) => {
        userData.value.skills[skill].actions[a] = 0;
      });
    actionStartTime.value = Date.now();
  }
};

let requestId: number | null = null;

watch(actionData, () => {
  if (requestId !== null) {
    cancelAnimationFrame(requestId);
    requestId = null;
  }
  actionStartTime.value = Date.now();
  actionLoop();
});

const actionLoop = () => {
  if (actionData.value) {
    const currentTime = Date.now();
    progress.value = Math.round(
      ((currentTime - actionStartTime.value) / duration.value) * 100
    );
    if (progress.value >= 100) {
      completeAction();
    }

    requestId = requestAnimationFrame(actionLoop);
  } else {
    progress.value = 0;
  }
};

export const useIdleGame = () => ({
  setAction,
  userData,
  currentAction,
  progress,
});
