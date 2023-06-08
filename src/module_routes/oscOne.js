import * as Tone from "tone";

export const oscOneVolume = new Tone.Volume(-10).toDestination();

export const oscOneReverb = new Tone.Freeverb({
  roomSize: 0,
  wet: .5,
 
}).connect(oscOneVolume);

console.log("oscOneReverb: ", oscOneReverb.decay)
export const oscOneDelay = new Tone.PingPongDelay({
  delayTime: 0,
  maxDelay: 1,
  feedback: .35,
  wet: .0,
}).connect(oscOneReverb);

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

export const oscOne = new Tone.MonoSynth({
  volume: -8,
  mute: false,
  oscillator: {
    type: "triangle",
    frequency: 50,
  },
  envelope: {
    attack: 0,
    decay: 1.0,
    sustain: 0,
    release: 0.1,
  },

}).connect(oscOneResFilter);
