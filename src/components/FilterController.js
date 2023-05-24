import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";

export function FilterController({ type, oscFilterQ, OscFilterFrequency }) {
  const [qFltr, setQFltr] = useState(0);
  const [frequencyFltr, setFrequencyFltr] = useState(0);

  const changeQ = (value) => {
    oscFilterQ.rampTo(value, 0.01); // Update the value directly since it's a number
    setQFltr(value);
  };

  const changeFrequency = (value) => {
    OscFilterFrequency.rampTo(value, 0.01);
    setFrequencyFltr(value);
  };
  

  return (
    <Fragment>
      <div className={`${type}_Q_FLTR`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={10}
          circleWidth={9}
          onChange={changeQ}
          value={qFltr}
          stepSize={1}
          min={0}
          max={80}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_FLTRQ`}>{type} Filter Quality</div>

      <div className={`${type}_FREQ_FLTR`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={20}
          onChange={changeFrequency}
          min={0}
          max={1500}
          value={frequencyFltr}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_FLFREQ`}>{type} Filter Frequency</div>
    </Fragment>
  );
}
