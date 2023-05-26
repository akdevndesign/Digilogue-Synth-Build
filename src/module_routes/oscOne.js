import * as Tone from "tone";

export const oscOneVolume = new Tone.Volume(-30).toDestination();

// export const oscOneDelay = new Tone.Delay({
//   delayTime: 150,
//   maxDelay: 160,
//   wet: 50,
// }).connect(oscOneVolume);

export const oscOneTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 1,
  spread: 10,
}).connect(oscOneVolume);

export const oscOneVibrato = new Tone.Vibrato({
  frequency: 0,
  depth: 1,
  wet: 0,
}).connect(oscOneTremolo);

export const oscOneResFilter = new Tone.Filter({
  type: "lowpass",
  Q: 0,
  gain: 45,
  frequency: 350,
  resonance: 300,
}).connect(oscOneVibrato);

export const oscOne = new Tone.MonoSynth({
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

}).connect(oscOneResFilter);
