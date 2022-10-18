<template>
  <div class="card">
    <div class="card-image" @click.stop="toggleImageModal">
      <figure class="image is-256x256">
        <img :src="`/images/cats/${cat.id}.jpg`" />
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4">{{ cat.name }}</p>
      <p class="subtitle is-7">Born: {{ dateDisplay(cat.birthDate) }}</p>

      <div class="content">
        <div class="tags is-centered">
          <span class="tag" :class="codeClass(hunger.code)">{{
            hunger.word
          }}</span>
          <span class="tag" :class="codeClass(sadness.code)">{{
            sadness.word
          }}</span>
          <span class="tag" :class="codeClass(boredom.code)">{{
            boredom.word
          }}</span>
        </div>
        You adopted {{ cat.name }} on {{ cat.adoptedDate }}.
        <br />
        {{ cat.name }} is <Date :date="cat.birthDate" />&nbsp;old.
        <div v-if="!textarea" @click="toggleTextarea" class="description">
          {{ cat.description }}
        </div>
        <textarea
          v-else
          class="textarea is-italic"
          @blur="updateCat"
          :value="cat.description"
          v-autofocus
        />
      </div>
    </div>
    <footer class="card-footer">
      <button
        class="card-footer-item button is-small"
        :disabled="!food"
        @click="feedCat(cat.id)"
      >
        <FAIcon icon="utensils" class="mr-1" />
        Feed ({{ food > 9 ? "9+" : food }})
      </button>
      <button class="card-footer-item button is-small" @click="petCat(cat.id)">
        <FAIcon icon="hand-sparkles" class="mr-1" />Pet
      </button>
      <button
        class="card-footer-item button is-small"
        :disabled="!toys"
        @click="playCat(cat.id)"
      >
        <FAIcon icon="gift" class="mr-1" />
        Toy ({{ toys > 9 ? "9+" : toys }})
      </button>
    </footer>
    <div class="modal" :class="{ 'is-active': imageModal }">
      <div class="modal-background" @click.stop="toggleImageModal"></div>
      <div class="modal-content">
        <p class="image is-600x600">
          <img :src="`/images/cats/${cat.id}.jpg`" :alt="cat.name" />
        </p>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click.stop="toggleImageModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Date from "@/components/Date.vue";
import { dateDisplay } from "@/assets/utils.js";

export default {
  props: ["cat", "now"],
  data() {
    return {
      textarea: false,
      imageModal: false,
    };
  },
  components: { Date },
  computed: {
    ...mapState("flash", ["toys", "food"]),
    hunger() {
      const days = this.$dateFns.differenceInDays(
        this.now,
        this.$dateFns.parseJSON(this.cat.lastFed)
      );
      if (days === 0) {
        return { code: 0, word: "Full" };
      } else if (days === 1) {
        return { code: 1, word: "Hungry" };
      } else {
        return { code: 2, word: "Starving" };
      }
    },
    sadness() {
      const days = this.$dateFns.differenceInDays(
        this.now,
        this.$dateFns.parseJSON(this.cat.lastPet)
      );
      if (days < 2) {
        return { code: 0, word: "Happy" };
      } else if (days < 5) {
        return { code: 1, word: "Sad" };
      } else {
        return { code: 2, word: "Depressed" };
      }
    },
    boredom() {
      const days = this.$dateFns.differenceInDays(
        this.now,
        this.$dateFns.parseJSON(this.cat.lastToy)
      );
      if (days < 5) {
        return { code: 0, word: "Lively" };
      } else if (days < 10) {
        return { code: 1, word: "Engaged" };
      } else {
        return { code: 2, word: "Bored" };
      }
    },
  },
  methods: {
    ...mapMutations("flash", ["feedCat", "petCat", "playCat"]),
    dateDisplay,
    toggleImageModal() {
      this.imageModal = !this.imageModal;
    },
    toggleTextarea() {
      this.textarea = !this.textarea;
    },
    updateCat(ev) {
      const description = ev.target.value;
      this.$store.commit("flash/updateCat", {
        catId: this.cat.id,
        description,
      });
      this.toggleTextarea();
    },
    codeClass(code) {
      if (code === 0) {
        return "is-success";
      } else if (code === 1) {
        return "is-warning";
      } else if (code === 2) {
        return "is-danger";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.description {
  min-height: 1rem;
}
</style>
