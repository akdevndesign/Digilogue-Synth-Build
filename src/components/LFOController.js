import { useRef, Fragment, useState, useEffect } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";

export function LFOController({ type, sineVibrato, sineTremolo }) {
  const [freqAM, setFreqAM] = useState(0);
  const [freqFM, setFreqFM] = useState(0);

  const changeAM = (e) => {
    sineTremolo.frequency.value = e;
    setFreqAM(e);
  };

  const changeFM = (e) => {
    sineVibrato.frequency.value = e;
    setFreqFM(e);
  };
  useEffect(() => {
    // Start the LFO when the component mounts
    sineTremolo.start();
    sineTremolo.wet.linearRampTo(1, 0.1, Tone.now());
    sineVibrato.wet.linearRampTo(1, 0.1, Tone.now());
    sineTremolo.depth.linearRampTo(1, 0.1, Tone.now());
    sineVibrato.depth.linearRampTo(1, 0.1, Tone.now());

    // Clean up the LFO when the component unmounts
    return () => {
      sineTremolo.stop();
    };
  }, []);

  return (
    <Fragment>
      <div className={`${type}_LFO_FREQ`}>
        <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          stepSize={0.1}
          onChange={changeAM}
          value={freqAM}
          min={0}
          max={100}
        />
      </div>
      <div className={`AMW`}>
        AMP
        <br />
        LFO
      </div>

      <div className={`${type}_LFOF_FREQ`}>
        <CircleSlider
          size={90}
          gradientColorFrom="black"
          knobColor="#ff5722"
          gradientColorTo="gray"
          progressWidth={11}
          knobRadius={7}
          circleWidth={10}
          onChange={changeFM}
          stepSize={0.1}
          min={0}
          max={100}
          value={freqFM}
        />
      </div>
      <div className={`AMWF`}>
        FREQ
        <br />
        LFO
      </div>
      <div className={`LFOTITLE`}>LFO</div>
    </Fragment>
  );
}
