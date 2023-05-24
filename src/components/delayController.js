import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";

export function FilterController({ type, oscDelayWet, oscDelayTime }) {
  const [dlyWet, setDlyWet] = useState(0);
  const [dlyTime, setDlyTime] = useState(0);

  const changeDlyWet = (value) => {
    oscDelayWet.rampTo(value, 0.01); // Update the value directly since it's a number
    setDlyWet(value);
  };

  const changeDlyTime = (value) => {
    oscDelayTime.rampTo(value, 0.01);
    setDlyTime(value);
  };
  

  return (
    <Fragment>
      <div className={`${type}_DLY_WET`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={10}
          circleWidth={9}
          onChange={changeDlyWet}
          value={dlyWet}
          stepSize={1}
          min={0}
          max={80}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_DLYWET`}>{type} Filter Quality</div>

      <div className={`${type}_DLY_TIME`}>
        <CircleSlider
          size={90}
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={20}
          onChange={changeDlyTime}
          min={0}
          max={1500}
          value={dlyTime}
          showTooltip={true}
        />
      </div>
      <div className={`${type}_DLYTIME`}>{type} Filter Frequency</div>
    </Fragment>
  );
}
