<template>
  <div>
    <form @submit.prevent="checkAnswer">
      <div class="is-size-1">
        {{ number1 }} {{ typeData.operator }} {{ number2 }} =
        <input
          class="is-inline-block answer is-size-1"
          v-model="answer"
          v-focus
          type="number"
        />
      </div>
      <div>
        <div
          class="dropdown mb-6 has-text-left"
          :class="{ 'is-active': dropdownActive }"
        >
          <div class="dropdown-trigger" @click="toggleDropdown">
            <button
              class="button"
              type="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span><fa icon="cog" class="mr-1" /> Settings</span>
              <fa icon="angle-down" />
            </button>
          </div>
          <div class="dropdown-menu" id="math-types" role="menu">
            <div class="dropdown-content">
              <label v-for="mathType in mathTypes" :key="mathType.toString()" class="checkbox dropdown-item">
                <input
                  type="checkbox"
                  :value="mathType"
                  v-model="selectedTypes"
                  :disabled="isLastSelectedType(mathType)"
                />
                {{ mathType }}
              </label>
            </div>
          </div>
        </div>
        <button
          class="button"
          :disabled="guideMode === 3"
          @click="getHelp"
          type="button"
        >
          <fa icon="question-circle" size="medium" class="mr-1" />Help
        </button>
      </div>
      <Guide
        :mode="guideMode"
        :number1="number1"
        :number2="number2"
        :equation="typeData?.equation"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useWealth } from "@/composables/wealth";
import { randomInt } from "@/utils";
import Guide from "@/components/flash/Guide.vue";
import { MATH_TYPES } from "@/composables/flash";
import { MathTypes } from "@/definitions/flash";

export default defineComponent({
  components: { Guide },
  setup() {
    const { earn, pay } = useWealth();
    const number1 = ref(randomInt(10));
    const number2 = ref(randomInt(10));
    const answer = ref("");
    const guideMode = ref(0);
    const dropdownActive = ref(false);
    const selectedTypes = ref(MATH_TYPES.slice(0, 1));
    const currentType = ref(selectedTypes.value[0]);

    watch(selectedTypes, (list) => {
      if (!list.includes(currentType.value)) {
        startOver();
      }
    });
    
    const isLastSelectedType = (type: string) =>
                    selectedTypes.value.includes(type as MathTypes) && selectedTypes.value.length === 1

    const typeData = computed(() => {
      switch (currentType.value) {
        case MathTypes.Addition:
          return {
            solution: number1.value + number2.value,
            operator: "+",
            prize: 20,
            equation: (num1: number, num2: number) => num1 + num2,
          };
        case MathTypes.Subtraction:
          return {
            solution: number1.value - number2.value,
            operator: "-",
            prize: 30,
            equation: (num1: number, num2: number) => num2 - num1,
          };
        case MathTypes.Multiplication:
          return {
            solution: number1.value * number2.value,
            operator: "*",
            prize: 40,
            equation: (num1: number, num2: number) => num1 * num2,
          };
      }
    });
    const startOver = () => {
      const typeIndex = randomInt(selectedTypes.value.length);
      currentType.value = selectedTypes.value[typeIndex];
      number1.value = randomInt(10);
      number2.value = randomInt(10);
      answer.value = "";
      guideMode.value = 0;
    };
    const checkAnswer = () => {
      if (parseInt(answer.value) === typeData.value.solution) {
        earn(typeData.value.prize);
        startOver();
      } else {
        pay(5, true);
      }
    };
    const getHelp = () => {
      if (pay(5)) {
        guideMode.value++;
      }
    };
    const toggleDropdown = () => {
      dropdownActive.value = !dropdownActive.value;
    };
    return {
      number1,
      number2,
      typeData,
      answer,
      checkAnswer,
      dropdownActive,
      toggleDropdown,
      selectedTypes,
      currentType,
      guideMode,
      getHelp,
      mathTypes: Object.keys(MathTypes),
      isLastSelectedType
    };
  },
});
</script>

<style lang='scss' scoped>
.answer {
  width: 2em;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
