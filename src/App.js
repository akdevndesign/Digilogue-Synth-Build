import "./css/App.css";
import "./css/Piano.css";
import React, { useRef, Fragment, useState } from "react";
import * as Tone from "tone";
import {
  oscTwoVolume,
  oscTwoTremolo,
  oscTwoVibrato,
  oscTwoResFilter,
  oscTwoDelay,
  oscTwoReverb,
  oscTwo,
} from "./module_routes/oscTwo";
import {
  oscOneVolume,
  oscOneTremolo,
  oscOneVibrato,
  oscOneResFilter,
  oscOneDelay,
  oscOneReverb,
  oscOne,
} from "./module_routes/oscOne";

import {
  oscThreeVolume,
  oscThreeTremolo,
  oscThreeVibrato,
  oscThreeResFilter,
  oscThreeDelay,
  oscThreeReverb,
  oscThree,
} from "./module_routes/oscThree";

import { Oscillator } from "./components/OscillatorController";
import { LFOController } from "./components/LFOController";
import { FilterController } from "./components/FilterController";
import { EnvelopeController } from "./components/EnvelopeController";
import { EffectsController } from "./components/EffectsController";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

function App() {
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
    sustain: 0,
  });

  const [oscTwoEnvelope, setOscTwoEnvelope] = useState({
    attack: 0.6,
    decay: 0.0,
    sustain: 0,
  });

  const [oscThreeEnvelope, setOscThreeEnvelope] = useState({
    attack: 0.6,
    decay: 0.0,
    sustain: 0,
  });

  const [oscillatorType, setOscillatorType] = useState("triangle");

  const updateEnvelope = (type, values) => {
    if (type === "OSC1") {
      setOscOneEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscOne.envelope.set(values); // Update oscillator envelope settings
    } else if (type === "OSC2") {
      setOscTwoEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscTwo.envelope.set(values); // Update oscillator envelope settings
    } else if (type === "OSC3") {
      setOscThreeEnvelope((prevEnvelope) => ({
        ...prevEnvelope,
        ...values,
      }));
      oscThree.envelope.set(values); // Update oscillator envelope settings
    }
  };


  const [oscillatorFrequencies, setOscillatorFrequencies] = useState({
    OSC1: 50, // Default frequency for OSC1
    OSC2: 50, // Default frequency for OSC2
    OSC3: 50, // Default frequency for OSC3
  });

  const updateFrequency = (type, frequency) => {
    setOscillatorFrequencies((prevFrequencies) => ({
      ...prevFrequencies,
      [type]: frequency,
    }));
  };

  const handleOscillatorChange = (type, oscillatorType) => {
    if (type === "OSC1") {
      oscOne.oscillator.type = oscillatorType;
    } else if (type === "OSC2") {
      oscTwo.oscillator.type = oscillatorType;
    } else if (type === "OSC3") {
      oscThree.oscillator.type = oscillatorType;
    }
    setOscillatorType(oscillatorType);
  };

  const playNote = (midiNumber) => {
    oscOne.triggerAttack(
      Tone.Midi(midiNumber).toFrequency() * (oscillatorFrequencies.OSC1 / 50)
    );
    oscTwo.triggerAttack(
      Tone.Midi(midiNumber).toFrequency() * (oscillatorFrequencies.OSC2 / 50)
    );
    oscThree.triggerAttack(
      Tone.Midi(midiNumber).toFrequency() * (oscillatorFrequencies.OSC3 / 50)
    );
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
          <div className="oscSection">
            <Oscillator
              type={"OSC1"}
              synthVolume={oscOneVolume}
              synth={oscOne}
              oscillatorType={oscillatorType}
              handleOscillatorChange={handleOscillatorChange}
              updateFrequency={updateFrequency}
            />
            <Oscillator
              type={"OSC2"}
              synthVolume={oscTwoVolume}
              synth={oscTwo}
              oscillatorType={oscillatorType}
              handleOscillatorChange={handleOscillatorChange}
              updateFrequency={updateFrequency}
            />
            <Oscillator
              type={"OSC3"}
              synthVolume={oscThreeVolume}
              synth={oscThree}
              oscillatorType={oscillatorType}
              handleOscillatorChange={handleOscillatorChange}
              updateFrequency={updateFrequency}
            />
          </div>
          <div className="filterSection">
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
          <div className="envSection">
            <EnvelopeController
              type={"OSC1"}
              envAttack={oscOneEnvelope.attack}
              envDecay={oscOneEnvelope.decay}
              envSustain={oscOneEnvelope.sustain}
              updateEnvelope={updateEnvelope}
            />
            <EnvelopeController
              type={"OSC2"}
              envAttack={oscTwoEnvelope.attack}
              envDecay={oscTwoEnvelope.decay}
              envSustain={oscTwoEnvelope.sustain}
              updateEnvelope={updateEnvelope}
            />
            <EnvelopeController
              type={"OSC3"}
              envAttack={oscThreeEnvelope.attack}
              envDecay={oscThreeEnvelope.decay}
              envSustain={oscThreeEnvelope.sustain}
              updateEnvelope={updateEnvelope}
            />
          </div>
          <div className="lfoSection">
            <LFOController
              type={"OSC1"}
              sineTremolo={oscOneTremolo}
              sineVibrato={oscOneVibrato}
            />
            <LFOController
              type={"OSC2"}
              sineTremolo={oscTwoTremolo}
              sineVibrato={oscTwoVibrato}
            />
            <LFOController
              type={"OSC3"}
              sineTremolo={oscThreeTremolo}
              sineVibrato={oscThreeVibrato}
            />
          </div>
          <div className="efxSection">
            <EffectsController
              type={"OSC1"}
              oscDelayWet={oscOneDelay.wet}
              oscDelayTime={oscOneDelay.delayTime}
              oscDelayFbk={oscOneDelay.feedback}
              reverbWet={oscOneReverb.wet}
              reverbDecay={oscOneReverb.roomSize}
            />
            <EffectsController
              type={"OSC2"}
              oscDelayWet={oscTwoDelay.wet}
              oscDelayTime={oscTwoDelay.delayTime}
              oscDelayFbk={oscTwoDelay.feedback}
              reverbWet={oscTwoReverb.wet}
              reverbDecay={oscTwoReverb.roomSize}
            />
            <EffectsController
              type={"OSC3"}
              oscDelayWet={oscThreeDelay.wet}
              oscDelayTime={oscThreeDelay.delayTime}
              oscDelayFbk={oscThreeDelay.feedback}
              reverbWet={oscThreeReverb.wet}
              reverbDecay={oscThreeReverb.roomSize}

            />
          </div>
        </div>
      </div>

      <div className="keybedCase">
        <Piano
          className="piano"
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={playNote}
          stopNote={stopNote}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
}
export default App;
