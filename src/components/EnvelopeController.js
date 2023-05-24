import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";

export function EnvelopeController({
  type,
  envAttack,
  envDecay,
  envSustain,
  envRelease,
}) {

    
  const [enAttack, setEnAttack] = useState(0);
  const [enDecay, setEnDecay] = useState(0);
  const [enSustain, setEnSustain] = useState(0);
  const [enRelease, setEnRelease] = useState(0);

  const changeAttack = (value) => {
    envAttack = value; // Update the value directly since it's a number
    setEnAttack(value);
  };

  const changeDecay = (value) => {
    envDecay = value;
    setEnDecay(value);
  };

  const changeSustain = (value) => {
    envSustain = value;
    setEnSustain(value);
  };

  const changeRelease = (value) => {
    envRelease = value;
    setEnRelease(value);
    };

  return (
    <Fragment>
      <div className={`${type}_ENV_ATK`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={10}
          circleWidth={9}
          onChange={changeAttack}
          value={enAttack}
          stepSize={1}
          min={0}
          max={80}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_ENVATK`}>{type} Attack</div>

      <div className={`${type}_ENV_DECAY`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={20}
          onChange={changeDecay}
          min={0}
          max={1500}
          value={enDecay}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_ENVDEC`}>{type} Decay</div>

      <div className={`${type}_ENV_SUS`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={20}
          onChange={changeSustain}
          min={0}
          max={1500}
          value={enSustain}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_ENVSUS`}>{type} Sustain</div>

      <div className={`${type}_ENV_REL`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={20}
          onChange={changeRelease}
          min={0}
          max={1500}
          value={enRelease}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_ENVREL`}>{type} Release</div>
    </Fragment>
  );
}
