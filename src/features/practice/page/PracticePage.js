import React from "react";
import Metronome from "../../metronome/component/Metronome";
import PromptEngine from "../../ai-tutor/component/PromptEngine";
import "../css/practice.css";

export default function PracticePage() {
    return (
        <div className="practice-page">
            <div className="practice-hero">
                <h1>Practice Mode</h1>
                <p className="practice-subtitle">Sharpen your skills with guided exercises and tools</p>
            </div>
            <div className="practice-grid">
                <div className="practice-card">
                    <h2>Metronome</h2>
                    <p className="practice-card-desc">Keep time and build rhythm</p>
                    <Metronome />
                </div>
                <div className="practice-card">
                    <h2>AI Practice Prompts</h2>
                    <p className="practice-card-desc">Get guided challenges to improve your playing</p>
                    <PromptEngine />
                </div>
            </div>
        </div>
    );
}

