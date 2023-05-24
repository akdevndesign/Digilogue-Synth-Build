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
        if (type !== "NOISE") {
            sineTremolo.start();
            sineTremolo.wet.linearRampTo(1, 0.1, Tone.now());
            sineVibrato.wet.linearRampTo(1, 0.1, Tone.now());
            sineTremolo.depth.linearRampTo(1, 0.1, Tone.now());
            sineVibrato.depth.linearRampTo(1, 0.1, Tone.now());
        } else {
            sineTremolo.start();
            sineTremolo.wet.linearRampTo(1, 0.1, Tone.now());
            sineTremolo.depth.linearRampTo(1, 0.1, Tone.now());
        }

        // Clean up the LFO when the component unmounts
        return () => {
            if (type !== "NOISE") {
                sineTremolo.stop();
            } else {
                sineTremolo.stop();
            }
        };
    }, []);

    return (
        <Fragment>
            <div className={`${type}_LFO_FREQ`}>
                <CircleSlider
                    size={90}
                    knobRadius={7}
                    progressWidth={10}
                    circleWidth={9}
                    onChange={changeAM}
                    value={freqAM}
                    min={0}
                    max={100}
                    showTooltip={true}
                />
            </div>
            <div className={`${type}_AMW`}>{type} AMP LFO</div>
            {type === "NOISE" || (
                <div className={`${type}_LFOF_FREQW`}>{type} FREQ LFO</div>
            )}
            {type === "NOISE" || (
                <div className={`${type}_LFOF_FREQ`}>
                    <CircleSlider
                        size={90}
                        knobRadius={7}
                        progressWidth={10}
                        circleWidth={9}
                        onChange={changeFM}
                        min={0}
                        max={100}
                        value={freqFM}
                        showTooltip={true}
                    />
                </div>
            )}
        </Fragment>
    );
}
