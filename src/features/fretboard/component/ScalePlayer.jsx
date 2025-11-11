import React, { useEffect, useRef, useState } from "react";

export default function ScalePlayer({ root, notes, onPlayNote }) {
    const [bpm, setBpm] = useState(90);
    const [isLoop, setIsLoop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);
    const idxRef = useRef(0);

    useEffect(() => {
        return () => stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function step() {
        const note = notes[idxRef.current % notes.length];
        onPlayNote(note + "4");
        idxRef.current += 1;
        if (!isLoop && idxRef.current >= notes.length) {
            stop();
            return;
        }
        scheduleNext();
    }

    function scheduleNext() {
        const intervalMs = (60_000 / bpm);
        timerRef.current = setTimeout(step, intervalMs);
    }

    function playOnce() {
        if (isPlaying) return;
        setIsLoop(false);
        setIsPlaying(true);
        idxRef.current = 0;
        scheduleNext();
    }

    function loop() {
        if (isPlaying) return;
        setIsLoop(true);
        setIsPlaying(true);
        idxRef.current = 0;
        scheduleNext();
    }

    function stop() {
        setIsPlaying(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = null;
    }

    return (
        <div className="fb-player">
            <div className="fb-player-controls">
                <button className="fb-btn" onClick={playOnce} disabled={isPlaying}>▶ Play Asc</button>
                <button className="fb-btn" onClick={loop} disabled={isPlaying}>🔁 Loop</button>
                <button className="fb-btn ghost" onClick={stop} disabled={!isPlaying}>⏹ Stop</button>
            </div>
            <div className="fb-player-bpm">
                <label>BPM</label>
                <input type="range" min="40" max="180" value={bpm} onChange={(e)=>setBpm(Number(e.target.value))} />
                <span>{bpm}</span>
            </div>
        </div>
    );
}

