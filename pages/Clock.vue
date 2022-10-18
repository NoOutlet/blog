<template>
  <div class="columns is-mobile is-centered mt-5">
    <input type="checkbox" id="realtime" v-model="timeUpdate" >
    <label for="realtime">Real time</label>
    <span class="hour digital">{{ hour }}</span>:
    <span class="minute digital">{{ minute.toString().padStart(2, "0") }}</span>:
    <span class="second digital">{{ second.toString().padStart(2, "0") }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin slice" class="column clock is-narrow"
      viewBox="-200 -200 400 400" width="500" height="500" @mouseleave="unfollow" @mouseup="unfollow"
      @mousemove.prevent="move">
      <circle cx="0" cy="0" r="190" class="clock-frame" fill-opacity="0" stroke="black" stroke-width="4" ></circle>
      <text v-for="number in 12" :key="'number' + number" :x="getHourX(number)" :y="getHourY(number)"
        class="clock-text">
        {{ number }}
      </text>
      <g v-for="notch in 60" :key="'notch' + notch" stroke="black" :stroke-width="notch % 5 ? 3 : 4"
        :transform="'rotate(' + notch * 6 + ', 0, 0)'" class="notch">
        <line x1="0" y1="-190" x2="0" :y2="notch % 5 ? -185 : -180" ></line>
      </g>
      <g :transform="'rotate(' + hourAngle + ', 0, 0)'" class="hand hour">
        <line x1="0" y1="5" x2="0" y2="-120" @mousedown="followMe(1)" ></line>
      </g>
      <g :transform="'rotate(' + minuteAngle + ', 0, 0)'" class="hand minute">
        <line x1="0" y1="5" x2="0" y2="-160" @mousedown="followMe(0)" ></line>
      </g>
      <g :transform="'rotate(' + secondAngle + ', 0, 0)'" class="hand second">
        <line x1="0" y1="10" x2="0" y2="-170" @mousedown="followMe(2)" ></line>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import {
  getHours,
  getMinutes,
  getSeconds,
  setMinutes,
  setHours,
  setSeconds,
  format,
} from "date-fns";
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

function getAngle(x: number, y: number) {
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
export default defineComponent({
  setup() {
    const date = ref(new Date());
    const following = ref<number | null>(null);
    const timeUpdate = ref(true);
    let intervalId: number = 0;

    const hour = computed(() => getHours(date.value) % 12 || 12);
    const minute = computed(() => getMinutes(date.value));
    const second = computed(() => getSeconds(date.value));
    const hourAngle = computed(() => hour.value * 30 + minute.value * 0.5);
    const minuteAngle = computed(() => minute.value * 6 + second.value * 0.1);
    const secondAngle = computed(() => second.value * 6);
    const time = computed(() => format(date.value, "hh:mm:ss"));
    const setTime = () =>
      (date.value = timeUpdate.value ? new Date() : date.value);
    onMounted(() => {
      intervalId = window.setInterval(setTime, 1000);
    });
    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      date,
      hour,
      minute,
      second,
      hourAngle,
      minuteAngle,
      secondAngle,
      timeUpdate,
      following,
    };
  },
  methods: {
    unfollow() {
      this.following = null;
    },
    followMe(hand: number) {
      this.timeUpdate = false;
      this.following = hand;
    },
    // drag(ev) {
    //   const touch = ev.touches[0];
    //   const { x, y } = this.$refs.clock.getBoundingClientRect();
    //   this.moveHand(touch.clientX - x - 250, touch.clientY - y - 250);
    // },
    move(ev: MouseEvent) {
      this.moveHand(ev.offsetX - 250, ev.offsetY - 250);
    },
    moveHand(x: number, y: number) {
      const angle = getAngle(x, y);
      switch (this.following) {
        case 0:
          const minute = (15 + Math.floor(angle / 6)) % 60;
          this.date = setMinutes(this.date, minute);
          break;
        case 1:
          const hour = ((2 + Math.floor(angle / 30)) % 12) + 1;
          this.date = setHours(this.date, hour);
          break;
        case 2:
          const second = (15 + Math.floor(angle / 6)) % 60;
          this.date = setSeconds(this.date, second);
          break;
      }
    },
    getHourX(num: number) {
      return Math.sin((num * -30 + 180) * (Math.PI / 180)) * 170;
    },
    getHourY(num: number) {
      return Math.cos((num * -30 + 180) * (Math.PI / 180)) * 170;
    },
    toggleTimeUpdate() {
      this.timeUpdate = !this.timeUpdate;
    },
  },
});
</script>

<style lang="scss" scoped>
$hour-color: blue;
$minute-color: green;
$second-color: red;

.hour {
  &.hand {
    stroke: $hour-color;
    stroke-width: 9px;
  }

  &.digital {
    color: $hour-color;
  }
}

.minute {
  &.hand {
    stroke: $minute-color;
    stroke-width: 7px;
  }

  &.digital {
    color: $minute-color;
  }
}

.second {
  &.hand {
    stroke: $second-color;
    stroke-width: 5px;
  }

  &.digital {
    color: $second-color;
  }
}

.hand {
  border-radius: 2px;
}

.clock-frame {
  box-shadow: 3px 3px 3px #000;
}

.clock-text {
  text-anchor: middle;
  transform: translate(0, 0.4em);
  user-select: none;
}
</style>