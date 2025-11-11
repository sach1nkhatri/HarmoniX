import React from "react";
import intervalInfo from "../data/intervalInfo";

export default function TheorySidebar() {
    return (
        <div className="fb-sidebar">
            <h3>Theory Helper</h3>
            <p className="fb-sidebar-muted">Quick references for intervals, diatonic harmony, and relative scales.</p>
            <div className="fb-sidebar-card">
                <h4>Intervals</h4>
                <ul className="fb-sidebar-list">
                    {intervalInfo.map((iv) => (
                        <li key={iv.name}>
                            <span>{iv.name}</span>
                            <span className="fb-sidebar-pill">{iv.semitones} st</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="fb-sidebar-card">
                <h4>Major Scale Diatonic Chords</h4>
                <ul className="fb-sidebar-list">
                    <li><span>I</span><span className="fb-sidebar-pill">maj7</span></li>
                    <li><span>ii</span><span className="fb-sidebar-pill">m7</span></li>
                    <li><span>iii</span><span className="fb-sidebar-pill">m7</span></li>
                    <li><span>IV</span><span className="fb-sidebar-pill">maj7</span></li>
                    <li><span>V</span><span className="fb-sidebar-pill">7</span></li>
                    <li><span>vi</span><span className="fb-sidebar-pill">m7</span></li>
                    <li><span>vii°</span><span className="fb-sidebar-pill">m7b5</span></li>
                </ul>
            </div>
            <div className="fb-sidebar-card">
                <h4>Relative Scales</h4>
                <ul className="fb-sidebar-list">
                    <li><span>Natural Minor</span><span className="fb-sidebar-pill">6th degree of Major</span></li>
                    <li><span>Dorian</span><span className="fb-sidebar-pill">2nd degree</span></li>
                    <li><span>Mixolydian</span><span className="fb-sidebar-pill">5th degree</span></li>
                    <li><span>Pentatonic Minor</span><span className="fb-sidebar-pill">1 b3 4 5 b7</span></li>
                    <li><span>Blues</span><span className="fb-sidebar-pill">+ b5</span></li>
                </ul>
            </div>
            <div className="fb-sidebar-card">
                <h4>Tips</h4>
                <ul className="fb-sidebar-list">
                    <li>Target 3rds/7ths on chord changes.</li>
                    <li>Use CAGED to anchor positions.</li>
                    <li>Practice with a metronome; start slow.</li>
                </ul>
            </div>
        </div>
    );
}

