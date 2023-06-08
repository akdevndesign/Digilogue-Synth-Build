import { Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import { Knob, Pointer, Scale, Value } from "rc-knob";
import * as Tone from "tone";

// export const oscOneDelay = new Tone.PingPongDelay({
//   delayTime: .75,
//   maxDelay: 1,
//   feedback: .35,
//   wet: .75,
// }).connect(oscOneVolume);

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
        <CircleSlider
          size={90}
          knobColor="#005a58"
          knobRadius={7}
          progressWidth={10}
          circleWidth={9}
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
          knobRadius={7}
          fillColor={"black"}
          color={"black"}
          progressWidth={10}
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
          knobRadius={7}
          progressWidth={1}
          circleWidth={10}
          stepSize={0.05}
          onChange={changeDlyTime}
          min={0}
          max={15}
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
          <Knob
          size={100}
          angleOffset={220}
          angleRange={280}
          steps={10}
          min={0}
          max={1}
          onChange={changeRevWet}
          value={revWet}
          shadow={true}
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
      <div className={`REVWET`}>
        Reverb
        <br />
        Wet
      </div>
      <div className={`${type}_REV_DEC`}>
        <Knob
          size={100}
          angleOffset={220}
          angleRange={280}
          steps={10}
          min={0}
          max={1}
          onChange={changeRevDecay}
          value={revDecay}
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
      <div className={`REVDEC`}>Reverb Decay</div>
      <div className={`EFXTITLE`}>Effects</div>
    </Fragment>
  );
}
