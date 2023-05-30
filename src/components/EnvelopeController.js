import { Fragment, useEffect, useState } from "react";
import { CircleSlider } from "react-circle-slider";

export function EnvelopeController({
  type,
  envAttack,
  envDecay,
  envSustain,
  envRelease,
  updateEnvelope,
}) {
  const [enAttack, setEnAttack] = useState(envAttack);
  const [enDecay, setEnDecay] = useState(envDecay);
  const [enSustain, setEnSustain] = useState(envSustain);
  const [enRelease, setEnRelease] = useState(envRelease);
  
  const changeAttack = (value) => {
    setEnAttack(value);
    updateEnvelope(type, {
      attack: value,
      decay: enDecay,
      sustain: enSustain,
      release: enRelease,
    });
  };
  
  const changeDecay = (value) => {
    setEnDecay(value);
    updateEnvelope(type, {
      attack: enAttack,
      decay: value,
      sustain: enSustain,
      release: enRelease,
    });
  };
  
  const changeSustain = (value) => {
    setEnSustain(value);
    updateEnvelope(type, {
      attack: enAttack,
      decay: enDecay,
      sustain: value,
      release: enRelease,
    });
  };
  
  const changeRelease = (value) => {
    setEnRelease(value);
    updateEnvelope(type, {
      attack: enAttack,
      decay: enDecay,
      sustain: enSustain,
      release: value,
    });
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
          stepSize={0.5}
          min={0}
          max={5}
          showTooltip={true}
        />
      </div>
      <div className={`ENVATK`}>Attack</div>

      <div className={`${type}_ENV_DECAY`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={0.5}
          onChange={changeDecay}
          min={0}
          max={5}
          value={enDecay}
          showTooltip={true}
        />
      </div>
      <div className={`ENVDEC`}>Decay</div>

      <div className={`${type}_ENV_SUS`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={0.01}
          onChange={changeSustain}
          min={0}
          max={1}
          value={enSustain}
          showTooltip={true}
        />
      </div>
      <div className={`ENVSUS`}>Sustain</div>

      <div className={`${type}_ENV_REL`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={0.5}
          onChange={changeRelease}
          min={0}
          max={5}
          value={enRelease}
          showTooltip={true}
        />
      </div>
      <div className={`ENVREL`}>Release</div>
      <div className={`ENVTITLE`}>ENVELOPE</div>
    </Fragment>
  );
}