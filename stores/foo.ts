export const useFooStore = defineStore("foo", {
  state: () => {
    return { bar: 5 };
  },
  actions: {
    increment() {
      this.bar++;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFooStore, import.meta.hot));
}
