export const dateDisplay = (date: Date) => {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const randomInt = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min)) + min;
