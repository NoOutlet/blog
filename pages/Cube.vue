<template>
  <div class="container">
    <button @click="shuffle">Shuffle</button>
    <button @click="undoMove">Undo</button>
    <button @click="resetCube">Reset</button>
    <input v-model.number="x" type="range" min="0" max="360" />
    <input v-model.number="y" type="range" min="0" max="360" />
    <input v-model.number="z" type="range" min="0" max="360" />
    <span v-if="speechMode">Speech Mode on</span>
    <ul>
      <li v-for="(pattern, i) in gameData.patterns" :key="i">
        <span>
          {{ pattern }}
          <button @click="runPattern(pattern)">Run</button>
          <button @click="removePattern(i)">Remove</button>
        </span>
      </li>
      <li>
        <span>
          <input type="text" v-model="newPattern" @keyup.stop />
          <button @click="addPattern">Save</button>
        </span>
      </li>
    </ul>
    <span v-if="gameData.hasShuffled">Moves: {{ gameData.moves }}</span>
    <div
      class="cube"
      :style="{
        transform: `rotateX(-${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`,
      }"
    >
      <Cubelet v-for="cubelet in cube" :key="cubelet.id" :cubelet="cubelet" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import { useCube } from "@/composables/rubiks";
import useStorage from "@/composables/storage";
import { useNotify } from "@/composables/notify";
import Cubelet from "@/components/cube/Cubelet.vue";
import { useWealth } from "../composables/wealth";
import { useVoiceCommands } from "../composables/voice";
import type { Axis, Side, SpeechSide } from "@/definitions/rubiks";

const SHUFFLE_SPIN_COUNT = 100;
const SIDES: Side[] = ["f", "r", "l", "u", "d", "b", "e", "m", "s"];
function isSide(key: string): key is Side {
  return SIDES.includes(key as Side);
}
const AXES: Axis[] = ["x", "y", "z"];
function isAxis(key: string): key is Axis {
  return AXES.includes(key as Axis);
}

const SPEECH_SIDES: SpeechSide[] = [
  ["front", "f"],
  ["right", "r"],
  ["left", "l"],
  ["up", "u"],
  ["down", "d"],
  ["back", "b"],
  ["equator", "e"],
  ["middle", "m"],
  ["standing", "s"],
  ["x", "x"],
  ["y", "y"],
  ["z", "z"],
];

const TURN_REGEX =
  "(((front|right|left|up|down|back|equator|middle|standing|x|y|z)( inverted)?(\\s|$))+)";

const turnRegex = new RegExp(`turn\\s\\b${TURN_REGEX}`, "i");
const patternRegex = new RegExp(`pattern\\s\\b${TURN_REGEX}`, "i");
const speechModeRegex = new RegExp(TURN_REGEX, "i");

function parsePattern(speech: string) {
  const invertedReplaced = SPEECH_SIDES.reduce((text, speechSide) => {
    return text.replaceAll(
      `${speechSide[0]} inverted`,
      speechSide[1].toUpperCase()
    );
  }, speech);
  const turnPattern = SPEECH_SIDES.reduce((text, speechSide) => {
    return text.replaceAll(speechSide[0], speechSide[1]);
  }, invertedReplaced);
  return turnPattern.replaceAll(" ", "");
}

interface GameData {
  moves: number;
  moveList: string;
  hasShuffled: boolean;
  highScore: number | null;
  patterns: string[];
}

