import useStorage from "./storage";
import { useNotify } from "@/composables/notify";

const { addNotification } = useNotify();

const wealth = useStorage<number>("wealth", 0);

const pay = (cost: number, force: boolean = false) => {
  if (cost <= wealth.value) {
    wealth.value -= cost;
    return true;
  } else if (force) {
    wealth.value = 0;
    return true;
  } else {
    addNotification({ text: "You can't afford that.", color: "danger" });
    return false;
  }
};

const earn = (amount: number) => {
  wealth.value += amount;
};

export const useWealth = () => ({
  wealth,
  earn,
  pay,
});
