export type SpeechRecognitionEvent = {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

export type VoiceCommands = [
  trigger: string,
  effect: (text: string) => string[] | void
];
