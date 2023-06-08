import * as Tone from "tone";

export const oscTwoVolume = new Tone.Volume(-10).toDestination();

export const oscTwoReverb = new Tone.Freeverb({
  roomSize: 0,
  wet: 0,
}).connect(oscTwoVolume);

export const oscTwoDelay = new Tone.PingPongDelay({
  delayTime: 0,
  maxDelay: 25,
  feedback: .35,
  wet: 0,
}).connect(oscTwoReverb);

export const oscTwoTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 1,
  spread: 0,
}).connect(oscTwoDelay);

export const oscTwoVibrato = new Tone.Vibrato({
  frequency: 0,
  depth: 1,
  wet: 0,
}).connect(oscTwoTremolo);

export const oscTwoResFilter = new Tone.Filter({
    type: "lowpass",
    Q: 0,
    gain: 20,
    frequency: 350,
    resonance: 300,
}).connect(oscTwoVibrato);

export const oscTwo = new Tone.MonoSynth({
  volume: -8,
  mute: false,
  oscillator: {
    type: "square",
    frequency: 50,
  },
  envelope: {
    attack: 0,
    decay: 1.0,
    sustain: 0,
    release: 0.1,
  },
}).connect(oscTwoResFilter);
