import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";

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
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          onChange={changeQ}
          value={qFltr}
          stepSize={1}
          min={0}
          max={20}
          fillColor="#FF0000"
        />
      </div>
      <div className={`FLTRQ`}>
        Filter
        <br />
        Quality
      </div>

      <div className={`${type}_FREQ_FLTR`}>
        <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          stepSize={20}
          onChange={changeFrequency}
          min={0}
          max={1500}
          value={frequencyFltr}
        />
      </div>
      <div className={`FLFREQ`}>Filter Frequency</div>
      <div className={`FLTITLE`}>FILTER</div>
    </Fragment>
  );
}
