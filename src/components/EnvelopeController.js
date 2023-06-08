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
    updateEnvelope(type, {
      attack: value,
    });
  };

  const changeDecay = (value) => {
    updateEnvelope(type, {
      decay: value,
    });
  };

  const changeSustain = (value) => {
    updateEnvelope(type, {
      sustain: value,
    });
  };

  const changeRelease = (value) => {
    updateEnvelope(type, {
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
        />
      </div>
      <div className={`ENVSUS`}>Sustain</div>

      <div className={`${type}_ENV_REL`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={0.1}
          onChange={changeRelease}
          min={0}
          max={5}
          value={enRelease}
        />
      </div>
      <div className={`ENVREL`}>Release</div>
      <div className={`ENVTITLE`}>ENVELOPE</div>
    </Fragment>
  );
}
