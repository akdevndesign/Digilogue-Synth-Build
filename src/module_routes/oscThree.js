import * as Tone from "tone";

export const oscThreeVolume = new Tone.Volume(-10).toDestination();

export const oscThreeReverb = new Tone.Freeverb({
  roomSize: 0,
  wet: 0,
}).connect(oscThreeVolume);

export const oscThreeDelay = new Tone.PingPongDelay({
  delayTime: 0,
  maxDelay: 1,
  feedback: .35,
  wet: 0,
}).connect(oscThreeReverb);

export const oscThreeTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 0,
  spread: 0,
}).connect(oscThreeDelay);

export const oscThreeVibrato = new Tone.Vibrato({
  frequency: 0,
  depth: 0,
  wet: 0,
}).connect(oscThreeTremolo);

export const oscThreeResFilter = new Tone.Filter({
    type: "lowpass",
    Q: 0,
    gain: 20,
    frequency: 350,
}).connect(oscThreeVibrato);

export const oscThree = new Tone.MonoSynth({
  volume: -8,
  mute: false,
  oscillator: {
    type: "sawtooth",
    frequency: 50,
  },
  envelope: {
    attack: 0,
    decay: 1.0,
    sustain: 0,
    release: 0.1,
  },
}).connect(oscThreeResFilter);
