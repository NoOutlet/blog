<template>
  <div id="evolution" @click="startStop">
    <World :things="things" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, watchEffect } from "vue";
import { useVoiceCommands } from "@/composables/voice";
import World from "@/components/evolution/World.vue";

type Thing = {
  i: number;
  x: number;
  y: number;
  color: number[];
  canBaby: boolean;
  baby: false | Thing;
  generation: number;
  newborn: boolean;
  dead: boolean;
};

const initialThing = (i: number): Thing => ({
  i,
  x: 0,
  y: 0,
  color: [
    Math.floor(Math.random() * 220),
    Math.floor(Math.random() * 220),
    Math.floor(Math.random() * 220),
  ],
  canBaby: !Math.floor(Math.random() * 2),
  baby: false,
  generation: 0,
  newborn: true,
  dead: false,
});

function getMove() {
  return Math.floor(Math.random() * 7) - 3;
}

export default defineComponent({
  setup() {
    const i = ref(0);
    const things = ref(
      Array.from(Array(200)).map(() => initialThing(i.value++))
    );
    const started = ref(false);
    const intervalId = ref<number | null>(null);

    const callForward = () => {
      things.value.forEach(move);
    };
    const randomizeLocations = () => {
      things.value.forEach((thing) => {
        thing.x = Math.floor(Math.random() * 180);
        thing.y = Math.floor(Math.random() * 90);
      });
    };

    const startStop = () => {
      if (started.value) {
        if (intervalId.value) {
          window.clearInterval(intervalId.value);
          intervalId.value = null;
        } else {
          intervalId.value = window.setInterval(callForward, 1000);
        }
      } else {
        randomizeLocations();
        setTimeout(() => {
          started.value = true;
          startStop();
        }, 2000);
      }
    };

    const isAt = (x: number, y: number) => {
      const mates = things.value.filter(
        (t) => t.x === x && t.y === y && !t.canBaby
      );
      return mates.length === 0
        ? false
        : mates[Math.floor(Math.random() * mates.length)];
    };

    const move = (thing: Thing) => {
      if (thing.dead) {
        return;
      }
      let dx = getMove();
      let dy = getMove();
      if (thing.x + dx > 179 || thing.x + dx < 0) {
        dx *= -1;
      }
      if (thing.y + dy > 89 || thing.y + dy < 0) {
        dy *= -1;
      }
      thing.x += dx;
      thing.y += dy;
      thing.newborn = false;
      let baby: false | Thing = false;
      if (thing.canBaby && !thing.baby) {
        const mate = isAt(thing.x, thing.y);
        baby = !mate
          ? baby
          : {
              i: i.value++,
              x: thing.x + 1,
              y: thing.y + 1,
              color: [
                Math.round((thing.color[0] + mate.color[0]) / 2),
                Math.round((thing.color[1] + mate.color[1]) / 2),
                Math.round((thing.color[2] + mate.color[2]) / 2),
              ],
              canBaby: !Math.floor(Math.random() * 2),
              baby: false,
              generation: Math.max(thing.generation, mate.generation) + 1,
              newborn: true,
              dead: false,
            };
      } else if (!thing.canBaby) {
        const enemy = isAt(thing.x, thing.y);
        if (enemy && enemy !== thing) {
          enemy.dead = true;
        }
      } else if (thing.baby) {
        things.value.push(thing.baby);
      }
      thing.baby = baby;
    };

    useVoiceCommands([["toggle", startStop]]);

    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return { things, startStop, started, intervalId };
  },
  components: { World },
});
</script>

<style lang="scss" scoped>
#evolution {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>