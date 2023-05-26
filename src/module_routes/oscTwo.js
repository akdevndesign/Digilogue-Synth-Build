import * as Tone from "tone";

export const oscTwoVolume = new Tone.Volume(-30).toDestination();

export const oscTwoTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 1,
  spread: 0,
}).connect(oscTwoVolume);

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
    type: "sine6",
    frequency: 150,
  },
  envelope: {
    attack: 0.6,
    decay: 0.0,
    sustain: 1,
    release: 0.1,
  },
}).connect(oscTwoResFilter);
