<template>
  <span :title="absolute(date)">{{ relative(date) }}</span>
</template>

<script>
export default {
  props: ["date"],
  methods: {
    relative(datetime) {
      return this.$dateFns.formatDistance(new Date(datetime), new Date());
    },
    absolute(datetime) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(datetime).toLocaleDateString("en", options);
    },
  },
};
</script>
