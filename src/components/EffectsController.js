import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import styled from "styled-components";

const StyledCircleSlider = styled(CircleSlider)`
  svg circle:nth-child(2) {
    fill: #f34143; /* Set the desired fill color */
  }
`;

export function EffectsController({
  type,
  oscDelayWet,
  oscDelayFbk,
  oscDelayTime,
  reverbWet,
  reverbDecay,
}) {
  const [dlyWet, setDlyWet] = useState(0);
  const [dlyTime, setDlyTime] = useState(0);
  const [dlyFbk, setDlyFbk] = useState(0);
  const [revWet, setRevWet] = useState(0);
  const [revDecay, setRevDecay] = useState(0);

  const changeDlyWet = (value) => {
    oscDelayWet.rampTo(value, 0.01); // Update the value directly since it's a number
    setDlyWet(value);
  };

  const changeDlyFbk = (value) => {
    oscDelayFbk.rampTo(value, 0.01); // Update the value directly since it's a number
    setDlyFbk(value);
  };

  const changeDlyTime = (value) => {
    oscDelayTime.value = value; // Update the value directly since it's a number
    setDlyTime(value);
  };

  const changeRevWet = (value) => {
    reverbWet.value = value; // Update the value directly since it's a number
    setRevWet(value);
  };

  const changeRevDecay = (value) => {
    reverbDecay.value = value; // Update the value directly since it's a Tone.Signal
    setRevDecay(value);
  };

  return (
    <Fragment>
      <div className={`${type}_DLY_WET`}>
        <StyledCircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          shadow={true}
          onChange={changeDlyWet}
          value={dlyWet}
          stepSize={0.1}
          min={0}
          max={1}
        />
      </div>
      <div className={`DLYWET`}>
        Delay
        <br />
        Wet
      </div>
      <div className={`${type}_DLY_FBK`}>
        <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          onChange={changeDlyFbk}
          value={dlyFbk}
          stepSize={0.1}
          min={0}
          max={1}
        />
      </div>
      <div className={`DLYFBK`}>
        Delay
        <br />
        Feedback
      </div>
      <div className={`${type}_DLY_TIME`}>
        <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          stepSize={0.01}
          onChange={changeDlyTime}
          min={0}
          max={10}
          Value={dlyTime}
        />
      </div>
      <div className={`DLYTIME`}>
        Delay
        <br />
        Time
      </div>
      .
      <div className={`${type}_REV_WET`}>
      <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          stepSize={0.05}
          onChange={changeRevWet}
          min={0}
          max={1}
          Value={revWet}
        />
      </div>
      <div className={`REVWET`}>
        Reverb
        <br />
        Wet
      </div>
      <div className={`${type}_REV_DEC`}>
      <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          stepSize={0.05}
          onChange={changeRevDecay}
          min={0}
          max={1}
          Value={revDecay}
        />
      </div>
      <div className={`REVDEC`}>Reverb Decay</div>
      <div className={`EFXTITLE`}>EFFECTS</div>
    </Fragment>
  );
}
