import { useRef, Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import Form from "react-bootstrap/Form";
import * as Tone from "tone";

import "../css/Oscillator.css";

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

  return (
    <Fragment>
      <div className={type} id="oscSwitch">
        <Form>
          <div key="inline-radio" className="mb-3 radio-wrapper">
          <Form.Check
  inline
  label={
    <>
      <img
        src="https://res.cloudinary.com/dusaigbyn/image/upload/v1686377669/triangle-wave_rzs4sc.svg"
        alt="Triangle Wave"
        height="24"
        width="24"
        style={{ marginRight: '5px' }}
      />
    </>
  }
  name={`group_${type}`}
  type="radio"
  value="triangle"
  checked={selectedType === "triangle"}
  onChange={handleTypeChange}
  id={`radio-${type}-triangle`}
/>
<Form.Check
  inline
  label={
    <>
      <img
        src="https://res.cloudinary.com/dusaigbyn/image/upload/v1686377669/sawtooth-wave_ev2xwr.svg"
        alt="Sawtooth Wave"
        height="24"
        width="24"
        style={{ marginRight: '5px' }}
      />
    </>
  }
  name={`group_${type}`}
  type="radio"
  value="sawtooth"
  checked={selectedType === "sawtooth"}
  onChange={handleTypeChange}
  id={`radio-${type}-sawtooth`}
/>
<Form.Check
  inline
  label={
    <>
      <img
        src="https://res.cloudinary.com/dusaigbyn/image/upload/v1686377670/square-wave_b7kr7z.svg"
        alt="Square Wave"
        height="24"
        width="24"
        style={{ marginRight: '5px' }}
      />
    </>
  }
  name={`group_${type}`}
  type="radio"
  value="square"
  checked={selectedType === "square"}
  onChange={handleTypeChange}
  id={`radio-${type}-square`}
/>
          </div>
        </Form>
      </div>
      <div className={`${type}_VOL`}>
        <CircleSlider
          onChange={handleChange}
          min={-40}
          max={-5}
          value={dialVolSynth.current}
          stepSize={1}
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
        />
      </div>
      <div className={`VOLW`}>VOLUME</div>
      <div className={`DIGI`}>DIGILOGUE</div>
      <div className={`${type}_FREQ`}>
        <CircleSlider
          onChange={handleChangeFreq}
          min={10}
          max={800}
          value={freqSynth.current}
          stepSize={1}
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
        />
      </div>
      <div className={`FREQW`}>FREQUENCY</div>
      <div className={`OSCTITLE`}>OSCILLATORS</div>
    </Fragment>
  );
}
