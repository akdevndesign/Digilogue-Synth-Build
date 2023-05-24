import "./css/App.css";
import "./css/Piano.css";
import React from "react";
import * as Tone from "tone";
import {
  oscTwoVolume,
  oscTwoEnvelope,
  oscTwoTremolo,
  oscTwoVibrato,
  oscTwoResFilter,
  oscTwo,
} from "./module_routes/oscTwo";
import {
  oscOneVolume,
  oscOneEnvelope,
  oscOneTremolo,
  oscOneVibrato,
  oscOneResFilter,
  oscOne,
} from "./module_routes/oscOne";

import {
  oscThreeVolume,
  oscThreeEnvelope,
  oscThreeTremolo,
  oscThreeVibrato,
  oscThreeResFilter,
  oscThree,
} from "./module_routes/oscThree";

import { Oscillator, EnvelopeController, LFOController, EnvelopeController,  } from "./components/";

import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

function App() {
  const ACTX = Tone.context; //setting up Tone.js + Web Audio API
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div className="container">
      <div className="OSCIS">
        <Oscillator type={"OSC1"} synthVolume={oscOneVolume} synth={oscOne} />
        <Oscillator type={"OSC2"} synthVolume={oscTwoVolume} synth={oscTwo} />
        <Oscillator
          type={"OSC3"}
          synthVolume={oscThreeVolume}
          synth={oscThree}
        />
      </div>

      <div className="FILTER">
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
      </div>

      <div className="LFO">
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
      </div>
      <div className="ENVELOPE">
        <EnvelopeController
          type={"OSC1"}
          envAttack={oscOneEnvelope.attack}
          envDecay={oscOneEnvelope.decay}
          envSustain={oscOneEnvelope.sustain}
          envRelease={oscOneEnvelope.release}
        />
        <EnvelopeController
          type={"OSC2"}
          envAttack={oscTwoEnvelope.attack}
          envDecay={oscTwoEnvelope.decay}
          envSustain={oscTwoEnvelope.sustain}
          envRelease={oscTwoEnvelope.release}
        />
        <EnvelopeController
          type={"OSC3"}
          envAttack={oscThreeEnvelope.attack}
          envDecay={oscThreeEnvelope.decay}
          envSustain={oscThreeEnvelope.sustain}
          envRelease={oscThreeEnvelope.release}
        />
      </div>
      <div className="PIANO">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            // Play a given note - see notes below
          }}
          stopNote={(midiNumber) => {
            // Stop playing a given note - see notes below
          }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
}

export default App;
