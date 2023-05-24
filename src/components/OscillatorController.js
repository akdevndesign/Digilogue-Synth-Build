import { useRef, Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";
import "../css/Oscillator.css";

export function Oscillator({ type, synth, synthVolume }) {
    // Set up state using the useState hook and useRef to keep track of various properties
    const dialVolSynth = useRef(-30); // current volume of the synth
    const playingSynth = useRef(false); // whether the synth is currently playing
    const freqSynth = useRef(150); // current frequency of the synth
    const [status, setStatus] = useState(false); // whether the oscillator is currently on or off

    // A function to display the status of the oscillator (on/off)
    const showStatus = () => {
        if (status) {
            return (
                <div className="containerStatus">
                    ON
                    <div id="circleOn"></div>
                </div>
            );
        } else {
            return (
                <div className="containerStatus">
                    OFF
                    <div id="circleOff"></div>
                </div>
            );
        }
    };

    // A function to handle changes to the volume slider
    const handleChange = (e) => {
        dialVolSynth.current = e;
        synthVolume.volume.linearRampTo(e, 0.1, Tone.now());
    };

    // A function to handle changes to the frequency slider
    const handleChangeFreq = (e) => {
        freqSynth.current = e;
        synth.frequency.value = e;
    };

    // A function to handle playing and stopping the oscillator
    const handlePlay = () => {
        if (!playingSynth.current) {
          synth.triggerAttack(synth.frequency.value);
          playingSynth.current = true;
          setStatus(true);
        } else {
          const now = Tone.now();
          synth.triggerRelease(now);
          playingSynth.current = false;
          setStatus(false);
        }
      };

    // Return the JSX for the oscillator component
    return (
        <Fragment>
            <div className={type}>
                <button onClick={handlePlay}>
                    {type}
                    {showStatus()}
                </button>
            </div>
            <div className={`${type}_VOL`}>
                <CircleSlider
                    value={dialVolSynth.current}
                    onChange={handleChange}
                    min={-30}
                    max={-5}
                    size={90}
                    knobRadius={7}
                    progressWidth={10}
                    circleWidth={9}
                />
            </div>
            <div className={`${type}_VOLW`}>{`${type} VOLUME`}</div>

            {type === "NOISE" || (
                <Fragment>
                    <div className={`${type}_FREQ`}>
                        <CircleSlider
                            onChange={handleChangeFreq}
                            min={10}
                            max={1600}
                            value={freqSynth.current}
                            showTooltip={true}
                            stepSize={5}
                            size={90}
                            knobRadius={7}
                            progressWidth={10}
                            circleWidth={9}
                        />
                    </div>
                    <div className={`${type}_FREQW`}>{`${type} FREQ`}</div>
                </Fragment>
            )}
        </Fragment>
    );
}