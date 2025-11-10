import React, { useMemo, useState, useRef } from "react";
import { Scale, Note, Interval, distance, Interval as TonalInterval } from "@tonaljs/tonal";
import "../css/fretboard.css";
import ScalePlayer from "./ScalePlayer";
import CagedOverlay from "./CagedOverlay";
import PromptBanner from "./PromptBanner";

const TUNING = ["E4", "B3", "G3", "D3", "A2", "E2"];
const FRETS = 24;

const FRET_MARKERS = {
    3: "single",
    5: "single",
    7: "single",
    9: "single",
    12: "double",
    15: "single",
    17: "single",
    19: "single",
    21: "single",
    24: "double",
};

// changed: minor -> tonalName: "minor"
const SCALE_DATA = {
    major: {
        tonalName: "major",
        label: "Major",
        formula: ["1", "2", "3", "4", "5", "6", "7"],
    },
    minor: {
        tonalName: "minor", // ⬅️ was "natural minor"
        label: "Natural Minor",
        formula: ["1", "2", "b3", "4", "5", "b6", "b7"],
    },
    pentatonic: {
        tonalName: "minor pentatonic",
        label: "Pentatonic Minor",
        formula: ["1", "b3", "4", "5", "b7"],
    },
    blues: {
        tonalName: "blues",
        label: "Blues",
        formula: ["1", "b3", "4", "b5", "5", "b7"],
    },
    dorian: {
        tonalName: "dorian",
        label: "Dorian",
        formula: ["1", "2", "b3", "4", "5", "6", "b7"],
    },
    mixolydian: {
        tonalName: "mixolydian",
        label: "Mixolydian",
        formula: ["1", "2", "3", "4", "5", "6", "b7"],
    },
};

const DEGREE_COLORS = [
    "var(--fb-root)",
    "var(--fb-degree-2)",
    "var(--fb-degree-3)",
    "var(--fb-degree-4)",
    "var(--fb-degree-5)",
    "var(--fb-degree-6)",
    "var(--fb-degree-7)",
];

const ROOTS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const POSITIONS = [
    { id: "off", label: "No position", range: null },
    { id: "p1", label: "Position 1", range: [0, 4] },
    { id: "p2", label: "Position 2", range: [3, 7] },
    { id: "p3", label: "Position 3", range: [5, 9] },
    { id: "p4", label: "Position 4", range: [7, 12] },
    { id: "p5", label: "Position 5", range: [12, 17] },
];

