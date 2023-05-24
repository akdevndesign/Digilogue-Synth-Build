import * as Tone from "tone";

export const oscOneVolume = new Tone.Volume(-30).toDestination();

export const oscOneDelay = new Tone.Delay({
  delayTime: 0,
  maxDelay: 170,
  wet: 100,
}).connect(oscOneVolume);

export const oscOneTremolo = new Tone.Tremolo({
  frequency: 0,
  depth: 1,
  spread: 10,
}).connect(oscOneDelay);

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

export const oscOneEnvelope = new Tone.AmplitudeEnvelope({
  attack: 0,
  decay: 1,
  sustain: 1,
  release: 1,
}).connect(oscOneResFilter);

export const oscOne = new Tone.MonoSynth({
  volume: -8,
  oscillator: {
    type: "sine6",
    frequency: 150,
  }

}).connect(oscOneEnvelope);
