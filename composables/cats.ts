import { computed } from "vue";
import { sub } from "date-fns";
import catNames from "@/assets/data/catNames";
import { useWealth } from "./wealth";
import useStorage from "./storage";
import { dateDisplay, randomInt } from "@/utils";
import type { Cat } from "@/definitions/cats";

const cats = useStorage<Cat[]>("cats", []);
const food = useStorage("food", 0);
const toys = useStorage("toys", 0);

const TOY_COST = 200;
const FOOD_COST = 50;
const FIB_COEFFICIENT = 100 / Math.sqrt(5);
const FIB_BASE = Math.sqrt(5) / 1.85;

export const nthCatCost = (catCount: number) =>
  Math.round(FIB_COEFFICIENT * FIB_BASE ** catCount);

const catCost = computed(() => nthCatCost(cats.value.length));

const { pay } = useWealth();
const getState = () => ({
  cats,
  food,
  toys,
  catCost,
});

export default getState;

export const buyCat = () => {
  if (pay(catCost.value)) {
    const daysOld = randomInt(2000, 7);
    const birthDate = sub(new Date(), { days: daysOld }).toString();
    const adoptedDate = dateDisplay(new Date());
    const name = catNames[randomInt(catNames.length)];
    const newCat: Cat = {
      id: cats.value.length,
      name,
      adoptedDate,
      birthDate,
      description: "",
      lastFed: Date.now(),
      lastPet: Date.now(),
      lastToy: Date.now(),
    };
    cats.value.push(newCat);
    return newCat;
  }
};

export const petCat = (catId: number) => {
  const cat = cats.value.find(({ id }) => id === catId);
  if (cat) {
    cat.lastPet = Date.now();
  }
};
export const playCat = (catId: number) => {
  const cat = cats.value.find(({ id }) => id === catId);
  if (cat && toys.value > 0) {
    cat.lastToy = Date.now();
    toys.value--;
  }
};
export const feedCat = (catId: number) => {
  const cat = cats.value.find(({ id }) => id === catId);
  if (cat && food.value > 0) {
    cat.lastFed = Date.now();
    food.value--;
  }
};

export const buyFood = () => {
  if (pay(FOOD_COST)) {
    food.value++;
  }
};

export const buyToy = () => {
  if (pay(TOY_COST)) {
    toys.value++;
  }
};

export const updateCatDescription = (catId: number, description: string) => {
  const cat = cats.value.find(({ id }) => id === catId);
  if (cat) {
    cat.description = description;
  }
};
