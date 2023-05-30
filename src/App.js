import "./css/App.css";
import "./css/Piano.css";
import React, {useState} from "react";
import * as Tone from "tone";
import {
  oscTwoVolume,
  oscTwoTremolo,
  oscTwoVibrato,
  oscTwoResFilter,
  oscTwo,
} from "./module_routes/oscTwo";
import {
  oscOneVolume,
  oscOneTremolo,
  oscOneVibrato,
  oscOneResFilter,
  oscOne,
} from "./module_routes/oscOne";

import {
  oscThreeVolume,
  oscThreeTremolo,
  oscThreeVibrato,
  oscThreeResFilter,
  oscThree,
} from "./module_routes/oscThree";

import { Oscillator } from "./components/OscillatorController";
import { LFOController } from "./components/LFOController";
import { FilterController } from "./components/FilterController";
import { EnvelopeController } from "./components/EnvelopeController";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

function App() {
  const ACTX = Tone.context; //setting up Tone.js + Web Audio API
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("b4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const [oscOneEnvelope, setOscOneEnvelope] = useState({
    attack: 0.6,
    decay: 0.0,
    sustain: 1,
    release: 0.1,
  });

  const [oscTwoEnvelope, setOscTwoEnvelope] = useState({
    attack: 0.6,
    decay: 0.0,
    sustain: 1,
    release: 0.1,
  });

  const [oscThreeEnvelope, setOscThreeEnvelope] = useState({
    attack: 0.6,
    decay: 0.0,
    sustain: 1,
    release: 0.1,
  });

  const updateEnvelope = (type, values) => {
    if (type === "OSC1") {
      setOscOneEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscOne.envelope.set(values);
    } else if (type === "OSC2") {
      setOscTwoEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscTwo.envelope.set(values);
    } else if (type === "OSC3") {
      setOscThreeEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscThree.envelope.set(values);
    }
  };

  const playNote = (midiNumber) => {
    oscOne.triggerAttack(Tone.Midi(midiNumber).toFrequency());
    oscTwo.triggerAttack(Tone.Midi(midiNumber).toFrequency());
    oscThree.triggerAttack(Tone.Midi(midiNumber).toFrequency());
  };

  // Function to stop playing a note
  const stopNote = (midiNumber) => {
    oscOne.triggerRelease(Tone.Midi(midiNumber).toFrequency());
    oscTwo.triggerRelease(Tone.Midi(midiNumber).toFrequency());
    oscThree.triggerRelease(Tone.Midi(midiNumber).toFrequency());
  };

  return (
    <div className="container">
      <div className="casediv">
      <div className="OSCIS">
        <Oscillator type={"OSC1"} synthVolume={oscOneVolume} synth={oscOne} />
        <Oscillator type={"OSC2"} synthVolume={oscTwoVolume} synth={oscTwo} />
        <Oscillator
          type={"OSC3"}
          synthVolume={oscThreeVolume}
          synth={oscThree}
        />
        <FilterController
          type={"OSC1"}
          oscFilterQ={oscOneResFilter.Q}
          OscFilterFrequency={oscOneResFilter.frequency}
        />
        <FilterController
          type={"OSC2"}
          oscFilterQ={oscTwoResFilter.Q}
          OscFilterFrequency={oscTwoResFilter.frequency}
        />
        <FilterController
          type={"OSC3"}
          oscFilterQ={oscThreeResFilter.Q}
          OscFilterFrequency={oscThreeResFilter.frequency}
        />
        <LFOController
          type={"OSC2"}
          sineTremolo={oscTwoTremolo}
          sineVibrato={oscTwoVibrato}
        />
        <LFOController
          type={"OSC1"}
          sineTremolo={oscOneTremolo}
          sineVibrato={oscOneVibrato}
        />
        <LFOController
          type={"OSC3"}
          sineTremolo={oscThreeTremolo}
          sineVibrato={oscThreeVibrato}
        />
        <EnvelopeController
          type={"OSC1"}
          envAttack={oscOneEnvelope.attack}
          envDecay={oscOneEnvelope.decay}
          envSustain={oscOneEnvelope.sustain}
          envRelease={oscOneEnvelope.release}
          updateEnvelope={updateEnvelope}
        />
        <EnvelopeController
          type={"OSC2"}
          envAttack={oscTwoEnvelope.attack}
          envDecay={oscTwoEnvelope.decay}
          envSustain={oscTwoEnvelope.sustain}
          envRelease={oscTwoEnvelope.release}
          updateEnvelope={updateEnvelope}
        />
        <EnvelopeController
          type={"OSC3"}
          envAttack={oscThreeEnvelope.attack}
          envDecay={oscThreeEnvelope.decay}
          envSustain={oscThreeEnvelope.sustain}
          envRelease={oscThreeEnvelope.release}
          updateEnvelope={updateEnvelope}
        />
      </div>
    <div className="keybedCase">
      <Piano
        className="piano"
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
      </div>
    </div>
    </div>
  );
}

export default App;