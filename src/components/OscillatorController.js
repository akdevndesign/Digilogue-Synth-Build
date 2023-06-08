import { useRef, Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import Form from "react-bootstrap/Form";
import * as Tone from "tone";
import "../css/Oscillator.css";
import { Knob, Pointer, Scale, Value } from "rc-knob";

export function Oscillator({
  type,
  synth,
  synthVolume,
  oscillatorType,
  handleOscillatorChange,
  updateFrequency,
}) {
  const dialVolSynth = useRef(0);
  const freqSynth = useRef(150);
  const [selectedType, setSelectedType] = useState(oscillatorType);

  const handleChange = (e) => {
    dialVolSynth.current = e;
    synthVolume.volume.linearRampTo(e, 0.1, Tone.now());
  };

   const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    handleOscillatorChange(type, e.target.value);
  };
  const handleChangeFreq = (e) => {
    const newFrequency = e;
    freqSynth.current = newFrequency;
    synth.oscillator.frequency.value = newFrequency;
    updateFrequency(type, newFrequency); // Update the frequency in the parent component
  };
  // // Set volume to zero and change status to "OFF"
  // if (status) {
  //   synthVolume.volume.linearRampTo(-Infinity, 0.1, Tone.now());

  // Return the JSX for the oscillator component
  return (
    <Fragment>
    <div className={type} id="oscSwitch">
        <Form>
          <div key="inline-radio" className="mb-3">
            <Form.Check
              inline
              label="TRI"
              name={`group_${type}`} // Use a unique name for each oscillator
              type="radio"
              value="triangle"
              checked={selectedType === "triangle"} // Use the local state variable
              onChange={handleTypeChange}
            />
            <Form.Check
              inline
              label="SAW"
              name={`group_${type}`}
              type="radio"
              value="sawtooth"
              checked={selectedType === "sawtooth"}
              onChange={handleTypeChange}
            />
            <Form.Check
              inline
              label="SQR"
              name={`group_${type}`}
              type="radio"
              value="square"
              checked={selectedType === "square"}
              onChange={handleTypeChange}
            />
          </div>
        </Form>
      </div>
      <div className={`${type}_VOL`}>
          <Knob
          snap={true}
          size={100}
          angleOffset={220}
          angleRange={280}
          steps={20}
          min={-40}
          max={-5}
          onChange={handleChange}
          value={dialVolSynth.current}
        >
          <Scale tickWidth={4} tickHeight={4} radius={45} />
          <circle r="35" cx="50" cy="50" fill="#FC5A96" />,
          <Pointer
            width={4}
            height={35}
            radius={10}
            type="rect"
            color="#FC5A96"
          />
        </Knob>
      </div>
      <div className={`VOLW`}>VOLUME</div>
      <div className={`DIGI`}>DIGILOGUE</div>
      <div className={`${type}_FREQ`}>
        <CircleSlider
          onChange={handleChangeFreq}
          min={10}
          max={1000}
          value={freqSynth.current}
          stepSize={1}
          size={90}
          knobRadius={7}
          progressWidth={10}
          circleWidth={9}
        />
      </div>
      <div className={`FREQW`}>FREQUENCY</div>
      <div className={`OSCTITLE`}>OSCILLATORS</div>
    </Fragment>
  );
}
