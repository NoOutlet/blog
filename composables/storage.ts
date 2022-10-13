import { ref, watch } from "vue";

function useStorage<T>(key: string, initialValue: T) {
  const valueString = localStorage.getItem(key) || JSON.stringify(initialValue);
  const storedValue = ref(JSON.parse(valueString) as T);
  const deep = typeof initialValue === "object";
  watch(
    storedValue,
    (value) => localStorage.setItem(key, JSON.stringify(value)),
    { deep }
  );
  return storedValue;
}

export default useStorage;

// Version control the storage
const version = useStorage("version", 0);
switch (version.value) {
  case 0:
    localStorage.clear();
  case 1:
    localStorage.setItem("flipbook", "[]");
  // convert stored values from version 1 to version 2
  /*
  case 2:
    // convert stored values from version 2 to version 3
  */
  default:
    version.value = 1;
}
