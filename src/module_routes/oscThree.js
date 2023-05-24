import * as Tone from "tone";

export const oscThreeVolume = new Tone.Volume(-30).toDestination();

export const oscThreeTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 0,
  spread: 0,
}).connect(oscThreeVolume);

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

export const oscThreeEnvelope = new Tone.AmplitudeEnvelope({
  attack: 0,
  decay: 1,
  sustain: 1,
  release: 1,
}).connect(oscThreeResFilter);

export const oscThree = new Tone.MonoSynth({
  volume: -8,
  oscillator: {
    type: "sawtooth",
    frequency: 150,
  },
  envelope: {
    attack: 0.6,
    decay: 0.0,
    sustain: 1,
    release: 0.1,
  },
}).connect(oscThreeEnvelope);