export default function Fretboard() {
    const [root, setRoot] = useState("C");
    const [scaleId, setScaleId] = useState("major");
    const [positionId, setPositionId] = useState("off");
    const [mode, setMode] = useState("scale"); // "scale" | "caged" | "chord"
    const [tooltip, setTooltip] = useState(null);
    const audioCtxRef = useRef(null);

    const scaleInfo = SCALE_DATA[scaleId];

    const scaleNotes = useMemo(() => {
        const s = Scale.get(`${root} ${scaleInfo.tonalName}`);
        return s.notes;
    }, [root, scaleId, scaleInfo]);

    const degreeMap = useMemo(() => {
        const map = {};
        scaleNotes.forEach((pc, idx) => {
            map[pc] = idx;
        });
        return map;
    }, [scaleNotes]);

    const board = useMemo(() => {
        return TUNING.map((openNote) => {
            const stringNotes = [];
            for (let fret = 0; fret <= FRETS; fret++) {
                const interval = Interval.fromSemitones(fret);
                const note = Note.transpose(openNote, interval);
                const pc = Note.pitchClass(note);
                stringNotes.push({ fret, pc, note });
            }
            return stringNotes;
        });
    }, []);

    function playNote(noteName) {
        const freq = Note.freq(noteName);
        if (!freq) return;
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        // slightly softer and smoother envelope to avoid click artifacts (animation fix)
        osc.type = "sine";
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.01);
        gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.42);
    }

    const posRange = POSITIONS.find((p) => p.id === positionId)?.range || null;

    return (
        <div className="fb-container">
            <PromptBanner />
            <div className="fb-top">
                <div className="fb-controls">
                    <div className="fb-control">
                        <label>Root</label>
                        <select value={root} onChange={(e) => setRoot(e.target.value)}>
                            {ROOTS.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fb-control">
                        <label>Scale</label>
                        <select value={scaleId} onChange={(e) => setScaleId(e.target.value)}>
                            {Object.entries(SCALE_DATA).map(([id, s]) => (
                                <option key={id} value={id}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fb-control">
                        <label>Position</label>
                        <select value={positionId} onChange={(e) => setPositionId(e.target.value)}>
                            {POSITIONS.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fb-control">
                        <label>Mode</label>
                        <select value={mode} onChange={(e) => setMode(e.target.value)}>
                            <option value="scale">Scale Mode</option>
                            <option value="chord">Chord Mode</option>
                            <option value="caged">CAGED Mode</option>
                        </select>
                    </div>
                </div>

                <div className="fb-theory">
                    <div>
                        <h4>
                            {root} {scaleInfo.label}
                        </h4>
                        <p className="fb-sub">Formula: {scaleInfo.formula.join(" – ")}</p>
                        <p className="fb-sub">Notes: {scaleNotes.join(" · ")}</p>
                    </div>
                    <div className="fb-legend">
                        {scaleNotes.map((note, idx) => (
                            <div key={note} className="fb-legend-item">
                <span
                    className="fb-legend-dot"
                    style={{ background: DEGREE_COLORS[idx % DEGREE_COLORS.length] }}
                />
                                <span className="fb-legend-text">
                  {note} ({scaleInfo.formula[idx] || `deg ${idx + 1}`})
                </span>
                            </div>
                        ))}
                    </div>
                    <ScalePlayer root={root} notes={scaleNotes} onPlayNote={playNote} />
                </div>
            </div>

            {tooltip && (
                <div className="fb-tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
                    <div className="fb-tooltip-note">{tooltip.note}</div>
                    <div className="fb-tooltip-sub">{tooltip.interval}</div>
                </div>
            )}

            <div className="fb-fret-numbers">
                <div className="fb-fret-number fb-left-pad"></div>
                {Array.from({ length: FRETS + 1 }).map((_, idx) => (
                    <div key={idx} className="fb-fret-number">
                        {idx === 0 ? "0" : idx}
                    </div>
                ))}
            </div>

            <div className="fb-board">
                {board.map((stringNotes, stringIdx) => (
                    <div key={stringIdx} className="fb-string-row">
                        <div className="fb-string-label">{TUNING[stringIdx].replace(/\d/, "")}</div>
                        {stringNotes.map(({ fret, pc, note }) => {
                            const inScale = pc in degreeMap;
                            const degreeIdx = degreeMap[pc];
                            const isRoot = pc === root;
                            const marker = FRET_MARKERS[fret];
                            const inPosition = posRange ? fret >= posRange[0] && fret <= posRange[1] : false;

                            let intervalText = "";
                            if (inScale) {
                                const dist = distance(root, pc);
                                // fallback to degree label; beautify common intervals
                                intervalText = dist || scaleInfo.formula[degreeIdx] || "";
                            }

                            return (
                                <div
                                    key={fret}
                                    className={`fb-fret ${marker ? "has-marker" : ""} ${inPosition ? "fb-pos" : ""}`}
                                >
                                    <div
                                        className={
                                            "fb-note" + (inScale ? " in-scale" : "") + (isRoot ? " is-root" : "")
                                        }
                                        style={
                                            inScale
                                                ? { background: DEGREE_COLORS[degreeIdx % DEGREE_COLORS.length] }
                                                : {}
                                        }
                                        onClick={() => inScale && playNote(note)}
                                        onMouseEnter={(e) =>
                                            setTooltip({
                                                x: e.clientX + 8,
                                                y: e.clientY - 30,
                                                note: note,
                                                interval: intervalText,
                                            })
                                        }
                                        onMouseLeave={() => setTooltip(null)}
                                    >
                                        <span className="fb-note-main">{inScale ? pc : ""}</span>
                                        {inScale && (
                                            <span className="fb-note-degree">
                        {isRoot ? "R" : scaleInfo.formula[degreeIdx] || degreeIdx + 1}
                      </span>
                                        )}
                                    </div>

                                    {marker && (
                                        <div
                                            className={marker === "double" ? "fb-marker double" : "fb-marker"}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {mode === "caged" && (
                <CagedOverlay root={root} />
            )}
        </div>
    );
}
