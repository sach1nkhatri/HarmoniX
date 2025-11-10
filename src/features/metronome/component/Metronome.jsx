import React, { useEffect, useRef, useState } from "react";
import "../css/metronome.css";

export default function Metronome() {
    const [bpm, setBpm] = useState(100);
    const [isOn, setIsOn] = useState(false);
    const [tick, setTick] = useState(0);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        return () => stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function click(high = false) {
        if (!audioRef.current) {
            audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = high ? 1200 : 900;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
    }

    function schedule() {
        const isHigh = tick % 4 === 0;
        setTick((t) => (t + 1) % 4);
        click(isHigh);
        const intervalMs = 60000 / bpm;
        timerRef.current = setTimeout(schedule, intervalMs);
    }

    function start() {
        if (isOn) return;
        setIsOn(true);
        setTick(0);
        schedule();
    }

    function stop() {
        setIsOn(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = null;
    }

    return (
        <div className="metro">
            <div className="metro-row">
                <button className="metro-btn" onClick={isOn ? stop : start}>{isOn ? "Stop" : "Start"}</button>
                <div className={`metro-led ${tick===0?'on':''}`}></div>
                <div className={`metro-led ${tick===1?'on':''}`}></div>
                <div className={`metro-led ${tick===2?'on':''}`}></div>
                <div className={`metro-led ${tick===3?'on':''}`}></div>
            </div>
            <div className="metro-row">
                <label>BPM</label>
                <input type="range" min="40" max="200" value={bpm} onChange={(e)=>setBpm(Number(e.target.value))} />
                <span>{bpm}</span>
            </div>
        </div>
    );
}

