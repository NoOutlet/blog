import type {
  SpeechRecognitionEvent,
  VoiceCommands,
} from "@/definitions/voice";
import { onUnmounted, ref, watch } from "vue";
import { useNotify } from "./notify";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const canUseSpeech = SpeechRecognition !== undefined;

const useVoice = () => {
  const result = ref("");
  const recording = ref(false);

  // Return dead refs if SpeechAPI is missing
  if (!canUseSpeech) {
    return { result, recording, toggle: () => {} };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.onresult = (ev: SpeechRecognitionEvent) => {
    let tempResult = "";
    for (var i = ev.resultIndex; i < ev.results.length; ++i) {
      if (ev.results[i].isFinal) {
        tempResult += ev.results[i][0].transcript;
      }
    }
    result.value = tempResult;
  };
  const toggle = (on?: boolean) => {
    const shouldStart = on || !recording.value;
    if (shouldStart) {
      recognition.start();
    } else {
      recognition.stop();
    }
    recording.value = shouldStart;
  };

  return { result, recording, toggle };
};

const { result, recording, toggle } = useVoice();
const voiceCommands: VoiceCommands[] = [
  ["stop voice", () => toggle()], // default voice command to turn off voice
];

const { addNotification } = useNotify();
const colorTypes = ["primary", "link", "info", "success", "warning", "danger"];

watch(result, (text) => {
  const command = voiceCommands.find(([trigger]) =>
    text.toLowerCase().includes(trigger)
  );
  // effect returns matching text or undefined
  const highlightText: string[] = [];
  if (command) {
    const [trigger, effect] = command;
    highlightText.push(trigger);
    const extraText = effect(text);
    if (extraText) {
      highlightText.push(...extraText);
    }
  }

  const color = colorTypes.find((colorType) =>
    text.toLowerCase().includes(colorType)
  );

  addNotification({ text, color, highlightText });
});

export const useVoiceCommands = (
  commands: VoiceCommands[] = [],
  global: boolean = false
) => {
  commands.forEach((command) => {
    voiceCommands.push(command);
  });
  if (!global) {
    onUnmounted(() => {
      if (commands.length) {
        const firstCommandIndex = voiceCommands.findIndex(
          ([trigger]) => trigger === commands[0][0]
        );
        voiceCommands.splice(firstCommandIndex, commands.length);
      }
    });
  }
  return {
    result,
    recording,
    toggle,
  };
};
