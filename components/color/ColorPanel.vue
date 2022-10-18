<template>
  <div class="box" :class="{ 'panel-on-top': panelLocation === 'top' }">
    <div class="group">
      <button
        class="button is-light panel-dropdown-button"
        @click="panelDropdown = !panelDropdown"
      >
        <fa
          v-if="panelLocation === 'top'"
          prefix="far"
          icon="caret-square-up"
          class="mx-0"
        ></fa>
        <fa
          v-else-if="panelLocation === 'left'"
          prefix="far"
          icon="caret-square-left"
          class="mx-0"
        ></fa>
        <fa
          v-else-if="panelLocation === 'float'"
          icon="external-link-alt"
          class="mx-0"
        ></fa>
        <div v-if="panelDropdown" class="buttons panel-dropdown">
          <button
            class="button is-light"
            @click="$emit('setPanelLocation', 'top')"
            v-if="panelLocation !== 'top'"
          >
            <fa prefix="far" icon="caret-square-up"></fa>
          </button>
          <button
            class="button is-light"
            @click="$emit('setPanelLocation', 'left')"
            v-if="panelLocation !== 'left'"
          >
            <fa prefix="far" icon="caret-square-left"></fa>
          </button>
          <button
            class="button is-light"
            @click="$emit('setPanelLocation', 'float')"
            v-if="false"
          >
            <fa icon="external-link-alt"></fa>
          </button>
        </div>
      </button>
      <label
        class="button"
        :style="{ background: color }"
        :class="isLight(color) ? 'has-text-black' : 'has-text-white'"
      >
        <input
          type="color"
          :value="color"
          @input="selectColor($event)"
          class="is-hidden"
        />
        <fa icon="palette" class="mx-0" />
      </label>
    </div>
    <div class="divider" ></div>
    <div class="scroll-group">
      <div class="group">
        <button class="button is-info" @click="sortSwatch">
          <fa icon="sort-amount-down-alt"></fa>
        </button>
        <button
          class="button"
          @click="deleteable = !deleteable"
          :class="deleteable ? 'has-text-danger' : 'is-danger'"
        >
          <fa icon="trash"></fa>
        </button>
        <button
          class="button is-primary"
          @click="loading = true"
          :disabled="emptyStorage"
        >
          <fa icon="upload"></fa>
        </button>
        <button
          class="button is-success"
          @click="saving = true"
          :disabled="!swatchColors.length"
        >
          <fa icon="download"></fa>
        </button>
      </div>
      <div class="divider" ></div>
      <div class="palette group">
        <button
          class="button"
          v-for="(swatch, i) in swatchColors"
          :key="swatch"
          :style="{ background: swatch }"
          :class="isLight(swatch) ? 'has-text-black' : 'has-text-white'"
          @click="
            deleteable ? deleteSwatch(swatch) : $emit('selectColor', swatch)
          "
        >
          <span v-if="deleteable" class="delete is-small"></span>
          <fa v-else-if="swatch === color" icon="check"></fa>
          <span v-else>{{ i + 1 }}</span>
        </button>
        <div v-if="deleteable && !swatchColors.length" class="tag is-large">
          Empty palette
        </div>
        <button
          v-if="newColor && !deleteable"
          class="button"
          @click="addColor"
          :style="{ background: color }"
          :class="isLight(color) ? 'has-text-black' : 'has-text-white'"
        >
          <fa icon="plus" />
        </button>
      </div>
    </div>
  </div>
  <teleport :disabled="saving" to="#modal-area">
    <SaveModal v-if="saving" :palette="swatchColors" @close="saving = false" />
    <LoadModal v-if="loading" @load="setPalette" @close="loading = false" />
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, type PropType } from "vue";
import SaveModal from "./SaveModal.vue";
import LoadModal from "./LoadModal.vue";
import { getHSL, isLight } from "./utils";
import { usePalettes } from "@/composables/color";
import type { PanelLocation } from "@/definitions/color";

export default defineComponent({
  components: { SaveModal, LoadModal },
  props: {
    color: { type: String, required: true },
    panelLocation: {
      type: String as PropType<PanelLocation>,
      required: true,
    },
  },
  emits: {
    selectColor: (newColor: string) => !!newColor,
    setPanelLocation: (location: PanelLocation) =>
      ["top", "left", "float"].includes(location),
  },
  setup(props, emits) {
    const dropdownOpen = ref(false);
    const deleteable = ref(false);
    const saving = ref(false);
    const loading = ref(false);
    const panelDropdown = ref(false);
    const { palettes, restorePalette } = usePalettes();
    const { color } = toRefs(props);
    const swatchColors = ref<string[]>(restorePalette("steven"));
    const selectColor = (ev: Event | null) => {
      if (ev && ev.target) {
      emits.emit("selectColor", (ev.target as any).value)
      }
    }
    const addColor = () => {
      swatchColors.value.push(color.value);
    };
    const newColor = computed(
      () => !swatchColors.value.some((swatch) => swatch === color.value)
    );
    const deleteSwatch = (swatch: string) => {
      swatchColors.value = swatchColors.value.filter((c) => c !== swatch);
    };
    const sortSwatch = () => {
      swatchColors.value = swatchColors.value.sort((a, b) => {
        const [aHue, aSat, aLum] = getHSL(a);
        const [bHue, bSat, bLum] = getHSL(b);
        if (aHue === bHue) {
          if (aSat === bSat) {
            return bLum - aLum;
          } else {
            return bSat - aSat;
          }
        } else {
          return aHue - bHue;
        }
      });
    };
    const setPalette = (palette: string[]) => {
      swatchColors.value = palette;
    };
    const emptyStorage = computed(
      () => Object.keys(palettes.value).length === 0
    );
    return {
      swatchColors,
      addColor,
      isLight,
      newColor,
      dropdownOpen,
      deleteable,
      deleteSwatch,
      sortSwatch,
      saving,
      loading,
      setPalette,
      emptyStorage,
      panelDropdown,
      selectColor
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  &.panel-on-top {
    flex-direction: row;
    .scroll-group {
      overflow-y: hidden;
      overflow-x: auto;
    }
    .group,
    .scroll-group {
      flex-direction: row;
      .panel-dropdown-button .panel-dropdown {
        flex-direction: column;
        top: calc(100% + 0.5rem);
        left: unset;
        button.button {
          margin-right: 0;
        }
      }
    }
  }
  .scroll-group,
  .group {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .group {
    overflow: unset;
    gap: 0.3rem;
    margin: 0.5rem;

    &.palette {
      align-self: flex-start;
      .button {
        min-width: 3.5rem;
        max-width: 3.5rem;
      }
    }

    .panel-dropdown-button {
      position: relative;
      width: 2.5rem;
      .panel-dropdown {
        left: calc(100% + 0.5rem);
        position: absolute;
        flex-wrap: nowrap;
        flex-direction: row;
      }
    }
  }
}

.divider {
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
</style>