export default defineComponent({
  components: { Cubelet },
  setup() {
    const { cube, turn, spin, reset, isSolved } = useCube();

    const initialGameData: GameData = {
      moves: 0,
      moveList: "",
      hasShuffled: false,
      highScore: null,
      patterns: ["RDrd"],
    };

    const gameData = useStorage<GameData>("gameData", initialGameData);
    const win = ref(false);
    const speechMode = ref(false);

    const { addNotification } = useNotify();
    const { earn } = useWealth();

    const newPattern = ref("");

    const x = ref(20);
    const y = ref(20);
    const z = ref(0);

    const shuffle = () => {
      gameData.value.hasShuffled = true;
      gameData.value.moves = 0;
      gameData.value.moveList = "";
      for (let i = 0; i < SHUFFLE_SPIN_COUNT; i++) {
        const sideIndex = Math.floor(Math.random() * 6);
        const clockwise = Math.random() > 0.5;
        turn(SIDES[sideIndex], clockwise);
      }
    };

    const move = (letter: string, clockwise: boolean): boolean => {
      if (isSide(letter)) {
        turn(letter, clockwise);
        return true;
      } else if (isAxis(letter)) {
        spin(letter, clockwise);
        return true;
      }
      return false;
    };

    const keyTurn = (ev: KeyboardEvent) => {
      const lowercase = ev.key.toLowerCase();
      if (move(lowercase, !ev.shiftKey)) {
        gameData.value.moveList += ev.key;
        if (isSide(lowercase)) {
          gameData.value.moves++;
        }
      }
    };

    const undoMove = () => {
      if (gameData.value.moveList.length) {
        const letter = gameData.value.moveList.slice(-1);
        move(letter.toLowerCase(), letter < "a");
        gameData.value.moveList = gameData.value.moveList.slice(0, -1);
      } else {
        addNotification({
          text: "There are no moves to undo!",
          color: "warning",
        });
      }
    };

    const resetCube = () => {
      x.value = 20;
      y.value = 20;
      z.value = 0;
      gameData.value.hasShuffled = false;
      gameData.value.moves = 0;
      gameData.value.moveList = "";
      reset();
    };

    const addPattern = () => {
      if (newPattern.value.length) {
        gameData.value.patterns.push(newPattern.value);
        newPattern.value = "";
      }
    };

    const runPattern = (pattern: string) => {
      pattern.split("").forEach((key) => {
        keyTurn({ key, shiftKey: key < "a" } as KeyboardEvent);
      });
    };

    const removePattern = (index: number) => {
      if (index > -1 && index < gameData.value.patterns.length) {
        gameData.value.patterns.splice(index, 1);
      }
    };

    watchEffect(() => {
      if (gameData.value.hasShuffled && isSolved.value) {
        win.value = true;
        gameData.value.hasShuffled = false;
        const { highScore, moves } = gameData.value;
        const value = Math.round(100 / Math.pow(Math.log10(moves) - 1, 2));
        addNotification({
          text: `Great work! You earned ${value} plugs!`,
          color: "success",
        });
        earn(value);
        if (!highScore || highScore > moves) {
          gameData.value.highScore = moves;
          addNotification({
            text: `And you got a new high score with ${moves} moves! Nice!`,
            color: "success",
          });
        }
      }
    });

    useVoiceCommands([
      ["shuffle", shuffle],
      ["reset", resetCube],
      [
        "undo",
        (command) => {
          const times = command.split("undo").length - 1;
          for (let i = 0; i < times; i++) {
            undoMove();
          }
          // Try to get the highlighter to highlight more than one "undo"?
        },
      ],
      [
        "turn",
        (command) => {
          const turnMatch = turnRegex.exec(command);
          if (turnMatch?.[1]) {
            const pattern = parsePattern(turnMatch[1].toLowerCase());
            runPattern(pattern);
            return [turnMatch[1]];
          }
        },
      ],
      [
        "toggle speech mode",
        () => {
          speechMode.value = !speechMode.value;
        },
      ],
      [
        "add pattern",
        (command) => {
          const patternMatch = patternRegex.exec(command);
          if (patternMatch?.[1]) {
            newPattern.value = parsePattern(patternMatch[1].toLowerCase());
            addPattern();
            return [patternMatch[1]];
          }
        },
      ],
      [
        "run pattern",
        // Get the speech to register even if the user repeats the same text
        (command) => {
          const patternMatch = /pattern\s(\d+)/i.exec(command);
          if (patternMatch?.[1]) {
            const patternIndex = parseInt(patternMatch[1]);
            if (!isNaN(patternIndex)) {
              const pattern = gameData.value.patterns[patternIndex - 1];
              runPattern(pattern);
              return [patternMatch[1]];
            }
          }
        },
      ],
      [
        "",
        (command) => {
          if (speechMode.value) {
            const turnMatch = speechModeRegex.exec(command);
            if (turnMatch?.[1]) {
              const pattern = parsePattern(turnMatch[1].toLowerCase());
              runPattern(pattern);
              return [turnMatch[1]];
            }
          }
        },
      ],
    ]);

    onMounted(() => {
      window.onkeyup = keyTurn;
    });
    onUnmounted(() => {
      window.onkeyup = null;
    });

    return {
      cube,
      shuffle,
      x,
      y,
      z,
      resetCube,
      gameData,
      newPattern,
      addPattern,
      runPattern,
      removePattern,
      undoMove,
      speechMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% + 2px);
  width: calc(100% + 2px);
  perspective: 2000px;
  transform-style: preserve-3d;
  position: relative;
}
.cube {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  height: 100px;
  width: 100px;
  transform-style: preserve-3d;
}
</style>